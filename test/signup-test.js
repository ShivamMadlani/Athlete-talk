var assert = require("assert");

describe("\t-Should return status code 201 on successful login\n\t-500 if user exits already\n", () => {
  it("test1", async () => {
    const body = {
      name: "newuser1",
      email: "newemail23@gmail.com",
      password: "testpass",
      passwordConfirm: "testpass",
      otporg: "123456",
      otpusr: "123456",
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
      email: "newemail345@gmail.com",
      password: "testpass1",
      passwordConfirm: "testpass1",
      otporg: "123456",
      otpusr: "123456",
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
      email: "gfcgvhb144@gmail.com",
      password: "teer",
      passwordConfirm: "teer",
      otporg: "123456",
      otpusr: "123456",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 500);
  });

  it("test4", async () => {
    const body = {
      name: "new",
      email: "bhckjlorfkl356@yahoo.com",
      password: "teerteer",
      passwordConfirm: "teerteer",
      otporg: "123456",
      otpusr: "123452",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 403);
  });

  it("test5", async () => {
    const body = {
      name: "new",
      email: "hvjbknlkiigtdx144l@yahoo.com",
      password: "teerteer12",
      passwordConfirm: "teerteer",
      otporg: "123456",
      otpusr: "123456",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 403);
  });

  it("test6", async () => {
    const body = {
      name: "newkjlkn",
      email: "helloworldm@gmail.com",
      password: "teer@#$%",
      passwordConfirm: "teer@#$%@@",
      otporg: "123456",
      otpusr: "123456",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 403);
  });

  it("test7", async () => {
    const body = {
      name: "new",
      email: "tumneemialkyubanaya567890@yahoo.com",
      password: "teer*&()&",
      passwordConfirm: "teer#$%^",
      otporg: "123466",
      otpusr: "123456",
      role: "user",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 403);
  });


  it("test8", async () => {
    const body = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      otporg: "",
      otpusr: "",
      role: "",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 400);
  });


  it("test9", async () => {
    const body = {
      name: "new",
      email: "tumneemialkyubanaya355662@yahoo.com",
      password: "",
      passwordConfirm: "teer#$%^",
      otporg: "123456",
      otpusr: "123456",
      role: "coach",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 400);
  });


  it("test10", async () => {
    const body = {
      name: "new",
      email: "tumneemialkyubanaya809908567@yahoo.com",
      password: "__++__++3456",
      passwordConfirm: "__++__++3456",
      otporg: "123456",
      otpusr: "123456",
      role: "coach",
    };
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(res.status, 201);
  });

});
