import express from "express";
import { getUserById, getUsers, Login, Logout, Register } from "../controllers/Users.js";
import { getNutrisions, addNutrisions } from "../controllers/Nutrisions.js";
import { getMealsById, addMeal, deleteMealsById } from "../controllers/Meals.js";
import { getRandomFact, addFactHealths } from "../controllers/FactHealths.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { uploadImage, multerImage } from "../controllers/UploadImage.js";

const router = express.Router();
/*
* @swagger
* components:
*   schemas:
*     users:
*       type: object
*       required:
*         - userId
*         - name
*         - email
*       properties:
*         userId:
*           type: INTEGER
*           description: The auto-generated id of the book
*         name:
*           type: string
*           description: The title of your book
*         email:
*           type: string
*           description: The book explanation
*/

/**
* @swagger
* tags:
*   name: Test
*   description: The books managing API
* /:
*   get:
*     summary: Testing default
*     tags: [Test]
*     responses:
*       200:
*         description: Success
*/
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

/**
* @swagger
* tags:
*   name: upload image
*   description: The books managing API
* //upload/:{id}:
*   post:
*     summary: upload image
*     tags: [upload image]
*     responses:
*       200:
*         description: Success
*/
//upload image
//bug image that has been uploaded not deleted after new update
router.post('/upload/:id', verifyToken, multerImage.single('file'), uploadImage);

/**
* @swagger
* tags:
*   name: Nutriosions
*   description: The books managing API
* /nutriosions:
*   get:
*     summary: Get Nutrisions
*     tags: [Nutriosions]
*     responses:
*       200:
*         description: Success
*   post:
*     summary: Menambahkan Nutrisions
*     tags: [Nutriosions]
*     responses:
*       200:
*         description: Success
*/
// Nutriosions
router.get('/nutrisions', getNutrisions);
router.post('/nutrisions', addNutrisions);

/**
* @swagger
* tags:
*   name: meals
*   description: The books managing API
* /meals/:{id}:
*   get:
*     summary: Get Meals
*     tags: [meals]
*     responses:
*       200:
*         description: Success
* /addmeal/:id:
*   post:
*     summary: Menambahkan Meals
*     tags: [meals]
*     responses:
*       200:
*         description: Success
*
* /deletemeal/:{id}:
*   post:
*     summary: Menghapus Meals
*     tags: [meals]
*     responses:
*       200:
*         description: Success
*/
//meals
router.get('/meals/:id', getMealsById);
router.post('/addmeal/:id', addMeal);
router.post('/deletemeal/:id', deleteMealsById);

/**
* @swagger
* tags:
*   name: fact healths
*   description: The books managing API
* /facthealths:
*   get:
*     summary: Get Random Fact
*     tags: [fact healths]
*     responses:
*       200:
*         description: Success
*   post:
*     summary: Add Fact Healths
*     tags: [fact healths]
*     responses:
*       200:
*         description: Success
*/
//fact healths
router.get('/facthealths', getRandomFact);
router.post('/facthealths', addFactHealths);

export default router;