import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Countdown from "./countdown/Countdown";
import CountdownActions from "./actions/CountdownActions";
import { chronoModelFactory } from "../models/ChronoModelImpl";
import { Chrono } from "../types/enums/chrono-enum";
import useKeyboardChronoInput from "../hooks/useKeyboardChronoInput";
import locationServiceFactory from "../services/LocationServiceImpl";
import { ChronoParams } from "../types/enums/chrono-params-enum";
import { getChronoParamByChronoType } from "../tools";

const locationService = locationServiceFactory();

const App: FC = () => {
  const chronoModel = useMemo(() => chronoModelFactory(
    locationService.parseParam(ChronoParams.HOURS) as number,
    locationService.parseParam(ChronoParams.MINUTES) as number,
    locationService.parseParam(ChronoParams.SECONDS) as number,
  ), []);    

  const [chrono, setChrono] = useState<Chrono>(null);
  const [totalCounter, setTotalCounter] = useState(0); // TODO :: use counter or refactoring views-update
  const [isResetButtonPressed, setResetButtonPressed] = useState(false);

  const updateCounter = useCallback(() => {
    setTotalCounter((prev) => prev + 1);
  }, []);

  const resetCallback = useCallback(() => {
    setResetButtonPressed(true);
  }, []);

  const setCurrentChrono = useCallback(
    (newChrono: Chrono) => {
      setChrono(newChrono !== chrono ? newChrono : null);
    },
    [chrono]
  );

  const setInputCallback = useCallback(
    (chronoValue: number) => {
      chronoModel.setChrono(chrono, chronoValue);
      locationService.pushParam(getChronoParamByChronoType(chrono), chronoValue);
    },
    [chrono, chronoModel]
  );

  useKeyboardChronoInput({ setInputCallback });

  useEffect(() => {
    if (isResetButtonPressed) {
      setResetButtonPressed(false);
    }
  }, [totalCounter, isResetButtonPressed]);

  return (
    <div className="container">
      <Countdown chrono={chrono} setCurrentChrono={setCurrentChrono} />
      <CountdownActions
        updateCounter={updateCounter}
        resetCallback={resetCallback}
      />
    </div>
  );
};

export default App;
