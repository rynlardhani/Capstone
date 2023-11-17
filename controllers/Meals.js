import Meals from '../models/MealsModel.js';
import Users from '../models/UserModels.js';

export const getMealsById = async (req, res) => {
    const { userId } = req.body;

    try {
        // jika userId tidak ada
        if (!userId || userId.trim() === '') {
            return res.status(400).json({
                error: 'Invalid userId provided',
            });
        }

        const userMeals = await Meals.findAll({
            where: {
                userId: userId,
            },
            attributes: ['meals_name', 'calories'],
        });

        if (userMeals.length === 0) {
            // jika tidak ada meal untuk user id
            return res.status(404).json({
                error: 'No meals found for the user ID',
            });
        }

        return res.json({
            data: userMeals,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


export const addMeal = async (req, res) => {
    const { userId, meals_name, calories } = req.body;

    try {
        const dataMealsCreate = await Meals.create({
            userId: userId,
            meals_name: meals_name,
            calories: calories,
        });
        res.json({
            msg: 'Meal added successfully',
            data: dataMealsCreate,
        });
    } catch (error) {
        console.error(error);
    }
};