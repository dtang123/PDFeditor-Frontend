import Modal from "react-modal";
import styled from "styled-components";
import { CancelButton } from "../newPopup/newPopup.styles";
import { UploadButton } from "../uploadPopup/uploadPopup.styles";

export const DeletePopupContainer = styled(Modal) `
    position: absolute;
    width: 35%;
    height: 25%;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    border: 4px solid gray;
    border-radius: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1%;
`

export const DeleteCancelButton = styled(CancelButton)`
    height: auto;
`
export const DeleteSumbitButton = styled(UploadButton)`
    height: auto;
` 