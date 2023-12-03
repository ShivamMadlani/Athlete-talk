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
    //   console.log(token);
});




describe('Upload plan Testing', () => {
    const host = "http://localhost:3000";
    const path = "/api/plans";
    it('test1', (done) => {
        request(host)
            .post(path)
            .send(
                {
                    name: 'newPlan1234',
                    description: 'hello i am here to perform testing on plan creation',
                    categories: [],
                    noOfDays: '2',
                    videos: [
                        ["654fe11ec389dcdb3b14082f", "654fe179c389dcdb3b140838", "655207a5b6e0109c60abbb9b"],
                        ["6560e72d761e17e572e41ceb", "656262e5e82435b6a2ff1b46"]
                    ]
                }
            )
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
            .send(
                {
                    name: 'newPlan1234',
                    description: '',
                    categories: [],
                    noOfDays: '2',
                    videos: [
                        ["654fe11ec389dcdb3b14082f", "654fe179c389dcdb3b140838", "655207a5b6e0109c60abbb9b"],
                        ["6560e72d761e17e572e41ceb", "656262e5e82435b6a2ff1b46"]
                    ]
                }
            )
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.message, 'Enter plan details');
                done();
            });
    }).timeout(60000);


    it('test3', (done) => {
        request(host)
            .post(path)
            .send(
                {
                    name: 'newPlan1234',
                    description: 'hello i am here to perform testing on plan creation',
                    categories: [],
                    noOfDays: '2',
                    videos: []
                }
            )
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.message, 'No videos added');
                done();
            });
    }).timeout(60000);


    it('test4', (done) => {
        request(host)
            .post(path)
            .send(
                {
                    name: 'newPlan1234',
                    description: 'hello i am here to perform testing on plan creation',
                    categories: [],
                    noOfDays: '2',
                    videos: [
                        ["654fe11ec389dcdb3b14082f", "654fe179c389dcdb3b140838", "655207a5b6e0109c60abbb9b"],
                        ["6560e72d761e17e572e41ceb", "656262e5e82435b6a2ff1b46"]
                    ]
                }
            )
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.message, 'You are not logged in! Please log in to get access.');
                done();
            });
    }).timeout(60000);


    it('test5', (done) => {
        request(host)
            .post(path)
            .send(
                {
                    name: 'newPlan1234',
                    description: 'hello i am here to perform testing on plan creation',
                    categories: [],
                    noOfDays: '3',
                    videos: [
                        ["654fe11ec389dcdb3b14082f", "654fe179c389dcdb3b140838", "655207a5b6e0109c60abbb9b"],
                        ["6560e72d761e17e572e41ceb", "656262e5e82435b6a2ff1b46"],
                        ["656262cee82435b6a2ff1b44","656263ec5edb494ad7618aae","6562daaf2c4007ff72ed1cc8"]
                    ]
                }
            )
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.status, 'success');
                done();
            });
    }).timeout(60000);

    it('test6', (done) => {
        request(host)
            .post(path)
            .send(
                {
                    name: 'newPlan1234',
                    description: 'hello i am here to perform testing on plan creation',
                    categories: [],
                    noOfDays: '3',
                    videos: [
                        ["654fe11ec389dcdb3b14082f", "654fe179c389dcdb3b140838", "655207a5b6e0109c60abbb9b"],
                        ["6560e72d761e17e572e41ceb", "656262e5e82435b6a2ff1b46"],
                        ["656262cee82435b6a2ff1b44","656263ec5edb494ad7618aae","6562daaf2c4007ff72ed1cc8"]
                    ]
                }
            )
            .set('Authorization', `Bearer ${token1}`)
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.message, 'You do not have permission to perform this action');
                done();
            });
    }).timeout(60000);

});