import { Router } from "express"; // Import 'express' and 'Router' from 'express'
import txService from "../controller/aaveService";

const router: Router = Router(); // Create a router instance

router.get("/fetchAaveV3", txService.fetchAaveV3Demo);

export default router;
