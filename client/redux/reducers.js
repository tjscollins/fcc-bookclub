// export const reducer = (state = {}, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
//
export const libraryReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_LIBRARY':
      return action.library;
    default:
      return state;
  }
};

export const userSessionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      //store Login data to sessionStorage;
      let {xAuth, userId, email} = action;
      let bookBazaarLogin = {
        xAuth,
        _id: userId,
        email
      };
      sessionStorage.setItem('bookBazaar-login', JSON.stringify(bookBazaarLogin));
      return {
        ...state,
        ...bookBazaarLogin
      };
    case 'LOGOUT':
      sessionStorage.removeItem('bookBazaar-login');
      return {
        ...state,
        xAuth: null,
        _id: null,
        email: null,
        bookCollection: [],
      };
    case 'ADD_BOOK':
      let {book} = action;
      return {
        ...state,
        bookCollection: [
          ...state.bookCollection,
          book
        ],
      };
    case 'SET_BOOKS':
      return {
        ...state,
        bookCollection: action.books,
      };
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'UPDATE_LOANS':
      return {
        ...state,
        loans: {
          owner: [...action.loans[0]],
          borrower: [...action.loans[1]],
        },
      };
    case 'BORROW_BOOK':
      return {
        ...state,
        loans: {
          owner: [...state.loans.owner],
          borrower: [...state.loans.borrower, action.loan],
        },
      };
    default:
      return state;
  }
};
