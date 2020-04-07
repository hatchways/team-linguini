import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {useAuth} from "../providers/auth/auth.provider";
import {authStyle} from '../themes/signup.style';
import {setIsAuthenticated, fetchUserSuccess, fetchUserRequest, fetchUserFailure} from "../providers/auth/auth.action";

import {AuthForm, RedirectDiv} from '../components/auth'
import axios from "axios";
import {Grid, makeStyles} from "@material-ui/core";

const Login = () => {
    const auth = useAuth();
    const {dispatchIsAuthenticated, dispatchUser} = auth;
    const [serverResponse, setServerResponse] = useState('');

    const history = useHistory();

    //Classes of CSS style
    const classes = makeStyles(authStyle)();

    //Callback for the form submission after validating successfully
    const onSubmit = (data) => {

        const {email, password} = data;

        setServerResponse('');

        //Make request to check whether the email and password are valid
        const url = '/api/v1/auth/login'; //It is mock data, it will change when sever can provide auth api

        dispatchUser(fetchUserRequest());

        axios.post(url, {email, password})
            .then(res => {
                //If success to create a new account, redirect to login page
                if (res.status === 200){
                    //Save data on local storage
                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('user', JSON.stringify(res.data.user));

                    //Update the state of Auth providers
                    dispatchIsAuthenticated(setIsAuthenticated(true));
                    dispatchUser(fetchUserSuccess(res.data.user))
                    console.log('login successfully');

                    //Redirect to dashboard
                    history.push('/');

                } else {
                    console.log(res)
                    setServerResponse(res.data.error);
                }

            })
            .catch(error => {
                dispatchUser(fetchUserFailure(error.response.data.user))
                setServerResponse(error.response.data.error);
                console.log(error.response.data.error);
            });

    }

    return (
        <Grid container className={classes.vh100}>
            <Grid item md={6} xs={12} >
                <img alt='' src={"/images/image1.png"} width={'100%'} height={'100%'}/>
            </Grid>
            <Grid item md={6} xs={12}>
                <AuthForm title="Welcome back!" input1="Enter email" input2="Password" submit="Log in"
                          onSubmit={onSubmit}
                          serverResponse={serverResponse}/>
                <RedirectDiv title={'Don\'t have an account?'} link={'/signup'} desc={'Create'}/>
            </Grid>
        </Grid>
    )
}

export {
    Login,
};