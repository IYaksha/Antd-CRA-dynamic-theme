import React from "react";
import { Button } from "antd";
import "./App.less";

import dark from "antd/dist/dark-theme";
import light from "antd/dist/compact-theme";

const App = () => {
  const onLight = async () => {
    await window.less.modifyVars(light);
  };
  const onDark = async () => {
    await window.less.modifyVars(dark);
  };
  return (
    <div className="App">
      <Button type="primary" onClick={onDark}>
        Dark
      </Button>
      <Button type="danger" onClick={onLight}>
        Light
      </Button>
    </div>
  );
};

export default App;
