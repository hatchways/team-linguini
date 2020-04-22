/*
 * Create a wrapper function that add the token as config into fetch() function
 */

export const authFetch = async (url, config={}) => {
    let token = JSON.parse(localStorage.getItem('token')) || null
    if(token) {
        config.headers = {
            'authorization': 'Bearer ' + token.toString(),
        };
    }
    else {
        console.log("no token saved")
        return new Error("no token saved");
    }

    try {
        console.log(config)
        const res = await fetch(url, config);
        return res;
    } catch (e) {
        return e;
    }
}
export const authJSONFetch = async (url, config={}) => {
    let token = JSON.parse(localStorage.getItem('token')) || null
    if(token) {
        config.headers = {
            'authorization': 'Bearer ' + token.toString(),
            'Content-Type': 'application/json'
        };
    }
    else {
        console.log("no token saved")
        return new Error("no token saved");
    }

    try {
        console.log(config)
        const res = await fetch(url, config);
        return res;
    } catch (e) {
        return e;
    }
}