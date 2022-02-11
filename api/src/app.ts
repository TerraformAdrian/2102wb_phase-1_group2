
import path from "path";

import express, { Request, Response } from "express";

import cors from "cors";

import { json, urlencoded } from "body-parser";

import initHandyItemsRouter from "./routes/handy-items";
import { HandyItemsService } from "./services/handy-items";

import { MongoClient } from "mongodb";

import crypto from 'crypto';

const V1 = "/v1/";
const uri = "mongodb+srv://nmart:nmart1128@nftpow.ltkrr.mongodb.net/nftpow_db?retryWrites=true&w=majority";

// Init all routes, setup middlewares and dependencies
const initApp = (
  handyItemsService: HandyItemsService
) => {
  const app = express();

  // @ts-ignore
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(V1, initHandyItemsRouter(handyItemsService));
  app.post(V1 + "assets/upload", async (req, res) => {
    const client = new MongoClient(uri);
    console.log(req.body);
  
    try {
      await client.connect();

      const database = client.db('nftpow_db');
      const collection = database.collection('assets');

      await collection.insertOne({
        name: req.body.name,
        img_url: req.body.path
      });

      return res.json({success: "true"});
    } catch(err) {
      console.log(err);
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  });
  app.get(V1 + "assets/list", async (req, res) => {
    const client = new MongoClient(uri);
    console.log(req.body);

    try {
      await client.connect();

      const database = client.db('nftpow_db');
      const collection = database.collection('assets');

      const assetList = await collection.find({}).toArray();
      console.log(assetList);

      return res.json({success: "true", result: assetList});
    } catch(err) {
      console.log(err);
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  });

  app.post(V1 + 'moonpay/url/sign', (req, res) => {
    const originalUrl = req.body.originalUrl;
    const signature = crypto
      .createHmac('sha256', 'sk_test_gFy08POGxRFGwiW9PgOAdxhu4ELOP43A')
      .update(new URL(originalUrl).search)
      .digest('base64');
    const urlWithSignature = `${originalUrl}&signature=${encodeURIComponent(signature)}`;
    
    res.json({urlWithSignature});
  });

  app.use(express.static(path.resolve(__dirname, "../web/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../web/build/index.html"));
  });

  app.all("*", async (req: Request, res: Response) => {
    return res.sendStatus(404);
  });

  return app;
};

export default initApp;
