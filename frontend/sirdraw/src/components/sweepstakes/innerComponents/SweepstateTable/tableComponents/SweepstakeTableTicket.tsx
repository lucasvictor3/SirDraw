import { Button } from 'antd';
import React, { useState } from 'react';

interface ISweepstakeTicketProps {
  ticketNumber: number;
  styleProps: React.CSSProperties;
  isDisabled: boolean;
  currentSelectedTickets: number[];
  countSelectedTickets(ticketNumber: number[]): void;
}

const SweepstakesTableTicket: React.FC<ISweepstakeTicketProps> = ({
  ticketNumber,
  styleProps,
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
    >
      {ticketNumber}
    </Button>
  );
};

export default SweepstakesTableTicket;
