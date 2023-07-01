import React, {useState, useRef} from 'react';
import { ButtonRow, CheckboxLabel, CloseButton, FormInput, FormText, ModalContainer, PopupContainer, StyledCheckbox, CheckboxLabelAfter, UploadButton, UploadForm, FileName, DeleteButton, FileNameContainer } from './popup.styles';
import { fileUpload } from '../../backend/fileSend';


const Popup = ({ isOpen, onClose }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [fileInputted, setFileInputted] = useState(false);
    const [fileName, setFileName] = useState('')
    const fileInputRef = useRef(null);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const uploadedFileName = files[0].name;
            setFileName(uploadedFileName)
            setFileInputted(true)
        }
    }

    const handleFileDelete = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
        setFileName('')
        setFileInputted(false)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        var formData = new FormData()
        console.log(fileInputRef.current.files[0].name)
        const file = fileInputRef.current.files[0]
        formData.append('file', file)
        formData.append('extractText', isChecked)
        console.log(localStorage)
        formData.append('userId', localStorage.getItem('uid'))
        console.log(isChecked)
        const response = await fileUpload(formData)
        handleFileDelete()
        setIsChecked(false)
        onClose()
    }

    return (
        <PopupContainer isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <ModalContainer>
                <h3>File Upload</h3>
                <UploadForm>
                    <FormInput type="file" onChange={handleFileUpload} ref={fileInputRef}/>  
                    <FormText type="file">Drag your files here or click in this area.</FormText>
                    {fileInputted && (
                        <>
                            <FileNameContainer>
                                <FileName>{fileName}</FileName>
                            </FileNameContainer>
                            
                        </>
                    )}
                    <ButtonRow>
                        <p>Extract Text</p>
                        <StyledCheckbox
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            id="myCheckbox"
                        />
                        <CheckboxLabel htmlFor="myCheckbox">
                            Checkbox Label
                            <CheckboxLabelAfter />
                        </CheckboxLabel>
                    </ButtonRow>
                    <ButtonRow>
                        <CloseButton onClick={onClose}>Close</CloseButton>
                        {
                            fileInputted &&
                            (
                                <>
                                    <DeleteButton onClick={handleFileDelete}>Remove</DeleteButton>
                                    <UploadButton onClick={handleFormSubmit}>Upload</UploadButton>
                                </>
                            )
                        }
                    </ButtonRow>
                </UploadForm>
                
            </ModalContainer>
        </PopupContainer>
    )
}

export default Popup;