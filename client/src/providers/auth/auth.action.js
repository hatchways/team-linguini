export const setIsAuthenticated = (status) => ({
    type: 'SET_IS_AUTHENTICATED',
    status
})

export const fetchUserRequest = () => ({
        type: 'FETCH_USER_REQUEST'
    }
)

export const fetchUserSuccess = (data) => ({
        type: 'FETCH_USER_SUCCESS',
        data
    }
)

export const fetchUserFailure = (errors) => ({
        type: 'FETCH_USER_FAILURE',
        errors
    }
)


