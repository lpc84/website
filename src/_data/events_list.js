const Airtable = require("airtable");

async function run(){
  const res = [ await getEvents("Next Events"), await getEvents("Previews Events") ]
  return res;
}

async function getEvents(eventView){
  
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY });
  const base = airtable.base("appcCARRkc6aEqFgb");
  return (await base("Eventos")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 100,
        view: eventView,
      })
      .all()).map(x => x.fields);
}

module.exports = run();
