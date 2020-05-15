import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../Loading';
import ProjectRow from './ProjectRow';
import ProjectTop from './ProjectTop';
import Error from '../Error';
import { api } from '../../Const';

import './Projects.scss';

class Projects extends React.Component {
    _isMounted = false;
    
    constructor() {
      super();
      this.state = {
        error: null,
        projects: [],
        totalRepo: null,
        orgName: null,
        org: null,
        hasMoreItems: true,
        perPage: 15,
        page: 1
      };
    }

    componentDidMount() {
      this._isMounted = true;

      let { orgName } = this.props.match.params;

      axios.get(api.baseUrl + `/orgs/${orgName || 'Yelp'}`)
        .then((response) => {
          if(response) {
            this.setState({
              org: response.data
            });
          }
        }).catch((error) => {
          this.setState({error});
        });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    loadItems(page) {
      let { orgName } = this.props.match.params;

      axios.get(api.baseUrl + '/search/repositories', {
        params: {
          'q': `org:${orgName || 'Yelp'}`,
          'per_page': this.state.perPage,
          'page': this.state.page,
          'sort': 'forks'
        }
      }).then((response) => {
        if(response) {
          var {projects} = this.state;

          this.setState({totalRepo:response.data.total_count})

          response.data.items.map(project => projects.push(project));

          if(response.data.total_count > (this.state.perPage * this.state.page)) {
            this.setState({
              projects: projects,
              page: this.state.page + 1
            });
          } else {
            this.setState({
              hasMoreItems: false
            });
          }
        }
      }).catch((error) => {
        this.setState({error});
      });
    }

    getProjects() {
      let items = [];
      let { orgName } = this.props.match.params;

      this.state.projects.forEach((project, i) => {
        items.push(<ProjectRow key={i} orgName={orgName || 'Yelp'} project={project} />)
      });

      return items;
    }

    getProjectListTitle() {
      return `Repositories for ${this.props.match.params.orgName || 'Yelp'}: ${this.state.totalRepo}`;
    }

    render() {
      let content;

      if (this.state.error) {
        let { message } = this.state.error.response.data;
        content = <Error texts={message} />
      } else  {
        content = (
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={<Loading key={1} texts="Loading Repositories..." />}>
            <ul className="projects">
              {this.getProjects()}
            </ul>
          </InfiniteScroll>
        )
      }
      return (
        <div>
          {this.state.org && <ProjectTop org={this.state.org}/>}
          <div className="container">
            { this.state.totalRepo && (<h4>{this.getProjectListTitle()}</h4>) }
            {content}
          </div>
        </div>
      );
    }
}

export default Projects;
