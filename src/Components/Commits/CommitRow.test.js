import React from 'react';
import ReactDOM from 'react-dom';
import CommitRow from './CommitRow';

it('renders without crashing', () => {
  const commit = {
  	'sha': 'something',
  	'commit': { 'message': 'message', 'author': { 'name': 'name' } },
  }
  const div = document.createElement('div');
  ReactDOM.render(<CommitRow commit={commit}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
