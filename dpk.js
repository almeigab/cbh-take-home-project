const crypto = require("crypto");

function hashString(str) {
  return crypto.createHash("sha3-512").update(str).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    candidate = typeof event.partitionKey === "string" ? event.partitionKey : JSON.stringify(event.partitionKey);
  } else {
    const data = JSON.stringify(event);
    candidate = hashString(data);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return hashString(candidate);
  }

  return candidate;
};