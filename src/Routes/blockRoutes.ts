import { Router } from "express"; // Import 'express' and 'Router' from 'express'
import txService from "../controller/txService";

const router: Router = Router(); // Create a router instance

router.get("/fetchLatestBlock", txService.fetchLatestBlock);

export default router;
