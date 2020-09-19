import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import ticketsRouter from './src/modules/tickets/TicketsController';

const app = express();
const port = process.env.PORT || 8000;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());
app.use(cors({ credentials: true }));

//Routes
app.use('/tickets', ticketsRouter);

app.listen(process.env.PORT || port, () => {
    console.log('We are live on ' + port);
});

app.get('/', (req, res, next) => {
    res.sendStatus(200);
});
