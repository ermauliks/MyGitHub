import React from 'react';

import './Loading.scss';

function Loading(props) {
	let {texts} = props;
	return (
		<div className="loading">{texts}</div>
	)
}

export default Loading;
