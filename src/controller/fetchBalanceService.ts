import fetchBalanceService from "../schema/fetchBalanceService";
import { zeroAddress } from "../common/constants";
import balanceSchema from "../schema/balanceSchema";

class FetchBalance {
  async calculateBalance(fromAddress: any, toAddress: any, tokenAmount: any) {
    console.log(
      `formAddress ${fromAddress} , toAddress ${toAddress} , amount ${tokenAmount}`
    );
    try {
      if (fromAddress === zeroAddress) {
        const toAddressExist = await fetchBalanceService.findOne({
          userAddress: toAddress,
        });

        if (!toAddressExist) {
          await fetchBalanceService.create({
            userAddress: toAddress,
            userBalance: tokenAmount,
          });
          console.log("created new doc ");
        } else {
          const updatedDocument = await fetchBalanceService.findOneAndUpdate(
            { userAddress: toAddress },
            { $inc: { userBalance: tokenAmount } },
            { returnOriginal: false }
          );
          console.log(
            updatedDocument,
            "updatedDocument if Account Address is ZeroAddres"
          );
        }
      } else {
        await this.updateOrCreateBalance(fromAddress, -tokenAmount);
        await this.updateOrCreateBalance(toAddress, tokenAmount);
      }
    } catch (error) {
      console.error(error, "error in the calculate Function");
    }
  }
  async updateOrCreateBalance(address: string, value: number) {
    const addressExist = await fetchBalanceService.findOne({
      userAddress: address,
    });

    if (addressExist) {
      const updatedDocument = await fetchBalanceService.findOneAndUpdate(
        { userAddress: address },
        { $inc: { userBalance: value } },
        { returnOriginal: false }
      );
      console.log(updatedDocument, `updatedDocument for address ${address}`);
    } else {
      await fetchBalanceService.create({
        userAddress: address,
        userBalance: value,
      });
      console.log(`Address ${address} doesn't exist in the DB`);
    }
  }
}

export default new FetchBalance();
