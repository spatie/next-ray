'use client';

import React, { PropsWithChildren, RefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import ray from './index';

type LogType = 'interceptor'
	| 'client'
	| 'enable'
	| 'disable'
	| 'enabled'
	| 'disabled'
	| 'useClient'
	| 'project'
	| 'newScreen'
	| 'clearAll'
	| 'clearScreen'
	| 'color'
	| 'confetti'
	| 'screenColor'
	| 'label'
	| 'size'
	| 'remove'
	| 'hide'
	| 'notify'
	| 'toJson'
	| 'json'
	| 'file'
	| 'image'
	| 'die'
	| 'className'
	| 'error'
	| 'event'
	| 'exception'
	| 'ban'
	| 'charles'
	| 'table'
	| 'count'
	| 'clearCounters'
	| 'pause'
	| 'stopTime'
	| 'caller'
	| 'trace'
	| 'measure'
	| 'separator'
	| 'xml'
	| 'html'
	| 'text'
	| 'date'
	| 'raw'
	| 'send'
	| 'pass'
	| 'showApp'
	| 'hideApp'
	| 'macro'
	| 'htmlMarkup'
	| 'if'
	| 'limit'
	| 'once'
	| 'sendCustom';
export function useRay(value: any, options: { replace?: boolean, type?: LogType } = { replace: true, type: 'send' }) {
	const rayRef = useRef(ray());

	useEffect(() => {
		if (options.replace !== true) {
			rayRef.current = ray();
		}

		rayRef.current[options.type ?? 'send'](value);
	}, [ value ]);
}


export function useRayWithElement(ref?: RefObject<HTMLElement>, dependencies: Array<any> = [], options = { replace: true }) {
	const rayRef = useRef(ray());
	const innerRef = useRef<HTMLElement>(null);

	useLayoutEffect(() => {
		if (!options.replace) {
			rayRef.current = ray();
		}

		if (ref?.current) {
			rayRef.current.html(ref.current.outerHTML);
		} else if (innerRef.current) {
			rayRef.current.html(innerRef.current.outerHTML);
		}
	}, dependencies);

	return innerRef;
}

export function Ray({ children, dependencies }: PropsWithChildren<{ dependencies?: Array<any>}>) {
	const ref = useRef(null);
	useRayWithElement(ref, dependencies);

	return (<Slot ref={ref}>{children}</Slot>);

}

export default ray;