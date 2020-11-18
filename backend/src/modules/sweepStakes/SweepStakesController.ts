import * as express from 'express';
import { initializedFirebase } from '../../firebase/firebase';
import { isNumberStrict } from '../utils/utils';
import SweepstakeService, { SweepstakeType } from './SweepStakesService';
import { logger } from '../../../serverNode';

const db = initializedFirebase.database();
const sweepstakeRouter = express.Router();
const sweepstakeService = new SweepstakeService(db);

sweepstakeRouter.post('/', async (req, res) => {
    const imageCollectionURLs: string[] = req.body.imageCollectionURLs;
    const itemInfo: string = req.body.itemInfo;
    const itemTitle: string = req.body.itemTitle;
    const totalTickets: number = req.body.totalTickets;
    const reservedTicketsList: number[] = req.body.reservedTicketsList;
    const singleTicketValue: number = req.body.singleTicketValue;
    const sweepstakeType: SweepstakeType = req.body.sweepstakeType;

    if (!isNumberStrict(totalTickets)) {
        res.sendStatus(404);
    }

    const newSweepstake = await sweepstakeService.registerSweepstake(
        itemTitle,
        totalTickets,
        imageCollectionURLs,
        itemInfo,
        reservedTicketsList,
        singleTicketValue,
        sweepstakeType
    );

    logger.info(newSweepstake);
    res.status(200).json(newSweepstake);
});

sweepstakeRouter.get('/:sweepstakeId', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const sweepstake = await sweepstakeService.findRequestedSweepstake(sweepstakeId);

    logger.info({ 'GET BY SWEEPSTAKE ID': sweepstake });

    if (sweepstake === null) {
        res.sendStatus(404);
        return;
    }
    res.status(200).json(sweepstake);
});

sweepstakeRouter.put('/', async (req, res) => {
    const reservedTicketsList: number[] = req.body.reservedTicketsList;
    const purchasedTicketsList: number[] = req.body.purchasedTicketsList;
    const sweepstakeId: string = String(req.body.sweepstakeId);
    const newPurchasedTicketList = await sweepstakeService.addNewPurchasedTicketToList(
        sweepstakeId,
        purchasedTicketsList,
        reservedTicketsList
    );

    logger.info({ 'UPDATED TICKETS: ': newPurchasedTicketList });

    if (newPurchasedTicketList === null) {
        res.sendStatus(404);
        return;
    }

    res.status(200).json(newPurchasedTicketList);
});

sweepstakeRouter.get('/get/all', async (req, res) => {
    const sweepstakesInfoList = await sweepstakeService.getAllSweepstakes();
    logger.info(sweepstakesInfoList);

    res.status(200).send(sweepstakesInfoList);
});

sweepstakeRouter.get('/:sweepstakeId/tickets', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const purchasedAndReservedTickets = await sweepstakeService.getPurchasedTickets(sweepstakeId);
    logger.info(purchasedAndReservedTickets);

    res.status(200).send(purchasedAndReservedTickets);
});

sweepstakeRouter.get('/:sweepstakeId/totalTickets', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const maximumTotalTickets: number = await sweepstakeService.getTotalTickets(sweepstakeId);
    logger.info(maximumTotalTickets);

    res.status(200).send(maximumTotalTickets);
});

sweepstakeRouter.get('/:sweepstakeId/singleTicketValue', async (req, res) => {
    const sweepstakeId: string = String(req.params.sweepstakeId);
    const singleTicketValue: number = await sweepstakeService.getSingleTicketValue(sweepstakeId);
    logger.info(singleTicketValue);

    res.status(200).send(singleTicketValue);
});

export default sweepstakeRouter;
