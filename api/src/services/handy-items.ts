import * as t from "@onflow/types";
import * as fcl from "@onflow/fcl";
import { FlowService } from "./flow";
import * as fs from "fs";
import * as path from "path";

const nonFungibleTokenPath = '"../../contracts/NonFungibleToken.cdc"';
const handyItemsPath = '"../../contracts/HandyItems.cdc"';

class HandyItemsService {
  constructor(
    private readonly flowService: FlowService,
    private readonly nonFungibleTokenAddress: string,
    private readonly handyItemsAddress: string
  ) {}

  setupAccount = async () => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/transactions/handyItems/setup_account.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.sendTx({
      transaction,
      args: [],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  mint = async (recipient: string, name: string, tokenURI: string, quantity: number,
    isSerial: boolean, collection: number, price: number, series: number) => {
    const authorization = this.flowService.authorizeMinter();

    console.log(name);
    console.log(tokenURI);
    console.log(series);
    console.log(typeof series);

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/transactions/handyItems/mint_handy_item.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

      console.log(transaction);

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(recipient, t.Address), fcl.arg(series, t.UInt32),
            fcl.arg(quantity, t.UInt64), fcl.arg(price, t.UInt64),
            fcl.arg(isSerial, t.Bool),
            fcl.arg([
              { key: "name", value: name },
              { key: "img_url", value: tokenURI }
            ], t.Dictionary({key: t.String, value: t.String})),],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  transfer = async (recipient: string, itemID: number) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/transactions/handyItems/transfer_handy_item.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(recipient, t.Address), fcl.arg(itemID, t.UInt64)],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  getCollectionIds = async (account: string): Promise<number[]> => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/scripts/handyItems/get_collection_ids.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.executeScript<number[]>({
      script,
      args: [fcl.arg(account, t.Address)],
    });
  };

  getSupply = async (): Promise<number> => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/scripts/handyItems/get_handy_items_supply.cdc`
        ),
        "utf8"
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.executeScript<number>({ script, args: [] });
  };

  createSeries = async (metadata) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/transactions/handyItems/create_series.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(metadata, t.Dictionary({key: t.String, value: t.String})),],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  }

  createSet = async (series: number, edition: number, quantity: number,
                              price: number, isSerial: boolean, metadata) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/transactions/handyItems/create_set.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(series, t.UInt32),
        fcl.arg(edition, t.UInt32),
        fcl.arg(quantity, t.UInt64),
        fcl.arg(price, t.UFix64),
        fcl.arg(isSerial, t.Bool),
        fcl.arg([metadata], t.Dictionary({key: t.String, value: t.String})),],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  }

  createEdition = async (series: number, metadata) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../cadence/transactions/handyItems/create_edition.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(series, t.UInt32),
        fcl.arg(metadata, t.Dictionary({key: t.String, value: t.String})),],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  }
}

export { HandyItemsService };
