import { Outlet, useNavigate } from 'react-router-dom'
import { Page, NavigationContainer, AppName, LeftContainer } from '../signInNav/navigation.styles'
import { AddFile, AddFileDropdown, DropdownContainer, FileOptions } from './driveNav.styles'
import { useState } from 'react'
import Popup from '../../popup/popup.component'



const DriveNavigation = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false);


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