import React, { FC, useCallback, useState } from 'react';
import Countdown from './countdown/Countdown';
import CountdownActions from './actions/CountdownActions';
import { chronoModelFactory } from '../models/ChronoModelImpl';
import { Chrono } from '../types/enums/chrono-enum';
import useKeyboardChronoInput from '../hooks/useKeyboardChronoInput';

const chronoModel = chronoModelFactory();

const App: FC = () => {
  const [chrono, setChrono] = useState<Chrono>(null);
  const [totalCounter, setTotalCounter] = useState(0); // TODO :: use counter or refactoring views-update

  const updateCounter = useCallback(() => {
    setTotalCounter((prev) => prev + 1);
  }, []);

  const setCurrentChrono = useCallback((newChrono: Chrono) => {
    setChrono(
        newChrono !== chrono ? newChrono : null
    );
  }, [chrono]);
  
  const setInputCallback = useCallback((chronoValue: number) => {
    chronoModel.setChrono(chrono, chronoValue);
  }, [chrono]);

  const { reset } = useKeyboardChronoInput({ setInputCallback });

  return (
    <div className="container">
        <Countdown chrono={chrono} setCurrentChrono={setCurrentChrono} />
        <CountdownActions updateCounter={updateCounter} />
    </div>
  );
};

export default App;
