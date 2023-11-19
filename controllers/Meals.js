import Meals from '../models/MealsModel.js';
import Users from '../models/UserModels.js';

export const getMealsById = async (req, res) => {
    const { id: userId } = req.params;
    try {
        // Check if userId is undefined or null
        if (!userId) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'userId parameter is missing in the request.',
            });
        }

        const userMeals = await Meals.findAll({
            where: {
                userId: userId,
            },
            attributes: ['meals_name', 'calories'],
        });

        return res.json({
            data: userMeals,
        });
    } catch (error) {
        console.error('Error fetching user meals:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};



export const addMeal = async (req, res) => {
    const { id: userId } = req.params;
    const { meals_name, calories } = req.body;

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