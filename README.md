# Next.js integration for Ray

[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]

![og.png](img%2Fog.png)

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/spatiebe.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/spatie.be)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).


## Installation
```bash
npm install next-ray
```

```bash
yarn add next-ray
```

Add your project dir path as `LOCAL_PATH` to your `.env`
![local_path.png](img%2Flocal_path.png)

## Usage
This package provides a `ray` function that behaves like the node-ray `ray` function with as much next.js context as possible.


From anywhere in your project you can use the ray export to send logs to your Ray app.
```tsx
import ray from 'next-ray';

ray('hello world');
```

### client components
When working in a client react context this package provides some more advanced options.

`useRay` — a hook that sends the value of a variable to your Ray app when it mutates.
```tsx
'use client';
import { useRay } from 'next-ray/client';

export default function MyComponent() {
    const [count, setCount] = useState(0);
    useRay(count);

    return (
        <button onClick={() => setCount(count + 1)}>
            Increment ({count})
        </button>
    );
}
```s

`Ray` — a component that can be wrapped around any part of your app to send it's HTML to your Ray app.
```tsx
'use client';
import { Ray } from 'next-ray/client';

export default function MyComponent({ count, increment }) {
    return (
        <Ray dependencies={[count]}>
            <button onClick={increment} className="bg-purple-500 rounded-full text-white/80">
                Increment ({count})
            </button>
        </Ray>
    );
}
```

`useRayWithElement` — a hook version of the `Ray` component.

```tsx
'use client';
import { useRayWithElement } from 'next-ray/client';
import { forwardRef } from 'react';

export default function MyComponent({ count, increment }) {
	const ref = useRayWithElement(null, [count]);

	return (
		<button ref={ref} onClick={increment} className="bg-purple-500 rounded-full text-white/80">
			Increment ({count})
		</button>
	);
}

const MyForwardRefComponent = forwardRef(function MyComponent({ count, increment }, ref) {
	useRayWithElement(ref, [count]);

	return (
		<button ref={ref} onClick={increment} className="bg-purple-500 rounded-full text-white/80">
			Increment ({count})
		</button>
	);
});
```

## Development
To install dependencies:

```bash
bun install
```

To build:

```bash
 bun build ./src/* --outdir ./dist --sourcemap=external --external '*'
```

[downloads-img]:https://img.shields.io/npm/dt/next-ray
[downloads-url]:https://www.npmtrends.com/next-ray
[npm-img]:https://img.shields.io/npm/v/next-ray
[npm-url]:https://www.npmjs.com/package/next-ray
[issues-img]:https://img.shields.io/github/issues/spatie/next-ray
[issues-url]:https://github.com/spatie/next-ray/issues
