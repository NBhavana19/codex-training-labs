const defaults = {
  host: "api.example.com",
  retries: 3,
  timeout: 5000
};

const overridePayload = process.argv[2];

function parseOverrides(payload) {
  if (!payload) {
    return {};
  }

  try {
    return JSON.parse(payload);
  } catch (error) {
    console.warn("Invalid overrides supplied. Using default configuration.");
    return {};
  }
}

const overrides = parseOverrides(overridePayload);

const consolidated = { ...defaults, ...overrides };
console.log("Merged configuration:", consolidated);
