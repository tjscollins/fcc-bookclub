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

export const updateLoans = (loans) => {
  return {
    type: 'UPDATE_LOANS',
    loans,
  };
};

export const borrowBook = (loan) => {
  return {
    type: 'BORROW_BOOK',
    loan,
  };
};

// library actions
export const setLibrary = (library) => {
  return {
    type: 'SET_LIBRARY',
    library,
  };
};
