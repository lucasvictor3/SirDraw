import { Carousel } from 'antd';
import * as React from 'react';

/**
 * maxHeight: "20rem",
        maxWidth: "20rem",
        marginLeft: "30rem",
        marginTop: "10rem",
        border: "4px",
        borderStyle: "solid",
        borderRadius: "10px",
        padding: "10px",
 */

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
    <div
      style={{
        maxHeight: '70rem',
        maxWidth: '70rem',
        marginLeft: '6rem',
        marginTop: '4rem',
        border: '4px',
        borderStyle: 'solid',
        borderRadius: '10px',
        padding: '2px',
        boxShadow: '10px 10px 5px grey',
      }}
    >
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
