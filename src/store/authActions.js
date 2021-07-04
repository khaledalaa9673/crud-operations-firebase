
// this actions will fires inside the onAuthStateChange method which fires when the auth state change
// change the redux state

export const login = (userId) => ({
    type: 'LOGIN',
    userId
});

 
 
export const logout = () => ({
    type: 'LOGOUT'
});
  