import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import { oft } from "@layerzerolabs/oft-v2-solana-sdk";

export const SOLANA_EID = 30168;
export const BSC_EID = 56;

type SendParams = {
  wallet: any;
  oftProgramId: string;
  recipientAddress: string;
  amount: number;
};

export async function sendFromSolanaToBsc({
  wallet,
  oftProgramId,
  recipientAddress,
  amount,
}: SendParams): Promise<any> {
  try {
    if (!wallet) {
      throw new Error("Solana wallet not connected");
    }

    // Check if wallet has the required properties
    if (!wallet.publicKey || !wallet.adapter) {
      throw new Error(
        "Invalid Solana wallet object. Please reconnect your wallet."
      );
    }

    const umi = createUmi("https://api.testnet.solana.com").use(
      wallet.adapter as any
    );

    const SOLANA_TOKEN_DECIMALS = 9;
    const adjustedAmount = BigInt(
      Math.floor(amount * 10 ** SOLANA_TOKEN_DECIMALS)
    );

    const sendParams = {
      to: Buffer.from(recipientAddress.replace(/^0x/, ""), "hex"),
      dstEid: BSC_EID,
      amountLd: adjustedAmount,
      minAmountLd: adjustedAmount,
      options: Buffer.from([]),
      nativeFee: 0n,
    };

    const accounts = {
      payer: wallet as any,
      tokenMint: publicKey("6V6YhTMR3hXbvHrMmMQ4vMG3gUWwifc57ZsEjRTbAsdH"),
      tokenEscrow: publicKey("CofHgH6WftQgjMF3XQc9McyqVCeTL68MVr37NiwsHQGy"),
      tokenSource: publicKey(wallet.publicKey.toString()),
    } as const;

    const result = await oft.send(
      umi.rpc as any,
      accounts as any,
      sendParams,
      { oft: publicKey(oftProgramId) } as any,
      []
    );

    return result;
  } catch (error: any) {
    console.error("sendFromSolanaToBsc error", error);
    throw error;
  }
}

export async function sendFromBscToSolana({
  wallet,
  oftProgramId,
  recipientAddress,
  amount,
}: SendParams): Promise<any> {
  try {
    if (!wallet) {
      throw new Error("Solana wallet not connected");
    }

    // Check if wallet has the required properties
    if (!wallet.publicKey || !wallet.adapter) {
      throw new Error(
        "Invalid Solana wallet object. Please reconnect your wallet."
      );
    }

    const umi = createUmi("https://api.testnet.solana.com").use(
      wallet.adapter as any
    );

    const BSC_TOKEN_DECIMALS = 18;
    const adjustedAmount = BigInt(
      Math.floor(amount * 10 ** BSC_TOKEN_DECIMALS)
    );

    const accounts = {
      payer: wallet as any,
      tokenMint: publicKey("6V6YhTMR3hXbvHrMmMQ4vMG3gUWwifc57ZsEjRTbAsdH"),
      tokenEscrow: publicKey("CofHgH6WftQgjMF3XQc9McyqVCeTL68MVr37NiwsHQGy"),
      tokenSource: publicKey(wallet.publicKey.toString()),
    } as const;

    const sendParams = {
      to: Buffer.from(recipientAddress),
      dstEid: SOLANA_EID,
      amountLd: adjustedAmount,
      minAmountLd: adjustedAmount,
      options: Buffer.from([]),
      nativeFee: 0n,
    };

    const result = await oft.send(
      umi.rpc as any,
      accounts as any,
      sendParams,
      { oft: publicKey(oftProgramId) } as any,
      []
    );

    return result;
  } catch (error: any) {
    console.error("sendFromBscToSolana error", error);
    throw error;
  }
}
