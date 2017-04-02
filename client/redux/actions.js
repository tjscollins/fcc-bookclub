//user session actions
export const login = (xAuth, userId, email) => {
  return {type: 'LOGIN', xAuth, userId, email};
};

export const logout = () => {
  return {type: 'LOGOUT'};
};

export const addBook = (book) => {
  return {
    type: 'ADD_BOOK',
    book,
  };
};

export const setBookCollection = (books) => {
  return {
    type: 'SET_BOOKS',
    books,
  };
};

export const setProfile = (profile) => {
  return {
    type: 'SET_PROFILE',
    profile,
  };
};
