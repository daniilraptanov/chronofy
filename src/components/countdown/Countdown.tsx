import React, { FC, useEffect, useState } from "react";
import { Chrono } from "../../types/enums/chrono-enum";
import { chronoModelFactory } from "../../models/ChronoModelImpl";

interface CountdownProps {
  chrono: Chrono;
  setCurrentChrono: (value: Chrono) => void;
}

const chronoModel = chronoModelFactory();

const Countdown: FC<CountdownProps> = (props) => {
  const [isActive, setActive] = useState(false);

  const getCountdownClassName = () => {
    return "countdown " + (isActive ? "active" : "");
  };

  const getChronoClassName = (chronoElement: Chrono) => {
    return "countdown " + (props.chrono === chronoElement ? " selected" : "");
  };

  useEffect(() => {
    setActive(!!props.chrono);
  }, [props.chrono]);

  return (
    <div className={getCountdownClassName()}>
      <div id="countdown-timer">
        <span className={getChronoClassName(Chrono.HOURS)} onClick={() => props.setCurrentChrono(Chrono.HOURS)}>{chronoModel.hoursView}</span>:
        <span className={getChronoClassName(Chrono.MINUTES)} onClick={() => props.setCurrentChrono(Chrono.MINUTES)}>{chronoModel.minutesView}</span>:
        <span className={getChronoClassName(Chrono.SECONDS)} onClick={() => props.setCurrentChrono(Chrono.SECONDS)}>{chronoModel.secondsView}</span>
      </div>
    </div>
  );
};

export default Countdown;
