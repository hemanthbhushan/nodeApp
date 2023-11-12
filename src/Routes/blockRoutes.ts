import { Router } from "express"; // Import 'express' and 'Router' from 'express'
import txService from "../controller/LocalEvm";

const router: Router = Router(); // Create a router instance

router.get("/fetchAaveV3", txService.locakEvm);

export default router;
