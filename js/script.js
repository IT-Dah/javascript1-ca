const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_RAINYDAYS_URL = `${API_BASE_URL}/rainy-days`;

import {doFetch} from './doFetch.js';

async function main() {
    const responseData = await doFetch(API_RAINYDAYS_URL);
    console.log(responseData);
}

main();