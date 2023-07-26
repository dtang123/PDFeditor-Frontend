import styled from 'styled-components'
import { Page, RightContainer } from '../signInNav/navigation.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

export const SearchIcon = styled.button `
    background-color: transparent;
    font-size: 18px;
    padding: 6px 9px;
    margin-left:-45px;
    border:none;
    color: #6c6c6c;
    transition: all .4s;
    z-index: 10;
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        color: black;
    }
    &:focus {
        outline:none;
        color:black;
    }
`

export const InputBar = styled.input `
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding: 12px 45px 12px 15px;
    background-color: #eaeaeb;
    color: #6c6c6c;
    border-radius: 6px;
    border:none;
    transition: all .4s;
    &:focus {
        border:none;
        outline:none;
        box-shadow: 0 1px 12px #b8c6db;
        -moz-box-shadow: 0 1px 12px #b8c6db;
        -webkit-box-shadow: 0 1px 12px #b8c6db;
    }
`


export const SearchContainer = styled.div `
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
`

export const MyDrivePage = styled(Page) `
    overflow: hidden;
`