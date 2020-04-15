const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

var supertest = require("supertest");
var request = supertest(`localhost:${process.env.PORT}`);

chai.use(chaiHttp);

describe("apiForm Testing", () => {
  it("serves frontend", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("attempting to post a duplicate xml", function (done) {
    request
      .post("/api/v1/form/import")
      .set("content-type", "multipart/form-data")
      .attach("xml", __dirname.concat("/2.xml"))
      .then((res) => {
        expect(res).to.have.status(409); // 'duplicate' status
        done();
      });
  });

  it("gets all available fillout forms", (done) => {
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

  it("get mockup form", (done) => {
    chai
      .request(app)
      .get("/api/v1/form/GET/e650c524a1a40b9bd21f67458c4227")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.formTitle)
          .to.be.an("string")
          .and.to.equals("APPENDIX: Resection");
        done();
      });
  });

  it("get draft form", (done) => {
    chai
      .request(app)
      .get("/api/v1/form/GET/e650c524a1a40b9bd21f67458c4227/0516ae2ce344167")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
