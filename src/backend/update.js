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