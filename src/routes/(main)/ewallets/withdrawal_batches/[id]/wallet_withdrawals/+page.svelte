<script>
	import Datatable from '$lib/components/Datatable.svelte';
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	onMount(async () => {});

	let module = data.module,
		batch_id = data.id,
		inputs = data.inputs;
	import { buildQueryString, postData } from '$lib/index.js';
	import { PHX_HTTP_PROTOCOL, PHX_ENDPOINT } from '$lib/constants';
	var url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;
</script>

<Datatable
	data={{
		appendQueries: { withdrawal_batch_id: data.id },
		inputs: inputs,
		join_statements: JSON.stringify([
			// { corporate_account: 'corporate_account' },
			{ user: 'user' }
		]),
		search_queries: ['b.username'],
		model: module,
		preloads: ['user'],
		customCols: [
			{
				title: 'General',
				list: [
					'id',
					'user_id',
					'amount',
					'bank_name',
					'bank_account_number',
					'remarks',
					{
						label: 'withdrawal_batch_id',
						selection: 'WithdrawalBatch',
						customCols: null,
						search_queries: ['a.code'],
						newData: 'code',
						title_key: 'code'
					}
					// { label: 'is_approved', boolean: true }
				]
			}
		],
		buttons: [],
		columns: [
			{ label: 'ID', data: 'id' },
			{ label: 'Timestamp', data: 'inserted_at', formatDateTime: true, offset: 8 },
		
			{ label: 'Bank', data: 'bank_name' },
			{ label: 'Acc No', data: 'bank_account_number' },
			{
				label: 'Paid?',
				data: 'is_paid',
				isBadge: true,
				color: [
					{
						key: false,
						value: 'yellow'
					},

					{
						key: true,
						value: 'green'
					}
				]
			},

			{ label: 'From', data: 'username', through: ['user'] },
			{ label: 'Request (USD)', data: 'amount', className: 'text-right' },
			{ label: 'Processing Fee (USD)', data: 'processing_fee', className: 'text-right' },
			{ label: 'Request (MYR)', data: 'amount_in_myr', className: 'text-right' },

			{ label: 'Processing Fee (MYR)', data: 'processing_fee_in_myr', className: 'text-right' },
			{ label: 'Pay Member (MYR)', data: 'final_amount_in_myr', className: 'text-right' },
			{ label: 'Remarks', data: 'remarks' }
		]
	}}
/>
