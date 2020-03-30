import React, {Fragment} from "react";
import {Link} from "react-router-dom";

const AuthForm = (props) => (
    <div className={'form-group'}>
        <div>{props.title}</div>
        <input className={'form-input'} type="text" placeholder={props.input1}/><br/>
        <input className={'form-input'} type="text" placeholder={props.input2}/><br/>
        <input className={'form-submit'} type={'submit'} value={props.submit}/>
    </div>
);

const RedirectDiv = (props) => (
    <div>
        <p>{props.title}</p>
        <Link to={props.link}>{props.desc}</Link>
    </div>
)

const Signup = () => {
    return (
        <Fragment>
            <div>Welcome to sign up page</div>
            <AuthForm title="Sign up to Kanban" input1="Enter email" input2="Create Password" submit="Sign up"/>
            <RedirectDiv title={'Already have an account?'} link={'/login'} desc={'Login'}/>
        </Fragment>
    )
}

export {
    Signup,
    AuthForm,
    RedirectDiv
};