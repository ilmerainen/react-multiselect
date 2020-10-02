import React, {useContext, useEffect} from 'react';
import SelectContext from "../../context/SelectContext";

interface IProps {
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, IProps>(({className}, ref) => {
    const {
        state: {
            inputValue,
            selectedOptions,
        },
        onInputChange,
        handleFocusInput,
        handleKeyDown,
    } = useContext(SelectContext);
    const inputRef = React.createRef<HTMLInputElement>();


    useEffect(function focusInput() {
        inputRef.current!.focus();
    }, [selectedOptions]);

    return (
        <input ref={inputRef} autoFocus type="text" className={className} value={inputValue}
               onChange={onInputChange}
               onFocus={handleFocusInput}
               onClick={handleFocusInput}
               onKeyDown={handleKeyDown}/>
    );
});

export default Input;
