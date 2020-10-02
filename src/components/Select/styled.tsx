import styled from 'styled-components';
import Select from "./Select";

const StyledSelect = styled(Select)`{
    position: absolute;
    top: 50%;
    transform: translateY(-3rem);
    width: 50%;
    
    @media (max-width: 375px) {
        width: 90%;
    }
}`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    border: 1px solid #000;
    padding: 7px;
`;

export default StyledSelect;
