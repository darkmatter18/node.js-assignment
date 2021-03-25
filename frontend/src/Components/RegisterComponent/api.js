import axios from 'axios'
import { API_baseURL, API_ROUTE_REGISTER } from '../../vars'

const api = async (data) => {

    try {
        const res = await axios.post(API_baseURL + API_ROUTE_REGISTER, data)
        if(res.status === 201) {
            return  {success: res.data, err: false}
        } else {
            return  {success: false, err: res.data.message}
        }
    } catch (err) {
        return {success: false, err: err}
    }
}

export default api;