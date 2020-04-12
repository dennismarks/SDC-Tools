const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

var supertest = require("supertest");
var request = supertest("localhost:3001");

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
      .get("/api/v1/form/GET/05650b352e97cc6bdc3176aba07627bd")
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
      .get(
        "/api/v1/form/GET/05650b352e97cc6bdc3176aba07627bd/a0d310540e48893af7011de9a759987760fa7c9d7865c0506a44e1deeaf8f46a"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
