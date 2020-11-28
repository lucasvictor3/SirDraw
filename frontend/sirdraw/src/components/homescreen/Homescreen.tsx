import * as React from 'react';
import { Button, Carousel, Input } from 'antd';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import { ISweepstake } from '../util/sweepStakeHandler';
import SweepstakeHandler from '../util/sweepStakeHandler';
import './Homescreen.less';

const { Search } = Input;

const Homescreen: React.FunctionComponent = (): JSX.Element => {
  const [filterValue, setFilterValue] = React.useState('');
  const history = useHistory();
  const [filteredSweepstakes, setFilteredSweepstakes] = React.useState<
    ISweepstake[]
  >([]);
  const sweepstakeService = new SweepstakeHandler();

  const retrieveSweepstakeByValue = async () => {
    sweepstakeService
      .getSweepstakeByFilterValue(filterValue)
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setFilteredSweepstakes(response.data);
      });
  };

  const formatNumber = (value: number): string => {
    if (value === 0) {
      return 'R$ 0,00';
    } else {
      let moneyText: string = value.toString();
      let tam: number = moneyText.length;

      let moneyLabel: string = `R$ ${moneyText.slice(
        0,
        tam - 2
      )},${moneyText.slice(tam - 2, tam)}`;
      console.log(moneyLabel);
      return moneyLabel;
    }
  };

  const generateFilteredCardListOfSweepstakes = (): JSX.Element => {
    if (filteredSweepstakes.length === 0) return <div></div>;
    const sweepstakeElementList: JSX.Element[] = [];

    filteredSweepstakes.forEach((sweepStake: ISweepstake) => {
      const totalPurchasedTickets =
        sweepStake.purchasedTicketsList !== undefined
          ? sweepStake.purchasedTicketsList.length
          : 0;
      const totalReservedTickets =
        sweepStake.reservedTicketsList !== undefined
          ? sweepStake.reservedTicketsList.length
          : 0;
      const remainingTicketsAvailable: number =
        sweepStake.totalTickets - totalPurchasedTickets - totalReservedTickets;

      const element = (
        <div className="filtered-card-item">
          <div
            className="card-option-image"
            style={{
              backgroundImage: 'url(' + sweepStake.imageCollectionURLs[0] + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <h2 className="card-value">
              {formatNumber(sweepStake.singleTicketValue)}{' '}
            </h2>
          </div>
          <div className="card-info">
            <h3 className="card-info-title">{sweepStake.itemTitle} </h3>
            <div>
              <p style={{ color: 'green' }} className="card-info-numbers">
                Números: {sweepStake.totalTickets}
              </p>
              <p style={{ color: '#b9b921' }} className="card-info-numbers">
                Reservados: {sweepStake.reservedTicketsList.length}
              </p>
              <p style={{ color: 'red' }} className="card-info-numbers">
                Restantes: {remainingTicketsAvailable}
              </p>
            </div>
            <Button
              onClick={() => {
                history.push('/sweepstakes/' + sweepStake.id);
              }}
              type="primary"
              className={'open-button'}
            >
              {'Ver sorteio'}
            </Button>
          </div>
        </div>
      );

      sweepstakeElementList.push(element);
    });

    return (
      <div className="filtered-list-wrapper">{sweepstakeElementList} </div>
    );
  };

  const onChange = (a: number) => {
    console.log(a);
  };

  const contentStyle: React.CSSProperties = {
    height: '20rem',
    color: '#fff',
    lineHeight: '20rem',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div className="main">
      <Carousel afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Search
        placeholder="Ex: Range rover"
        onSearch={(value) => {
          setFilterValue(value);
          retrieveSweepstakeByValue();
        }}
        onChange={(event) => setFilterValue(event.target.value)}
        value={filterValue}
        enterButton
      />
      {generateFilteredCardListOfSweepstakes()}
    </div>
  );
};

export default Homescreen;
//"https://cdn.motor1.com/images/mgl/wOnZo/s1/land-rover-range-rover-sport-2021.jpg"
