import axios from 'axios';

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

interface IUpdateTicketRequest {
  purchasedTicketsList: number[];
  sweepstakeId: string;
}

class SweepstakeHandler {
  getSweepstakeById = async (sweepstakeId: string) => {
    return await axios.get(`http://localhost:8000/sweepstake/` + sweepstakeId);
  };

  updateSweepstakePurchasedTickets = async (buyObj: IUpdateTicketRequest) => {
    return await axios.put(`http://192.168.1.6:8000/sweepstake/`, buyObj);
  };

  getSweepstakeTakenTicketsById = async (sweepstakeId: string) => {
    return await axios.get(
      `http://192.168.1.6:8000/sweepstake/${sweepstakeId}/tickets`
    );
  };

  getSweepstakeByFilterValue = async (filterValue: string) => {
    return await axios.get(
      `http://192.168.1.6:8000/sweepstake/byFilter/${filterValue}`
    );
  };

  getSweepstakeTotalTicketsById = async (sweepstakeId: string) => {
    return await axios.get(
      `http://192.168.1.6:8000/sweepstake/${sweepstakeId}/totalTickets`
    );
  };

  getSweepstakeSingleTicketValueById = async (sweepstakeId: string) => {
    return await axios.get(
      `http://192.168.1.6:8000/sweepstake/${sweepstakeId}/singleTicketValue`
    );
  };
}

export default SweepstakeHandler;
