import React from 'react';
import Post from './Post/Post'
import useStyle from './styles'
import {useSelector} from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

const Posts = ({setCurrentId}) => 
{
    const posts = useSelector((state)=> (state.posts));
    // console.log(posts);
    const classes = useStyle();
    return    (
        <>
       {(!posts.length)? <CircularProgress/> : <div>
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
       </div>}
       </>
    )
}

export default Posts;