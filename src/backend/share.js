import axios from 'axios'

export const shareFile = async (fileInfo, reciever) => {
    try {
        const res = await axios.post('http://localhost:3001/api/share/share-file',
            {
                fileInfo: fileInfo,
                receiver: reciever
            }
        );
        const response = await res;
        return response;
    } catch (error) {
        return error;
    }
}

export const getShared = async (userId) => {
    try {
        const res = await axios.post('http://localhost:3001/api/share/get',
            {
                userId: userId
            }
        );
        const response = await res;
        return response;
    } catch (error) {
        return error;
    }
}