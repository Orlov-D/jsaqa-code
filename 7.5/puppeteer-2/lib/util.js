const { clickElement, getText } = require('./commands.js');
module.exports = {
	bookingSomeChairs: async function (
		page,
		day,
		time,
		button,
		...chairSelector
	) {
		await clickElement(page, day); //choose day
		await clickElement(page, time); //choose time
		for (let i = 0; i < chairSelector.length; i++) {
			await clickElement(
				page,
				`.buying-scheme__row > span:nth-child(${chairSelector[i]
					.split(' ')
					.pop()})`
			); //choose chair
		}
		await clickElement(page, button); //click booking
		// await clickElement(page, button); //click for qr!
	},
	successBooking: async function (page, text) {
		const actual = await getText(page, 'p.ticket__hint');
		expect(actual).toContain(text);
	},
};
