import { requestPublicKey } from "@shared/api/external";
import { GetPublicKeyResponse } from "@shared/constants/types";
import { CONNECTION_KEY } from "@shared/constants/services";
import { isBrowser } from ".";

const saveConnectionKey = (connectionKey: string) => {
  window?.sessionStorage?.setItem(CONNECTION_KEY, connectionKey);
};

export const getPublicKey = async (): Promise<string> => {
  if (!isBrowser) {
    return "";
  }

  const { publicKey, connectionKey }: GetPublicKeyResponse =
    await requestPublicKey();

  saveConnectionKey(connectionKey);
  return publicKey;
};
