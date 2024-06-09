# rofl-parser.js

This package is a simple library designed to parse and retrieve metadata in JSON format from League of Legends replay files (.rofl). With this tool, you can easily extract and analyze the metadata from your favorite game replays.

## Installation

```bash
npm install rofl-parser.js
yarn add rofl-parser.js
pnpm add rofl-parser.js
bun add rofl-parser.js
```

## Usage

Javascript

```js
const { ROFLReader } = require('rofl-parser.js');
const reader = new ROFLReader('./path_to_your_rofl_file.rofl');
const metadata = reader.getMetadata();

console.log(metadata);
```

Typescript

```ts
import { Metadata, ROFLReader } from "rofl-parser.js";

const reader: ROFLReader = new ROFLReader("./path_to_your_rofl_file.rofl");
const metadata: Metadata = reader.getMetadata();

console.log(metadata);
```

This will output the metadata of the replay file in JSON format.

```json
"gameLength": 2144974,
"lastGameChunkId": 74,
"lastKeyFrameId": 36,
"statsJson": [{...}, {...}, ...]
```

Please note that this library only parses the metadata of the replay files, it does not provide functionality to view the replays.
