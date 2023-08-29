import { useEffect, useState } from "react"
import { FileListingContainer, HeaderRow, NameContainer, OwnerContainer, EditContainer, MiscContainer, DriveText, ListingColumn, MiscIcon, FileListing } from "../drive-listings/drive-listings.styles"
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { getShared } from "../../backend/share";
import { useSelector } from 'react-redux'
import { LargeOwnerContainer, SmallNameContainer } from "./share-docs.styled";

const ShareDocs = ({search, searching, getDateString}) => {
    const [sharedFiles, setSharedFiles] = useState([]);
    const user = useSelector((state) => state.user.userId);

    const filteredFiles = sharedFiles.filter((file) =>
        file.fileName.toLowerCase().includes(search.toLowerCase())
    );

    const retrieveShared = async () => {
        const response = await getShared(user);
        setSharedFiles(response.data.files);
    }

    useEffect(() => {
        retrieveShared()
    }, [])

    return (
        <FileListingContainer>
            <HeaderRow>
                <SmallNameContainer>
                    <DriveText>Name</DriveText>
                    <MiscIcon icon={faRefresh} />
                </SmallNameContainer>
                <LargeOwnerContainer>
                    <DriveText>Owner</DriveText>
                </LargeOwnerContainer>
                <EditContainer>
                    <DriveText>Last Opened</DriveText>
                </EditContainer>
                <MiscContainer>
                    <DriveText> Shared</DriveText>
                </MiscContainer>
            </HeaderRow>
            <ListingColumn>
                {
                    searching ? 
                    filteredFiles.map((file) => (
                        <FileListing>
                            <SmallNameContainer>
                                <DriveText>
                                    {file.fileName}
                                </DriveText>
                            </SmallNameContainer>
                            <LargeOwnerContainer>
                                <DriveText>
                                    {file.ownerEmail}
                                </DriveText>
                            </LargeOwnerContainer>
                            <EditContainer>
                                <DriveText>
                                    {getDateString(file.editDate)}
                                </DriveText>
                            </EditContainer>
                            <MiscContainer>
                                <DriveText>
                                    {getDateString(file.shareDate)}
                                </DriveText>
                            </MiscContainer>
                        </FileListing>
                    ))
                    :
                    sharedFiles.map((file) => (
                        <FileListing>
                            <SmallNameContainer>
                                <DriveText>
                                    {file.fileName}
                                </DriveText>
                            </SmallNameContainer>
                            <LargeOwnerContainer>
                                <DriveText>
                                    {file.ownerEmail}
                                </DriveText>
                            </LargeOwnerContainer>
                            <EditContainer>
                                <DriveText>
                                    {getDateString(file.editDate)}
                                </DriveText>
                            </EditContainer>
                            <MiscContainer>
                                <DriveText>
                                    {getDateString(file.shareDate)}
                                </DriveText>
                            </MiscContainer>
                        </FileListing>
                    ))
                }
                
            </ListingColumn>
        </FileListingContainer>
    )
}

export default ShareDocs