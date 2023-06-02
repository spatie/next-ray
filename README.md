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
In server components:
```tsx
import ray from 'next-ray';

ray('hello world');
```

In client components:

```tsx
'use client';
import ray, { useRay, useRayWithElement, Ray } from 'next-ray';
import { useEffect } from 'react';

export default function MyComponent() {
    const [count, setCount] = useState(0);
    useRay(count);
    
    useEffect(() => {
        ray('Hello Ray');
    }, []);
    
    const countRef = useRef(null);
    
    useRayWithElement(countRef, [count]);
    
    return (
        <Ray dependencies={[count]}>
            <div>
                <div ref={countRef}>Current count: {count}</div>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        </Ray>
    );
}
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
