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
          `../../../cadence/transactions/handyItems/setup_account.cdc`
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

  mint = async (recipient: string, name: string, 
                tokenURI: string, color: string,
                info: string) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/handyItems/mint_handy_item.cdc`
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
      args: [fcl.arg(recipient, t.Address), fcl.arg(name, t.String), 
            fcl.arg(tokenURI, t.String), fcl.arg(color, t.String),
            fcl.arg(info, t.String),],
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
          `../../../cadence/transactions/handyItems/transfer_handy_item.cdc`
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
          `../../../cadence/scripts/handyItems/get_collection_ids.cdc`
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
          `../../../cadence/scripts/handyItems/get_handy_items_supply.cdc`
        ),
        "utf8"
      )
      .replace(handyItemsPath, fcl.withPrefix(this.handyItemsAddress));

    return this.flowService.executeScript<number>({ script, args: [] });
  };
}

export { HandyItemsService };
