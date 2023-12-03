var assert = require("assert");

describe("\t-Should return status code 200 on successful login\n\t-400 if either or both email and password are not provided\n\t-401 on incorrect credentials", () => {
  it("test1", async () => {
    const body = {
      email: "test@gmail.com",
      password: "testtest",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 200);
  });

  it("test2", async () => {
    const body = {
      email: "test@gmail.com",
      password: "tesest",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 401);
  });

  it("test3", async () => {
    const body = {
      email: "test123@gmail.com",
      password: "testtest",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 401);
  });

  it("test4", async () => {
    const body = {
      email: "shaileshpupadhyay1@gmail.com",
      password: "Meet@2409",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 401);
  });

  it("test5", async () => {
    const body = {
      email: "testing2@gmail.com",
      password: "testing2",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 200);
  });

  it("test6", async () => {
    const body = {
      email: "",
      password: "",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 400);
  });

  it("test7", async () => {
    const body = {
      email: "",
      password: "HelloWorld",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 400);
  });

  it("test8", async () => {
    const body = {
      email: "testtest@gmail@gmail.com",
      password: "helLL{}()",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 401);
  });

  it("test9", async () => {
    const body = {
      email: "GJkjbg__^&(@gmail.com",
      password: "yull80`1442",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 401);
  });

  it("test10", async () => {
    const body = {
      email: "coach@gmail.com",
      password: "testtest",
    };
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 200);
  });


});
