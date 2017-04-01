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
import {Register} from 'Register';

describe('Register', () => {
  it('should exist', () => {
    expect(Register).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<Register />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
