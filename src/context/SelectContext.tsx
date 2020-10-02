import React from 'react';
import {ISelectContext} from "../components/interfaces/Select";

const SelectContext = React.createContext<ISelectContext>({
    state: {
        suggestedOptions: [],
        selectedOptions: [],
        options: [],
        inputValue: '',
        isSuggestionListOpened: false,
        focusedOption: null,
    },
    handleFocusInput: () => {},
    handleInputBlur: () => {},
    handleKeyDown: () => {},
    handleSelectOption: option => {},
    handleUnselect: option => {},
    onInputChange: e => {},
});

export default SelectContext;
