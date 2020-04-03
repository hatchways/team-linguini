import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import { AuthForm, RedirectDiv} from "../Components/auth"
import {authStyle} from '../themes/signup.style';
import axios from 'axios';

const Signup = () => {
    const history = useHistory();

    const [serverResponse, setServerResponse] = useState('');

    //Classes of CSS style
    const classes = makeStyles(authStyle)();

    //Callback for the form submission after validation
    const onSubmit = values => {
        const {email, password} = values;
        console.log(email, password);

        //Make a request to backend
        const url = '/api/v1/auth/register'
        axios.post(url, {email, password})
            .then(res => {

                //If success to create a new account, redirect to login page
                if (res.status === 200){
                    history.push('/login')
                } else {
                    setServerResponse(res.data.error);
                }

            })
            .catch(error => {
                setServerResponse(error.response.data.error);
            });

    };

    return (
        <Grid container className={classes.vh100}>
            <Grid item md={6} xs={0}>
                <img alt='' src={"/images/image1.png"} width={'100%'} height={'100%'}/>
            </Grid>
            <Grid item md={6} xs={12}>
                <AuthForm title="Sign up to Kanban" input1="Enter email" input2="Create Password" submit="Sign up"
                          onSubmit={onSubmit}
                          serverResponse={serverResponse}/>
                <RedirectDiv title={'Already have an account?'} link={'/login'} desc={'Login'}/>
            </Grid>
        </Grid>
    )
}

export {Signup};