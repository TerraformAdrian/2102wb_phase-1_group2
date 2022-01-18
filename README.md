# README

## Branches
 / development : all approved pulls will come in here
 / feature 
   / uiux-design : used to implement front end design and graphics
   / moonpay : used to implment Moonpay on front end
   / FlowSmartContracts : Lets keep the smart contracts just in this branch
 / production : only approved development will be merged in here
   / demo-nft-sportscast-net : this is only for the demo.nft.sportscast.net

## Install
npm run start

 - issues I had building (Adrian)
 ```
 > 2102wb_phase-1_group2@1.0.0 start
> node api2/dist/index.js

node:internal/modules/cjs/loader:936
  throw err;
  ^

Error: Cannot find module '/Users/publish/2102wb_phase-1_group2/api2/dist/index.js'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```
 
