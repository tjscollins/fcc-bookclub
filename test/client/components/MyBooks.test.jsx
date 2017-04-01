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
import {MyBooks} from 'MyBooks';

describe('MyBooks', () => {
  it('should exist', () => {
    expect(MyBooks).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<MyBooks />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
