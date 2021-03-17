import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import BitCoinDayRow from './BitCoinDayRow.jsx';
import {
	BitCoinTableHeaderStyle,
	BitCoinTableStyle
} from './BitCoinTableStyles.js';

class BitCoinTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	bitCoinData: []
    };
  }

  componentDidMount() {
  	fetch('/thirty-days')
			.then(res => res.json())
			.then(result => {
				this.setState({bitCoinData: result});
			});
  }

  render() {
  	const { bitCoinData } = this.state;

  	return (
  		<div>
  			{bitCoinData.length > 0?
  				<table style={BitCoinTableStyle}>
  					<thead style={BitCoinTableHeaderStyle}>
	  					<tr>
	  						<th>Date (GMT)</th>
						    <th>Price ($)</th>
						    <th>Direction</th>
						    <th>Change ($)</th>
						    <th>Day of the Week</th>
	  					</tr>
  					</thead>
  					<tbody>
	  					{bitCoinData.map(el => <BitCoinDayRow
	  							key={el.date}
	  							date={el.date}
	  							dayNumber={el.dayNumber}
	  							price={el.price}
	  							direction={el.direction}
	  							change={el.change}
	  							dayOfWeek={el.dayOfWeek}
	  						/>)}
  					</tbody>
      		</table>
      		:
      		null
  			}
  		</div>      
  	);
  }
}


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};

export default connect(mapStateToProps)(BitCoinTable);