import { NameContainer, DriveText, OwnerContainer, EditContainer, ListingColumn, FileListing, MiscContainer, MiscIcon } from "../drive-listings/drive-listings.styles"
import { faShare, faTrash } from '@fortawesome/free-solid-svg-icons'

const MyDriveDocs = ({file,
    openFile,
    openDeletePopup,
    openSharePopup,
    getDateString}) => {

    return (
    <FileListing>
        <NameContainer onDoubleClick={() => openFile(file._id)}>
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
            <MiscIcon title="Share" alt="Share" icon={faShare} onClick={() => {openSharePopup(file)}}/>
            <MiscIcon title="Delete" alt="Share" icon={faTrash} onClick={() => {openDeletePopup(file.fileName, file._id)}}/>
        </MiscContainer>
    </FileListing>
    )
}

export default MyDriveDocs;