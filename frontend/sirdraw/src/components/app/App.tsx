import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Homescreen from '../homescreen/Homescreen';
import Sweepstakes from '../sweepstakes/Sweepstakes';
import './App.less';

const App: React.FunctionComponent = (): JSX.Element => {
  const history = useHistory();

  return (
    <div>
      <div id="header">
        <div>
          <h1 className="upper-logo">𝕊𝕚𝕣 </h1>
          <h2 className="bottom-logo">𝔻𝕣𝕒𝕨</h2>
        </div>
        <div className="navbar">
          <h4
            onClick={() => {
              history.push('/');
            }}
            className="header-options"
          >
            HOME
          </h4>
          <h4
            onClick={() => {
              history.push('/sweepstakes/-MMCCb2sc_zez9efQY0W');
            }}
            className="header-options"
          >
            SORTEIOS
          </h4>
          <h4 className="header-options">GANHADORES</h4>
          <h4 className="header-options">FALE CONOSCO</h4>
          <h4 className="header-options">TERMOS E CONDIÇÕES DE USO</h4>
        </div>
      </div>
      <div className="route-render">
        <Route exact path="/" component={Homescreen} />
        <Route
          exact
          path="/sweepstakes/:sweepstakeId"
          component={Sweepstakes}
        />
      </div>
    </div>
  );
};

export default App;
