const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("apiPatient testing", () => {
  it("retrieves all patients", (done) => {
    chai
      .request(app)
      .get("/api/v1/patient/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.include({
          _id: "5e925957a838de3fb9ce5e76",
          patientID:
            "0516ae2ce344167d5dadfdd924d686690727ef324d812d620a955d14c3b68151",
          name: "test",
          email: "test@me.com",
          phone: 111111111,
          relatedForms: [],
          createdAt: "2020-04-11T23:57:11.592Z",
          updatedAt: "2020-04-11T23:57:11.592Z",
          __v: 0,
        });
        done();
      });
  });

  it("retrieves specific patient", (done) => {
    chai
      .request(app)
      .get(
        "/api/v1/patient/0516ae2ce344167d5dadfdd924d686690727ef324d812d620a955d14c3b68151"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal("test");
        done();
      });
  });
});
