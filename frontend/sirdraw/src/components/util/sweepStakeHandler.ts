import axios from 'axios';

export interface ISweepstake {
  id: string;
  imageCollectionURLs: string[];
  itemInfo: string;
  purchasedTicketsList: number[];
  reservedTicketsList: number[];
  totalTickets: number;
  numbersDrawn: number[];
}

class SweepstakeHandler {
  getSweepstakeById = async (sweepstakeId: string) => {
    return await axios.get(
      `http://192.168.1.6:8000/sweepstake/` + sweepstakeId
    );
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
