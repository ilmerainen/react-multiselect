import React, {useContext} from 'react';
import {IOption} from "../interfaces/Select";
import SelectContext from "../../context/SelectContext";

interface IProps {
    className?: string;
}

const SelectedOptionsList: React.FC<IProps> = ({className}) => {
    const {
        state: {
            selectedOptions: options,
        },
        handleUnselect,
    } = useContext(SelectContext);
    const handleMouseDown = (option: IOption) => (e: React.SyntheticEvent) => {
        handleUnselect(option);
    };

    return (<div className={className}>
        <ul>
            {options.map(option => {
                return <li key={option.id} onMouseDown={handleMouseDown(option)}>{option.value}</li>
            })}
        </ul>
    </div>);
};

export default SelectedOptionsList;
