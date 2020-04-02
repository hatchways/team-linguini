import React, {Fragment, useState} from "react";
import {TextField, Button, OutlinedInput, FormHelperText, Typography, Box, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from "react-router-dom";
import { useForm } from 'react-hook-form';
// import {useAuth} from "../providers/auth/auth.provider";
import axios from 'axios';
// import {fetchUserFailure, fetchUserRequest, fetchUserSuccess, setIsAuthenticated} from '../providers/auth/auth.action';


const AuthForm = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const emailValidator = {
        required: 'Email is required',
        pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address"
        }
    }

    const passwordValidator = {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: "Password needs 6 characters at least"
        }
    }

    const formStyle = makeStyles({
        root: {
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            fontSize: 26,
            marginTop: 50
        },
        input: {
            width: 250,
            marginBottom: 10
        },
        button: {
            margin: 25,
            width: 150,
            color: '#ffffff'
        }
    })();

    return (
        <Box component={'form'} className={formStyle.root} onSubmit={handleSubmit(props.onSubmit)}>
            <Typography align={'center'} className={formStyle.title}>{props.title}</Typography>

            <FormHelperText error>{props.serverResponse}</FormHelperText><br />

            <TextField name="email" variant={'outlined'} type="text" label={props.input1}
                       className={formStyle.input}
                       inputRef={register(emailValidator)}
                       error={errors.email}
                       helperText={errors.email && errors.email.message}
            />

            <TextField name="password" variant={'outlined'} type="password" label={props.input2}
                       className={formStyle.input}
                       inputRef={register(passwordValidator)}
                       error={errors.password}
                       helperText={errors.password && errors.password.message}
            />

            <Button color={'primary'} className={formStyle.button} variant={'contained'} type={'submit'}> {props.submit}</Button>
        </Box>
    )
};

const RedirectDiv = (props) => {
    const AuthDivStyle = makeStyles({
        root: {
            marginTop: 20,
            textAlign: 'center',
            borderTop: 'solid 1px',
            borderColor: '#D3D3D3'
        },
        margin: {
            marginTop: 25
        }
    })();

    return (
        <Box component={'div'} className={AuthDivStyle.root}>
            <Typography className={AuthDivStyle.margin}>{props.title}</Typography>
            <Link to={props.link}><Typography>{props.desc}</Typography></Link>
        </Box>
    )
}

const Signup = () => {
    // const auth = useAuth();
    // const {dispatchIsAuthenticated, dispatchUser} = auth;
    const history = useHistory();

    const [serverResponse, setServerResponse] = useState('');

    //Callback for the form submission after validation
    const onSubmit = values => {
        const {email, password} = values;
        console.log(email, password);

        // dispatchIsAuthenticated(setIsAuthenticated(true));

        //Make a request to backend
        const url = '/api/v1/auth/register'
        axios.post(url, {email, password})
            .then(res => {
                //If success to create a new account, redirect to login page
                if (res.data.success){
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
        <Grid container spacing={0}>
            <Grid item xs={6} >
                <img src={"/images/image1.png"} width={'100%'} height={'100%'}/>
            </Grid>
            <Grid item xs={6} alignItems={'center'}>
                <AuthForm title="Sign up to Kanban" input1="Enter email" input2="Create Password" submit="Sign up"
                          onSubmit={onSubmit}
                          serverResponse={serverResponse}/>
                <RedirectDiv title={'Already have an account?'} link={'/login'} desc={'Login'}/>
            </Grid>
        </Grid>
    )
}

export {
    Signup,
    AuthForm,
    RedirectDiv
};