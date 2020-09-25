import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Homescreen from '../homescreen/Homescreen';
import Sweepstakes from '../sweepstakes/Sweepstakes';
import './App.less';

const App: React.FunctionComponent = (): JSX.Element => {
  const history = useHistory();

  return (
    <div>
      <div
        id="header"
        style={{
          height: '7rem',
          backgroundColor: '#17152d',
          display: 'flex',
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
      >
        <div>
          <h1
            style={{
              color: 'white  ',
              marginLeft: '7rem',
              fontSize: '42px',
              marginBottom: 0,
              textShadow: '2px 2px 4px #000000',
              height: '3.5rem',
            }}
          >
            𝕊𝕚𝕣{' '}
          </h1>
          <h2
            style={{
              color: 'white',
              marginLeft: '7rem',
              fontSize: '30px',
              marginTop: 0,
              textShadow: '2px 2px 4px #000000',
            }}
          >
            𝔻𝕣𝕒𝕨
          </h2>
        </div>
        <div
          id="navbar"
          style={{
            display: 'flex',
            marginLeft: '30vw',
            marginTop: '4rem',
          }}
        >
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
              history.push('/sweepstakes');
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
      <div>
        <Route exact path="/" component={Homescreen} />
        <Route exact path="/sweepstakes" component={Sweepstakes} />
      </div>
    </div>
  );
};

export default App;
