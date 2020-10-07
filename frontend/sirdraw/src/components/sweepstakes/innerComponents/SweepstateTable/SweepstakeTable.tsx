import React, { useState, useEffect } from 'react';
import SweepstakesTicket from './tableComponents/SweepstakeTableTicket';
import './SweepstakeTable.less';
import SweepstakesTableCoupon from './tableComponents/SweepstakeTableCoupon';
import SweepstakeHandler, {
  ISweepstake,
} from '../../../util/sweepStakeHandler';
import { AxiosResponse } from 'axios';

interface ISweepstakeTableProps {}

const buttonStyle: React.CSSProperties = {
  marginLeft: '0.4rem',
  width: '3rem',
  marginTop: '0.7rem',
};

const SweepstakesTable: React.FC<ISweepstakeTableProps> = (): JSX.Element => {
  const [purchased, setPurchased] = useState([0]);
  const [reserved, setReserved] = useState([0]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentNumbersSelected, setCurrentNumbersSelected] = useState([0]);

  const countSelectedTickets = (ticketNumber: number[]): void => {
    setCurrentNumbersSelected(ticketNumber);
  };

  useEffect(() => {
    const sweepstakeHandler = new SweepstakeHandler();
    sweepstakeHandler
      .getSweepstakeById('2')
      .then((response: AxiosResponse<ISweepstake>) => {
        console.log(response.data);
        setTotalTickets(response.data.totalTickets);
        setPurchased(response.data.purchasedTicketsList);
        setReserved(response.data.reservedTicketsList);
      });
  }, []);

  useEffect(() => {
    console.log(currentNumbersSelected);
    return () => {
      console.log(currentNumbersSelected);
    };
  }, [currentNumbersSelected]);

  const initTable = (): JSX.Element[] | undefined => {
    let buttons: JSX.Element[] = [];

    if (purchased[0] === 0 || reserved[0] === 0) {
      return;
    }

    for (let index = 1; index <= totalTickets; index++) {
      let currentButtonStyle: React.CSSProperties = buttonStyle;
      let isDisabled: boolean = false;

      if (reserved.includes(index)) {
        currentButtonStyle = {
          ...buttonStyle,
          backgroundColor: '#f9a443',
          color: 'white',
        };
        isDisabled = true;
      } else if (purchased.includes(index)) {
        currentButtonStyle = {
          ...buttonStyle,
          backgroundColor: 'black',
          color: 'white',
        };
        console.log(currentButtonStyle);
        isDisabled = true;
      }

      const element: JSX.Element = (
        <SweepstakesTicket
          key={index}
          ticketNumber={index}
          styleProps={currentButtonStyle}
          isDisabled={isDisabled}
          currentSelectedTickets={currentNumbersSelected}
          countSelectedTickets={countSelectedTickets}
        />
      );

      buttons.push(element);
    }

    return buttons;
  };

  return (
    <div>
      <div className="main-tickets-table">{initTable()}</div>
      <SweepstakesTableCoupon currentSelectedTickets={currentNumbersSelected} />
    </div>
  );
};

export default SweepstakesTable;
