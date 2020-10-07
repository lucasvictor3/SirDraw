import React from 'react';
import ItemInfo from './innerComponents/itemInfo/ItemInfo';
import SweepstakesTable from './innerComponents/SweepstateTable/SweepstakeTable';

const valueOfTicketExample: number = 3000;
export const ValueOfTicketContext: React.Context<number> = React.createContext(
  valueOfTicketExample
);

const Sweepstakes: React.FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <ItemInfo />
      <ValueOfTicketContext.Provider value={valueOfTicketExample}>
        <SweepstakesTable />
      </ValueOfTicketContext.Provider>
    </div>
  );
};
export default Sweepstakes;
