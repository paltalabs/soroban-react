"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = exports.computeRequestId = exports.deleteRequest = exports.getResponse = exports.proxyApi = void 0;
const sha1_1 = __importDefault(require("sha1"));
const uuid4_1 = __importDefault(require("uuid4"));
const utils_1 = require("@near-js/utils");
exports.proxyApi = "https://h4n.app";
const getResponse = async (id) => {
    const res = await fetch(`${exports.proxyApi}/${id}/response`, {
        headers: { "content-type": "application/json" },
        method: "GET",
    });
    if (res.ok === false) {
        throw Error(await res.text());
    }
    const { data } = await res.json();
    return JSON.parse(data);
};
exports.getResponse = getResponse;
const deleteRequest = async (id) => {
    const res = await fetch(`${exports.proxyApi}/${id}`, {
        headers: { "content-type": "application/json" },
        method: "DELETE",
    });
    if (res.ok === false) {
        throw Error(await res.text());
    }
};
exports.deleteRequest = deleteRequest;
const computeRequestId = async (request) => {
    const query = (0, utils_1.baseEncode)(JSON.stringify({ ...request, _id: (0, uuid4_1.default)() }));
    const hashsum = (0, sha1_1.default)(query);
    const id = Buffer.from(hashsum, "hex").toString("base64");
    const requestId = id.replaceAll("/", "_").replaceAll("-", "+").slice(0, 13);
    return { requestId, query };
};
exports.computeRequestId = computeRequestId;
const createRequest = async (request, signal) => {
    const { query, requestId } = await (0, exports.computeRequestId)(request);
    const res = await fetch(`${exports.proxyApi}/${requestId}/request`, {
        body: JSON.stringify({ data: query }),
        headers: { "content-type": "application/json" },
        method: "POST",
        signal,
    });
    if (res.ok === false) {
        throw Error(await res.text());
    }
    return requestId;
};
exports.createRequest = createRequest;
//# sourceMappingURL=proxy.js.map