var assert = require("assert");
const request = require("supertest");

let token;
before(async () => {
  const body = {
    email: "testing2@gmail.com",
    password: "testing2",
  };
  const res = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const resd = await res.json();
  token = resd.token;
});




describe('Upload Video Testing', () => {
  const host = "http://localhost:3000";
  const path = "/api/video/upload";
  it('should upload a file', (done) => {
    request(host)
      .post(path)
      .field('title', 'test1234')
      .field('description', 'hello i am here to perform testing')
      .attach('file', "D://sowftware//Athlete-talk//testvideo.mp4") // Adjust the file path accordingly
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 'success');
        done();
      });
  }).timeout(60000);
});