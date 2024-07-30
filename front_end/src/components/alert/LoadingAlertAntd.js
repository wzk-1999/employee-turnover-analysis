import React from "react";
import { Alert } from "antd";
import "../../../node_modules/antd/dist/antd";

const LoadingAlertAntd = () => {
  return (
    <Alert
      message={
        <>
          <h1>Loading data...</h1>
          <h2> Why let you wait so long? </h2>
          Because I don't have <b style={{ color: "red" }}>Job</b> now
          <br />
          so I can only use this free but&nbsp;
          <b style={{ color: "blue" }}>
            Low-configuration and Limited Web and Database Servers
          </b>
          &nbsp;on a cloud platform to&nbsp;
          <strong style={{ color: "red", fontSize: "1.5em" }}>Deploy</strong>,
          <br />
          so the best solution is:&nbsp;
          <strong style={{ color: "red", fontSize: "2em" }}>Hire Me🤪😂</strong>
        </>
      }
      type="info"
      showIcon
      style={{ width: "100%", marginBottom: "20px" }}
    />
  );
};

export default LoadingAlertAntd;
