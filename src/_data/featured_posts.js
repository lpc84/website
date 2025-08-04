let GhostContentAPI = require("@tryghost/content-api");

const api = new GhostContentAPI({
  url: process.env.CONTENT_API_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v3",
});

const Airtable = require("airtable");

async function run() {
  const events = await getEvents("Next Events");

  const featuredPosts = await api.posts.browse({
    limit: 5,
    filter: "featured:true",
    include: "tags,authors",
  });

  const res = events
    .map((x) => {
      return {
        feature_image: x.banner ? x.banner[0].url : "",
        title: x.title,
        url: `/events/${x.url}`,
      };
    })
    .concat(
      featuredPosts.map((post) => {
        return {
          feature_image: post.feature_image,
          title: post.title,
          url: `/posts/${post.slug}`,
        };
      })
    );
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
