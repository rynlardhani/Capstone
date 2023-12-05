import express from 'express';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
// import Users from './models/UserModels.js';
// import Nutrisions from './models/NutrisionsModel.js';
// import Meals from './models/MealsModel.js';
// import FactHealths from './models/FactHealthsModel.js';


dotenv.config();

const app = express();

// swagger
const options= {
    definition: {
        openapi: "3.0.0",
        servers: [{
            url:"http://localhost:5000/" 
        },
      ],
    },
    apis: ["./routes/*.js"],
};

const spacs = swaggerJSDoc(options)
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)

//start server
app.listen(5000, () => {
    console.log('Server on port', 5000);
}
);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

//test db
try {
    db.authenticate();
    console.log('Database connected');

    // line below is for create table
    // await Users.sync();
    // await Nutrisions.sync();
    // await Meals.sync();
    // await FactHealths.sync();
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}