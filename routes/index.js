import express from "express";
import { getUserById, getUsers, Login, Logout, Register } from "../controllers/Users.js";
import { getNutrisions, addNutrisions } from "../controllers/Nutrisions.js";
import { getMealsById, addMeal } from "../controllers/Meals.js";
import { getRandomFact, addFactHealths } from "../controllers/FactHealths.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world');
});

router.get('/users', verifyToken, getUsers);
// Sebernarnya ini gaperlu wkwkwkwk
router.get('/users/:id', verifyToken, getUserById);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// Nutriosions
router.get('/nutrisions', getNutrisions);
router.post('/nutrisions', addNutrisions);

//meals
router.post('/meals', getMealsById);
router.post('/addmeal', addMeal);

//fact healths
router.get('/facthealths', getRandomFact);
router.post('/facthealths', addFactHealths);


export default router;