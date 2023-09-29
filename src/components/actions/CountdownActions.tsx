import React, { FC, useState } from "react";
import { chronoTimerServiceFactory } from "../../services/ChronoTimerServiceImpl";
import { chronoModelFactory } from "../../models/ChronoModelImpl";
import locationServiceFactory from "../../services/LocationServiceImpl";
import { ChronoParams } from "../../types/enums/chrono-params-enum";
import { booleanToString } from "../../tools";

interface ComponentProps {
    updateCounter: () => void;
    resetCallback: () => void;
    restartAfterTimeUp: boolean;
}

const chronoTimerService = chronoTimerServiceFactory();
const locationService = locationServiceFactory();
const chronoModel = chronoModelFactory();

const Component: FC<ComponentProps> = (props) => {
    const [restartAfterTimeUp, setRestartAfterTimeUp] = useState(props.restartAfterTimeUp);

    const resetHandler = () => {
        chronoTimerService.resetTimer(chronoModel);
        props.resetCallback();
    }

    const restartHandler = () => {
        const newValue = !restartAfterTimeUp;
        locationService.pushParam(ChronoParams.LOOP, booleanToString(newValue));
        setRestartAfterTimeUp(newValue);
    }

    return (
        <div className="buttons">
            <button
                className="icon-button start-button"
                onClick={() => chronoTimerService.startTimer(chronoModel, props.updateCounter, restartAfterTimeUp)}
            >&#9654;</button>
            <button 
                className="icon-button pause-button"
                onClick={() => chronoTimerService.stopTimer()}
            >&#9612;&#9612;</button>
            <button 
                className="icon-button reset-button"
                onClick={resetHandler}
            >&#8634;</button>
            <input
                type="radio"
                className="icon-button input-radio"
                checked={restartAfterTimeUp}
                onClick={restartHandler}
            />
        </div>
    );
}

export default Component;