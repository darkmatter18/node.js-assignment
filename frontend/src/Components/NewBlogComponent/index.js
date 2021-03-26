import { Container, makeStyles, Typography, TextField, Button } from "@material-ui/core"
import React from "react"
import AppBarComponent from "../AppBarComponent"
import { useForm } from "react-hook-form";
import api from "./api";
import { useAuthHeader, useAuthUser } from "react-auth-kit";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
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
}))

const NewBlogComponent = () => {
    const classes = useStyles()
    const auth = useAuthHeader()
    const authUser = useAuthUser()
    const { register, errors, handleSubmit } = useForm({
        reValidateMode: "onBlur",
        mode: "onBlur"
    })

    const onSubmitEvent = async (data) => {
        const {success, err} =  await api({...data, userEmail: authUser().email}, auth())
        if (err && !success) {
            if (err.response.data.message){
                alert(err.response.data.message)
            }  else {
                alert(err);
            }
        } else {
            alert(success.message)
        }
    }


    return (
        <React.Fragment>
            <AppBarComponent />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add your new blog
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmitEvent)}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Blog Title"
                            name="title"
                            autoComplete="title"
                            inputRef={
                                register({
                                    required: "Enter your blog title of minimum length of 10",
                                    minLength: 10
                                })
                            }
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            variant="outlined"
                            required
                            multiline
                            rows={6}
                            fullWidth
                            id="body"
                            label="Blog Body"
                            name="body"
                            autoComplete="body"
                            inputRef={
                                register({
                                    required: "Enter your blog body",
                                    minLength: 1
                                })
                            }
                            error={!!errors.body}
                            helperText={errors.body?.message}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Post
                    </Button>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default NewBlogComponent