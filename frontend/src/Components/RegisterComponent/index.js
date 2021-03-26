import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import { DASHBOARD, LOGIN } from '../RouteComponent/routes';
import api from './api'
import { useSignIn } from 'react-auth-kit';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RegisterComponent() {
    const classes = useStyles();
    const history = useHistory();
    const signIn = useSignIn();
    const { register, errors, handleSubmit } = useForm({
        reValidateMode: "onBlur",
        mode: "onBlur"
    })

    const onSubmitEvent = async (data) => {
        console.log(data);
        const { success, err } = await api(data)
        if (err && !success) {
            if (err.response.data.message){
                alert(err.response.data.message)
            }  else {
                alert(err);
            }
        } else {
            signIn({
                token: success.token.accessToken,
                expiresIn: 15,
                tokenType: success.token.tokenType,
                refreshToken: success.token.refreshToken,
                refreshTokenExpireIn: 60,
                authState: success.user
            }) ? history.push(DASHBOARD)
                : alert("Sign In Error occurs")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmitEvent)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                inputRef={
                                    register({
                                        required: "Input must be an Name",
                                        minLength: 1
                                    })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={
                                    register({
                                        required: "Input must be an E-mail Address",
                                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                    })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={
                                    register({
                                        required: "Password must have length 8",
                                        minLength: 8,
                                        maxLength: 128
                                    })
                                }
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={() => history.push(LOGIN)} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}