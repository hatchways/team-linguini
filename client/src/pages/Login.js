import React, {Fragment} from "react";

import {AuthForm, RedirectDiv} from './Signup'

const Login = () => {
    return (
        <Fragment>
            <div>Welcome to sign up page</div>
            <AuthForm title="Welcome back" input1="Enter email" input2="Password" submit="Login"/>
            <RedirectDiv title={'Don\'t have an account?'} link={'/signup'} desc={'Create'}/>
        </Fragment>
    )
}

export {
    Login,
};