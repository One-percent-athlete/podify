import { getHistory, getRecentlyPlayed, removeHistory, updateHistory } from "#/controllers/history";
import { mustAuth } from "#/middlewear/auth";
import { validate } from "#/middlewear/validator";
import { UpdateHistorySchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/", mustAuth, validate(UpdateHistorySchema), updateHistory);

router.delete("/", mustAuth, removeHistory);

router.get("/", mustAuth, getHistory);

router.get("/recently-played", mustAuth, getRecentlyPlayed);

export default router;
