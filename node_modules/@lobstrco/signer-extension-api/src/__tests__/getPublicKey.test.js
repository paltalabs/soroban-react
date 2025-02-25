import * as apiExternal from "@shared/api/external";
import { CONNECTION_KEY } from "@shared/constants/services";
import { getPublicKey } from "../getPublicKey";

describe("getPublicKey", () => {
  describe("success case", () => {
    const TEST_PUBLIC_KEY = "GXXXXXXX....XXXXXXX";
    const TEST_CONNECTION_KEY = "xxxxx-xxxxxx-xxxxxx";

    jest.spyOn(apiExternal, "requestPublicKey", null).mockReturnValue({
      publicKey: TEST_PUBLIC_KEY,
      connectionKey: TEST_CONNECTION_KEY,
    });
    it("returns a publicKey", async () => {
      const publicKey = await getPublicKey();
      expect(publicKey).toBe(TEST_PUBLIC_KEY);
    });
    it("saves a connectionKey", () => {
      const savedKey = sessionStorage.getItem(CONNECTION_KEY);

      expect(savedKey).toBe(TEST_CONNECTION_KEY);
    });
  });

  describe("fail case", () => {
    const TEST_ERROR = "Error!";

    it("throws an error", () => {
      jest
        .spyOn(apiExternal, "requestPublicKey", null)
        .mockImplementation(() => {
          throw TEST_ERROR;
        });
      expect(getPublicKey()).rejects.toBe(TEST_ERROR);
    });
  });
});
