export default class ResponseCache {
  constructor(ttlSeconds) {
    this.cache = {};
    this.ttlSeconds = ttlSeconds;
  }

  async processItem(key, fetchCallback) {
    if (!this.cache[key] || hasTtlExpired(this.cache[key].ttl)) {
      this.cache[key] = {
        ttl: calculateTimeToLive(this.ttlSeconds),
        item: await fetchCallback(),
      };
    }

    return this.cache[key].item;
  }
}

// calculates whether the ttl has expired or not
function hasTtlExpired(ttl) {
  return ttl < Date.now();
}

// returns unix time stamp when current item becomes invalid
function calculateTimeToLive(ttlSeconds) {
  const ttlDateObject = new Date();
  ttlDateObject.setMinutes(ttlDateObject.getMinutes() + ttlSeconds * 60);

  return ttlDateObject.getTime();
}
