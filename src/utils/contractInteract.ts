import { BigNumber, ethers, providers } from "ethers";
import tokens from "../constants/tokens.json";
import ERC20ABI from "../constants/abis/ERC20.json";
import config from "../../config.json";
import HyperLaneAbi from "../constants/abis/HyperERC20_factory.json";
import gasPAy from "../constants/abis/gas.json";
import { Presets, Client, ICall } from "userop";
import { addressToBytes32 } from "./Helpers";

export const getBalance = async (address: string) => {
  const erc20 = new ethers.Contract(
    tokens.USDC,
    ERC20ABI,
    new ethers.providers.JsonRpcProvider(tokens.rpc)
  );
  const balance = await erc20.balanceOf(address);
  return ethers.utils.formatUnits(balance, 18);
};

export const checkApproval = async (address: string, spender: string) => {
  const erc20 = new ethers.Contract(
    tokens.USDC,
    ERC20ABI,
    new ethers.providers.JsonRpcProvider(tokens.rpc)
  );
  const allowance = await erc20.allowance(address, spender);
  return ethers.utils.formatUnits(allowance, 18);
};

export const sendTokensSame = async (
  address: string,
  amount: string,
  pk: string
) => {
  const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
    config.paymaster.rpcUrl,
    config.paymaster.context
  );
  const simpleAccount = await Presets.Builder.Kernel.init(
    new ethers.Wallet(pk),
    config.rpcUrl,
    { paymasterMiddleware }
  );
  const client = await Client.init(config.rpcUrl);
  const erc20Mumbai = new ethers.Contract(
    tokens.USDC,
    ERC20ABI,
    new ethers.providers.JsonRpcProvider(tokens.rpc)
  );
  const res = await client.sendUserOperation(
    simpleAccount.execute({
      to: tokens.USDC,
      value: 0,
      data: erc20Mumbai.interface.encodeFunctionData("transfer", [
        address,
        ethers.utils.parseUnits(amount, 18),
      ]),
    })
  );
  console.log("Waiting for transaction...");
  const ev = await res.wait();
  console.log(`Transaction hash for transfer: ${ev?.transactionHash ?? null}`);
  return ev?.transactionHash ?? null;
};

export const sendTokens = async (
  address: string,
  amount: string,
  chainId: number,
  pk: string
) => {
  const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
    config.paymaster.rpcUrl,
    config.paymaster.context
  );
  const simpleAccount = await Presets.Builder.Kernel.init(
    new ethers.Wallet(pk),
    config.rpcUrl,
    { paymasterMiddleware }
  );
  const client = await Client.init(config.rpcUrl);
  const erc20Mumbai = new ethers.Contract(
    tokens.USDC,
    ERC20ABI,
    new ethers.providers.JsonRpcProvider(tokens.rpc)
  );
  const USDCMumbaiRouter = new ethers.Contract(
    tokens.router,
    HyperLaneAbi,
    new ethers.providers.JsonRpcProvider(tokens.rpc)
  );
  const gasPay = new ethers.Contract(
    tokens.gasMaster,
    gasPAy,
    new ethers.providers.JsonRpcProvider(tokens.rpc)
  );
  let calls: Array<ICall> = [];
  const currentApprove = await checkApproval(address, tokens.router);
  const interchainGas: BigNumber = await USDCMumbaiRouter.quoteGasPayment(97);
  console.log("Interchain gas: ", ethers.utils.formatUnits(interchainGas, 18));
  console.log("Current approve: ", currentApprove);
  if (currentApprove < amount) {
    const res = await client.sendUserOperation(
      simpleAccount.execute({
        to: tokens.USDC,
        value: 0,
        data: erc20Mumbai.interface.encodeFunctionData("approve", [
          tokens.router,
          ethers.utils.parseUnits(amount, 18),
        ]),
      })
    );
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(
      `Transaction hash for approval: ${ev?.transactionHash ?? null}`
    );
  }
  const res2 = await client.sendUserOperation(
    simpleAccount.execute({
      to: tokens.gasMaster,
      value: 0,
      data: gasPay.interface.encodeFunctionData("request", [5000000000000000]),
    })
  );
  console.log("Waiting for transaction...");
  const ev2 = await res2.wait();
  console.log(`Transaction hash for gas: ${ev2?.transactionHash ?? null}`);
  const res = await client.sendUserOperation(
    simpleAccount.execute({
      to: tokens.router,
      value: 5000000000000000,
      data: USDCMumbaiRouter.interface.encodeFunctionData("transferRemote", [
        chainId,
        addressToBytes32(address),
        ethers.utils.parseUnits(amount, 18),
      ]),
    })
  );
  console.log("Waiting for transaction...");
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
  return ev?.transactionHash ?? null;
};

export const getTxData = async (amount, address, chainId) => {
  const USDCMumbaiRouter = new ethers.Contract(
    tokens.router,
    HyperLaneAbi,
    new ethers.providers.JsonRpcProvider(tokens.rpc)
  );
  return {
    to: tokens.router,
    value: 5000000000000000,
    data: USDCMumbaiRouter.interface.encodeFunctionData("transferRemote", [
      chainId,
      addressToBytes32(address),
      ethers.utils.parseUnits(amount, 18),
    ]),
  };
};
