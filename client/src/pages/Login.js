import React, {Fragment, useState} from "react";
import {useHistory} from 'react-router-dom';
import {useAuth} from "../providers/auth/auth.provider";
import {setIsAuthenticated, fetchUserSuccess, fetchUserRequest, fetchUserFailure} from "../providers/auth/auth.action";

import {AuthForm, RedirectDiv} from './Signup'
import axios from "axios";
import {Grid} from "@material-ui/core";

const Login = () => {
    const auth = useAuth();
    const {dispatchIsAuthenticated, dispatchUser} = auth;
    const [serverResponse, setServerResponse] = useState('');

    const history = useHistory();

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
                if (res.data.success){
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
        <Grid container spacing={0}>
            <Grid item xs={6} >
                <img src={"/images/image1.png"} width={'100%'} height={'100%'}/>
            </Grid>
            <Grid item xs={6} alignItems={'center'}>
                <AuthForm title="Welcome back!" input1="Enter email" input2="Password" submit="Login"
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