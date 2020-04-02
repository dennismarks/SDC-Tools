const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

var supertest = require("supertest");
var request = supertest("localhost:3001");

chai.use(chaiHttp);
// describe("upload", function() {
//   it("posts new xml", function(done) {
//     request
//       .post("/api/v1/form/import")
//       .field(
//         "extra_info",
//         '{"formID":"Appendix.Res.135_3.002.001.REL_sdcFDF", "version": "3.002.001.REL"}'
//       )
//       .field("Content-Type", "multipart/form-data")
//       .attach("xml", __dirname.concat("/2.xml"))
//       .end(function(err, res) {
//         expect(res).to.have.status(409); // 'duplicate' status
//         done();
//       });
//   });
// });

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
      .get("/api/v1/form/GET/Appendix.Res.135_3.002.001.REL_sdcFDF")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.formID)
          .to.be.an("string")
          .and.to.equals("Appendix.Res.135_3.002.001.REL_sdcFDF");
        done();
      });
  });
});
