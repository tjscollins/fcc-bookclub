/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import Header from 'Header';

describe('Header', () => {
  it('should exist', () => {
    expect(Header).toExist();
  });

  it('should render without errors', () => {
    try {
      const initialState = {
        userSession: {
          xAuth: null
        }
      };
      TestUtils.renderIntoDocument(
        <Provider store={configureStore(initialState)}>
          <Header />
        </Provider>
      );
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
