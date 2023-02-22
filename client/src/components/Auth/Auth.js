import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, formatMs } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import useStyles from "./styles"
import LockOutlined from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import {gapi} from 'gapi-script'
import {useDispatch} from 'react-redux';
import {auth} from '../../actions/auth';
import { useHistory } from "react-router-dom";
import { signin ,signup } from '../../actions/auth';

const Auth = () => {
  var dispatch = useDispatch();
  let history = useHistory();
  console.log(history);
  var googleClientId = '222127296211-6s3d1icso2ih7rel4vb852d5vvbaemgq.apps.googleusercontent.com';
useEffect(()=>{
  gapi.load("client:auth2",()=>{
    gapi.auth2.init({clientId : '222127296211-6s3d1icso2ih7rel4vb852d5vvbaemgq.apps.googleusercontent.com'})
  })
},[])

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData,setFormData] = useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""})
  const classes = useStyles();
  const handleChange =(event)=> { setFormData({...formData , [event.target.name] : event.target.value}) }
  const handleShowPassword = (flag) => { setShowPassword(!(showPassword) && flag) }
  const switchMode = () => {
    setIsSignup(!isSignup)
    handleShowPassword(false)
  };
  const googleSuccess = async (res)=>{
    const result = res?.profileObj; //It will give an error and return undefined when res is not available
    // const result = res.profileObj; It will give an error and say res.profileObj not found
    const token = res?.tokenId;
    
    try {
      dispatch(auth(result,token));
      history.push('/');  
    } catch (error) {
      console.log(error);
    }
    
  }
  const googleFailure = (error)=>{
    console.log(error);
    console.log("Google Sign In was unsuccessful.Try Again Later");
  }
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(isSignup){
        dispatch(signup(formData,history));
      }
      else{
        dispatch(signin(formData,history));
    }
  }
  
  return (
    <Container component="main" maxWidth="xs" >
      <Paper className={classes.paper} elevation={24}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name='firstName' label="First Name" handleChange={handleChange} value={formData.firstName} autoFocus half />
                <Input name='lastName' label="Last Name" handleChange={handleChange} value={formData.lastName} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} value={formData.email} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} value={formData.password} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} value={formData.confirmPassword} type="password" />}
          </Grid>

          <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            clientId={googleClientId}
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
              Google Sign In
              </Button>
            )}
            scope="email"
            plugin_name="Memory_Application"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign IN" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth