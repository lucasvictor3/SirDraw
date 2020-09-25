import { Button, Card } from 'antd';
import React, { useContext, useState } from 'react';
import { ValueOfTicketContext } from '../../../Sweepstakes';

interface ISweepstakeTicketProps {
  ticketNumber: number;
  currentSelectedTickets: number[];
}

const SweepstakesTableCoupon: React.FC<ISweepstakeTicketProps> = ({
  ticketNumber,
  currentSelectedTickets,
}: ISweepstakeTicketProps): JSX.Element => {
  const [totalValue, setTotalValue] = useState(0);
  //const valueOfSingleTicket = useContext(ValueOfTicketContext);

  const toggleButton = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    console.log(currentSelectedTickets);
  };

  return (
    <Card>
      <h2>TOTAL: R$ 20,00</h2>
    </Card>
  );
};

export default SweepstakesTableCoupon;
