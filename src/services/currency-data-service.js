export default class CurrencyDataService {
    constructor() {
        this._apiBase = 'https://www.cbr-xml-daily.ru/daily_json.js';
    }
    async getData() {
        const res = await fetch(this._apiBase);
        if(!res.ok) throw new Error(`Could not fetch data, received ${res.status}`)
        const data = await res.json();
        return this.transformData(data.Valute);
    }
    transformData(data) {
        const dictionary = new Map([
            ["AUD", "Австралийский доллар"], ["AZN", "Азербайджанский манат"], ["USD", "Доллар США"],
            ["GBP", "Фунт стерлингов Соединенного королевства"], ["TMT", "Новый туркменский манат"],
            ["BYN", "Белорусский рубль"], ["BGN", "Болгарский лев"], ["BRL", "Бразильский реал"],
            ["HUF", "Венгерский форинт"], ["HKD", "Гонконгский доллар"], ["DKK", "Датская крона"],
            ["XDR", "СДР (специальные права заимствования)"], ["EUR", "Евро"], ["RON", "Румынский лей"],
            ["CAD", "Канадский доллар"], ["KGS", "Киргизский сом"], ["KZT", "Казахстанский тенге"],
            ["CNY", "Китайский юань"], ["SGD", "Сингапурский доллар"], ["ZAR", "Южноафриканский рэнд"],
            ["MDL", "Молдавский лей"],  ["INR", "Индийская рупия"], ["KRW", "Вон Республики Корея"],
            ["NOK", "Норвежская крона"], ["AMD", "Армянский драм"], ["UAH", "Украинский гривна"],
            ["PLN", "Польский злотый"], ["CHF", "Швейцарский франк"], ["SEK", "Шведская крона"],                   
            ["TJS", "Таджикский сомон"], ["UZS", "Узбекский сум"], ["CZK", "Чешская крона"],
            ["TRY", "Турецкая лира"], ["JPY", "Японская иена"]
        ]);
        const base = {
            id: 'R00000',
            charCode: 'RUB',
            name: 'Российский рубль',
            value: 1,
            previous: 1,
            base: true,
        };
        const transformedData = Object.values(data).map((item) => {
            return {
                id: item.ID,
                charCode: item.CharCode,
                name: dictionary.get(item.CharCode),
                value: item.Value / item.Nominal,
                previous: item.Previous / item.Nominal,
            }
        });
        transformedData.push(base);
        return transformedData;
    }
}