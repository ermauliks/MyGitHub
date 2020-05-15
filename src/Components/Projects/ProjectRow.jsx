import React from 'react';
import { GoRepoForked, GoLaw, GoHistory, GoFileCode, GoRepo, GoStar } from 'react-icons/go';

function ProjectRow(props) {
	let { project, orgName } = props;

  return (
    <li key={project.id} className="projects_row">
      <a href={`/${orgName}/${project.name}/commits/master?page=1`}>
        <h3 className="project-row_header">
          <GoRepo/>{project.full_name}
        </h3>
      </a>

      <p className="text-grey project-row_description">{project.description}</p>

      <div className="meta-data">
        <span title={"Total forks for this repository"} className="meta-data_attr">
          <a href={`${project.html_url}/network/members`}><GoRepoForked/>{project.forks}</a>
        </span>  

        <span title={"Total stars for this repository"} className="meta-data_attr"><GoStar />{project.stargazers_count}</span>
        {project.license && <span className="meta-data_attr"><GoLaw />{project.license.name}</span>}

        <span title={`Last Update On ${new Date(project.updated_at).toDateString()}`} className="meta-data_attr">
          <GoHistory/>{new Date(project.updated_at).toDateString()}
        </span>
        <span className="meta-data_attr"><GoFileCode/>{project.language}</span>
      </div> 
    </li>
  )
}

export default ProjectRow;
