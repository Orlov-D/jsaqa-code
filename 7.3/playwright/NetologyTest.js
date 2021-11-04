const { chromium } = require("playwright");
const user = require("../playwright/user");
const { test, expect } = require("@playwright/test");

(async () => {
	const browser = await chromium.launch({
		headless: false,
		slowMo: 5000,
		// devtools: true
		// node NetologyTest.js
	});
	const page = await browser.newPage();
	await page.goto("https://netology.ru/?modal=sign_in");
	await page.fill('[placeholder="Email"]', user.email);
	await page.fill('[placeholder="Пароль"]', user.pass);
	await page.click("text=Войти");

	await expect(page).toHaveURL("https://netology.ru/profile");

	await browser.close();
})();

(async () => {
	const browser = await chromium.launch({
		headless: false,
		slowMo: 5000,
		// devtools: true
		// node NetologyTest.js
	});
	const page = await browser.newPage();
	await page.goto("https://netology.ru/?modal=sign_in");
	await page.fill('[placeholder="Email"]', "user@email.com");
	await page.fill('[placeholder="Пароль"]', "user.pass");
	await page.click("text=Войти");

	await expect(
		page.locator("text=Вы ввели неправильно логин или пароль")
	).toBeVisible();

	await browser.close();
})();
