const express = require("express");
import { Router } from "express";
import eventFetch from "../controller/txService";
import blockStore from "../controller/minerService"
const router = Router();
router.get("/fetchBlock", eventFetch.fetchLatestBlock);
router.post("/blockData",blockStore.latestBlock);

export default router;
