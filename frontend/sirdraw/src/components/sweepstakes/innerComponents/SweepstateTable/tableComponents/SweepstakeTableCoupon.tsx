import { Button, Card } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { ValueOfTicketContext } from '../../../Sweepstakes';
import './SweepstakeTableCoupon.less';

interface ISweepstakeTicketProps {
  currentSelectedTickets: number[];
}

const SweepstakesTableCoupon: React.FC<ISweepstakeTicketProps> = ({
  currentSelectedTickets,
}: ISweepstakeTicketProps): JSX.Element => {
  const [totalValue, setTotalValue] = useState('0,00');

  const valueOfSingleTicket = useContext(ValueOfTicketContext);

  useEffect(() => {
    let soma: number = -valueOfSingleTicket;
    currentSelectedTickets.forEach((value) => {
      soma += valueOfSingleTicket;
    });
    if (soma === 0) {
      setTotalValue('0,00');
    } else {
      let moneyText: string = soma.toString();
      let tam: number = moneyText.length;

      let moneyLabel: string = `${moneyText.slice(
        0,
        tam - 2
      )},${moneyText.slice(tam - 2, tam)}`;
      console.log(moneyLabel);
      setTotalValue(moneyLabel);
    }
  }, [currentSelectedTickets, valueOfSingleTicket]);

  const toggleButton = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    console.log(currentSelectedTickets);
  };

  return (
    <div className="coupon-card">
      <Card>
        <div style={{ display: 'flex', marginLeft: '20rem' }}>
          <h2>TOTAL: R$ {totalValue}</h2>
          <Button
            onClick={toggleButton}
            type="primary"
            style={{ marginLeft: '7rem' }}
          >
            Comprar
          </Button>
          <Button type="primary" style={{ marginLeft: '2rem' }}>
            Reservar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SweepstakesTableCoupon;
