import styled from 'styled-components'
import { RightContainer } from '../signInNav/navigation.styles'

export const AddFileDropdown = styled.div `
    position: relative;
    display: flex;
    float: right;
    padding-right: 2%;
    align-items: center;
    justify-content: space-between;
`
export const DropdownContainer = styled.div `
    position: absolute;
    right: 0;
    top: 100%;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 10%;
`

export const FileOptions = styled.div `
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-radius: 5%;
    transition: all .2s ease-in-out; 
    &:hover {
        background-color: gray;
    }
`

export const AddFile = styled(RightContainer)`
    text-align: center;
    margin: 20px;
    padding: 0 10%;
    height: 10%;
    outline: 3px solid Black;
    border-radius: 5%;
    transition: all .2s ease-in-out; 
    &:hover {
        transform: scale(1.1); 
    }
`