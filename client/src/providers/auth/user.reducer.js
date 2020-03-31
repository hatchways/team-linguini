
const init = {
    isFetching: false,
    data: null,
    errors: null
}

const userReducer = (state=init, action) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return {...state, isFetching: true};
        case 'FETCH_USER_SUCCESS':
            return { isFetching: false, data: action.data, errors: null}
        case 'FETCH_USER_FAILURE':
            return { isFetching: false, data: null, errors: action.errors}
        default:
            return state;
    }

}

export default userReducer;