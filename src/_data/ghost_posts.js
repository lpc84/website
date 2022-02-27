let GhostContentAPI = require("@tryghost/content-api");

const api = new GhostContentAPI({
  url: process.env.CONTENT_API_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v3",
});

async function run(){
// fetch 5 posts, including related tags and authors
const featuredPosts = (await api.posts.browse({
  include: "tags,authors",
  limit: 100, 
})).map(post => ({...post, date: new Date(post.updated_at)}));
return featuredPosts;
}

module.exports = run;
