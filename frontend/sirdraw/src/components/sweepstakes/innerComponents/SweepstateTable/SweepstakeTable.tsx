import React, { useState, useEffect, useContext } from 'react';
import SweepstakesTicket from './tableComponents/SweepstakeTableTicket';
import './SweepstakeTable.less';
import SweepstakesTableCoupon from './tableComponents/SweepstakeTableCoupon';
import { ISweepstake } from '../../../util/sweepStakeHandler';
import { SweepstakeTableDataContext } from '../../Sweepstakes';

interface ISweepstakeTableProps {}

const buttonStyle: React.CSSProperties = {
  marginLeft: '0.4rem',
  width: '3rem',
  marginTop: '0.7rem',
};

const SweepstakesTable: React.FC<ISweepstakeTableProps> = () => {
  const [purchased, setPurchased] = useState([0]);
  const [reserved, setReserved] = useState([0]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentNumbersSelected, setCurrentNumbersSelected] = useState([0]);

  const sweepstakeObj: ISweepstake | null = useContext(
    SweepstakeTableDataContext
  );

  const countSelectedTickets = (ticketNumber: number[]): void => {
    setCurrentNumbersSelected(ticketNumber);
  };

  useEffect(() => {
    if (sweepstakeObj !== null) {
      setTotalTickets(sweepstakeObj.totalTickets);
      setPurchased(
        sweepstakeObj.purchasedTicketsList !== undefined
          ? sweepstakeObj.purchasedTicketsList
          : [0]
      );
      setReserved(
        sweepstakeObj.reservedTicketsList !== undefined
          ? sweepstakeObj.reservedTicketsList
          : [0]
      );
    }
  }, [sweepstakeObj]);

  useEffect(() => {
    setCurrentNumbersSelected([0]);
  }, [purchased]);

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
      <SweepstakesTableCoupon
        currentSelectedTickets={currentNumbersSelected}
        setPurchased={setPurchased}
      />
    </div>
  );
};

export default SweepstakesTable;
