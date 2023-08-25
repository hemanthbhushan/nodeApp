import { Request, Response } from "express";
import sortedBalanceSchema from "../schema/sortedBalanceSchema";
import { zeroAddress } from "../common/constants";

class FetchBalance {
  async calculateBalance(req: Request, res: Response) {
    try {
      const { fromAddress, toAddress, value } = req.body;

      if (fromAddress === zeroAddress) {
        const toAddressExist = await sortedBalanceSchema.findOne({
          userAddress: toAddress,
        });

        if (!toAddressExist) {
          await sortedBalanceSchema.create({
            userAddress: toAddress,
            userBalance: value,
          });
        } else {
          const updatedDocument = await sortedBalanceSchema.findOneAndUpdate(
            { userAddress: toAddress },
            { $inc: { userBalance: value } },
            { returnOriginal: false }
          );
          console.log(updatedDocument, "updatedDocument initially created");
        }
      } else {
        await this.updateOrCreateBalance(fromAddress, -value);
        await this.updateOrCreateBalance(toAddress, value);
      }

      res.status(200).json({
        message: "Balance calculation completed",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }

  async updateOrCreateBalance(address: string, value: number) {
    const addressExist = await sortedBalanceSchema.findOne({
      userAddress: address,
    });

    if (addressExist) {
      const updatedDocument = await sortedBalanceSchema.findOneAndUpdate(
        { userAddress: address },
        { $inc: { userBalance: value } },
        { returnOriginal: false }
      );
      console.log(updatedDocument, `updatedDocument for address ${address}`);
    } else {
      console.log(`Address ${address} doesn't exist in the DB`);
    }
  }
}

export default new FetchBalance();
