import React from 'react'
import { useIsAuthenticated } from 'react-auth-kit'
import { useHistory } from 'react-router-dom'
import { DASHBOARD, LOGIN } from '../RouteComponent/routes'


const HomeComponent = () => {
    const isAuth = useIsAuthenticated()
    const history = useHistory()

    if (isAuth()) {
        history.push(DASHBOARD)
    } else {
        history.push(LOGIN)
    }



    return <React.Fragment />
}

export default HomeComponent