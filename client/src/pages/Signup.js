import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';


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

    return (
        <form className={'form-group'} onSubmit={handleSubmit(props.onSubmit)}>
            <div>{props.title}</div>

            <input name="email" className={'form-input'} type="text" placeholder={props.input1} ref={register(emailValidator)}/><br/>
            <label>{errors.email && errors.email.message}</label><br />

            <input name="password" className={'form-input'} type="password" placeholder={props.input2} ref={register(passwordValidator)}/><br/>
            <label>{errors.password && errors.password.message}</label><br />

            <input className={'form-submit'} type={'submit'} value={props.submit}/>
        </form>
    )
};

const RedirectDiv = (props) => (
    <div>
        <p>{props.title}</p>
        <Link to={props.link}>{props.desc}</Link>
    </div>
)

const Signup = () => {
    //Callback for the form submission after validation
    const onSubmit = values => {
        const {email, password} = values;
        console.log(email, password);

        //There is no user api to call at the moment. So I assumed that the user received a successful response
        //for creating the new user on server.
        //Therefore, it will redirect to login page
        // const url = window.location.hostname +'/login';
        // console.log('url', url);
        window.location.replace('/login');



        //Call api
        // const domain = 'http://localhost/'
        // const url = domain + '/users/';
        // const data = {email, password};
        // axios.post(url, data)
        //     .then(res => {
        //         If success to create a new account, redirect to login page

        // If failed to create a new account
        // })
        // .catch(errors => console.log(errors.message));
    };

    return (
        <Fragment>
            <div>Welcome to sign up page</div>
            <AuthForm title="Sign up to Kanban" input1="Enter email" input2="Create Password" submit="Sign up" onSubmit={onSubmit}/>
            <RedirectDiv title={'Already have an account?'} link={'/login'} desc={'Login'}/>
        </Fragment>
    )
}

export {
    Signup,
    AuthForm,
    RedirectDiv
};