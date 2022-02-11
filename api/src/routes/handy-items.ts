import express, { Request, Response, Router } from "express";
import { HandyItemsService } from "../services/handy-items";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

function initHandyItemsRouter(handyItemsService: HandyItemsService): Router {
  const router = express.Router();

  router.post(
    "/handy-items/mint",
    [],
    validateRequest,
    async (req: Request, res: Response) => {
      const { recipient, name, tokenURI, quantity, isSerial, collection, price, series } = req.body;
      const tx = await handyItemsService.mint("0x67e66f5d6b5445f5", name, tokenURI, 
        Number(quantity), isSerial == "yes", Number(collection), Number(price), Number(series));
      return res.send({
        transaction: tx,
      });
    }
  );

  router.post("/handy-items/setup", async (req: Request, res: Response) => {
    const transaction = await handyItemsService.setupAccount();
    return res.send({
      transaction,
    });
  });

  router.post(
    "/handy-items/transfer",
    [body("recipient").exists(), body("itemID").isInt()],
    validateRequest,
    async (req: Request, res: Response) => {
      const { recipient, itemID } = req.body;
      const tx = await handyItemsService.transfer(recipient, itemID);
      return res.send({
        transaction: tx,
      });
    }
  );

  router.get(
    "/handy-items/collection/:account",
    async (req: Request, res: Response) => {
      const collection = await handyItemsService.getCollectionIds(
        req.params.account
      );
      return res.send({
        collection,
      });
    }
  );

  router.get("/handy-items/supply", async (req: Request, res: Response) => {
    const supply = await handyItemsService.getSupply();
    return res.send({
      supply,
    });
  });

  router.post("/handy-items/create-series", async (req: Request, res: Response) => {
    const { name, image } = req.body;
    const transaction = await handyItemsService.createSeries([
      {key: "name", value: name},
      {key: "image", value: image}
    ]);
    return res.send({
      transaction,
    });
  });

  router.post("/handy-items/create-edition", async (req: Request, res: Response) => {
    const { series, name, image } = req.body;
    const transaction = await handyItemsService.createEdition(Number(series), [
      {key: "name", value: name},
      {key: "image", value: image},
    ]);
    return res.send({
      transaction,
    });
  });

  router.post("/handy-items/create-set", async (req: Request, res: Response) => {
    const { name, desc, thumb, quantity, isSerial, series, price, edition } = req.body;
    const transaction = await handyItemsService.createSet(series, edition, quantity, price, isSerial == "yes",[
      { key: "name", value: name },
      { key: "thumb_image", value: thumb },
      { key: "description", value: desc },
    ]);
    return res.send({
      transaction,
    });
  });

  return router;
}

export default initHandyItemsRouter;
