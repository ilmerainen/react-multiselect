import React from "react";

export interface IOption {
    id: string;
    value: string;
}

export interface IState {
    options: IOption[],
    selectedOptions: IOption[];
    suggestedOptions: IOption[];
    inputValue: string;
    isSuggestionListOpened: boolean;
    focusedOption: IOption | null;
}

export interface ISelectContext {
    state: IState;
    onInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    handleInputBlur: () => void;
    handleSelectOption: (option: IOption) => void;
    handleUnselect: (option: IOption) => void;
    handleFocusInput:  () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
