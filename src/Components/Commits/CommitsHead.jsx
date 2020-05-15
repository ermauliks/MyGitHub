import React from 'react';
import { GoRepo } from 'react-icons/go';

function CommitsHead(props) {
	let {orgName, projectName} = props;
  return (
  	<h4>
  		<a href={`/${orgName}`}><GoRepo/> {orgName}</a> {'›'} <span>{projectName}</span> {'›'} <span>{'Master'}</span>
	</h4>
	)
}

export default CommitsHead;

