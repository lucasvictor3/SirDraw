import { mockSweepstakesCollection } from '../utils/utils';
import firebase from 'firebase/app';
import { logger } from '../../../serverNode';

export type SweepstakeType = 'featured' | 'ongoing' | 'finished';

export interface ISweepstake {
    id?: string;
    itemTitle: string;
    imageCollectionURLs: string[];
    itemInfo: string;
    purchasedTicketsList: number[];
    reservedTicketsList: number[];
    totalTickets: number;
    numbersDrawn: number[];
    singleTicketValue: number;
    type: SweepstakeType;
}

class SweepstakesService {
    private db: firebase.database.Database;
    constructor(initializedDb: firebase.database.Database) {
        this.db = initializedDb;
    }

    findRequestedSweepstake = async (sweepstakeId: string) => {
        let sweepstake;
        await this.db.ref('sweepstakes/' + sweepstakeId).once('value', (sweepstakeObj) => {
            sweepstake = sweepstakeObj.val();
        });
        return sweepstake;
    };

    registerSweepstake = async (
        itemTitle: string,
        totalTickets: number,
        imageCollectionURLs: string[],
        itemInfo: string,
        reservedTicketsList: number[],
        singleTicketValue: number,
        sweepstakeType: SweepstakeType
    ) => {
        const newDraw: ISweepstake = {
            itemTitle,
            numbersDrawn: [],
            purchasedTicketsList: [],
            totalTickets,
            imageCollectionURLs,
            itemInfo,
            reservedTicketsList,
            singleTicketValue,
            type: sweepstakeType
        };

        const generatedKey: string = (await this.db.ref('/sweepstakes').push(newDraw)).key;

        return generatedKey;
    };

    getPurchasedTickets = async (sweepstakeId: string) => {
        const sweepstakeObj: ISweepstake = await this.findRequestedSweepstake(sweepstakeId);
        const purchasedAndReservedTickets: { purchasedTickets: number[]; reservedTickets: number[] } = {
            purchasedTickets:
                sweepstakeObj.purchasedTicketsList === undefined ? [] : sweepstakeObj.purchasedTicketsList,
            reservedTickets:
                sweepstakeObj.reservedTicketsList === undefined ? [] : sweepstakeObj.reservedTicketsList
        };
        return purchasedAndReservedTickets;
    };

    getAllSweepstakes = async () => {
        const sweepstakesList = [];
        let retrievedSweepstakesList;
        await this.db.ref('/sweepstakes').once('value', (sweepstakeObj) => {
            retrievedSweepstakesList = sweepstakeObj.val();
        });

        Object.entries(retrievedSweepstakesList).forEach((sweepstakeTuple: [string, ISweepstake]) => {
            const sweepstakeId: string = sweepstakeTuple[0];
            const sweepstakeObj: ISweepstake = sweepstakeTuple[1];

            const sweepstakeInfo = {
                id: sweepstakeId,
                title: sweepstakeObj.itemTitle,
                type: sweepstakeObj.type
            };

            sweepstakesList.push(sweepstakeInfo);
        });

        return sweepstakesList;
    };

    getTotalTickets = async (sweepstakeId: string) => {
        const sweepstakeObj = await this.findRequestedSweepstake(sweepstakeId);
        if (sweepstakeObj === null) return null;
        return sweepstakeObj.totalTickets;
    };

    getSingleTicketValue = async (sweepstakeId: string) => {
        const sweepstakeObj = await this.findRequestedSweepstake(sweepstakeId);
        if (sweepstakeObj === null) return null;
        return sweepstakeObj.singleTicketValue;
    };

    addNewPurchasedTicketToList = async (
        sweepstakeId: string,
        ticketList: number[],
        reservedTicketsList: number[]
    ) => {
        let sweepstakeObj: ISweepstake = await this.findRequestedSweepstake(sweepstakeId);

        if (sweepstakeObj === null) return null;

        const currentPurchasedTickets: number[] =
            sweepstakeObj.purchasedTicketsList === undefined ? [] : sweepstakeObj.purchasedTicketsList;
        const currentReservedTickets: number[] =
            sweepstakeObj.reservedTicketsList === undefined ? [] : sweepstakeObj.reservedTicketsList;

        sweepstakeObj.purchasedTicketsList = [...currentPurchasedTickets, ...ticketList];

        sweepstakeObj.reservedTicketsList = [...currentReservedTickets, ...reservedTicketsList];

        await this.db
            .ref('/sweepstakes' + sweepstakeId)
            .update(sweepstakeObj)
            .catch((error) => {
                logger.error(error);
                sweepstakeObj = null;
            });

        if (sweepstakeObj === null) return null;

        const purchasedAndReservedTickets: { purchasedTickets: number[]; reservedTickets: number[] } = {
            purchasedTickets: sweepstakeObj.purchasedTicketsList,
            reservedTickets: sweepstakeObj.reservedTicketsList
        };

        return purchasedAndReservedTickets;
    };
}

export default SweepstakesService;
