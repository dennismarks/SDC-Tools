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
          _id: "5e923456ce381813de19effc",
          patientID:
            "725eb518771df39d6888213145690a4baa09b675464bed06874b09720ddb0650",
          name: "test",
          email: "test@gmail.com",
          phone: 123456789,
          relatedForms: [],
          createdAt: "2020-04-11T21:19:18.840Z",
          updatedAt: "2020-04-11T21:19:18.840Z",
          __v: 0,
        });
        done();
      });
  });

  it("retrieves specific patient", (done) => {
    chai
      .request(app)
      .get(
        "/api/v1/patient/725eb518771df39d6888213145690a4baa09b675464bed06874b09720ddb0650"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal("test");
        done();
      });
  });
});
