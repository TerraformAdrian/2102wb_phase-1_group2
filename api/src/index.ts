import path from "path";
import * as fcl from "@onflow/fcl";

import initApp from "./app";
import decrypt from "./utils/decrypt";
import { FlowService } from "./services/flow";
import { HandyItemsService } from "./services/handy-items";

import dotenv from 'dotenv'
import envExpand from 'dotenv-expand'

const env = envExpand(dotenv.config({
  path: path.resolve(process.cwd(), 'api/.env.testnet')
})).parsed || process.env;

/*
const config = process.env.NODE_ENV == "production" ? {
  port: process.env.PORT || 3003,
  minterAddress: "ab5876435fbf2063",
  minterPrivateKeyHex: "241eb3a4f1be425a51f2b619bfe11823d034b57fbc4303c735279c78ab2c0102",
  minterAccountKeyIndex: "0",

  accessApi: "https://access-testnet.onflow.org",

  fungibleTokenAddress: "0x9a0766d93b6608b7",

  nonFungibleTokenAddress: "0xab5876435fbf2063"
} : {
  port: process.env.PORT || 3003,
  minterAddress: "f8d6e0586b0a20c7",
  minterPrivateKeyHex: "e5ca2b0946358223f0555206144fe4d74e65cbd58b0933c5232ce195b9058cdd",
  minterAccountKeyIndex: "0",

  accessApi: "http://localhost:8080",

  fungibleTokenAddress: "0xee82856bf20e2aa6",

  nonFungibleTokenAddress: "0xf8d6e0586b0a20c7"
}
*/
// console.log(process.env);

async function run() {
  
  // CONFIG - DEFAULT
  // ADDRESS and PRIVATE KEY is plain text 
  // easy for development...
  // ***INSECURE*** for production!!!!
  const config = {
    port: process.env.PORT || 3003,
    // this calls the un-encrytped plaintext
    minterAddress: env.MINTER_ADDRESS!,
    // this calls the un-encrytped plaintext
    minterPrivateKeyHex: env.MINTER_PRIVATE_KEY!,
    minterAccountKeyIndex: env.MINTER_ACCOUNT_KEY_INDEX || 0,
    accessApi: env.FLOW_ACCESS_API_URL,
    fungibleTokenAddress: env.FUNGIBLE_TOKEN_ADDRESS!,
    nonFungibleTokenAddress: env.NON_FUNGIBLE_TOKEN_ADDRESS!
  }

  // CONFIG - AWS KMS
  // ADDRESS and PRIVATE KEY is plain text 
  // more complicated for development...
  // ***SECURE*** for production!!!!
  /*
  const config = {
    port: process.env.PORT || 3003,
    // this calls the ENCRYPTED AWS KMS
    minterAddress: await decrypt(env.MINTER_ADDRESS_AWS-KMS!),
    // this calls the ENCRYPTED AWS KMS
    minterPrivateKeyHex: await decrypt(env.MINTER_PRIVATE_KEY_AWS-KMS!),
    minterAccountKeyIndex: env.MINTER_ACCOUNT_KEY_INDEX || 0,
    accessApi: env.FLOW_ACCESS_API_URL,
    fungibleTokenAddress: env.FUNGIBLE_TOKEN_ADDRESS!,
    nonFungibleTokenAddress: env.NON_FUNGIBLE_TOKEN_ADDRESS!
  }
  */

  console.log(config);

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
