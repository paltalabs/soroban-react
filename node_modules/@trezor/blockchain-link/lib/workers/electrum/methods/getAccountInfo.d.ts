import type { GetAccountInfo as Req } from '@trezor/blockchain-link-types/lib/messages';
import type { GetAccountInfo as Res } from '@trezor/blockchain-link-types/lib/responses';
import type { VinVout } from '@trezor/blockchain-link-types/lib/blockbook';
import { Api } from '../utils';
export declare const sumAddressValues: <T>(transactions: T[], address: string, getVinVouts: (tr: T) => VinVout[]) => number;
declare const getAccountInfo: Api<Req, Res>;
export default getAccountInfo;
//# sourceMappingURL=getAccountInfo.d.ts.map