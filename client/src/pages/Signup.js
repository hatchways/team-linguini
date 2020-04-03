import React, {Fragment, useState} from "react";
import {TextField, Button, OutlinedInput, FormHelperText, Typography, Box, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from "react-router-dom";
import { useForm } from 'react-hook-form';
import {authStyle} from '../themes/signup.style';
import axios from 'axios';

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

    const classes = makeStyles(authStyle.form)();

    return (
        <Box component={'form'} className={classes.root} onSubmit={handleSubmit(props.onSubmit)}>
            <Typography align={'center'} className={classes.title}>{props.title}</Typography>

            <FormHelperText error>{props.serverResponse}</FormHelperText>

            <TextField name="email" variant={'outlined'} type="text" label={props.input1}
                       className={classes.input}
                       inputRef={register(emailValidator)}
                       error={errors.email}
                       helperText={errors.email && errors.email.message}
            />

            <TextField name="password" variant={'outlined'} type="password" label={props.input2}
                       className={classes.input}
                       inputRef={register(passwordValidator)}
                       error={errors.password}
                       helperText={errors.password && errors.password.message}
            />

            <Button color={'primary'} className={classes.button} variant={'contained'} type={'submit'}> {props.submit}</Button>
        </Box>
    )
};

const RedirectDiv = (props) => {
    const AuthDivStyle = makeStyles(authStyle.div)();

    return (
        <Box component={'div'} className={AuthDivStyle.root}>
            <Typography className={AuthDivStyle.margin}>{props.title}</Typography>
            <Link to={props.link}><Typography>{props.desc}</Typography></Link>
        </Box>
    )
}

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
        <Grid container className={classes.vh100}>
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