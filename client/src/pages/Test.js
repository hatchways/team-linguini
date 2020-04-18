import React, {useEffect, useState} from "react";
import {authFetch} from "../helpers/authFetch"
import {Box, TextField, Button} from '@material-ui/core'
import { useForm } from 'react-hook-form'

const Test = () => {
    const url = "/api/v1/boards/selected";
    const [data, setData] = useState('Hello world');
  // const { handleSubmit} = useForm();


    const onSubmit = (data) => {
      data.preventDefault();
      const file=data.target[0].files[0];
      const num=data.target[2].value;
      const fileType =file.name.split('.')[1];
      const formData = new FormData();
      formData.append('num', num);
      formData.append('file', file)

        const url = '/api/v1/users/uploadAvatar';
        const token = JSON.parse(localStorage.getItem('token')) || null
        fetch(url, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + token.toString(),
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify({file: JSON.stringify(file), num, fileType})
          body: formData
        }).then(res => res.json())
          .then(data => {
              console.log(data);
              setData(JSON.stringify(data));
          })

    }

    return (
      <div>
        <div>{data}</div>
        <Box component={'form'} onSubmit={onSubmit}>
          <TextField type={'file'} variant={'outlined'} name={'file'}></TextField>
          <TextField type={'text'} value={'12345'} name={'num'}/>
          <Button type={'submit'}>Submit</Button>
        </Box>
      </div>
    )
}

export default Test;