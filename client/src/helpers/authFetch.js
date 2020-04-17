/*
 * Create a wrapper function that add the token as config into fetch() function
 */

export const authFetch = async (url, config = {}) => {
  let token = JSON.parse(localStorage.getItem("token")) || null;

  if (token) {
    config.headers = {
      authorization: "Bearer " + token.toString(),
      "Content-Type": "application/json",
    };
    // config.body = JSON.stringify(data);
  } else {
    // throw "No token saved! Please login again.";
    // redirect to login page
    window.location.replace("/login");
    console.log("no token saved");
    return;
  }

  try {
    const res = await fetch(url, config);
    return res;
  } catch (e) {
    return e;
  }
};
