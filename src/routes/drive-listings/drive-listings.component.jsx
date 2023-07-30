import { useState, useEffect } from "react"
import Store from "../../store/reducers"
import { DrivePage, SideBar, FileListingContainer, FileListing, ListingColumn, Tabs, HeaderRow, NameContainer, DriveText, OwnerContainer, EditContainer, MiscContainer, MiscIcon } from "./drive-listings.styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faTrash } from '@fortawesome/free-solid-svg-icons'
import DeletePopup from "../popups/deletePopup/deletePopup.component"
import { updateFiles } from "../../backend/update"
import { useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserId } from "../../store/userSlice"

const DriveListings = ({search, searching}) => {
    const [files, setFiles] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [fileInfo, setFileInfo] = useState({
        fileName: "",
        id: "",
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const filteredFiles = files.filter((file) =>
        file.fileName.toLowerCase().includes(search.toLowerCase())
    );

    const updateUserData = async () => {
        try {
            console.log(localStorage.getItem('uid'))
            await dispatch(setUserId(localStorage.getItem('uid')))
            const files = await updateFiles(Store.getState().user.userId)
            console.log(files.data.files)
            setFiles(files.data.files)
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() => {
        console.log(Store.getState().files.fileObjs)
        if (Store.getState().files.fileObjs.length == 0) {
            if (localStorage.getItem('uid')) {
                updateUserData()
            } else {
                navigate("/")
            }
        } else {
            setFiles(Store.getState().files.fileObjs)
        }
        console.log(Store.getState().files.fileObjs)
    }, [Store.getState().files.fileObjs])

    const handleTabClick = (tabNum) => {
        setActiveTab(tabNum)
    }

    const getDateString = (date) => {
        const fileDate = new Date(date)
        return `${fileDate.getMonth() + 1}/${fileDate.getDate()}/${fileDate.getFullYear()}`
    }

    const closePopup = () => {
        setDeletePopupOpen(false)
    }

    const openDeletePopup = (fileName, fileId) => {
        setFileInfo({
            fileName: fileName,
            id: fileId
        })
        setDeletePopupOpen(true)
    }

    const handleFileDeleted = (fileId) => {
        // Filter out the deleted file from the state and update the state with the new array
        setFiles(files.filter((file) => file._id !== fileId));
      };

    return (
        <DrivePage>
            <SideBar>
                <Tabs className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>
                    Drive
                </Tabs>
                <Tabs className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}>
                    Shared With Me
                </Tabs>
            </SideBar>
                <FileListingContainer>
                    <HeaderRow>
                        <NameContainer>
                            <DriveText>Name</DriveText>
                        </NameContainer>
                        <OwnerContainer>
                            <DriveText>Owner</DriveText>
                        </OwnerContainer>
                        <EditContainer>
                            <DriveText>Last Opened</DriveText>
                        </EditContainer>
                    </HeaderRow>
                    <ListingColumn>
                        {
                            searching ? 
                            filteredFiles.map((file) => (
                                <FileListing>
                                    <NameContainer>
                                        <DriveText>
                                            {file.fileName}
                                        </DriveText>
                                    </NameContainer>
                                    <OwnerContainer>
                                        <DriveText>
                                            You
                                        </DriveText>
                                    </OwnerContainer>
                                    <EditContainer>
                                        <DriveText>
                                            {getDateString(file.lastOpened)}
                                        </DriveText>
                                    </EditContainer>
                                    <MiscContainer>
                                        <MiscIcon icon={faShare} />
                                        <MiscIcon icon={faTrash} onClick={() => {openDeletePopup(file.fileName, file._id)}}/>
                                    </MiscContainer>
                                </FileListing>
                            ))
                            :
                            files.map((file) => (
                                <FileListing>
                                    <NameContainer>
                                        <DriveText>
                                            {file.fileName}
                                        </DriveText>
                                    </NameContainer>
                                    <OwnerContainer>
                                        <DriveText>
                                            You
                                        </DriveText>
                                    </OwnerContainer>
                                    <EditContainer>
                                        <DriveText>
                                            {getDateString(file.lastOpened)}
                                        </DriveText>
                                    </EditContainer>
                                    <MiscContainer>
                                        <MiscIcon icon={faShare} />
                                        <MiscIcon icon={faTrash} onClick={() => {openDeletePopup(file.fileName, file._id)}}/>
                                    </MiscContainer>
                                </FileListing>
                            ))
                        }
                        
                    </ListingColumn>
            </FileListingContainer>
            <DeletePopup isOpen={deletePopupOpen} onClose={closePopup} fileInfo={fileInfo} handleFileDeleted={handleFileDeleted}/>
        </DrivePage>
    )
}

export default DriveListings
