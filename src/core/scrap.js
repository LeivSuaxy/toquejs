const axios = require('axios');
const cheerio = require('cheerio');

export class Scrapper {
    constructor() {
        this.url = 'https://www.eltoque.com/'
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    }

    async #parse() {

    }

    async #scrap() {

    }

}