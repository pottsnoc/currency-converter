export default class CurrencyDataService {
    constructor() {
        this._apiBase = 'https://www.cbr-xml-daily.ru/daily_json.js';
    }
    async getData() {
        const res = await fetch(this._apiBase);
        if(!res.ok) throw new Error(`Could not fetch data, received ${res.status}`)
        const data = await res.json();
        return data.Valute;
    }
}