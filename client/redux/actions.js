//user session actions
export const login = (xAuth, userId, email) => {
  return {type: 'LOGIN', xAuth, userId, email};
};

export const logout = () => {
  return {type: 'LOGOUT'};
};
