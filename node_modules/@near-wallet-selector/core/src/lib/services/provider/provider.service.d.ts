import * as nearAPI from "near-api-js";
import type { AccessKeyView, BlockReference, QueryResponseKind, RpcQueryRequest } from "near-api-js/lib/providers/provider";
import type { ProviderService, QueryParams, ViewAccessKeyParams } from "./provider.service.types";
import type { SignedTransaction } from "near-api-js/lib/transaction";
export declare class Provider implements ProviderService {
    private provider;
    constructor(urls: Array<string>);
    query<Response extends QueryResponseKind>(paramsOrPath: QueryParams | RpcQueryRequest | string, data?: string): Promise<Response>;
    viewAccessKey({ accountId, publicKey }: ViewAccessKeyParams): Promise<AccessKeyView>;
    block(reference: BlockReference): Promise<import("near-api-js/lib/providers/provider").BlockResult>;
    sendTransaction(signedTransaction: SignedTransaction): Promise<nearAPI.providers.FinalExecutionOutcome>;
    private urlsToProviders;
}
