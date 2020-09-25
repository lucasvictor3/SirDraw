import React, { useState } from 'react';
import SweepstakesTicket from './tableComponents/SweepstakeTableTicket';
import './SweepstakeTable.less';
import SweepstakesTableCoupon from './tableComponents/SweepstakeTableCoupon';

interface ISweepstakeTableProps {
  total: number;
  reservedNumbers: number[];
  valueOfTicket: number;
}

const buttonStyle: React.CSSProperties = {
  marginLeft: '0.4rem',
  width: '3rem',
  marginTop: '0.7rem',
};

const SweepstakesTable: React.FC<ISweepstakeTableProps> = ({
  total,
  reservedNumbers,
}: ISweepstakeTableProps): JSX.Element => {
  const [purchased, setPurchased] = useState([1, 4, 9, 20, 40]);
  const [currentNumbersSelected, setCurrentNumbersSelected] = useState([0]);

  const countSelectedTickets = (ticketNumber: number[]): void => {
    setCurrentNumbersSelected(ticketNumber);
  };

  const initTable = (): JSX.Element[] => {
    let buttons: JSX.Element[] = [];

    for (let index = 1; index <= total; index++) {
      let currentButtonStyle: React.CSSProperties = buttonStyle;
      let isDisabled: boolean = false;

      if (reservedNumbers.includes(index)) {
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
        isDisabled = true;
      }

      const element: JSX.Element = (
        <SweepstakesTicket
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
      <SweepstakesTableCoupon
        ticketNumber={2}
        currentSelectedTickets={currentNumbersSelected}
      />
    </div>
  );
};

export default SweepstakesTable;
