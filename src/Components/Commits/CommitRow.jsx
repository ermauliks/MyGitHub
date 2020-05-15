import React from 'react';
import { GoHistory } from 'react-icons/go';

function CommitRow(props) {
	let {commit} = props;
  let maxChar = 95;
	
  return (
  	<li key={commit.sha}>
      <h5 className="commit_title">
        <a title={commit.commit.message} href={commit.html_url}>
          {commit.commit.message.length > maxChar ? commit.commit.message.substr(0, maxChar) + '...' : commit.commit.message}
        </a>
      </h5>
      <p className="meta-data">
        <a rel="noopener noreferrer" target="_blank" className="meta-data_attr" href={commit.author && commit.author.html_url} title={commit.commit.author.name}>
          {commit.author && <img alt={commit.commit.author.name} height={20} src={commit.author.avatar_url} />}
        </a>
        <a rel="noopener noreferrer" target="_blank" href={commit.author && commit.author.html_url} className="meta-data_attr" title={commit.commit.author.email}>
          {commit.author ? commit.author.login : 'Build'}
        </a>
        <span className="meta-data_attr" title={commit.commit.author.date}><GoHistory/>
          {new Date(commit.commit.author.date).toDateString()}
        </span>
      </p>
    </li>
	)
}

export default CommitRow;