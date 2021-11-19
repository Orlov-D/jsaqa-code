const { clickElement } = require('./lib/commands.js');
const { bookingSomeChairs, successBooking } = require('./lib/util.js');

let page;
let day = '.page-nav > a:nth-child(3)';
let time = 'a.movie-seances__time';
let button = 'button.acceptin-button';

beforeEach(async () => {
	page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
	page.close();
});

describe('Netology.ru tests', () => {
	beforeEach(async () => {
		page = await browser.newPage();
		await page.goto('http://qamid.tmweb.ru/client/index.php');
	});

	test('Successful booking 1 ticket', async () => {
		await bookingSomeChairs(page, day, time, button, 'chair 3');
		await successBooking(
			page,
			'Покажите QR-код нашему контроллеру для подтверждения бронирования.'
		);
	});

	test('Successful booking 2 tickets', async () => {
		await bookingSomeChairs(page, day, time, button, 'chair 7', 'chair 8');
		await successBooking(
			page,
			'Покажите QR-код нашему контроллеру для подтверждения бронирования.'
		);
	});

	test('Should not booking ticket', async () => {
		await bookingSomeChairs(page, day, time, button, 'chair 2');
		await successBooking(
			page,
			'Покажите QR-код нашему контроллеру для подтверждения бронирования.'
		);
		await page.goto('http://qamid.tmweb.ru/client/index.php');
		await clickElement(page, day);
		await clickElement(page, time);
		await clickElement(page, 'chair 2');
		expect(
			String(
				await page.$eval('button', (button) => {
					return button.disabled;
				})
			)
		).toContain('true');
	});
});
