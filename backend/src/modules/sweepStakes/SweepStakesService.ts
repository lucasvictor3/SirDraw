import { mockSweepstakesCollection } from '../utils/utils';

export interface ISweepstake {
    id: string;
    imageCollectionURLs: string[];
    itemInfo: string;
    purchasedTicketsList: number[];
    reservedTicketsList: number[];
    totalTickets: number;
    numbersDrawn: number[];
    singleTicketValue: number;
}

class SweepstakesService {
    private registeredSweepstakes: ISweepstake[];
    constructor() {
        this.registeredSweepstakes = mockSweepstakesCollection;
    }

    findRequestedSweepstake = (sweepstakeId: string) => {
        return this.registeredSweepstakes.find((sweepstake: ISweepstake) => sweepstake.id === sweepstakeId);
    };

    registerSweepstake = (
        sweepstakeId: string,
        totalTickets: number,
        imageCollectionURLs: string[],
        itemInfo: string,
        reservedTicketsList: number[]
    ) => {
        const newDraw: ISweepstake = {
            numbersDrawn: [],
            id: sweepstakeId,
            purchasedTicketsList: [],
            totalTickets,
            imageCollectionURLs,
            itemInfo,
            reservedTicketsList
        };

        this.registeredSweepstakes = [...this.registeredSweepstakes, newDraw];

        return this.registeredSweepstakes;
    };

    getPurchasedTickets = (sweepstakeId: string) => {
        const sweepstakeObj: ISweepstake = this.findRequestedSweepstake(sweepstakeId);
        const purchasedAndReservedTickets: { purchasedTickets: number[]; reservedTickets: number[] } = {
            purchasedTickets: sweepstakeObj.purchasedTicketsList,
            reservedTickets: sweepstakeObj.reservedTicketsList
        };
        return purchasedAndReservedTickets;
    };

    getTotalTickets = (sweepstakeId: string) => {
        return this.findRequestedSweepstake(sweepstakeId).totalTickets;
    };

    getSingleTicketValue = (sweepstakeId: string) => {
        return this.findRequestedSweepstake(sweepstakeId).singleTicketValue;
    };

    addNewPurchasedTicketToList = (
        sweepstakeId: string,
        ticketList: number[],
        reservedTicketsList: number[]
    ) => {
        const sweepstakeObj: ISweepstake = this.findRequestedSweepstake(sweepstakeId);
        sweepstakeObj.purchasedTicketsList = [...sweepstakeObj.purchasedTicketsList, ...ticketList];
        sweepstakeObj.reservedTicketsList = [...sweepstakeObj.reservedTicketsList, ...reservedTicketsList];

        return this.getPurchasedTickets(sweepstakeId);
    };
}

export default SweepstakesService;
