let GhostContentAPI = require("@tryghost/content-api");

const api = new GhostContentAPI({
  url: process.env.CONTENT_API_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v3",
});

async function run(){
// fetch 5 posts, including related tags and authors
const tags = (await api.tags.browse({
  include: "count.posts",
  limit: 100, 
})).map(tag => ({...tag}));
return tags;
}

module.exports = run;
