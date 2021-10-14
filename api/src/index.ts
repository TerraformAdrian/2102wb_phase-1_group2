import * as fcl from "@onflow/fcl";

import initApp from "./app";
import { FlowService } from "./services/flow";
import { HandyItemsService } from "./services/handy-items";

const config = {
  port: 3003,
  minterAddress: "",
  minterPrivateKeyHex: "",
  minterAccountKeyIndex: "",

  accessApi: "accessApi",

  fungibleTokenAddress: "",
  fusdAddress: "",

  nonFungibleTokenAddress: ""
}

async function run() {
  const flowService = new FlowService(
    config.minterAddress,
    config.minterPrivateKeyHex,
    config.minterAccountKeyIndex
  );

  // Make sure we're pointing to the correct Flow Access API.
  fcl
    .config()
    .put("accessNode.api", config.accessApi)
    .put("decoder.Type", val => val.staticType);

  console.log(config.accessApi);

  const startAPIServer = () => {
    console.log("Starting API server ....");

    const handyItemsService = new HandyItemsService(
      flowService,
      config.nonFungibleTokenAddress,
      config.minterAddress
    );

    const app = initApp(
      handyItemsService
    );

    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}!`);
    });
  };

  startAPIServer();
}

const redOutput = "\x1b[31m%s\x1b[0m";

run().catch((e) => {
  console.error(redOutput, e);
  process.exit(1);
});
