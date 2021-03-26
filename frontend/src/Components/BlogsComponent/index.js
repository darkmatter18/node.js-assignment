import { Container, makeStyles, Card, CardContent, Typography, CardActions, Button, Modal } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import React from "react"
import { useAuthHeader } from "react-auth-kit"
import moment from 'moment'
import AppBarComponent from "../AppBarComponent"
import { getapi, deleteapi } from "./api"


const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(4)
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const BlogsComponent = () => {
    const auth = useAuthHeader()
    const classes = useStyles()
    const [blogs, setBlogs] = React.useState(null)
    const [openState, setOpenState] = React.useState({ open: false, index: 0 });

    const handleOpen = (index) => () => {
        console.log(index);
        setOpenState({ open: true, index: index });
    };

    const handleClose = () => {
        setOpenState({ open: false, index: 0 });
    };

    const handleDelete = (id) => () => {
        deleteapi(id, auth())
            .then(({ success, err }) => {
                if (err && !success) {
                    if (err.response.data.message) {
                        alert(err.response.data.message)
                    } else {
                        alert(err);
                    }
                } else {
                    setBlogs(success)
                }
            })
            .catch((err) => {
                if (err.response) {
                    alert(err.response.data.message)
                } else {
                    alert(err);
                }
            })
    }

    React.useEffect(() => {
        getapi(auth())
            .then((success) => {
                setBlogs(success.success);
            })
            .catch((err) => {
                if (err.response) {
                    alert(err.response.data.message)
                } else {
                    alert(err);
                }
            })
    }, [])
    console.log(blogs)
    return (
        <React.Fragment>
            <AppBarComponent />
            <Container component={"main"} className={classes.cardGrid} maxWidth="md">
                {blogs ? (
                    <React.Fragment>
                        {blogs.length > 0 ? (
                            <React.Fragment>
                                {blogs.map((blog, index) => (
                                    <Card className={classes.card} key={index}>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {blog.title}
                                            </Typography>
                                            <Typography variant="body1">
                                                Published At: {moment(new Date(blog.createdAt)).format("D.MM.YYYY, h:mm a").toString()}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <div style={{ flexGrow: 1 }}>
                                                <Button size="small" color="primary" onClick={handleOpen(index)}>
                                                    View
                                        </Button>
                                            </div>

                                            <IconButton aria-label="delete" onClick={handleDelete(blog._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                ))}
                                <Modal
                                    open={openState.open}
                                    onClose={handleClose}
                                >
                                    <Card style={{ maxWidth: 800 }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {blogs[openState.index].title}
                                            </Typography>
                                            <Typography variant="h6">
                                                {moment(new Date(blogs[openState.index].createdAt)).format("D.MM.YYYY, h:mm a").toString()}
                                            </Typography>
                                            <hr />
                                            <Typography variant="body2">
                                                {blogs[openState.index].body}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Modal>
                            </React.Fragment>
                        ) : (
                            <div>
                                No Blog found. Try to write some.
                            </div>
                        )}
                    </React.Fragment>
                ) : (
                    <div>
                        Loading Blogs...
                    </div>
                )}
            </Container>
        </React.Fragment>
    )
}
export default BlogsComponent