import React, { FC } from 'react';
import Countdown from './countdown/Countdown';
import CountdownActions from './actions/CountdownActions';

const App: FC = () => {
  return (
    <div className="container">
        <Countdown />
        <CountdownActions />
    </div>
  );
};

export default App;
