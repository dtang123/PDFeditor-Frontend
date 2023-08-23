import axios from 'axios'


export const updateFiles = async (userId) => {
    console.log(userId)
    try {
        const res = await axios.post('http://localhost:3001/api/upload/get-files',
            {userId: userId}
        );
        const response = await res;
        return response
    } catch (error) {
      console.error('Error calling backend API:', error);
    }
}

export const deleteFile = async (userId, fileId) => {
    try {
        console.log(fileId)
        const res = await axios.delete(`http://localhost:3001/api/upload/delete-file/${fileId}`,
            {
                data: {
                    userId: userId,
                }
            }
        );
        const response = await res;
        console.log(response)
        return response
    } catch (error) {
      console.error('Error calling backend API:', error);
    }
}

export const updateFile = async (file, userId) => {
    try {
        const formData = new FormData();
        formData.append('_id', file._id)
        formData.append('fileName', file.fileName)
        formData.append('file', file.file);
        formData.append('curr_user', userId)
        formData.append('file_owner', file.user)
        formData.append('lastOpened', file.lastOpened)
        formData.append('textBoxes', JSON.stringify(file.textBoxes))
        const res = await axios.put(`http://localhost:3001/api/upload/update-file`, formData)
        return res.data;
    } catch (error) {
        console.error('Error calling backend API:', error);
    }
}