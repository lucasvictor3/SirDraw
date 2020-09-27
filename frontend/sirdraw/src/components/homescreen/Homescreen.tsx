import { Carousel } from 'antd';
import * as React from 'react';

const Homescreen: React.FunctionComponent = (): JSX.Element => {
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
    </div>
  );
};

export default Homescreen;
