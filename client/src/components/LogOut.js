import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const LogOut = () => {
return(
    <Route render={props => (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} />
)
}

export default LogOut