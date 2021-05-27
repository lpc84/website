let GhostContentAPI = require("@tryghost/content-api");

const api = new GhostContentAPI({
  url: process.env.CONTENT_API_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v3",
});

// fetch 5 posts, including related tags and authors
const featuredPosts = api.posts.browse({
  include: "tags,authors",
});

module.exports = featuredPosts;
