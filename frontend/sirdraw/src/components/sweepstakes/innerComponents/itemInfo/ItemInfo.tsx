import { Carousel, Card, Divider, Image } from 'antd';
import * as React from 'react';
import './ItemInfo.less';
import { SweepstakeTableDataContext } from '../../Sweepstakes';
import { ISweepstake } from '../../../util/sweepStakeHandler';

const contentStyle: React.CSSProperties = {
  height: '24rem',
  color: '#fff',
  lineHeight: '27rem',
  textAlign: 'center',
  background: '#364d79',
  width: '28rem',
};

const ItemInfo: React.FC = (): JSX.Element => {
  const sweepstakeObj: ISweepstake | null = React.useContext(
    SweepstakeTableDataContext
  );
  console.log(sweepstakeObj);

  const generateImageCarouselItens = (): JSX.Element[] => {
    const imageList: JSX.Element[] = [];
    if (sweepstakeObj === null) {
      imageList.push(<div></div>);
    } else {
      sweepstakeObj.imageCollectionURLs.forEach((imageURL) => {
        const imageDiv = (
          <div>
            <Image
              className="image-carousel"
              src={imageURL}
              alt={imageURL}
              width="600"
              height="600"
            />
          </div>
        );
        imageList.push(imageDiv);
      });
    }
    return imageList;
  };

  const generateItemInfoByTopics = (): JSX.Element => {
    if (sweepstakeObj === null)
      return <div>Nenhuma informação encontrada...</div>;
    else {
      const itemInfoList: JSX.Element[] = [];
      const itemInfoSplitted = sweepstakeObj.itemInfo.split(',');

      itemInfoSplitted.forEach((currentItemInfo) => {
        const infoDiv = <h2>* {currentItemInfo} </h2>;
        itemInfoList.push(infoDiv);
      });

      return <div className="inner-card-info">{itemInfoList} </div>;
    }
  };

  return (
    <div className="main">
      <div style={{ display: 'flex' }}>
        <Carousel autoplay style={contentStyle}>
          {generateImageCarouselItens()}
        </Carousel>
        <Card
          title={
            sweepstakeObj !== null ? <h2>{sweepstakeObj.itemTitle} </h2> : ''
          }
          className="card-info"
        >
          {generateItemInfoByTopics()}
        </Card>
      </div>
      <Divider />
      <h1 className="invite-client-msg">
        Participe! Você pode ser próximo ganhador!!
      </h1>
      <Divider />
    </div>
  );
};

export default ItemInfo;
