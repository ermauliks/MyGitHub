import React from 'react';
import axios from 'axios';
import CommitRow from './CommitRow';
import CommitGroup from './CommitGroup';
import CommitsHead from './CommitsHead';
import Loading from '../Loading';
import Error from '../Error';
import { api } from '../../Const';

import './Commits.scss';

const parse = require('parse-link-header');
const queryString = require('query-string');

class Commits extends React.Component {
    constructor() {
      super();
      
      this.state = {
        loading: true,
        commits: [],
        dataAvailable: true,
        prevUrl: null,
        nextUrl: null
      };
    }

    componentDidMount() {
      this.fetchCommits();
    }

    getPrevUrl(orgName, project, link) {
      let page = parse(link).prev && parse(link).prev.page;
      if (page)
        return `/${orgName}/${project}/commits/master?page=${page}`;
      else 
        return null;
    }

    getNextUrl(orgName, project, link) {
      let page = parse(link).next && parse(link).next.page;
      if (page)
        return `/${orgName}/${project}/commits/master?page=${page}`;
      else
        return null;
    }

    fetchCommits() {
      let { orgName, project } = this.props.match.params;
      let { search } = this.props.location;
      let currentPage = queryString.parse(search).page;

      axios.get(api.baseUrl + `/repos/${orgName}/${project}/commits?page=${currentPage}`)
        .then((response) => {
          if(response.data.length) {
            var {commits} = this.state;

            response.data.map(commit => commits.push(commit));

            this.setState({
              dataAvailable: true,
              commits: commits,
              prevUrl: this.getPrevUrl(orgName, project, response.headers.link),
              nextUrl: this.getNextUrl(orgName, project, response.headers.link)
            });
          } else {
            this.setState({
              dataAvailable: false,
            })
          }
        }).then(() => {
          this.setState({
            loading: false
          });
        });
    }

    getCommitGroups() {
      let commits = {};
      this.state.commits.forEach((commit, i) => {
        let date = new Date(commit.commit.author.date).toDateString();
        commits[date] = commits[date] || [];
        commits[date].push(commit);
      });

      let groups = [];
      Object.keys(commits).forEach((key, index) => {
        let subItems = [];
        commits[key].forEach((commit, index) => {
          subItems.push(<CommitRow key={index} commit={commit}/>)
        });
        groups.push(<CommitGroup key={index} date={key} commits={subItems}/>);
      });

      return groups;
    }

    render() {
      let content;

      if (this.state.loading) {
        content = (
          <Loading texts="Loading commits..."/> 
        )
      } else if (this.state.dataAvailable) {
        content = (
          <div>
            <div className="commits">
              {this.getCommitGroups()}
            </div>
            <div className="actions">
              <a className="btn" disabled={this.state.prevUrl === null ? true : false} href={this.state.prevUrl}>Newer</a>
              <a className="btn" disabled={this.state.nextUrl === null ? true : false}  href={this.state.nextUrl}>Older</a>
            </div>
          </div>
        );
      } else {
        content = (
          <Error texts="Oops, something is wrong, please try again later." />
        )
      }

      return (
        <div className="container">
          <CommitsHead
            orgName={this.props.match.params.orgName}
            projectName={this.props.match.params.project}
          />
          {content}
        </div>
      )
    }
}

export default Commits;
