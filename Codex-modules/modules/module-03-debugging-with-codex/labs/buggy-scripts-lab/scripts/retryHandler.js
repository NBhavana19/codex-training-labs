const requestedRetries = Number(process.argv[2]);
const maxRetries = Number.isInteger(requestedRetries) && requestedRetries >= 0
  ? requestedRetries
  : 3;
const windows = new Array(maxRetries).fill(1000);
console.log("Retry windows:", windows);
