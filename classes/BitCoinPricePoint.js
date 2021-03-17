
const SAME = 'same';
const UP = 'up';
const DOWN = 'down';
const NA = 'na';

const dayArray = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday','Saturday'
];

const getDayName = dayNumber => dayArray[dayNumber];
const priceIsNA = price => price === NA;
const priceDirectionChange = (price, previousPrice) => {
	if(priceIsNA(previousPrice)) {
		return SAME;
	} else if(price > previousPrice) {
		return UP;
	} else if(price < previousPrice) {
		return DOWN;
	} else {
		return SAME;
	}
};

class BitCoinPricePoint {
	constructor(dayNumber, timestamp, price, previousPrice) {
		this.dayNumber = dayNumber;
		this.price = parseFloat(price);
		this.previousPrice = priceIsNA(previousPrice) ? previousPrice : parseFloat(previousPrice);
		this.timestamp = timestamp;
		this.direction = priceDirectionChange(price, previousPrice);
		this.change = priceIsNA(previousPrice) ? 0 : Math.abs(price - previousPrice);
		const DateObject = new Date(timestamp);
		const currentISOString = DateObject.toISOString();
		this.date = currentISOString.slice(0, -5);
		this.dayOfWeek = getDayName(DateObject.getUTCDay());
	}
}


module.exports = BitCoinPricePoint;