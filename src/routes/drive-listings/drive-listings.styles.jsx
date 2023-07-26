import styled from 'styled-components'

export const DrivePage = styled.div `
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    height: 100vh;
`

export const SideBar = styled.div `
    width: 100%;
    padding: 1rem;
    border-radius: 1%;
    overflow-y: hidden;
    @media (min-width: 768px) {
        width: calc(100% / 4);
    }
`

export const FileListingContainer = styled.div `
    flex: 1;
    padding: 1rem;
    background-color: #F5F5F5;
    border-radius: 1%;
`

export const ListingColumn = styled.div `
flex: 1;
    overflow-y: scroll;
    maxHeight: calc(100vh - 200px);
`

export const FileListing = styled.div `
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 2% 0;
    border-top: 2px groove;
    border-bottom: 2px groove;
`

export const HeaderRow = styled.div `
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 1% 0;
`

export const NameContainer = styled.div `
    width: 60%;
`

export const OwnerContainer = styled.div `
    width: 20%
`

export const EditContainer = styled.div `
    width: 20%
`
export const DriveText = styled.h6 `
    margin: 0;
    transition: all 0.2s ease;
    ${FileListing}:hover & {
        font-size: 20px; /* Increase the font size on hover */
    }
    
`

export const Tabs = styled.button `
    display: block;
    background-color: inherit;
    color: black;
    padding: 22px 16px;
    width: 90%;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    transition: 0.3s;
    font-size: 17px;
    margin: 5%;
    border-radius: 4px;
    &:hover {
        background-color: #bee9f7;
    }
    &.active {
        background-color: #92b7c2;
    }
`