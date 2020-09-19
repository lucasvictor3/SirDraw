import * as express from 'express';
import TicketsService from './TicketsService';

const ticketsRouter = express.Router();
const ticketService = new TicketsService();

ticketsRouter.post('/draw', async (req, res) => {
    const totalTickets: number = req.body.totalTickets;
    const drawId: string = req.body.drawId;
    const newDraw = ticketService.registerNewDraw(drawId, totalTickets);
    console.log(newDraw);

    res.status(200).json(newDraw);
});

ticketsRouter.get('/draw', async (req, res) => {
    const drawId: string = req.body.drawId;
    const newDraw = ticketService.findRequestedDraw(drawId);
    console.log(newDraw);

    res.status(200).json(newDraw);
});

ticketsRouter.post('/', async (req, res) => {
    const purchasedTicketsList: number[] = req.body.purchasedTicketsList;
    const drawId: string = req.body.drawId;
    const newPurchasedTicketList: number[] = ticketService.addNewPurchasedTicketToList(
        drawId,
        purchasedTicketsList
    );
    console.log(newPurchasedTicketList);

    res.status(200).json(newPurchasedTicketList);
});

ticketsRouter.get('/', async (req, res) => {
    const drawId: string = req.body.drawId;
    const purchasedTicketsList: number[] = ticketService.getPurchasedTickets(drawId);
    console.log(purchasedTicketsList);

    res.status(200).send(purchasedTicketsList);
});

ticketsRouter.get('/total', async (req, res) => {
    const drawId: string = req.body.drawId;
    const maximumTotalTickets: number = ticketService.getTotalTickets(drawId);
    console.log(maximumTotalTickets);

    res.status(200).send(maximumTotalTickets);
});

export default ticketsRouter;
