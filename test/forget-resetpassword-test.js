var assert = require("assert");
const request = require("supertest");

describe('forget-reset password testing', () => {
  const host = "http://localhost:3000";
  const path = "/api/forgetPassword";
  let token;
  it('test1', (done) => {
    request(host)
      .post(path)
      .send(
        {
          email: 'shaileshpupadhyay1@gmail.com'
        }
      )
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 'success');
        token = res.body.token;
        done();
      });
  }).timeout(20000);

  it('test2', (done) => {
    request(host)
      .post(path)
      .send(
        {
          email: undefined
        }
      )
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'Provide an email');
        done();
      });
  }).timeout(20000);

  it('test3', (done) => {
    request(host)
      .post(`/api/resetpassword/76ujbhjkjliuigyuhjj09879`)
      .send(
        {
          password: "hihihihi",
          confirmPassword: "hihihihi"
        }
      )
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'Something went wrong');
        done();
      });
  }).timeout(20000);

  it('test4', (done) => {
    request(host)
      .post(`/api/resetpassword/${token}`)
      .send(
        {
          password: "hihihihi1",
          confirmPassword: "hihihihi"
        }
      )
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'Password and ConfrimPassword are not same');
        done();
      });
  }).timeout(20000);

  it('test5', (done) => {
    request(host)
      .post(path)
      .send(
        {
          email: "test12345678@gmail.com"
        }
      )
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'Not a registered user please create a account first!');
        done();
      });
  }).timeout(20000);
});