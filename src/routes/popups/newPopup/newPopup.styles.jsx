import Modal from "react-modal";
import styled from 'styled-components'
import { DeleteButton, FileNameInput } from "../uploadPopup/uploadPopup.styles";


export const NewPopupContainer = styled(Modal) `
    position: absolute;
    width: 40%;
    height: 30%;
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
export const FNFieldLabel = styled.p `
    margin: 0;
`
export const FileNameField = styled(FileNameInput)`
    width: 100%;
`
export const InputContainer = styled.div `
    width: 90%;
    margin-top: 2%;
`
export const CancelButton = styled(DeleteButton) `

`