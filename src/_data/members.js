let GhostContentAPI = require("@tryghost/content-api");

const api = new GhostContentAPI({
  url: process.env.CONTENT_API_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v3",
});

const members = api.authors.browse({
  include: "tags,authors",
});

module.exports = members;
