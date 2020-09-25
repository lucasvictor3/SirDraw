import { Carousel, Card, Divider } from 'antd';
import * as React from 'react';
import { textInfoMock } from '../../../util/mock';
import './ItemInfo.less';

const contentStyle: React.CSSProperties = {
  height: '20rem',
  color: '#fff',
  lineHeight: '20rem',
  textAlign: 'center',
  background: '#364d79',
  width: '30rem',
};

const ItemInfo: React.StatelessComponent = (): JSX.Element => {
  return (
    <div className="main">
      <div style={{ display: 'flex' }}>
        <Carousel style={contentStyle}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
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
