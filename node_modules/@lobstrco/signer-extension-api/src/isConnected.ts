import { requestConnectionStatus } from "@shared/api/external";
import { isBrowser } from "./index";

export const isConnected = async (): Promise<boolean> => {
  if (!isBrowser) {
    return false;
  }

  if (window.lobstrSignerExtension) {
    return window.lobstrSignerExtension;
  }

  return await requestConnectionStatus();
};
