const LogOut = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.replace("/login");
};

export default LogOut;
