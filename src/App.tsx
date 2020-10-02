import React from 'react';
import Select from "./components/Select/styled";
import StyledApp from "./components/StyledApp/styled";

function App() {
    interface IOption {
        id: string;
        value: string;
    }

    const options: IOption[] = [
        {
            id: 'uk',
            value: 'English',
        },
        {
            id: "ua",
            value: "Ukrainian",
        },
        {
            id: 'ru',
            value: 'Russian',
        },
        {
            id: "de",
            value: "German",
        },
        {
            id: "it",
            value: "Italian",
        },
        {
            id: "jv",
            value: "Japanese",
        },
        {
            id: "fr",
            value: "French",
        }
    ];

    const selectedOptions = ['de', 'ru'];

    function filterSelectedOptions(option: IOption) {
        return selectedOptions.includes(option.id);
    }

    return (
        <StyledApp>
            <Select options={options} selected={filterSelectedOptions}/>
        </StyledApp>
    );
}

export default App;
