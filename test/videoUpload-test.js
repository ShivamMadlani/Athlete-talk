var assert = require("assert");
const request = require("supertest");

let token;
let token1;
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

  const body1 = {
    email: "testing1@gmail.com",
    password: "testing1",
  };
  const res1 = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body1),
  });
  const resd1 = await res1.json();
  token1 = resd1.token;
});




describe('Upload Video Testing', () => {
  const host = "http://localhost:3000";
  const path = "/api/video/upload";
  it('test1', (done) => {
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


  it('test2', (done) => {
    request(host)
      .post(path)
      .field('title', `gjkikmln246`)
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


  it('test3', (done) => {
    request(host)
      .post(path)
      .field('title', 'test')
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

  it('test4', (done) => {
    request(host)
      .post(path)
      .field('title', 'test1234')
      .field('description', 'hello i am here to perform testing')
      .attach('file', "C://Users//MEET42//Downloads//202101042_lab9_CT.pdf") // Adjust the file path accordingly
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, "Please upload a valid video file");
        done();
      });
  }).timeout(60000);

  it('test5', (done) => {
    request(host)
      .post(path)
      .field('title', 'test1234')
      .field('description', 'hello i am here to perform testing')
      .attach('file', "D://sowftware//Athlete-talk//testvideo.mp4") // Adjust the file path accordingly
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'You are not logged in! Please log in to get access.');
        done();
      });
  }).timeout(60000);



  it('test6', (done) => {
    request(host)
      .post(path)
      .field('title', 'test1234')
      .field('description', 'hello i am here to perform testing hi hi hi hi')
      .attach('file', "C://Users//MEET42//OneDrive//Pictures//test.jpg") // Adjust the file path accordingly
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, "Please upload a valid video file");
        done();
      });
  }).timeout(60000);

  it('test7', (done) => {
    request(host)
      .post(path)
      .field('title', 'test1234')
      .field('description', 'hello i am here to perform testing')
      .attach('file', "D://sowftware//Athlete-talk//testvideo.mp4") // Adjust the file path accordingly
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'You are not logged in! Please log in to get access.');
        done();
      });
  }).timeout(60000);


  it('test8', (done) => {
    request(host)
      .post(path)
      .field('title', 'test1234')
      .field('description', 'hello i am here to perform testing')
      .attach('file', "D://sowftware//Athlete-talk//testvideo.mp4") // Adjust the file path accordingly
      .set('Authorization', `Bearer ${token1}`)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'You do not have permission to perform this action');
        done();
      });
  }).timeout(60000);






});