import React from 'react';
import { GoGitCommit } from 'react-icons/go';


function CommitGroup(props) {
	let {date, commits} = props;
  return (
  	<div className="commit-group">
      <div className="commit-group_title"><GoGitCommit/> Commmits on {date}</div>
      <ul className="commit-group_commits">{commits}</ul>
    </div>
	)
}

export default CommitGroup;