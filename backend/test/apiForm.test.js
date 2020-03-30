const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("apiForm Testing", () => {
  it("serves frontend", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("posts new xml", done => {
    chai
      .request(app)
      .post("/api/v1/form/xml")
      .send({ num1: 5, num2: 5 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.question1).to.equals("What is your name");
        expect(res.body.question2).to.equals("How are you feeling");
        done();
      });
  });

  it("gets all available fillout forms", done => {
    chai
      .request(app)
      .get("/api/v1/form/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.allForms)
          .to.be.an("array")
          .and.to.have.lengthOf.above(0);
        done();
      });
  });

  it("get mockup form", done => {
    chai
      .request(app)
      .get("/api/v1/form/0")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.formID)
          .to.be.an("number")
          .and.to.equals(0);
        done();
      });
  });
});
