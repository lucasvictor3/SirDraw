import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import ItemInfo from './innerComponents/itemInfo/ItemInfo';
import SweepstakesTable from './innerComponents/SweepstateTable/SweepstakeTable';
import SweepstakeHandler, { ISweepstake } from '../util/sweepStakeHandler';
import { RouteComponentProps } from 'react-router-dom';

const valueOfTicketExample: number = 3000;
export const ValueOfTicketContext: React.Context<number> = React.createContext(
  valueOfTicketExample
);

export const SweepstakeTableDataContext = React.createContext<ISweepstake | null>(
  null
);

interface ISweepstakeDataContextProps {
  children: React.ReactNode;
  userId: string;
}

export const SweepstakeTableDataProvider: React.FC<ISweepstakeDataContextProps> = ({
  children,
  userId,
}) => {
  const [sweepstakeData, setSweepstakeData] = React.useState(null);
  const sweepStakeService = new SweepstakeHandler();

  useEffect(() => {
    sweepStakeService
      .getSweepstakeById(userId)
      .then((response: AxiosResponse) => {
        setSweepstakeData(response.data);
        console.log(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SweepstakeTableDataContext.Provider value={sweepstakeData}>
      {children}
    </SweepstakeTableDataContext.Provider>
  );
};

interface IRouteProps {
  sweepstakeId: string;
}

const Sweepstakes: React.FC<RouteComponentProps<IRouteProps>> = ({
  match,
}): JSX.Element => {
  console.log(match.params.sweepstakeId);
  return (
    <div>
      <SweepstakeTableDataProvider userId={match.params.sweepstakeId}>
        <ItemInfo />
        <ValueOfTicketContext.Provider value={valueOfTicketExample}>
          <SweepstakesTable />
        </ValueOfTicketContext.Provider>
      </SweepstakeTableDataProvider>
    </div>
  );
};
export default Sweepstakes;
