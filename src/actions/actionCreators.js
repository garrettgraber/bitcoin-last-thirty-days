import Actions from '../constants/actionTypesModule.js';

export function newSelectedPrice(priceData) {
	return {
		type: Actions.SET_SELECTED_PRICE,
		payload: priceData
	}
}
export function selectedPriceIsNA() {
	return {
		type: Actions.SET_SELECTED_PRICE_NA
	}
}

export function newSelectedRow(rowNumber) {
	return {
		type: Actions.SET_SELECTED_ROW,
		payload: rowNumber
	}
}
export function selectedRowIsNA() {
	return {
		type: Actions.SET_SELECTED_ROW_NA
	}
}