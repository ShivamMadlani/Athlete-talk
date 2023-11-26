var assert = require("assert");

describe("Signup test1", () => {
  it("hi", async () => {
    const body = {
      name: "newuser",
      email: "newemail@gmail.com",
      password: "testpass",
      passwordConfirm: "testpass",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });
});
