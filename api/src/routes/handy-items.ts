import express, { Request, Response, Router } from "express";
import { HandyItemsService } from "../services/handy-items";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

function initHandyItemsRouter(handyItemsService: HandyItemsService): Router {
  const router = express.Router();

  router.post(
    "/handy-items/mint",
    [body("recipient").exists()],
    validateRequest,
    async (req: Request, res: Response) => {
      const { recipient, name, tokenURI, color, info } = req.body;
      const tx = await handyItemsService.mint(recipient, name, tokenURI, color, info);
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

  return router;
}

export default initHandyItemsRouter;
