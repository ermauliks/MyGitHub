import React from 'react';

import './NoMatch.scss';

class NoMatch extends React.Component {
    render() {
      return (
        <div className="NoMatch">
        	{`Sorry, page not found. Check the URL you're trying to visit.`}
        </div>
      );
    }
}

export default NoMatch;