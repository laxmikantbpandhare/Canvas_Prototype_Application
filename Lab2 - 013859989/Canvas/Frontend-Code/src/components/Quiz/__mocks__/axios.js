// import { data as data } from './login';

// const BOOKS_ENDPOINT = 'http://localhost:3000/login';

// module.exports = {
//   post: jest.fn((url) => {
//     switch (url) {
//       case BOOKS_ENDPOINT:
//         return Promise.resolve({
//           data: data
//         });
//     }
//     console.log("chkdsk");
//   })
// };

import React from 'react';
import { shallow } from 'enzyme';

import createquiz from '../CreateQuiz';

describe('createquiz', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<createquiz debug />);
  
    expect(component).toMatchSnapshot();
  });
});
