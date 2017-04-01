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
import {Settings} from 'Settings';

describe('Settings', () => {
  it('should exist', () => {
    expect(Settings).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<Settings />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
