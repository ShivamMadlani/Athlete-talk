var assert = require("assert");

describe("\t-Should return status code 201 on successful login\n\t-500 if user exits already\n", () => {
  it("test1", async () => {
    const body = {
      name: "newuser1",
      email: "newemail2@gmail.com",
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

  it("test2", async () => {
    const body = {
      name: "GOKMNBIUJKM",
      email: "newemail@gmail@gmail.com",
      password: "testpass1",
      passwordConfirm: "testpass1",
      role: "coach",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });

  it("test3", async () => {
    const body = {
      name: "new",
      email: "JHKFJLI144@gmail@yahoo.com",
      password: "teer",
      passwordConfirm: "teer",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });

  it("test4", async () => {
    const body = {
      name: "new",
      email: "bhckjlorfkl@yahoo.com",
      password: "teerteer",
      passwordConfirm: "teerteer",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });

  it("test5", async () => {
    const body = {
      name: "new",
      email: "JHKFJLI144@gmail@yahoo.com",
      password: "teerteer",
      passwordConfirm: "teerteer",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });

  it("test6", async () => {
    const body = {
      name: "newkjlkn",
      email: "helloworld.com@gmail.com",
      password: "teer@#$%",
      passwordConfirm: "teer@#$%",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });

  it("test7", async () => {
    const body = {
      name: "new",
      email: "tumneemialkyubanaya@yahoo.com",
      password: "teer*&()&",
      passwordConfirm: "teer#$%^",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });


  it("test8", async () => {
    const body = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });


  it("test9", async () => {
    const body = {
      name: "new",
      email: "tumneemialkyubanaya355662@yahoo.com",
      password: "",
      passwordConfirm: "teer#$%^",
      role: "coach",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });


  it("test10", async () => {
    const body = {
      name: "new",
      email: "tumneemialkyubanaya809908@yahoo.com",
      password: "__++__++3456",
      passwordConfirm: "__++__++3456",
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
