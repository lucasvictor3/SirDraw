import { Button } from 'antd';
import React, { useState } from 'react';
import './SweepstakeTableTicket.less';

interface ISweepstakeTicketProps {
  ticketNumber: number;
  classname: string;
  styleProps: React.CSSProperties;
  isDisabled: boolean;
  currentSelectedTickets: number[];
  countSelectedTickets(ticketNumber: number[]): void;
}

const SweepstakesTableTicket: React.FC<ISweepstakeTicketProps> = ({
  ticketNumber,
  styleProps,
  classname,
  isDisabled,
  currentSelectedTickets,
  countSelectedTickets,
}: ISweepstakeTicketProps): JSX.Element => {
  const [selected, setSelected] = useState(false);
  const [styleButton, setStyleButton] = useState(styleProps);

  const toggleButton = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    let currentButtonStyle: React.CSSProperties = {};
    let newSelectedTickets: number[] = [];

    if (selected) {
      currentButtonStyle = { ...styleProps };
      newSelectedTickets = currentSelectedTickets.filter(
        (value) => value !== ticketNumber
      );
      countSelectedTickets(newSelectedTickets);
    } else {
      currentButtonStyle = { ...styleProps, backgroundColor: '#204e28' };
      newSelectedTickets = [...currentSelectedTickets, ticketNumber];
      countSelectedTickets(newSelectedTickets);
    }

    setStyleButton(currentButtonStyle);

    setSelected(!selected);
  };

  return (
    <Button
      key={ticketNumber}
      style={styleButton}
      onClick={toggleButton}
      disabled={isDisabled}
      type="primary"
      className={classname}
    >
      {ticketNumber}
    </Button>
  );
};

export default SweepstakesTableTicket;
