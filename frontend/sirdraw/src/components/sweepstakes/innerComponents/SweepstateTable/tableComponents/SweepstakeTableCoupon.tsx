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
  const [singleTicket, setSingleTicket] = useState('0,00');

  const valueOfSingleTicket = useContext(ValueOfTicketContext);

  useEffect(() => {
    let soma: number = -valueOfSingleTicket;
    currentSelectedTickets.forEach((value) => {
      soma += valueOfSingleTicket;
    });
    let unitaryMoneyText: string = valueOfSingleTicket.toString();
    let tam: number = unitaryMoneyText.length;

    let unitaryMoneyLabel: string = ` ${unitaryMoneyText.slice(
      0,
      tam - 2
    )},${unitaryMoneyText.slice(tam - 2, tam)}`;
    setSingleTicket(unitaryMoneyLabel);
    if (soma === 0) {
      setTotalValue(' 0,00');
    } else {
      let moneyText: string = soma.toString();
      let tam: number = moneyText.length;

      let moneyLabel: string = ` ${moneyText.slice(
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
        <div className="inner-card">
          <div>
            <div style={{ display: 'flex' }}>
              <h2>VALOR UNITARIO: R$ </h2>
              <h2 style={{ color: 'green' }}> {singleTicket}</h2>
            </div>
            <div style={{ display: 'flex' }}>
              <h2>TOTAL: R$ </h2>
              <h2 style={{ color: 'red' }}> {totalValue}</h2>
            </div>
          </div>
          <Button
            onClick={toggleButton}
            type="primary"
            style={{ marginLeft: '7rem', marginTop: '2rem' }}
          >
            Comprar
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: '2rem', marginTop: '2rem' }}
          >
            Reservar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SweepstakesTableCoupon;
