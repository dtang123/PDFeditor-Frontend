import { Outlet, useNavigate } from 'react-router-dom'
import { Page, NavigationContainer, AppName, LeftContainer } from '../signInNav/navigation.styles'
import { AddFile, AddFileDropdown, DropdownContainer, FileOptions, InputBar, SearchContainer, SearchIcon } from './driveNav.styles'
import { useState } from 'react'
import Popup from '../../popups/uploadPopup/uploadPopup.component'
import "bootstrap/dist/css/bootstrap.min.css"

import NewPopup from '../../popups/newPopup/newPopup.component'
import { LogOut } from '../../../firebase/firebase'



const DriveNavigation = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false)
    const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
    const [newPopupOpen, setNewPopupOpen] = useState(false);
    const [search, setSearch] = useState('')

    const handleSearch = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
        // Add filtering out here
    }

    const changeDropdown = () => {
        setDropdown(!dropdown)
    }

    const openNewPopup = () => {
        setNewPopupOpen(true)
        setUploadPopupOpen(false)
    }

    const openUploadPopup = () => {
        setUploadPopupOpen(true);
        setNewPopupOpen(false)
    };
    
    const closePopup = () => {
        setUploadPopupOpen(false);
        setNewPopupOpen(false)
    };

    const homeButton = () => {
        navigate('/my-drive')
    }

    const logOut = () => {
        localStorage.removeItem("uid")
        LogOut()
        navigate('/')
    }

    return (
        <Page>
            <NavigationContainer>
                <LeftContainer>
                    <AppName onClick={homeButton}>PDF Master</AppName>
                </LeftContainer>
                <SearchContainer>
                    <InputBar type="text" placeholder="File Lookup" onChange={handleSearch}/>
                    <SearchIcon>
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
                            <FileOptions onClick={openNewPopup}>
                                Blank File
                            </FileOptions>
                            <FileOptions onClick={openUploadPopup}>
                                From Computer
                            </FileOptions>
                        </DropdownContainer>
                    }
                </AddFileDropdown> 
            </NavigationContainer>
            <Popup isOpen={uploadPopupOpen} onClose={closePopup}/>
            <NewPopup isOpen={newPopupOpen} onClose={closePopup}></NewPopup>
            <Outlet></Outlet>
        </Page>
    )
}

export default DriveNavigation