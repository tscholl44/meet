import puppeteer from 'puppeteer';


describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:5173/'); // If your Vercel app is running in a different port please update it here
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });


    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();   
    });
    
    test('User can expand an event to see its details', async () => {

        await page.click('.event .details-btn');

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});

describe('Filter events by city.', () => {
    let browser;
    let page;
    let eventListItems;
    beforeAll(async () => {
        browser = await puppeteer.launch({});
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
        eventListItems = await page.$$('.event');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
        expect(eventListItems.length).toBe(32);
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('.city', 'Berlin');
        const suggestions = await page.$$('.suggestions li');
        expect(suggestions.length).toBeGreaterThan(1);
    });

    test('User can select a city from the suggested list', async () => {
        await page.type('.city', 'Berlin');
        const suggestions = await page.$$('.suggestions li');
        await suggestions[0].click();
        const selectedCity = await page.$eval('.city', el => el.value);
        expect(selectedCity).toBe('Berlin');
    });
});