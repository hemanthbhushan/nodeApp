import { Router } from "express"; // Import 'express' and 'Router' from 'express'
import txService from "../controller/txService";
import minerService from "../controller/minerService";
import loginService from "../controller/signUpService";
import fetchBalanceService from "../controller/fetchBalanceService";

const router: Router = Router(); // Create a router instance

router.get("/fetchLatestBlock", txService.fetchLatestBlock);
router.get("/fetchLatestEvent", txService.fetchLatestEvent);
router.post("/latestBlock", minerService.latestBlock);
router.post("/registerMiner", minerService.registerMiner);
router.post("/deletMiner", minerService.deleteMiner);
router.post("/minerSignUp", loginService.minerSignUp);
router.post("/minerLogin", loginService.minerLogin);
router.post("/calculateBalance", fetchBalanceService.calculateBalance);

export default router;
