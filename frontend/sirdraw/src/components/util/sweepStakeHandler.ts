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

class SweepstakeHandler {
  getSweepstakeById = async (sweepstakeId: string) => {
    return await axios.get(`http://localhost:8000/sweepstake/` + sweepstakeId);
  };

  getSweepstakeTakenTicketsById = async (sweepstakeId: string) => {
    return await axios.get(
      `http://192.168.1.6:8000/sweepstake/${sweepstakeId}/tickets`
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
