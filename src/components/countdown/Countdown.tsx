import React, { FC, useEffect, useState } from "react";
import { Chrono } from "../../types/enums/chrono-enum";

interface CountdownProps {}

const Countdown: FC<CountdownProps> = (props) => {
  const [isActive, setActive] = useState(false);
  const [chrono, setChrono] = useState<Chrono>(null);

  const getCountdownClassName = () => {
    return "countdown " + (isActive ? "active" : "");
  };

  const getChronoClassName = (chronoElement: Chrono) => {
    return "countdown " + (chrono === chronoElement ? " selected" : "");
  };

  const setCurrentChrono = (newChrono) => {
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
        <span className={getChronoClassName(Chrono.HOURS)} onClick={() => setCurrentChrono(Chrono.HOURS)}>00</span>:
        <span className={getChronoClassName(Chrono.MINUTES)} onClick={() => setCurrentChrono(Chrono.MINUTES)}>00</span>:
        <span className={getChronoClassName(Chrono.SECONDS)} onClick={() => setCurrentChrono(Chrono.SECONDS)}>00</span>
      </div>
    </div>
  );
};

export default Countdown;
