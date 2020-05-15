import React from 'react';
import ReactDOM from 'react-dom';
import CommitGroup from './CommitGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommitGroup />, div);
  ReactDOM.unmountComponentAtNode(div);
});
