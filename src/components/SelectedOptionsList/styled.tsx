import styled from 'styled-components';
import SelectedOptionsList from "./SelectedOptionsList";

const StyledSelectedOptionsList = styled(SelectedOptionsList)`{ 
    display: flex;
    align-items: center;
    width: 100%;
    
    ul {
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        margin-bottom: 5px;
        list-style: none;
        display: flex;
    }
    
    & li {
        color: #4848489e;
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 4px;
        background: #cccccc69;
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid transparent;
        
        &:hover {
            border: 1px solid #d0d0d0;
        }
    }
}`;

export default StyledSelectedOptionsList;
