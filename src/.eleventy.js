const readingTime = require("eleventy-plugin-reading-time");
const markdownIt = require("markdown-it");
require('dotenv').config();

module.exports = (eleventyConfig) => {
  const md = new markdownIt({
    html: true
  });
  eleventyConfig.addWatchTarget("./_includes/dawn/assets/built/main.min.js");

  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("shortDate", function (value) {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day > 9 ? "" : "0"}${day}-${day > 9 ? "" : "0"}${month}-${year}`;
  });

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("eventDate", function (value) {
    const date = new Date(value.StartDate);
    const endDate = new Date(value.EndDate);
    const day = date.getDate();
    const month = date.getMonth();
    const startHour = date.getHours();
    const endHour = endDate.getHours();
    console.log(startHour)
    return `${day > 9 ? "" : "0"}${day} ${day > 9 ? "" : "0"}${months[month]} | ${startHour}h-${endHour}h`;
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

  eleventyConfig.addNunjucksFilter("markdown", function (content) {
    const res =  md.render(content);
    console.log(console.log(res), content);
    return res;
  });

  eleventyConfig.addPlugin(readingTime);
};
