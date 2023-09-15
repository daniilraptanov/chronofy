import React, { FC } from "react";
import { chronoTimerServiceFactory } from "../../services/ChronoTimerServiceImpl";
import { chronoModelFactory } from "../../models/ChronoModelImpl";

interface ComponentProps {
    updateCounter: () => void;
    resetCallback: () => void;
}

const chronoTimerService = chronoTimerServiceFactory();
const chronoModel = chronoModelFactory();

const Component: FC<ComponentProps> = (props) => {
    const resetHandler = () => {
        chronoTimerService.resetTimer(chronoModel);
        props.resetCallback();
    }

    return (
        <div className="buttons">
            <button
                className="icon-button start-button"
                onClick={() => chronoTimerService.startTimer(chronoModel, props.updateCounter)}
            >&#9654;</button>
            <button 
                className="icon-button pause-button"
                onClick={() => chronoTimerService.stopTimer()}
            >&#9612;&#9612;</button>
            <button 
                className="icon-button reset-button"
                onClick={resetHandler}
            >&#8634;</button>
        </div>
    );
}

export default Component;