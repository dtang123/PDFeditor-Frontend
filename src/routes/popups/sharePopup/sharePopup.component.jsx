import React, { useEffect, useState } from "react";
import { ErrorText, SharePopupContainer, SuccessText } from "./sharePopup.styles";
import { ModalContainer, ButtonRow, UploadButton } from "../uploadPopup/uploadPopup.styles";
import { CancelButton, FNFieldLabel, FileNameField, InputContainer } from "../newPopup/newPopup.styles";
import { shareFile } from "../../../backend/share";

const SharePopup = ({isOpen, onClose, fileInfo}) => {
    const fileName = fileInfo ? fileInfo.fileName : "";
    const [input, setInput] = useState('')
    const [isEmail, setIsEmail] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('')

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    const inputChange = (event) => {
        event.preventDefault()
        setInput(event.target.value)
        setIsEmail(validateEmail(input))
    }

    const submitShare = async () => {
        const response = await shareFile(fileInfo, input)
        console.log(response)
        if (response.status === 200) {
            setIsSuccess(true)
            setMessage('')
            setInput('')
        } else {
            setIsSuccess(false)
            const error = response.response.data || "An error occurred";
            setMessage(error)
        }
    }

    useEffect(() => {
        setInput('')
        setIsSuccess(false)
        setMessage('')
        setIsEmail(false)
    }, [onClose])

    return (
        <SharePopupContainer isOpen={isOpen}  onRequestClose={onClose} ariaHideApp={false}>
            <ModalContainer>
                <h4>Share File</h4>
                <p>{fileName}</p>
                <InputContainer>
                    <FNFieldLabel>Enter Email</FNFieldLabel>
                    <ButtonRow>
                        <FileNameField onChange={inputChange}></FileNameField>
                    </ButtonRow>
                    {
                        isSuccess &&
                        <SuccessText>Successfully Shared</SuccessText>
                    }
                    {
                        (!isSuccess && message !== '') &&
                        <ErrorText>{message}</ErrorText>
                    }   
                    <ButtonRow>
                        <CancelButton onClick={onClose}>Cancel</CancelButton>
                        {
                            isEmail &&
                            <UploadButton onClick={submitShare}>Submit</UploadButton>  
                        }    
                    </ButtonRow>
                </InputContainer>
            </ModalContainer>
        </SharePopupContainer>
    )
}

export default SharePopup;