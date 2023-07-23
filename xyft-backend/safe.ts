import { ethers } from "ethers";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import Safe from "@safe-global/protocol-kit";
import SafeApiKit from '@safe-global/api-kit';
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import axios from "axios";

export async function createSafe(selfAddress : string, childAddress : string, privateKey : string) {
    const wallet = new ethers.Wallet(
        privateKey
    );

    const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/polygon"
    );

    const signer = wallet.connect(provider);

    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
    });

    const safeFactory = await SafeFactory.create({ ethAdapter });

    const owners = [selfAddress, childAddress];

    const threshold = 2;

    const safeAccountConfig = {
        owners,
        threshold,
    };

    console.log("Creating safe...");

    safeFactory.deploySafe({ safeAccountConfig });
}

export async function addMoneyToSafe(publicKey: string, privateKey: string, amount: string, safeAddress: string) {
    const wallet = new ethers.Wallet(
        privateKey
    );

    const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/polygon"
    );

    const signer = wallet.connect(provider);

    const transactionParameters = {
        to: safeAddress,
        data: '0x',
        value: ethers.utils.parseEther(amount).toHexString(),
        gasPrice: ethers.utils.hexlify((await provider.getGasPrice())),
    }

    signer.sendTransaction(transactionParameters)
}

export async function proposeTransaction(privateKey: string, safeAddress : string, destinationAddress : string, amount : string) {
    const wallet = new ethers.Wallet(
        privateKey
    );

    const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/polygon"
    );

    const signer = wallet.connect(provider);

    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,   
    });

    const safeSdk = await Safe.create({ ethAdapter, safeAddress });

    const safeTransactionData: SafeTransactionDataPartial = {
        to: destinationAddress,
        data: '0x',
        value: ethers.utils.parseEther(amount).toHexString(),
    };

    const safeTransaction = await safeSdk.createTransaction({ safeTransactionData });

    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);

    const senderSignature = await safeSdk.signTransactionHash(safeTxHash)

    await axios.post(`https://safe-transaction-polygon.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/`, {
        safe: safeAddress,
        to: destinationAddress,
        value: parseInt(safeTransaction.data.value),
        data: "0x",
        operation: 0,
        baseGas: 0,
        gasPrice: 0,
        gasToken: "0x0000000000000000000000000000000000000000",
        refundReceiver: "0x0000000000000000000000000000000000000000",
        nonce: 0,
        safeTxGas: 0,
        contractTransactionHash: safeTxHash,
        sender: await signer.getAddress(),
        signature: senderSignature.data
    })
}

export async function getTransactions(safeAddress : string) {
    const response = await axios.get(`https://safe-transaction-polygon.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/`)

    console.log(response.data.results[response.data.results.length - 1])
}

export async function confirmTransaction(publicKey: string, privateKey: string, safeAddress: string, to: string, value : string, safeTxHash : string) {
    const wallet = new ethers.Wallet(
        privateKey
    );

    const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/polygon"
    );

    const signer = wallet.connect(provider);

    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,   
    });

    const safeSdk = await Safe.create({ ethAdapter, safeAddress });

    const senderSignature = await safeSdk.signTransactionHash(safeTxHash)

    const txServiceUrl = 'https://safe-transaction-polygon.safe.global/'

    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapter})

    await axios.post(`https://safe-transaction-polygon.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/`, {
        safe: safeAddress,
        to: to,
        value: value,
        data: "0x",
        operation: 0,
        baseGas: 0,
        gasPrice: 0,
        gasToken: "0x0000000000000000000000000000000000000000",
        refundReceiver: "0x0000000000000000000000000000000000000000",
        nonce: 0,
        safeTxGas: 0,
        contractTransactionHash: safeTxHash,
        sender: await signer.getAddress(),
        signature: senderSignature.data
    })

    const safeTransaction = await safeService.getTransaction(safeTxHash)
    const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
    const receipt = await executeTxResponse.transactionResponse?.wait()
}