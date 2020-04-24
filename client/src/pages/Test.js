import React, {useEffect, useState} from "react";
import {authFetch} from "../helpers/authFetch"

const Test = () => {
    const url = "/api/v1/users/uploadAvatar";
    const [data, setData] = useState('');

    useEffect(() => {
        authFetch(url)
            .then (res => res.json())
            .then(data => {
            console.log('12345',data);
            setData(JSON.stringify(data));
        }).catch(e => {
            console.log('abc', e)
            setData(JSON.stringify(e))
        });

    })

    return (
        <div>
            Hell world {data}
        </div>
    )
}

export default Test;