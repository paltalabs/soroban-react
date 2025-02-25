import { signTransaction as signTransactionService } from "@shared/api/external";
import { CONNECTION_KEY } from "@shared/constants/services";
import { isBrowser } from "./index";

const getConnectionKey = () =>
  window?.sessionStorage?.getItem(CONNECTION_KEY) || "";

export const signTransaction = async (
  transactionXdr: string,
): Promise<string> => {
  if (!isBrowser) {
    return "";
  }

  const connectionKey = getConnectionKey();

  return await signTransactionService(transactionXdr, connectionKey);
};
