import { getPublicKey } from "./getPublicKey";
import { signTransaction } from "./signTransaction";
import { isConnected } from "./isConnected";

export const isBrowser = typeof window !== "undefined";

export { getPublicKey, signTransaction, isConnected };
export default {
  getPublicKey,
  signTransaction,
  isConnected,
};
