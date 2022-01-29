# Readme

To run this project you should build via lerna (monorepo tool)

Run this commands:

```
npm install
npm run build
npm run start
```

if npm alias does not work for any problem on package.json

```
npm install
npx lerna exec npm install && npx lerna exec npm run build
node api/dist/index.js
```
