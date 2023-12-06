/** @type {import('./$types').PageLoad} */
import { genInputs } from '$lib/index.js';
import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
export const load = async ({ fetch, params, parent }) => {

    let url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;

    let inputs = await genInputs(url, 'RoleAppRoute')

    return {
        role_id: params['role_id'],
        module: 'RoleAppRoute',
        inputs: inputs
    };
};