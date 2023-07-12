import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from "./images/memories.png";
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import { useState, useEffect } from 'react';
import dotenv from 'dotenv';
dotenv.config();

const App = () => {
    const [currentId, setCurrentId] = useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position='static' color="inherit">
                <Typography variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={4}>
                        <Grid item xs={12} sm={8}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}
export default App;