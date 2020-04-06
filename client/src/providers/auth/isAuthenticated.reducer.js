
const isAuthenticatedReducer = (state=false, action) => {
    switch (action.type) {
        case 'SET_IS_AUTHENTICATED':
            return action.status;
        default:
            return state;
    }
}

export default isAuthenticatedReducer;