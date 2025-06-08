import express from "express";
import { getAllDishes, getDishById, createDish, updateDish, deleteDish } from "../controllers/dish.controllers.js"; 
import { authAdminMiddleware,authUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();



// Route to create a new dish

// Route to get all dishes
router.get("/", authUserMiddleware, getAllDishes);
// Route to get a dish by ID
router.get("/:id", authUserMiddleware, getDishById);


router.post("/",authAdminMiddleware, createDish);
// Route to update a dish by ID
router.put("/:id",authAdminMiddleware, updateDish);
// Route to delete a dish by ID
router.delete("/:id", authAdminMiddleware, deleteDish);  

export default router;

