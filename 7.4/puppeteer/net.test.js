let page;

beforeEach(async () => {
	page = await browser.newPage();
	await page.goto('https://netology.ru');
}, 30000);

afterEach(() => {
	page.close();
});

describe('Netology.ru tests', () => {
	beforeEach(async () => {
		await page.goto('https://netology.ru');
	});
	test("The first test'", async () => {
		const title = await page.title();
		console.log('Page title: ' + title);
		const firstLink = await page.$('header a + a');
		await firstLink.click();
		await page.waitForNavigation();
		const title2 = await page.title();
		console.log('Page title: ' + title2);
		const pageList = await browser.newPage();
		await pageList.goto('https://netology.ru/navigation');
		await pageList.waitForSelector('h1');
	}, 19000);

	test("The first link text 'Медиа Нетологии'", async () => {
		const actual = await page.$eval('header a + a', (link) => link.textContent);
		expect(actual).toContain('Медиа Нетологии');
		await page
			.waitForTimeout(1000)
			.then(() => console.log('Waited a second! Second time'));
	});

	test("The first link leads on 'Медиа' page", async () => {
		await page.click('header a + a');
		await page.waitForSelector('.logo__media', {
			visible: true,
		});
		const actual = await page.$eval('.logo__media', (link) => link.textContent);
		expect(actual).toContain('Медиа');
		await page
			.waitForTimeout(1000)
			.then(() => console.log('Waited a second! Third time'));
	});
});

test("Title should be 'Вакансии в Нетологии – найти работу'", async () => {
	await page.goto('https://netology.ru/job', { waitUntil: 'load' });
	expect(await page.title()).toContain('Вакансии в Нетологии – найти работу');
}, 15000);

test("Title should be 'Станьте экспертом Нетологии – присоединиться к команде'", async () => {
	await page.goto('https://netology.ru/experts', { waitUntil: 'load' });
	expect(await page.title()).toContain(
		'Станьте экспертом Нетологии – присоединиться к команде'
	);
}, 15000);

test("Title should be 'Партнерская программа и информационная поддержка'", async () => {
	await page.goto('https://netology.ru/partners', { waitUntil: 'load' });
	expect(await page.title()).toContain(
		'Партнерская программа и информационная поддержка'
	);
}, 15000);
