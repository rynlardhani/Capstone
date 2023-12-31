import Nutrisions from '../models/NutrisionsModel.js';

export const getNutrisions = async (req, res) => {
    try {
        const nutrisions = await Nutrisions.findAll(
            {
                attributes: ['nutrisionId', 'name', 'description', 'createdAt', 'updatedAt']
            }
        );
        res.json({
            data: nutrisions
        });
    } catch (error) {
        console.log(error);
    }
}


export const addNutrisions = async (req, res) => {
    const { name, description } = req.body;
    try {
        const createdNutrisions = await Nutrisions.create({
            name: name,
            description: description
        })
        res.json({ msg: 'Nutrisions created successfully', data: createdNutrisions });
    } catch (error) {
        console.log(error);
    }
}