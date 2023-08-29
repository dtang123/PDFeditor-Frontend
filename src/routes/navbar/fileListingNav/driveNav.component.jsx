import { Outlet, useNavigate } from 'react-router-dom'
import { NavigationContainer, AppName, LeftContainer } from '../signInNav/navigation.styles'
import { AddFile, AddFileDropdown, ClearButtonContainer, DropdownContainer, FileOptions, InputBar, MyDrivePage, SearchContainer, SearchIcon } from './driveNav.styles'
import { useState } from 'react'
import Popup from '../../popups/uploadPopup/uploadPopup.component'
import "bootstrap/dist/css/bootstrap.min.css"

import NewPopup from '../../popups/newPopup/newPopup.component'
import { LogOut } from '../../../firebase/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import DriveListings from '../../drive-listings/drive-listings.component'


const DriveNavigation = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false)
    const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
    const [newPopupOpen, setNewPopupOpen] = useState(false);
    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState(false)

    const handleSearch = (event) => {
        setSearch(event.target.value)
        if (search == "") {
            setSearching(false)
        }
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

    const clearSearch = () => {
        setSearch('')
        setSearching(false)
    }

    const logOut = () => {
        localStorage.removeItem("uid")
        LogOut()
        navigate('/')
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          // "Enter" key was pressed, execute search function
          setSearching(true)
        //   executeSearch();
        }
      };

    return (
        <MyDrivePage>
            <NavigationContainer>
                <LeftContainer>
                    <AppName onClick={homeButton}>PDF Master</AppName>
                </LeftContainer>
                <SearchContainer>
                    <InputBar type="text" placeholder="File Lookup" onChange={handleSearch} value={search} onKeyDown={handleKeyDown}/>
                    {
                        searching && search ?
                        <ClearButtonContainer>
                            <FontAwesomeIcon icon={faXmark} size="xl" onClick={clearSearch}/>
                        </ClearButtonContainer>
                        : 
                        <>
                        </>
                    }
                </SearchContainer>
                <AddFileDropdown>
                    <div onClick={logOut} style={{ cursor: "pointer" }} >
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
            <DriveListings search={search} searching={searching}/>
        </MyDrivePage>
    )
}

export default DriveNavigation