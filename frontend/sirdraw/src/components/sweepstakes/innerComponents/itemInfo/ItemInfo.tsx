import { Carousel, Card, Divider, Image } from 'antd';
import * as React from 'react';
import { textInfoMock } from '../../../util/mock';
import './ItemInfo.less';
import logo1 from '../../../../assets/asus1.png';
import logo2 from '../../../../assets/asus2.png';

const contentStyle: React.CSSProperties = {
  height: '24rem',
  color: '#fff',
  lineHeight: '27rem',
  textAlign: 'center',
  background: '#364d79',
  width: '28rem',
};

const ItemInfo: React.StatelessComponent = (): JSX.Element => {
  return (
    <div className="main">
      <div style={{ display: 'flex' }}>
        <Carousel autoplay style={contentStyle}>
          <div>
            <Image style={contentStyle} src={logo1} />
          </div>
          <div>
            <Image style={contentStyle} src={logo2} />
          </div>
        </Carousel>
        <Card title="Item title" className="card-info">
          <p>{textInfoMock}</p>
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
