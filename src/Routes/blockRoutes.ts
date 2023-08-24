import { Router } from "express"; // Import 'express' and 'Router' from 'express'
import txService from "../controller/txService";
import minerService from "../controller/minerService";
import loginService from "../controller/signUpService";


const router: Router = Router(); // Create a router instance

router.get("/fetchBlock", txService.fetchLatestBlock);
router.post("/latestBlock", minerService.latestBlock);
router.post("/registerMiner", minerService.registerMiner);
router.post("/deletMiner",minerService.deleteMiner);
router.post("/minerSignUp",loginService.minerSignUp);
router.post("/minerLogin",loginService.minerLogin);

export default router;
