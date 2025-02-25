# uuid4

A Node.js module for generating and validation V4 UUIDs

NOTE: as of Version 2, legacy browsers are no longer supported, you can keep using 1.x if you need
to support modern and legacy browsers.

## Install

```bash
$ npm install uuid4
```

## Usage

```javascript
import uuid4 from "uuid4";

// Generate a new UUID
var id = uuid4();

// Validate a UUID as proper V4 format (case-insensitive)
uuid4.valid(id); // true
```

### Direct in Browser or Deno

```
import uuid4 from 'https://cdn.jsdelivr.net/gh/tracker1/node-uuid4/browser.mjs';

// or

const { default: uuid4 } = await import('https://cdn.jsdelivr.net/gh/tracker1/node-uuid4/browser.mjs')
```

### Deno

Use the canonical implementation instead.

```
import { v4 as uuid4 } from "https://deno.land/std/uuid/mod.ts";

const id = uuid4.generate();

console.log(id);
console.log(uuid4.validate(id));
```

## License

ISC License
