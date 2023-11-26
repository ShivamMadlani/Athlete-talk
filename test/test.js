var assert = require("assert");

describe("userLogin test1", () => {
  it("-Should return status code 200 on successful login\n\t\b-400 if either or both email and password are not provided\n\t\b-401 on incorrect credentials", async () => {
    const body = {
      email: "test@gmail.com",
      password: "testest",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 200);
  });
});
