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

  router.get("/handy-items/setup", async (req: Request, res: Response) => {
    return res.send({
      a: "transaction",
    });
    const transaction = await handyItemsService.setupAccount();
    return res.send({
      transaction,
    });
  });

  return router;
}

export default initHandyItemsRouter;
