# next-ray

## Installation
```bash
npm install next-ray
```
add your project dir path as `LOCAL_PATH` to your `.env`
> e.g.: `LOCAL_PATH=/Users/sam/Projects/my-awesome-website`

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
 bun build ./src/index.ts --outdir ./dist --sourcemap=external --external '*'
```