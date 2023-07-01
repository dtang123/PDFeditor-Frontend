import axios from 'axios'
// Send file to backend when user uploads file
export const fileUpload = async (data) => {
    console.log(data)
    try {
        const res = await axios.post('http://localhost:3001/api/upload',
          data 
        );
        const response = await res;
        return response
    } catch (error) {
      console.error('Error calling backend API:', error);
    }
}