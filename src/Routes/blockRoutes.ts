import { Router } from "express"; // Import 'express' and 'Router' from 'express'

import Restaurant from "../controller/Restaurant";

const router: Router = Router(); // Create a router instance

router.get("/restaurant", Restaurant.restaurant);

export default router;
