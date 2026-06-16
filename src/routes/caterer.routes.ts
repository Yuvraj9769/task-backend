import express from "express";
import {
  createCaterer,
  getCaterers,
  getCatererById,
} from "../controllers/caterer.controller";

const router = express.Router();

router.route("/caterers")
  .get(getCaterers)
  .post(createCaterer);

router.route("/caterers/:id")
  .get(getCatererById);

export default router;
