interface IDraw {
    id: string;
    purchasedTicketsList: number[];
    totalTickets: number;
    drawnNumbers: number[];
}

class TicketsService {
    private registeredDraws: IDraw[];
    constructor() {
        this.registeredDraws = [];
    }

    findRequestedDraw = (drawId: string) => {
        return this.registeredDraws.find((draw: IDraw) => draw.id === drawId);
    };

    registerNewDraw = (drawId: string, totalTickets: number) => {
        const newDraw: IDraw = {
            drawnNumbers: [],
            id: drawId,
            purchasedTicketsList: [],
            totalTickets
        };

        this.registeredDraws = [...this.registeredDraws, newDraw];

        return this.registeredDraws;
    };

    getPurchasedTickets = (drawId: string) => {
        return this.findRequestedDraw(drawId).purchasedTicketsList;
    };

    getTotalTickets = (drawId: string) => {
        return this.findRequestedDraw(drawId).totalTickets;
    };

    addNewPurchasedTicketToList = (drawId: string, ticketList: number[]) => {
        const draw: IDraw = this.findRequestedDraw(drawId);
        draw.purchasedTicketsList = [...draw.purchasedTicketsList, ...ticketList];

        return this.getPurchasedTickets(drawId);
    };
}

export default TicketsService;
