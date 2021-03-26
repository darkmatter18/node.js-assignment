import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import { DASHBOARD } from '../RouteComponent/routes';
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

export default function ForgotPasswordComponent() {
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
            console.log(success)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmitEvent)}>
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send Forgot Password Request
                    </Button>
                </form>
            </div>
        </Container>
    );
}