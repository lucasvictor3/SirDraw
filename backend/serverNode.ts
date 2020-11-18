import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import sweepstakeRouter from './src/modules/sweepStakes/SweepStakesController';
const pino = require('pino');

export const logger = pino({
    prettyPrint: { colorize: true }
});

const app = express();
const port = process.env.PORT || 8001;

dotenv.config({
    path: './env/.env'
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());
app.use(cors({ credentials: true }));

//Routes
app.use('/sweepstake', sweepstakeRouter);

app.listen(process.env.PORT || port, () => {
    console.log('We are live on ' + port);
});

app.get('/', (req, res, next) => {
    res.sendStatus(200);
});
