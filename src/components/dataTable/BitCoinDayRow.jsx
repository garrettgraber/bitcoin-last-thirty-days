import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { newSelectedPrice, newSelectedRow } from '../../actions/actionCreators.js';
import CONSTANTS from '../../constants/constants.js';
import {
  BaseEvenRowStyle,
  BaseRowStyle,
  CellDayOfTheWeekStyle,
  CellDirectionStyle,
  CellPriceStyle,
  CellStyle,
  SelectedRowStyle
} from './BitCoinDayRowStyles.js';

const { NA } = CONSTANTS;

const queryString = (date, price, previousPrice) => {
  return `priceDate=${date}&priceClick=${price}&previousPriceClick=${previousPrice}`;
};

class BitCoinDayRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick(e) {
    const {
      selectedPrice,
      price,
      date,
      dayNumber,
      selectedRow
    } = this.props;
    const currentRowIsNotSelected = dayNumber !== selectedRow;
    if(currentRowIsNotSelected || selectedPrice === NA) {
      this.props.dispatch(newSelectedPrice(price));
      this.props.dispatch(newSelectedRow(dayNumber));
    }
    if(currentRowIsNotSelected) {
      fetch('/save_hits?' + queryString(date, price, selectedPrice))
        .then(res => res.json())
        .then(result => {
          console.log('server echo: ', result);
        });
    }
  }

  render() {
    const {
      dayNumber,
      selectedRow
    } = this.props;
    const PriceStyle = Object.assign({}, CellPriceStyle, CellStyle);
    const DirectionStyle = Object.assign({}, CellDirectionStyle, CellStyle);
    const DayOfWeekStyle = Object.assign({}, CellDayOfTheWeekStyle, CellStyle);
    const evenNumberedDay = dayNumber % 2 === 0;
    const ColorShiftedRow = evenNumberedDay ? BaseEvenRowStyle : BaseRowStyle;
    const RowStyle = dayNumber === selectedRow ? SelectedRowStyle : ColorShiftedRow;
  	return (
      <tr onClick={(e) => this.onClick(e)} style={RowStyle}>
        <td style={CellStyle}>{this.props.date}</td>
        <td style={PriceStyle}>{this.props.price}</td>
        <td style={DirectionStyle}>{this.props.direction}</td>
        <td style={CellStyle}>{this.props.change}</td>
        <td style={DayOfWeekStyle}>{this.props.dayOfWeek}</td>
      </tr>                    
  	);
  }
}


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};

export default connect(mapStateToProps)(BitCoinDayRow);