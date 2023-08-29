import { useState, useEffect } from "react"
import Store from "../../store/reducers"
import { DrivePage, SideBar, FileListingContainer, ListingColumn, Tabs, HeaderRow, NameContainer, DriveText, OwnerContainer, EditContainer } from "./drive-listings.styles"

import DeletePopup from "../popups/deletePopup/deletePopup.component"
import { updateFiles } from "../../backend/update"
import { useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserId } from "../../store/userSlice"
import { setFiles, setFilesMap } from "../../store/filesSlice"
import SharePopup from "../popups/sharePopup/sharePopup.component"
import MyDriveDocs from "../my-drive-docs/my-drive-docs.component"
import ShareDocs from "../share-docs/share-docs.component"

const DriveListings = ({search, searching}) => {
    const [filesDisplay, setFilesDisplay] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [fileInfo, setFileInfo] = useState({
        fileName: "",
        id: "",
    })
    const [sharePopupOpen, setSharePopupOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const filteredFiles = filesDisplay.filter((file) =>
        file.fileName.toLowerCase().includes(search.toLowerCase())
    );

    const updateUserData = async () => {
        try {
            console.log(localStorage.getItem('uid'))
            await dispatch(setUserId(localStorage.getItem('uid')))
            const files = await updateFiles(Store.getState().user.userId)
            console.log(files.data.files)
            setFilesDisplay(files.data.files)
            await dispatch(setFiles(files.data.files))
            await dispatch(setFilesMap(files.data.files))
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() => {
        console.log(Store.getState().files.fileObjs)
        if (Store.getState().files.fileObjs.length === 0) {
            if (localStorage.getItem('uid')) {
                updateUserData()
            } else {
                navigate("/")
            }
        } else {
            setFilesDisplay(Store.getState().files.fileObjs)
        }
        console.log(Store.getState().files.fileObjsMap)
    }, [Store.getState().user.userId])

    const handleTabClick = (tabNum) => {
        setActiveTab(tabNum)
    }

    const getDateString = (date) => {
        const fileDate = new Date(date)
        return `${fileDate.getMonth() + 1}/${fileDate.getDate()}/${fileDate.getFullYear()}`
    }

    const closePopup = () => {
        setDeletePopupOpen(false)
        setSharePopupOpen(false)
        setFileInfo(null)
    }

    const openDeletePopup = (fileName, fileId) => {
        setFileInfo({
            fileName: fileName,
            id: fileId
        })
        setSharePopupOpen(false)
        setDeletePopupOpen(true)
    }

    const openSharePopup = (file) => {
        setFileInfo({
            id: file._id,
            fileName: file.fileName,
            user: file.user,
        })
        setSharePopupOpen(true)
        setDeletePopupOpen(false)
    }

    const handleFileDeleted = (fileId) => {
        // Filter out the deleted file from the state and update the state with the new array
        const newFiles = filesDisplay.filter((file) => file._id !== fileId)
        setFilesDisplay(newFiles);
        setFiles(newFiles)
        setFilesMap(newFiles)
      };

    const openFile = (fileId) => {
        navigate(`/edit/${fileId}`)
    }

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
                {  
                activeTab === 1 ?
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
                                <MyDriveDocs
                                    file={file}
                                    openFile={openFile}
                                    openDeletePopup={openDeletePopup}
                                    openSharePopup={openSharePopup}
                                    getDateString={getDateString} />
                            ))
                            :
                            filesDisplay.map((file) => (
                                <MyDriveDocs
                                    file={file}
                                    openFile={openFile}
                                    openDeletePopup={openDeletePopup}
                                    openSharePopup={openSharePopup}
                                    getDateString={getDateString} />
                            ))
                        }
                        
                    </ListingColumn>
            </FileListingContainer>
            :
                <ShareDocs search={search} searching={searching} getDateString={getDateString}/>
            }
            <DeletePopup isOpen={deletePopupOpen} onClose={closePopup} fileInfo={fileInfo} handleFileDeleted={handleFileDeleted}/>
            <SharePopup isOpen={sharePopupOpen} onClose={closePopup} fileInfo={fileInfo}/>
        </DrivePage>
    )
}

export default DriveListings
