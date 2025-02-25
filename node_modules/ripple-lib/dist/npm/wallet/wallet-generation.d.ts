import { RippleAPI } from '..';
import { GeneratedAddress } from '../offline/generate-address';
export interface FaucetWallet {
    account: GeneratedAddress;
    amount: number;
    balance: number;
}
export declare enum FaucetNetwork {
    Testnet = "faucet.altnet.rippletest.net",
    Devnet = "faucet.devnet.rippletest.net"
}
declare function generateFaucetWallet(this: RippleAPI, address?: string): Promise<FaucetWallet | void>;
export declare function getFaucetUrl(api: RippleAPI): FaucetNetwork;
export default generateFaucetWallet;
//# sourceMappingURL=wallet-generation.d.ts.map