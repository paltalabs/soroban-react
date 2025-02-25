import * as apiExternal from "@shared/api/external";
import { signTransaction } from "../signTransaction";
import { getPublicKey } from "../getPublicKey";

describe("signTransaction", () => {
  describe("success case", () => {
    const INITIAL_XDR = "unsigned";
    const SIGNED_XDR = "signed";
    const TEST_CONNECTION_KEY = "xxxx-xxxx-xxxx";

    // call getPublicKey to test saving connectionKey
    jest.spyOn(apiExternal, "requestPublicKey", null).mockReturnValue({
      connectionKey: TEST_CONNECTION_KEY,
    });
    getPublicKey();

    jest
      .spyOn(apiExternal, "signTransaction", null)
      .mockReturnValue(Promise.resolve(SIGNED_XDR));

    it("returns a transaction", async () => {
      const transaction = await signTransaction(INITIAL_XDR);
      expect(transaction).toBe(SIGNED_XDR);
    });
    it("called with xdr and connectionKey", () => {
      expect(apiExternal.signTransaction).toBeCalledWith(
        INITIAL_XDR,
        TEST_CONNECTION_KEY,
      );
    });
  });

  describe("fail case", () => {
    it("throws a generic error", () => {
      const TEST_ERROR = "Error!";
      jest
        .spyOn(apiExternal, "signTransaction", null)
        .mockImplementation(() => {
          throw TEST_ERROR;
        });
      expect(signTransaction).rejects.toBe(TEST_ERROR);
    });
  });
});
