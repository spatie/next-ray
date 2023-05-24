import { Ray, ray } from 'node-ray/web';

Ray.useDefaultSettings({
	remote_path: 'webpack-internal:\/\/\/(sc_server|sc_client|app-client)\/\.',
	local_path: process.env.LOCAL_PATH,
	sending_payload_callback: (instance: any, payloads: { data: { origin: any; }; }[] | { data: any; toArray: (() => { type: string; content: { label: string; }; origin: any; }) | (() => { type: string; content: { color: string; }; origin: any; }) | (() => { type: string; content: { label: string; }; origin: any; }) | (() => { type: string; content: { color: string; }; origin: any; }) | (() => { type: string; content: { label: string; }; origin: any; }) | (() => { type: string; content: { color: string; }; origin: any; }); }[]) => {
		switch (payloads[0].data.origin.file.match(/webpack-internal:\/\/\/(?<type>sc_server|sc_client|app-client)\/\./).groups.type) {
			case 'sc_server':
				payloads.push({ data: payloads[0].data, toArray: () => ({
						type: 'label',
						content: { label: 'RSC' },
						origin: payloads[0].data.origin,
					})});
				payloads.push({ data: payloads[0].data, toArray: () => ({
						type: 'color',
						content: { color: 'green' },
						origin: payloads[0].data.origin,
					})});
				break;
			case 'sc_client':
				payloads.push({ data: payloads[0].data, toArray: () => ({
						type: 'label',
						content: { label: 'SSR' },
						origin: payloads[0].data.origin,
					})});
				payloads.push({ data: payloads[0].data, toArray: () => ({
						type: 'color',
						content: { color: 'orange' },
						origin: payloads[0].data.origin,
					})});
				break;
			case 'app-client':
				payloads.push({ data: payloads[0].data, toArray: () => ({
						type: 'label',
						content: { label: 'Browser' },
						origin: payloads[0].data.origin,
					})});
				payloads.push({ data: payloads[0].data, toArray: () => ({
						type: 'color',
						content: { color: 'blue' },
						origin: payloads[0].data.origin,
					})});
				break;
		}
	},
});

export default ray;