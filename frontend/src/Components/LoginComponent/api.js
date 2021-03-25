import axios from "axios";
import {API_ROUTE_LOGIN, API_baseURL} from "../../vars";

const api = async (data) => {

    try {
        const res = await axios.post(API_baseURL + API_ROUTE_LOGIN, data)
        if(res.status === 200) {
            return  {success: res.data, err: false}
        } else {
            return  {success: false, err: res.data.message}
        }
    } catch (err) {
        return {success: false, err: err}
    }
}

export default api;