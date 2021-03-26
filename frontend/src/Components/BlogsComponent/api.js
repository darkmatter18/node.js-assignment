import axios from "axios";
import { API_ROUTE_NEW_BLOG, API_baseURL } from "../../vars";

export const getapi = async (auth) => {

    try {
        const res = await axios.get(API_baseURL + API_ROUTE_NEW_BLOG, {
            headers: {
                Authorization: auth
            }
        })
        if (res.status === 200) {
            return { success: res.data, err: false }
        } else {
            return { success: false, err: res.data.message }
        }
    } catch (err) {
        return { success: false, err: err }
    }
}

export const deleteapi = async (data, auth) => {

    try {
        const res = await axios.delete(`${API_baseURL}${API_ROUTE_NEW_BLOG}?id=${data}`, {
            headers: {
                Authorization: auth
            }
        })
        if (res.status === 200) {
            return { success: res.data, err: false }
        } else {
            return { success: false, err: res.data.message }
        }
    } catch (err) {
        return { success: false, err: err }
    }
}

