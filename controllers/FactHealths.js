import FactHealths from "../models/FactHealthsModel.js";

export const addFactHealths = async (req, res) => {
    const { fact, source } = req.body;

    try {
        const newFact = await FactHealths.create({
            fact,
            source,
        });
        return res.json({
            msg: "Fact added successfully",
            data: newFact,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getRandomFact = async (req, res) => {
    const factId = Math.floor(Math.random() * 10) + 1;

    try {
        const randomFact = await FactHealths.findAll({
            where: {
                factId: factId
            }
        });
        return res.json({
            data: randomFact
        }
        );
    } catch (error) {
        console.log(error);
    }
};