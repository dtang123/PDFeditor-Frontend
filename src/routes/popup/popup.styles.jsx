import styled from 'styled-components'
import Modal from 'react-modal';

export const PopupContainer = styled(Modal) `
    position: absolute;
    width: 50%;
    height: 57%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid gray;
    border-radius: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ModalContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5;
    width: 90%;
    height: 90%;
`

export const UploadForm = styled.form `
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -250px;
  height: 200px;
  width: 90%;
  max-width: 500px;
  border: 4px dashed black;
  text-align: center;
`

export const FormText = styled.p `
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 60%;
    color: black;
    font-family: Arial;
    margin-top: -22%;
    position: fixed;
    right: 0%;
    top: 84%;
    z-index: -1;
`

export const FileNameContainer = styled.div `
    text-align: center;
    margin-top: -16%;
    position: absolute;
    padding-left: 10%;
    width: 90%;
    top: 101%;
    z-index: -1;
`
export const FileName = styled.p `
justify-content: center;
display: flex;
align-items: center;
`


export const FormInput = styled.input `
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    flex: 1;
`

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  padding-bottom: 10px;
  text-align: center;
`

export const UploadButton = styled.button `
    margin: 0;
    color: #fff;
    background: #16a085;
    border: none;
    width: 20%;
    height: 10%;
    border-radius: 4px;
    border-bottom: 4px solid #117A60;
    transition: all .2s ease;
    outline: none;
    &:hover {
        background: #149174;
          color: #0C5645;
    }
`
export const DeleteButton = styled(UploadButton) `
    background: red;
    &:hover {
        background: #6f0000;
        color: #0C5645;
    }
`

export const CloseButton = styled(UploadButton)`
    background: gray;
    &:hover {
        background: #149174;
        color: #0C5645;
    }
`

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const CheckboxLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 10%;
  height: 11%;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
`;

export const CheckboxLabelAfter = styled.span`
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
`;

export const StyledCheckbox = styled(CheckboxInput)`
  &:checked + ${CheckboxLabel} {
    background: #bada55;
  }

  &:checked + ${CheckboxLabel} ${CheckboxLabelAfter} {
    left: calc(100% - 3px);
    transform: translateX(-100%);
  }

  &:checked + ${CheckboxLabel} ${CheckboxLabelAfter}:after {
    left: 5px;
    transform: translateX(0%);
  }

  ${CheckboxLabel}:active ${CheckboxLabelAfter} {
    width: 130px;
  }
`;
