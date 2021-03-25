import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from 'react-auth-kit'

import { DASHBOARD, HOME, LOGIN, REGISTER } from './routes'

import HomeComponent from '../HomeComponent'
import LoginComponent from '../LoginComponent'
import DashboardComponent from '../DashboardComponent'
import RegisterComponent from '../RegisterComponent'

const RouteComponent = () => (
    <BrowserRouter>
        <Switch>
            <Route path={HOME} component={HomeComponent} exact/>
            <Route path={LOGIN} component={LoginComponent} exact/>
            <Route path={REGISTER} component={RegisterComponent} exact/>
            <PrivateRoute path={DASHBOARD} component={DashboardComponent} loginPath={LOGIN} exact/>
        </Switch>
    </BrowserRouter>
)

export default RouteComponent