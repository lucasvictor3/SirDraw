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
      .getSweepstakeById('-MMCCb2sc_zez9efQY0W')
      .then((response: AxiosResponse<ISweepstake>) => {
        console.log(response.data);
        setTotalTickets(response.data.totalTickets);
        setPurchased(
          response.data.purchasedTicketsList === undefined
            ? []
            : response.data.purchasedTicketsList
        );
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

    if (purchased[0] === 0 && reserved[0] === 0) {
      return;
    }

    const reservedSet = new Set(reserved);
    const purchasedSet = new Set(purchased);

    for (let index = 1; index <= totalTickets; index++) {
      let isDisabled: boolean = false;
      let className: string = '';

      if (reservedSet.has(index)) {
        className = 'reserved';
        isDisabled = true;
      } else if (purchasedSet.has(index)) {
        className = 'purchased';
        isDisabled = true;
      }

      const element: JSX.Element = (
        <SweepstakesTicket
          key={index}
          classname={className}
          ticketNumber={index}
          styleProps={buttonStyle}
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
