import React, {Fragment} from "react";

import {AuthForm, RedirectDiv} from './Signup'

const Login = () => {
    //Callback for the form submission after validating successfully
    const onSubmit = () => {
        //Make request to check whether the email and password are valid

        //Redirect to dashboard
        window.location.replace('/');
    }

    return (
        <Fragment>
            <div>Welcome to sign up page</div>
            <AuthForm title="Welcome back" input1="Enter email" input2="Password" submit="Login" onSubmit={onSubmit}/>
            <RedirectDiv title={'Don\'t have an account?'} link={'/signup'} desc={'Create'}/>
        </Fragment>
    )
}

export {
    Login,
};