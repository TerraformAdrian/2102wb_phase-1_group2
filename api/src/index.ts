import * as fcl from "@onflow/fcl";

import initApp from "./app";
import { FlowService } from "./services/flow";
import { HandyItemsService } from "./services/handy-items";

const config = {
  port: 3003,
  minterAddress: "f8d6e0586b0a20c7",
  minterPrivateKeyHex: "e5ca2b0946358223f0555206144fe4d74e65cbd58b0933c5232ce195b9058cdd",
  minterAccountKeyIndex: "0",

  accessApi: "http://localhost:8080",

  fungibleTokenAddress: "0xee82856bf20e2aa6",
  fusdAddress: "",

  nonFungibleTokenAddress: "0xf8d6e0586b0a20c7"
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
