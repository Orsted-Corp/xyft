import "@ethersproject/shims";
import { Buffer } from "buffer";
import { ethers } from "ethers";
global.Buffer = global.Buffer || Buffer;

const providerUrl = "https://rpc.ankr.com/eth"; // Or your desired provider url

const getChainId = async (): Promise<ethers.providers.Network> => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails;
  } catch (error) {
    throw error;
  }
};

const getAccounts = async (key: string): Promise<string> => {
  try {
    const wallet = new ethers.Wallet(key);
    const address = await wallet.getAddress();
    return address;
  } catch (error) {
    throw error;
  }
};

const getBalance = async (key: string): Promise<ethers.BigNumber> => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const balance = await wallet.getBalance();

    return balance;
  } catch (error) {
    throw error;
  }
};

const sendTransaction = async (key: string): Promise<ethers.providers.TransactionResponse> => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

    // Convert 1 ether to wei
    const amount = ethers.utils.parseEther("0.001");

    // Submit transaction to the blockchain
    const tx = await wallet.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: ethers.BigNumber.from("5000000000"), // Max priority fee per gas
      maxFeePerGas: ethers.BigNumber.from("6000000000000"), // Max fee per gas
    });

    return tx;
  } catch (error) {
    throw error;
  }
};

const signMessage = async (key: string): Promise<string> => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await wallet.signMessage(originalMessage);

    return signedMessage;
  } catch (error) {
    throw error;
  }
};

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
};
