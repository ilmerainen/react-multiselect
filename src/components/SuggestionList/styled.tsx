import styled from 'styled-components';
import SuggestionList from "./SuggestionList";

const StyledSuggestionList = styled(SuggestionList)`{
    max-height: 9rem;
    overflow-y: auto;
    box-shadow: 0px 2px 3px rgb(0 0 0 / 20%);
    
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
    }
    
    & li {
        padding: 11px;
        cursor: pointer;
        border: 1px solid #4848487a;
        border-bottom: none;
        
        &:hover {
            background: #cccccc69;
        }
    }
}`;

export default StyledSuggestionList;
