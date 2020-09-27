import * as React from 'react';
import ItemInfo from './innerComponents/itemInfo/ItemInfo';
import SweepstakesTable from './innerComponents/SweepstateTable/SweepstakeTable';

const valueOfTicketExample: number = 3000;
export const ValueOfTicketContext: React.Context<number> = React.createContext(
  valueOfTicketExample
);

const Sweepstakes: React.StatelessComponent = (): JSX.Element => (
  <div>
    <ItemInfo />
    <ValueOfTicketContext.Provider value={valueOfTicketExample}>
      <SweepstakesTable
        valueOfTicket={3000}
        total={400}
        reservedNumbers={[3, 8, 10, 12, 19, 30]}
      />
    </ValueOfTicketContext.Provider>
  </div>
);

export default Sweepstakes;
