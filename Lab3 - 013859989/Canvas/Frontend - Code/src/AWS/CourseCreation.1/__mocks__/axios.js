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

import coursecreation from '../CourseCreation';

describe('coursecreation', () => {
  it('coursecreation should render correctly in "debug" mode', () => {

    const component = shallow(<coursecreation debug />);
  
    expect(component).toMatchSnapshot();
  });
});
