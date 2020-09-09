# noodle-cache

## Overview

A simple class for caching anything that it processes!

## Usage

```
// app.js
import Cache from 'noodle-cache';

// cache for 60s
const responseCache = new Cache(60);

function fetchData() {
  const callApiCallback = () => callApi();
  const requestHash = some_unique_key_representing_the_request;

  ...

  // either returns the cached item, or makes the call, stores the result, and returns new data
  return responseCache.processItem(requestHash, callApiCallback);
}
```
