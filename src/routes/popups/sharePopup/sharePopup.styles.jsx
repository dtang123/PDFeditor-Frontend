import styled from 'styled-components';
import Modal from "react-modal";

export const SharePopupContainer = styled(Modal) `
    position: absolute;
    width: 40%;
    height: 35%;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    border: 4px solid gray;
    border-radius: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1%;
`

export const SuccessText = styled.p `
    color: #16a085;
`
export const ErrorText = styled.p `
    color: red;
`