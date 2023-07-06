import { Outlet, useNavigate } from 'react-router-dom'
import { Page, NavigationContainer, AppName, LeftContainer } from '../signInNav/navigation.styles'
import { AddFile, AddFileDropdown, DropdownContainer, FileOptions, SearchContainer, SearchIcon, SearchTerms } from './driveNav.styles'
import { useState } from 'react'
import Popup from '../../popup/popup.component'
import "bootstrap/dist/css/bootstrap.min.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



const DriveNavigation = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false);
    const [search, setSearch] = useState('')

    const handleSearch = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
        // Add filtering out here
    }

    const changeDropdown = () => {
        setDropdown(!dropdown)
    }

    const openPopup = () => {
        setPopupOpen(true);
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    const homeButton = () => {
        navigate('/my-drive')
    }

    const logOut = () => {
        localStorage.removeItem("uid")
        navigate('/')
    }

    return (
        <Page>
            <NavigationContainer>
                <LeftContainer>
                    <AppName onClick={homeButton}>PDF Master</AppName>
                </LeftContainer>
                <SearchContainer>
                    <SearchTerms type="text" placeholder="File Lookup" onChange={handleSearch}/>
                    <SearchIcon>
                        <FontAwesomeIcon icon={faSearch} size="xl" />
                    </SearchIcon>
                </SearchContainer>
                <AddFileDropdown>
                    <div onClick={logOut}>
                        Logout
                    </div>
                    <AddFile onClick={changeDropdown}>
                        <h1>+</h1>
                    </AddFile>
                    {
                        dropdown &&
                        <DropdownContainer>
                            <FileOptions>
                                Blank File
                            </FileOptions>
                            <FileOptions onClick={openPopup}>
                                From Computer
                            </FileOptions>
                        </DropdownContainer>
                    }
                </AddFileDropdown> 
            </NavigationContainer>
            <Popup isOpen={popupOpen} onClose={closePopup}/>
            <Outlet></Outlet>
        </Page>
    )
}

export default DriveNavigation