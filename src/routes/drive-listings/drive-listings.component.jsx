import { useState, useEffect } from "react"
import Store from "../../store/reducers"
import { DrivePage, SideBar, FileListingContainer, FileListing, ListingColumn, Tabs, HeaderRow, NameContainer, DriveText, OwnerContainer, EditContainer } from "./drive-listings.styles"


const DriveListings = () => {
    const [files, setFiles] = useState([])
    const [activeTab, setActiveTab] = useState(1)
    const temp = ["Your Mom", "Your Dad", "Your Sister", "Your Grandma", "Your Grandpa", "Your Cousin", "Your Aunt", "Your Uncle", "Your Brother"];

    useEffect(() => {
        setFiles(Store.getState().files.fileObjs)
    }, [Store.getState().files.fileObjs])

    const handleTabClick = (tabNum) => {
        setActiveTab(tabNum)
    }

    const getDateString = (date) => {
        const fileDate = new Date(date)
        return `${fileDate.getMonth() + 1}/${fileDate.getDate()}/${fileDate.getFullYear()}`
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
                <FileListingContainer>
                    <HeaderRow>
                        <NameContainer>
                            <DriveText>Name</DriveText>
                        </NameContainer>
                        <OwnerContainer>
                            <DriveText>Owner</DriveText>
                        </OwnerContainer>
                        <EditContainer>
                            <DriveText>Last Edit</DriveText>
                        </EditContainer>
                    </HeaderRow>
                    <ListingColumn>
                        {
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
                                            {getDateString(file.lastEdit)}
                                        </DriveText>
                                    </EditContainer>
                                </FileListing>
                            ))
                        }
                        {
                            temp.map((data) => (
                                <FileListing>
                                    <NameContainer>
                                        <DriveText>
                                            {data}
                                        </DriveText>
                                    </NameContainer>
                                </FileListing>
                            ))
                        }
                    </ListingColumn>
            </FileListingContainer>
        </DrivePage>
    )
}

export default DriveListings