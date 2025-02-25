import axios from 'axios';
import * as cheerio from 'cheerio';

export class Scrapper {
    constructor() {
        this.url = 'https://www.eltoque.com/'
    }

    async #scrap() {
        try {
            const { data } = await axios.get(this.url);
            const $ = cheerio.load(data);
            const currencies = [];
            const prices = [];

            $('span.currency').each((i, elem) => {
                if (i < 3) {
                    currencies.push($(elem).text().replace('1 ', ''));
                }
            });

            $('span.price-text').each((i, elem) => {
                if (i < 3) {
                    prices.push($(elem).text());
                }
            });

            const result = {};

            for (let i = 0; i < 3; i++) {
                result[currencies[i]] = prices[i];
            }

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async get() {
        return this.#scrap();
    }
}