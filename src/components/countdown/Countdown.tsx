import React, { FC, useEffect, useState } from "react";
import { Chrono } from "../../types/enums/chrono-enum";
import useKeyboardChronoInput from "../../hooks/useKeyboardChronoInput";
import { chronoModelFactory } from "../../models/ChronoModelImpl";

interface CountdownProps {}

const chronoModel = chronoModelFactory();

const Countdown: FC<CountdownProps> = (props) => {
  const [isActive, setActive] = useState(false);
  const [chrono, setChrono] = useState<Chrono>(null);


  const setInputCallback = (chronoValue: number) => {
    chronoModel.setChrono(chrono, chronoValue);
  } 
  const { reset } = useKeyboardChronoInput({ setInputCallback });

  const getCountdownClassName = () => {
    return "countdown " + (isActive ? "active" : "");
  };

  const getChronoClassName = (chronoElement: Chrono) => {
    return "countdown " + (chrono === chronoElement ? " selected" : "");
  };

  const setCurrentChrono = (newChrono: Chrono) => {
    setChrono(
        newChrono !== chrono ? newChrono : null
    );
  }

  useEffect(() => {
    setActive(!!chrono);
  }, [chrono]);

  return (
    <div className={getCountdownClassName()}>
      <div id="countdown-timer">
        <span className={getChronoClassName(Chrono.HOURS)} onClick={() => setCurrentChrono(Chrono.HOURS)}>{chronoModel.hours}</span>:
        <span className={getChronoClassName(Chrono.MINUTES)} onClick={() => setCurrentChrono(Chrono.MINUTES)}>{chronoModel.minutes}</span>:
        <span className={getChronoClassName(Chrono.SECONDS)} onClick={() => setCurrentChrono(Chrono.SECONDS)}>{chronoModel.seconds}</span>
      </div>
    </div>
  );
};

export default Countdown;
