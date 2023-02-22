import React, { useState , useEffect} from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles';
import {Link , useHistory} from 'react-router-dom';
import memories from "../../images/memories.png";
import { useDispatch } from 'react-redux';
import { Logout } from '../../actions/auth';

const Navbar = () => {
    const dispatch=useDispatch();
    const history = useHistory();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    useEffect(()=>{
        
        history.listen((location) => {
            const token = user?.token;
            setUser(JSON.parse(localStorage.getItem('profile')));
        })
        //JWT

    },[history])

    const logout=()=>{
        setUser(null);
        dispatch(Logout());
        history.push('/');
    }

    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position='static' color="inherit">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to="/" variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user? (
                    <div className={classes.profile}>
                        <Avatar alt={user.result.name[0]} src={user.result?.imageUrl}/>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar