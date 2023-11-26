var assert = require("assert");


describe("forgetpassword-test",()=>{
    it("test1", async () => {
        const body = {
          email: "anhlkll@gmail.com",
        };
        const res = await fetch("http://localhost:3000/api/forgetPassword", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        });
        assert.equal(res.status, 200);
      });    
});