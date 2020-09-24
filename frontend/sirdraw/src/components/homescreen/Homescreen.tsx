import { Button } from "antd";
import * as React from "react";

const Homescreen: React.FunctionComponent = (): JSX.Element => {
  return (
    <div
      style={{
        maxHeight: "20rem",
        maxWidth: "20rem",
        marginLeft: "30rem",
        marginTop: "10rem",
        border: "4px",
        borderStyle: "solid",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <Button style={{ marginLeft: "7rem", marginTop: "2rem " }} type="primary">
        Comprar
      </Button>
    </div>
  );
};

export default Homescreen;
