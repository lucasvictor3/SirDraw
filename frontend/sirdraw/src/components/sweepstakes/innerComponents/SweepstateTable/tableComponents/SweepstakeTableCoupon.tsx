import { Button, Card, message } from 'antd';
import { AxiosResponse } from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import SweepstakeHandler, {
  ISweepstake,
} from '../../../../util/sweepStakeHandler';
import { SweepstakeTableDataContext } from '../../../Sweepstakes';
import './SweepstakeTableCoupon.less';

interface ISweepstakeTicketProps {
  currentSelectedTickets: number[];
  setPurchased: React.Dispatch<React.SetStateAction<number[]>>;
}

const SweepstakesTableCoupon: React.FC<ISweepstakeTicketProps> = ({
  currentSelectedTickets,
  setPurchased,
}: ISweepstakeTicketProps) => {
  const [totalValue, setTotalValue] = useState('0,00');
  const [singleTicket, setSingleTicket] = useState('0,00');
  const sweepstakeObj: ISweepstake | null = useContext(
    SweepstakeTableDataContext
  );
  const sweepStakeService = new SweepstakeHandler();

  const buyTickets = async () => {
    const filteredCurrentTickets = currentSelectedTickets.filter(
      (number) => number !== 0
    );

    if (sweepstakeObj !== null && sweepstakeObj.id !== undefined) {
      sweepStakeService
        .updateSweepstakePurchasedTickets({
          purchasedTicketsList: filteredCurrentTickets,
          sweepstakeId: sweepstakeObj.id,
        })
        .then((response: AxiosResponse) => {
          console.log(response);
          setPurchased(response.data.purchasedTickets);
          //TERMINAR DE IMPLEMENTAR GERAÇÃO DE NUMERO DE TICKET
          message.success(
            'Compra efetuada com sucesso! Aguarde alguns instantes para ser gerado o numero de seu ticket (WIP)',
            4
          );
        });
    }
  };

  const valueOfSingleTicket =
    sweepstakeObj !== null ? sweepstakeObj.singleTicketValue : 0;

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

      setTotalValue(moneyLabel);
    }
  }, [currentSelectedTickets, valueOfSingleTicket]);

  return (
    <div data-testid="table-coupon" className="coupon-card">
      <Card>
        <div className="inner-card">
          <div>
            <div style={{ display: 'flex' }}>
              <h2>VALOR UNITARIO: R$ </h2>
              <h2 style={{ color: 'green' }}> {singleTicket}</h2>
            </div>
            <div data-testid="table-coupon-total" style={{ display: 'flex' }}>
              <h2>TOTAL: R$ </h2>
              <h2 style={{ color: 'red' }}> {totalValue}</h2>
            </div>
          </div>
          <Button onClick={buyTickets} className="buy-button" type="primary">
            Comprar
          </Button>
          <Button className="reserve-button" type="primary">
            Reservar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SweepstakesTableCoupon;
