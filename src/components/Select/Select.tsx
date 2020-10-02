import React, {useReducer} from 'react';

import {ISelectContext, IOption, IState} from "../interfaces/Select";
import {KEY_ARROW_DOWN, KEY_ARROW_UP, KEY_ENTER, KEY_ESCAPE} from "../../constants/keyboard";
import Input from "../Input/styled";
import SelectedOptionsList from "../SelectedOptionsList/styled";
import SuggestionList from "../SuggestionList/styled";
import SelectContext from "../../context/SelectContext";
import {Field} from "./styled";

interface IProps {
	className?: string;
	options: IOption[];
	selected: (option: IOption) => boolean;
}

type Action =
	| { type: 'INPUT_VALUE_SETTED', payload: string }
	| { type: 'SUGGESTION_OPTION_SELECTED', payload: IOption }
	| { type: 'SUGGESTION_LIST_OPENED' }
	| { type: 'SUGGESTION_LIST_CLOSED' }
	| { type: 'SELECTED_OPTION_DELETED', payload: IOption }
	| { type: 'SET_PREV_SUGGESTION_OPTION' }
	| { type: 'SET_NEXT_SUGGESTION_OPTION' }
	| { type: 'SUGGESTION_LIST_FILTERED', payload: string };

function reducer(state: IState, action: Action): IState {
	switch (action.type) {
		case 'INPUT_VALUE_SETTED': {
			return {
				...state,
				inputValue: action.payload,
			};
		}
		case 'SUGGESTION_OPTION_SELECTED': {
			return {
				...state,
				inputValue: '',
				selectedOptions: [...state.selectedOptions, action.payload],
				suggestedOptions: state.suggestedOptions.filter(option => option !== action.payload),
			};
		}
		case 'SUGGESTION_LIST_OPENED': {
			return {
				...state,
				isSuggestionListOpened: !!state.suggestedOptions.length
			};
		}
		case 'SUGGESTION_LIST_CLOSED': {
			return {
				...state,
				isSuggestionListOpened: false,
				focusedOption: state.suggestedOptions[0],
			};
		}
		case 'SUGGESTION_LIST_FILTERED': {
			let preparedInput = action.payload.toLowerCase().trim();
			let suggestedOptions = state.options.filter(option => !state.selectedOptions.includes(option));
			suggestedOptions = action.payload.length ? suggestedOptions.filter(option => {
				return option.value.toLowerCase().includes(preparedInput)
			}) : suggestedOptions;

			return {
				...state,
				focusedOption: suggestedOptions.length ? suggestedOptions[0] : null,
				suggestedOptions,
			}
		}
		case 'SELECTED_OPTION_DELETED': {
			return {
				...state,
				inputValue: '',
				selectedOptions: state.selectedOptions.filter(option => option !== action.payload),
				suggestedOptions: [...state.suggestedOptions, action.payload],
				isSuggestionListOpened: false,
			};
		}
		case 'SET_PREV_SUGGESTION_OPTION': {
			const newState: IState = {
				...state,
			};

			if (state.focusedOption) {
				const suggestionOptionIndex = state.suggestedOptions.findIndex(option => option === state.focusedOption);
				newState.focusedOption = state.suggestedOptions[Math.max(suggestionOptionIndex - 1, 0)];
			} else {
				state.focusedOption = state.suggestedOptions[0];
			}

			return newState;
		}
		case 'SET_NEXT_SUGGESTION_OPTION': {
			const newState: IState = {
				...state,
			};

			if (state.focusedOption) {
				const suggestionOptionIndex = state.suggestedOptions.findIndex(option => option === state.focusedOption);
				newState.focusedOption = state.suggestedOptions[Math.min(suggestionOptionIndex + 1, state.suggestedOptions.length - 1)];
			} else {
				state.focusedOption = state.suggestedOptions[0];
			}

			return newState;
		}
		default: {
			return state;
		}
	}
}

function init(state: IState): IState {
	const {options, selectedOptions} = state;
	const suggestedOptions = options.filter(option => !selectedOptions.includes(option));

	return {
		...state,
		suggestedOptions,
		focusedOption: suggestedOptions[0],
	};
}

const Select: React.FC<IProps> = function ({className, options, selected}) {
	const suggestionListRef = React.createRef<HTMLUListElement>();
	const [state, dispatch] = useReducer(reducer, {
		options,
		selectedOptions: options.filter(selected),
		suggestedOptions: [],
		focusedOption: null,
		inputValue: '',
		isSuggestionListOpened: false,
	}, init);

	const onInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		dispatch({type: "SUGGESTION_LIST_OPENED"});
		dispatch({type: "INPUT_VALUE_SETTED", payload: value});
		dispatch({type: "SUGGESTION_LIST_FILTERED", payload: value});
	};

	const handleInputBlur = () => {
		dispatch({type: "SUGGESTION_LIST_CLOSED"});
	};

	const handleSelectOption = (option: IOption) => {
		dispatch({type: "SUGGESTION_OPTION_SELECTED", payload: option});
		dispatch({type: "SUGGESTION_LIST_CLOSED"});
	};

	const handleUnselect = (option: IOption) => {
		dispatch({type: "SELECTED_OPTION_DELETED", payload: option});
		dispatch({type: "SUGGESTION_LIST_CLOSED"});
	};

	const handleFocusInput = () => {
		dispatch({type: "SUGGESTION_LIST_OPENED"});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case KEY_ENTER: {
				if (state.isSuggestionListOpened && state.focusedOption) {
					dispatch({type: "SUGGESTION_OPTION_SELECTED", payload: state.focusedOption});
					dispatch({type: "SUGGESTION_LIST_CLOSED"});
				}
				break;
			}
			case KEY_ARROW_UP: {
				dispatch({type: "SET_PREV_SUGGESTION_OPTION"});
				break;
			}
			case KEY_ARROW_DOWN: {
				if (!state.isSuggestionListOpened) {
					dispatch({type: "SUGGESTION_LIST_OPENED"});
				} else {
					dispatch({type: "SET_NEXT_SUGGESTION_OPTION"});
				}

				break;
			}
			case KEY_ESCAPE: {
				if (state.isSuggestionListOpened) {
					dispatch({type: "SUGGESTION_LIST_CLOSED"});
				}

				break;
			}
		}
	};

	const context: ISelectContext = {
		state,
		onInputChange,
		handleInputBlur,
		handleSelectOption,
		handleUnselect,
		handleFocusInput,
		handleKeyDown,
	};

	return (<div className={className}>
		<SelectContext.Provider value={context}>
			<Field onBlur={handleInputBlur}>
				{state.selectedOptions.length > 0 && <SelectedOptionsList/>}
				<Input/>
			</Field>
			{state.isSuggestionListOpened && <SuggestionList ref={suggestionListRef}/>}
		</SelectContext.Provider>
	</div>);
};

export default Select;
