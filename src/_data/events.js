const Airtable = require("airtable");

async function run() {
  const res = getEvents("Active Events");
  return res;
}

async function getEvents(eventView) {
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY });
  const base = airtable.base("appcCARRkc6aEqFgb");
  return (
    await base("Eventos")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 100,
        view: eventView,
      })
      .all()
  ).map((x) => {
    let fields = x.fields;
    fields.url = fields.url || fields.title;
    return fields;
  });
}

module.exports = run();
