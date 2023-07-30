import axios from 'axios'
// Send file to backend when user uploads file
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