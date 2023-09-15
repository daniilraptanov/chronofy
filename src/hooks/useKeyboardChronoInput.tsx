import { useState, useEffect } from 'react';

interface IUseKeyboardChronoInputProps {
    setInputCallback: (chronoValue: number) => void;
}

interface IUseKeyboardChronoInputReturnObj {
    reset: () => void;
}

const DIGITS_IN_ROW = 2;
const isDigit = (val) => /^\d$/.test(val);

function useKeyboardChronoInput(props: IUseKeyboardChronoInputProps): IUseKeyboardChronoInputReturnObj {
  const [inputValue, setInputValue] = useState("");
  const [resetInput, setResetInput] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isDigit(e.key)) {
        const currentDigit = e.key;
        const newInputValue = inputValue + currentDigit;

        if (newInputValue.length > DIGITS_IN_ROW) {
            props.setInputCallback(parseInt(currentDigit));
            setInputValue(currentDigit);
        } else {
            props.setInputCallback(parseInt(newInputValue));
            setInputValue(newInputValue);
        }
        
        resetInput && setResetInput(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props, inputValue, resetInput]);

  useEffect(() => {
    setInputValue("");
  }, [resetInput]);

  const reset = () => {
    setResetInput(true);
  }

  return { reset };
}

export default useKeyboardChronoInput;
