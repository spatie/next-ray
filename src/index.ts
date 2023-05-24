import { RefObject, useEffect, useRef } from 'react';
import { ray, Ray } from 'node-ray/web';

Ray.useDefaultSettings({
	remote_path: 'webpack-internal:\/\/\/(sc_server|sc_client|app-client)\/\.',
	local_path: '/Users/sam/Development/Spatie/rsc-demo',
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



export const useRay = (value: any, options = { replace: false, type: 'toJson' }) => {
	const rayRef = useRef(ray());

	useEffect(() => {
		if (options.replace !== true) {
			rayRef.current = ray();
		}

		rayRef.current[options.type ?? 'toJson'](value);
	}, [ value ]);
};


export const useRayWithElement = (ref: RefObject<HTMLElement>, dependencies: Array<any> = [], options = { replace: true }) => {
	const rayRef = useRef(ray());

	useEffect(() => {
		if (!options.replace) {
			rayRef.current = ray();
		}

		if (ref.current) {
			rayRef.current.html(ref.current.innerHTML);
		}
	}, dependencies);
};
