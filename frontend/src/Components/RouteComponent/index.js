import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from 'react-auth-kit'

import { BLOGS, DASHBOARD, FORGOTPASSWORD, HOME, LOGIN, NEW_BLOG, REGISTER } from './routes'

import HomeComponent from '../HomeComponent'
import LoginComponent from '../LoginComponent'
import DashboardComponent from '../DashboardComponent'
import RegisterComponent from '../RegisterComponent'
import ForgotPasswordComponent from '../ForgotPasswordComponent'
import BlogsComponent from '../BlogsComponent'
import NewBlogComponent from '../NewBlogComponent'

const RouteComponent = () => (
    <BrowserRouter>
        <Switch>
            <Route path={HOME} component={HomeComponent} exact/>
            <Route path={FORGOTPASSWORD} component={ForgotPasswordComponent} exact/>
            <Route path={LOGIN} component={LoginComponent} exact/>
            <Route path={REGISTER} component={RegisterComponent} exact/>
            <PrivateRoute path={DASHBOARD} component={DashboardComponent} loginPath={LOGIN} exact/>
            <PrivateRoute path={BLOGS} component={BlogsComponent} loginPath={LOGIN} exact/>
            <PrivateRoute path={NEW_BLOG} component={NewBlogComponent} loginPath={LOGIN} exact/>
        </Switch>
    </BrowserRouter>
)

export default RouteComponent