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
import {Header} from 'Header';

describe('Header', () => {
  it('should exist', () => {
    expect(Header).toExist();
  });

  it('should render without errors', () => {
    try {
      let header = TestUtils.renderIntoDocument(<Header />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
