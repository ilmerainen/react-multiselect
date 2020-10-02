import styled from 'styled-components';
import Input from "./Input";

const StyledInput = styled(Input)`{    
    width: 100%;
    height: 2rem;
    
    &, &:focus {
        border: none;
        outline: none;
    }
}`;

export default StyledInput;
