import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import BitCoinTable from './dataTable/BitCoinTable.jsx';
import {
	AppContainerStyle,
	TableTitleStyle
} from './AppStyles.js';

const title = 'Data Table of Bitcoin Prices over 30 Days';

class App extends React.Component {
	constructor(props) {
    super(props);
	}

	render() {
		return (
			<div style={AppContainerStyle}>
		  	<div style={TableTitleStyle}>{title}</div>
		  	<BitCoinTable />
		  </div>
    );
	}
}


const mapStateToProps = (state = {}) => {
  return Object.assign({}, state);
};

export default connect(mapStateToProps)(App);