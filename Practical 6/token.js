function generateToken(name, email) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ name, email, exp: Date.now() + 3600000 }));
  const signature = btoa("secret"); // Simulated signature

  return `${header}.${payload}.${signature}`;
}

// Example usage:
const token = generateToken("Ansh", "ansh@example.com");
console.log("Client Token:", token);
