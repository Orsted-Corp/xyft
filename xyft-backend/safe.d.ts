declare module "safe" {
    export function createSafe(publicKey: string, privateKey: string, amount: string): Promise<void>;
    export function addMoneyToSafe(publicKey: string, privateKey: string, amount: string, safeAddress: string): Promise<void>;
    export function proposeTransaction(privateKey: string, safeAddress: string, destinationAddress: string, amount: string): Promise<void>;
}