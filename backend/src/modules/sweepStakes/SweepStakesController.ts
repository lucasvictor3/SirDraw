import * as express from 'express';
import { isNumberStrict } from '../utils/utils';
import SweepstakeService from './SweepStakesService';

const sweepstakeRouter = express.Router();
const sweepstakeService = new SweepstakeService();

sweepstakeRouter.post('/', async (req, res) => {
    const imageCollectionURLs: string[] = req.body.imageCollectionURLs;
    const itemInfo: string = req.body.itemInfo;
    const totalTickets: number = req.body.totalTickets;
    const reservedTicketsList: number[] = req.body.reservedTicketsList;

    if (!isNumberStrict(totalTickets)) {
        res.sendStatus(404);
    }

    const sweepstakeId: string = String(req.body.sweepstakeId);
    const newSweepstake = sweepstakeService.registerSweepstake(
        sweepstakeId,
        totalTickets,
        imageCollectionURLs,
        itemInfo,
        reservedTicketsList
    );
    console.log(newSweepstake);

    res.status(200).json(newSweepstake);
});

sweepstakeRouter.get('/:sweepstakeId', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const sweepstake = sweepstakeService.findRequestedSweepstake(sweepstakeId);
    console.log(sweepstake);

    res.status(200).json(sweepstake);
});

sweepstakeRouter.put('/', async (req, res) => {
    const reservedTicketsList: number[] = req.body.reservedTicketsList;
    const purchasedTicketsList: number[] = req.body.purchasedTicketsList;
    const sweepstakeId: string = String(req.body.sweepstakeId);
    const newPurchasedTicketList = sweepstakeService.addNewPurchasedTicketToList(
        sweepstakeId,
        purchasedTicketsList,
        reservedTicketsList
    );
    console.log(newPurchasedTicketList);

    res.status(200).json(newPurchasedTicketList);
});

sweepstakeRouter.get('/:sweepstakeId/tickets', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const purchasedAndReservedTickets = sweepstakeService.getPurchasedTickets(sweepstakeId);
    console.log(purchasedAndReservedTickets);

    res.status(200).send(purchasedAndReservedTickets);
});

sweepstakeRouter.get('/:sweepstakeId/totalTickets', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const maximumTotalTickets: number = sweepstakeService.getTotalTickets(sweepstakeId);
    console.log(maximumTotalTickets);

    res.status(200).send(maximumTotalTickets);
});

sweepstakeRouter.get('/:sweepstakeId/singleTicketValue', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const singleTicketValue: number = sweepstakeService.getSingleTicketValue(sweepstakeId);
    console.log(singleTicketValue);

    res.status(200).send(singleTicketValue);
});

export default sweepstakeRouter;
