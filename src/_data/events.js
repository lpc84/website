const Airtable = require("airtable");

async function run(){
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY });
  const base = airtable.base("appcCARRkc6aEqFgb");
  const res = (await base("Eventos")
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 100,
      view: "Grid view",
    })
    .all()).map(x => x.fields);
  return res;
}

module.exports = run();
