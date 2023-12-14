/** @type {import('./$types').PageLoad} */
import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
import { buildQueryString, postData } from '$lib/index.js';
	
export const load = async ({ fetch, params, parent }) => {
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;

    const apiData = {
        scope: 'yearly_sales_performance'
    };
    const queryString = buildQueryString(apiData);
    const response = await fetch(url + '/svt_api/webhook' + `?${queryString}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        let res = await response.json();
        return {
            chartData: res
        };
    }
  
};