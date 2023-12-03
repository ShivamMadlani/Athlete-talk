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
    //   console.log(token);
});




describe('Upload plan Testing', () => {
    const host = "http://localhost:3000";
    const path = "/api/plans";
    it('should upload a plan', (done) => {
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
});