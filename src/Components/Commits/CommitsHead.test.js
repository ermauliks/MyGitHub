import React from 'react';
import ReactDOM from 'react-dom';
import CommitsHead from './CommitsHead';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommitsHead />, div);
  ReactDOM.unmountComponentAtNode(div);
});
