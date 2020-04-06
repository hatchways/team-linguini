/*
 * Create a wrapper function that add the token as config into fetch() function
 */

export const authFetch = (...args) => {
    let token = localStorage.getItem('access_token') || null
    let config = {}

    if(token) {
        config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
    }
    else {
        throw "No token saved! Please login again.";
        //redirect to login page
        // window.location.replace("/login")
        console.log("no token saved")
        return;
    }

    return fetch(...args, config);
}