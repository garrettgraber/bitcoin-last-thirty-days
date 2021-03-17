import { createStore, combineReducers } from 'redux';
import Actions from '../constants/actionTypesModule.js';
import CONSTANTS from '../constants/constants.js';

const { NA } = CONSTANTS;

function selectedPrice(state = NA,  action) {
	switch (action.type) {
		case Actions.SET_SELECTED_PRICE:
			return action.payload;
		case Actions.SET_SELECTED_PRICE_NA:
			return NA;
		default:
			return state;
	}
}

function selectedRow(state = NA,  action) {
	switch (action.type) {
		case Actions.SET_SELECTED_ROW:
			return action.payload;
		case Actions.SET_SELECTED_ROW_NA:
			return NA;
		default:
			return state;
	}
}

export default combineReducers({
	selectedPrice,
	selectedRow
});