import React, {useCallback, useContext, useEffect} from 'react';
import {IOption} from "../interfaces/Select";
import SelectContext from "../../context/SelectContext";

interface IProps {
    className?: string;
}

const SuggestionList = React.forwardRef<HTMLUListElement, IProps>(({className}, ref) => {
    const {
        state: {
            suggestedOptions: options,
            focusedOption,
        },
        handleSelectOption,
    } = useContext(SelectContext);
    const suggestionListRef = React.createRef<HTMLUListElement>();
    const wrapperRef = React.createRef<HTMLDivElement>();
    const onOptionClick = (option: IOption) => (e: React.SyntheticEvent<HTMLLIElement>) => {
        handleSelectOption(option);
    };
    const getYCoord = useCallback((element: HTMLElement) => {
        return (element.offsetHeight / options.length) *
            options.findIndex(option => option === focusedOption);
    }, [options, focusedOption]);

    useEffect(function scrollSuggestionList() {
        if (!suggestionListRef.current) {
            return;
        }

        const scrollYCoord = getYCoord(suggestionListRef.current);
        wrapperRef.current!.scroll(0, scrollYCoord);

    }, [focusedOption]);

    const elementList = (
        <div ref={wrapperRef} className={className}>
            <ul ref={suggestionListRef}>
                {options.map((option, i) => {
                    const {id, value} = option;
                    const computedStyles = {
                        background: '',
                    };

                    if (option === focusedOption) {
                        computedStyles.background = '#cccccc69';
                    }

                    return <li style={computedStyles} key={id}
                               onMouseDown={onOptionClick(option)}>{value}</li>;
                })}</ul>
        </div>);

    return elementList;
});

export default SuggestionList;
