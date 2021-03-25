import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import { useSignIn } from "react-auth-kit";
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import { Button } from '@material-ui/core';
import { DASHBOARD, REGISTER } from '../RouteComponent/routes';
import api from './api'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    subheader: {
        marginBottom: theme.spacing(8)
    },
}));

const AllLogin = () => {
    const signIn = useSignIn();
    const history = useHistory()
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm({
        reValidateMode: "onBlur",
        mode: "onBlur"
    })

    const onSubmitEvent = async (data) => {
        console.log(data);
        const { success, err } = await api(data)
        if (err && !success) {
            alert(err);
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
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={8} className={classes.image} />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <Container>
                    <div className={classes.paper}>
                        <div className={classes.bar} />
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmitEvent)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
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
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                inputRef={register({
                                    required: "Password must have length 8",
                                    minLength: 8,
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                            <Grid container spacing={4} justify="flex-end">
                                <Grid item>
                                    <Link onClick={() => history.push(REGISTER)} variant="body2">
                                        Forgot Password
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link onClick={() => history.push(REGISTER)} variant="body2">
                                        Have no Account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
}

export default AllLogin