const admin = require('firebase-admin');
const fs = require('fs');
const util = require('util');
const path = require('path');
const readFile = util.promisify(fs.readFile);

// Initialize Firebase
var serviceAccount = require("#");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "#"
});

let db = admin.database();

var pathToTemplateFile = '../public/template_about.html';

exports.handler = async (event, context) => {
  let id = event.queryStringParameters.id; // Extract id from the URL

  // Get all data under contactForm
  let ref = db.ref("#");
  let snapshot = await ref.once("value");
  let allData = snapshot.val();
  let data;

  // Loop through all entries and find the one with the matching timestamp
  for(let key in allData) {
    if(allData[key].timestamp == id) {
      data = allData[key];
      break;
    }
  }

  if(data) {
    // If matching data is found, read the template_about.html file
    try {
      let html = await readFile(path.resolve(__dirname, pathToTemplateFile), 'utf8');
      // Replace placeholders in the HTML with the data
      let modifiedHtml = html.replace(/{{timestamp}}/g, data.timestamp);
      return { statusCode: 200, body: modifiedHtml };
    } catch(err) {
      return { statusCode: 500, body: err.toString() };
    }
  } else {
    return { statusCode: 404, body: "No data found for the given id" };
  }
};
