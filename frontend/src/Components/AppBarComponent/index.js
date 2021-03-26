import { AppBar, Button, Toolbar, Typography, makeStyles } from "@material-ui/core"
import { useAuthUser, useSignOut } from "react-auth-kit"
import { useHistory } from "react-router"

const useStyles = makeStyles(() => ({
    flex: {
        flexGrow: 1
    }
}))

const AppBarComponent = () => {
    const classes = useStyles()
    const authState = useAuthUser()
    const signOut = useSignOut()
    const history = useHistory()


    return (
        <div className={classes.flex}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap className={classes.flex}>
                        Hello, {authState().name}
                    </Typography>
                    <Button color="inherit" onClick={() => { history.push("#") }}>New Blog</Button>
                    <Button color="inherit" onClick={() => { history.push("#") }}>My Blogs</Button>
                    <Button color="inherit" onClick={() => { signOut() }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )

}

export default AppBarComponent