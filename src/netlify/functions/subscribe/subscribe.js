const Airtable = require("airtable");

exports.handler = async (event, context) => {
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY });
  const base = airtable.base("appcCARRkc6aEqFgb");
    const requestBody = JSON.parse(event.body);
    console.log(requestBody)
  base("Subscritores").create(
    [
      {
        fields: requestBody,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return { statusCode: 500, body: JSON.stringify({ message: err }) };
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });

      return { statusCode: 200, body: JSON.stringify({ message: "Hello World" }) };
    }
  );
  
};
