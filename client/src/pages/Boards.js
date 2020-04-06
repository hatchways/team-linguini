import React, { useState } from 'react'
import initialData from './InitialData'
import BoardBar from './BoardBar'


const Boards = () => {
    const [data, setData] = useState(initialData)

    return(
        <div>
            <BoardBar />
        </div>
    )
}

export default Boards