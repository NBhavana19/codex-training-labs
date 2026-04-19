const userPayload = process.argv[2];

function parseUser(payload) {
  if (!payload) {
    return undefined;
  }

  try {
    return JSON.parse(payload);
  } catch (error) {
    console.warn("Invalid user payload received.");
    return undefined;
  }
}

const user = parseUser(userPayload);

function describeAccess(u) {
  if (!u || !Array.isArray(u.roles)) {
    return "NO ROLES ASSIGNED";
  }

  return u.roles.map((role) => role.toUpperCase()).join(", ");
}

console.log("User access:", describeAccess(user));
