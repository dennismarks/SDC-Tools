const fs = require("fs"),
  xml2js = require("xml2js"),
  log = console.log;

let SDCPackage_Metadata,
  XMLPackage_Metadata,
  XMLPackage_FormDesign,
  XMLPackage_Property_U,
  XMLPackage_Property,
  XMLPackage_Body_U,
  XMLPackage_Body,
  XMLPackage_Body_Metadata,
  XMLPackage_Body_ChildItems,
  XMLPackage_Body_ChildItems_Metadata,
  XMLPackage_Body_ChildItems_Section,
  XMLPackage_Body_ChildItems_Comment,
  XMLPackage_Footer_U,
  XMLPackage_Footer,
  XMLPackage_Footer_Metadata,
  XMLPackage_Footer_Property_U,
  XMLPackage_Footer_Property;

var parser = new xml2js.Parser();
fs.readFile(__dirname + "/source/thyroid.xml", function(err, data) {
  parser.parseString(data, function(err, result) {
    SDCPackage_Metadata = result.SDCPackage.$;

    XMLPackage_FormDesign = result.SDCPackage.XMLPackage[0].FormDesign;

    XMLPackage_Metadata = XMLPackage_FormDesign[0].$;

    XMLPackage_Property_U = XMLPackage_FormDesign[0].Property;

    XMLPackage_Property = XMLPackage_Property_U.map(x => x.$);

    // ###################   BODY    ###################
    XMLPackage_Body_U = XMLPackage_FormDesign[0].Body;

    XMLPackage_Body_Metadata = XMLPackage_Body_U[0].$;

    XMLPackage_Body_ChildItems = XMLPackage_Body_U[0].ChildItems;

    // ^^^^^^^^^^^^^^^^^^^   BODY    ^^^^^^^^^^^^^^^^^^^^

    // ###################   FOOTER    ###################
    XMLPackage_Footer_U = XMLPackage_FormDesign[0].Footer;

    XMLPackage_Footer_Metadata = XMLPackage_Footer_U[0].$;

    XMLPackage_Footer_Property_U = XMLPackage_Footer_U[0].Property;

    XMLPackage_Footer_Property = XMLPackage_Footer_Property_U.map(x => x.$);

    // ^^^^^^^^^^^^^^^^^^^   FOOTER   ^^^^^^^^^^^^^^^^^^^^

    log(JSON.stringify(result));
  });
});

// log(
//   JSON.stringify({
//     Footer: [
//       { metadata: XMLPackage_Footer_Metadata },
//       { Property: XMLPackage_Footer_Property }
//     ]
//   })
// );
