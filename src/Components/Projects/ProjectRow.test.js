import React from 'react';
import ReactDOM from 'react-dom';
import ProjectRow from './ProjectRow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectRow project={'project'} orgName={'orgName'}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
