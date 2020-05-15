import React from 'react';
import { GoLocation, GoMail, GoLink } from 'react-icons/go';

function ProjectTop(props) {
	let { org } = props;
  return (
    <div className="project-top">
      <div className="container layout-row">
        <div>
          <img height="100" alt={org.name} src={org.avatar_url} />
        </div>
        <div className="project-top_details">
          <h2>{org.name}</h2>
          <p className="text-grey">{org.description}</p>
          <div className="meta-data project-top_details_meta">
            <span className="meta-data_attr"><a href={org.blog}><GoLink/>{org.blog}</a></span>
            <span className="meta-data_attr"><GoMail/> {org.email}</span>
            <span className="meta-data_attr"><GoLocation/> {org.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectTop;
