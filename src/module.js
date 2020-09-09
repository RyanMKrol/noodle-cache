export default class ResponseCache {
  constructor(ttlSeconds) {
    this.cache = {};
    this.ttlSeconds = ttlSeconds;
  }

  processItem(key, fetchCallback) {
    if (!this.cache[key] || hasTtlExpired(this.cache[key].ttl)) {
      this.cache[key] = {
        ttl: calculateTimeToLive(),
        item: fetchCallback(),
      };
    }

    return this.cache[key].item;
  }
}

// calculates whether the ttl has expired or not
function hasTtlExpired(ttl) {
  const currentUnixTime = Date.now();
  return ttl > currentUnixTime;
}

// returns unix time stamp when current item becomes invalid
function calculateTimeToLive() {
  const ttlDateObject = new Date();
  ttlDateObject.setMinutes(ttlDateObject.getMinutes() + this.ttlSeconds * 60);

  return ttlDateObject.getTime();
}
