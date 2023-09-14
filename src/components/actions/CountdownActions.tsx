import React, { FC } from "react";

interface ComponentProps {}

const Component: FC<ComponentProps> = (props) => {
    return (
        <div className="buttons">
            <button id="start-button" className="icon-button start-button">&#9654;</button>
            <button id="pause-button" className="icon-button pause-button">&#9612;&#9612;</button>
            <button id="reset-button" className="icon-button reset-button">&#8634;</button>
        </div>
    );
}

export default Component;