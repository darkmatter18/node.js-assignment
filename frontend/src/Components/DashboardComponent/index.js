import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import axios from 'axios'
import moment from 'moment'
import { Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


export default function DashboardComponent() {
    const classes = useStyles();
    const authState = useAuthUser();
    const signOut = useSignOut();
    const [data, setData] = React.useState(null);
    const [openState, setOpenState] = React.useState({ open: false, index: 0 });

    const handleOpen = (index) => () => {
        console.log(index);
        setOpenState({ open: true, index: index });
    };

    const handleClose = () => {
        setOpenState({ open: false, index: 0 });
    };

    React.useEffect(() => {
        axios
            .get('https://newsapi.org/v2/top-headlines?country=in&apiKey=67682766c67541549d16a268ad16f672')
            .then((res) => {
                console.log(res.data)
                setData(res.data.articles)
            })
            .catch((e) => {
                console.log(e)
                alert(e.message)
            })
    }, [])

    return (
        <React.Fragment>
            <div className={classes.cardContent}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap className={classes.cardContent}>
                            Hello, {authState().name}
                        </Typography>
                        <Button color="inherit" >New Blog</Button>
                        <Button color="inherit" >My Blogs</Button>
                        <Button color="inherit" onClick={() => { signOut() }}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {data ? (
                        <React.Fragment>
                            <Grid container spacing={4}>
                                {data.map((cardVal, index) => (
                                    <Grid item key={index} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={cardVal.urlToImage}
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {moment(new Date(cardVal.publishedAt)).format("D.MM.YYYY, h:mm a").toString()}
                                                </Typography>
                                                <Typography>
                                                    {cardVal.title}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={handleOpen(index)}>
                                                    View
                                        </Button>
                                                <Button size="small" color="primary" href={cardVal.url}>
                                                    Go to News
                                        </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Modal
                                open={openState.open}
                                onClose={handleClose}
                            >
                                <Card style={{ maxWidth: 800 }}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={data[openState.index].urlToImage}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {moment(new Date(data[openState.index].publishedAt)).format("D.MM.YYYY, h:mm a").toString()}
                                        </Typography>
                                        <Typography variant="body1">
                                            {data[openState.index].title}
                                        </Typography>
                                        <hr />
                                        <Typography variant="body2">
                                            {data[openState.index].content}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Modal>
                        </React.Fragment>
                    ) : (
                        <div>
                            Loading NEWS...
                        </div>
                    )}
                </Container>
            </main>
        </React.Fragment>
    );
}