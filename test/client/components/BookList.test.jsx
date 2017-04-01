/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux'; import {configure} from
// 'configureStore';

/*----------Components----------*/
import {BookList} from 'BookList';

describe('BookList', () => {
  it('should exist', () => {
    expect(BookList).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<BookList />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
