const express = require("express")
const path = require("path");
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

const BitCoinPricePoint = require('./classes/BitCoinPricePoint.js');

fetch.Promise = Bluebird;

const bitcoinPricesLastThirtyDays = 'https://api.coinranking.com/v1/public/coin/1/history/30d';
const hostname = 'localhost';
const port = 3000;
const NA = 'na';

const app = express();

const distDirectory = path.join(__dirname, 'dist');
const htmlFile = path.join(distDirectory, 'index.html');

app.use(express.static(distDirectory));

app.get('/thirty-days', (req, res) => {
	fetch(bitcoinPricesLastThirtyDays)
    .then(res => res.json())
    .then(json => {
    	const bitCoinHistory = json.data.history;
    	const bitCoinPriceTimeTotals = bitCoinHistory.length;
    	let previousPrice = NA;
    	let dayNumber = 1;
    	const midnightDailyPriceData = [];

    	bitCoinHistory.forEach((PriceData, index) => {
    		const price = PriceData.price;
    		const timestamp = PriceData.timestamp;
    		const DateObject = new Date(timestamp);
    		const currentISOString = DateObject.toISOString();
    		const currentUTCTime = currentISOString.slice(-13, -5);

				if(currentUTCTime === '00:00:00') {	
  				const BitCoinDailyPrice = new BitCoinPricePoint(dayNumber, timestamp, price, previousPrice);
  				midnightDailyPriceData.push(BitCoinDailyPrice);
  				previousPrice = price;
  				dayNumber += 1;
  			}
    	});
    	res.json(midnightDailyPriceData);
    });
});

app.get('/', (req, res) => {
	res.sendFile(htmlFile);
});

app.get('/save_hits', (req, res) => {
	const queryParams = req.query;
	console.log('queryParams: ', queryParams);
	res.json({
		success: true,
		queryParams
	});
});

app.listen(port, () => {
	console.info('==> 🌎 Listening on port %s. Open up http://' + hostname + ':%s/ in your browser.', port, port);
});
