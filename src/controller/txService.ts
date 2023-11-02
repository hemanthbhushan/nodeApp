import { Request, Response } from "express";
import dotenv from "dotenv";
import Web3 from "web3"; // Import the entire Web3 module
import POOL_ABI from "../abi/POOL_ABI";
import ORACLE_ABI from "../abi/ORACLE_ABI";
import liquidationWallets from "../schema/liquidationWallets";
import valueOfLiquidation from "../schema/valueOfLiquidation";

//0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2 pool contract address we have
//form the above we have to fetch the wallets from the events which have
//the wbtc as the asset

class EventFetch {
  constructor() {
    dotenv.config();
  }

  async fetchLatestBlock(req: Request, res: Response) {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.RPC as string)
      );
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const poolContract = new web3.eth.Contract(
        POOL_ABI as any,
        process.env.PoolAddress as any
      );

      const oracleContract = new web3.eth.Contract(
        ORACLE_ABI as any,
        process.env.oracleAddress as any
      );

      const assetPrice = await oracleContract.methods
        .getAssetPrice(process.env.WbtcAddress as any)
        .call();

      console.log("The latest block is " + latestBlockNumber);
      console.log("The assetPrice is " + assetPrice);

      const events = await poolContract.getPastEvents("Supply", {
        fromBlock: 18435820,
        toBlock: 18436820,
      });

      const myEvents = events.filter((data: any) => {
        return data.returnValues.reserve === process.env.WbtcAddress;
      });

      for (const event of myEvents) {
        const userAccount = await poolContract.methods
          .getUserAccountData(event.returnValues.onBehalfOf)
          .call();

        const HealthFactor = userAccount.healthFactor / 1e18;
        const healthFactor = parseFloat(HealthFactor.toFixed(2));

        if (healthFactor < 1) {
          // Wallets eligible for liquidation
          liquidationWallets.create({
            eligibleForLiquidation: true,
            healthFactor: healthFactor,
            walletAddress: event.returnValues.onBehalfOf,
          });
          await valueOfLiquidation.findOneAndUpdate(
            {},
            {
              $inc: {
                valueEligibleForLiquidation: userAccount.totalCollateralBase,
              },
            },
            { upsert: true }
          );
        } else if (healthFactor == 1 || healthFactor <= 1.5) {
          // Wallets at risk for liquidation

          liquidationWallets.create({
            riskForLiquadation: true,
            healthFactor: healthFactor,
            walletAddress: event.returnValues.onBehalfOf,
          });
          await valueOfLiquidation.findOneAndUpdate(
            {},
            {
              $inc: {
                valueAtRiskForLiquadation: userAccount.totalCollateralBase,
              },
            },
            { upsert: true }
          );
        }
      }

      return res.status(200).send({
        message: "done",
        assetPrice,
        latestBlockNumber,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new EventFetch();
