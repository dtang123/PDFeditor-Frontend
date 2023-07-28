import React from "react";
import { CancelButton, FNFieldLabel, FileNameField, InputContainer, NewPopupContainer } from "./newPopup.styles";
import { ModalContainer, ButtonRow, UploadButton } from "../uploadPopup/uploadPopup.styles";
import { useState } from "react";
import { fileUploadBlank } from '../../../backend/fileSend';
import store from '../../../store/reducers';
import { setFiles } from "../../../store/filesSlice";
import { useDispatch } from "react-redux";

const NewPopup = ({isOpen, onClose}) => {
    const [fileName, setFileName] = useState('Untitled Document');
    const dispatch = useDispatch();


    const FieldChange = (event) => {
        setFileName(event.target.value)
    }

    const HandleSumbit = async (event) => {
        event.preventDefault()
        if (!fileName) {
            setFileName("Untitled Document")
        }
        var formData = new FormData()
        formData.append('fileName', fileName)
        formData.append('userId', store.getState().user.userId)
        const response = await fileUploadBlank(formData)
        await dispatch(setFiles(response.files))
        console.log(store.getState().files.fileObjs)
        onClose()
    }

    return (
        <NewPopupContainer isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <ModalContainer>
                <h4>New Blank File</h4>
                <InputContainer>
                    <FNFieldLabel>Enter File Name</FNFieldLabel>
                    <ButtonRow>
                        <FileNameField value={fileName} onChange={FieldChange}></FileNameField>
                    </ButtonRow>
                    <ButtonRow>
                        <CancelButton onClick={onClose}>Cancel</CancelButton>
                        <UploadButton onClick={HandleSumbit}>Submit</UploadButton>                        
                    </ButtonRow>
                </InputContainer>
                    
                
            </ModalContainer>
        </NewPopupContainer>
    )
}

export default NewPopup;