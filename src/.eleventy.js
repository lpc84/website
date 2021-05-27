const readingTime = require("eleventy-plugin-reading-time");

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./_includes/dawn/assets/built/main.min.js");

  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("shortDate", function (value) {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day > 9 ? "" : "0"}${day}-${day > 9 ? "" : "0"}${month}-${year}`;
  });

  eleventyConfig.addNunjucksFilter("getMemberPosts", function (posts, member) {
    const memberPosts = posts.filter((post) => {
      return (
        post.authors.filter((a) => {
          return a.slug === member.slug;
        }).length > 0
      );
    });
    return memberPosts;
  });

  eleventyConfig.addPlugin(readingTime);
};
