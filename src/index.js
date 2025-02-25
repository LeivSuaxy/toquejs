import {getUrl} from "./utils/utils.js";
import { Scrapper } from "./core/scrap.js";

export class ToqueJS {
    constructor(api_key=undefined) {
        if (api_key && typeof api_key !== "string") {
            throw new TypeError("api_key must be string");
        }

        this.api_key = api_key;
        this.headers = {
            'Authorization': `Bearer ${this.api_key}`
        }
    }

    async getToday(filters=undefined) {
        if(!this.api_key) return this.#getTodayScrap(filters);
        return await this.#getTodayAPI(filters);
    }

    async #getTodayAPI(filters=undefined) {
        const today = new Date().toISOString().split('T')[0];
        return await this.#doRequest(filters, today);
    }

    async #getTodayScrap(filters=undefined) {
        const scrapper = new Scrapper();
        return await scrapper.get();
    }

    async #doRequest(filters=undefined, date){
        const url = getUrl(date);

        return await fetch(url, {
            method: 'GET',
            headers: this.headers
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            return data.tasas;
        }).catch(error => {
            console.log('Error:', error);
            if (error.message.includes('Unexpected token')) {
                console.error('The response is not valid JSON. Please check the URL or the server response.');
            }
        });
    }

    #doScrap(filters=undefined) {
        // TODO Implement filters and use this function.
    }
}