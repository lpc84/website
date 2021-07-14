const readingTime = require("eleventy-plugin-reading-time");
const markdownIt = require("markdown-it");
require('dotenv').config();

const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = [357, 600, 972], pictureClass = [], imageClass= []) {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: sizes,
    formats: ['webp', 'jpeg'],
    outputDir: './_site/img/'
  });

  let lowsrc = metadata.jpeg[0];

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return `<picture class="${pictureClass.join(' ')}">
  ${Object.values(metadata).map(imageFormat => {
    return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
  }).join("\n")}
    <img style="width:100%"
      src="${lowsrc.url}"
      data-src="${lowsrc.url}"
      data-srcset="${Object.values(metadata).map(imageFormat => {
        return imageFormat.map(entry => entry.srcset).join(", ")
      })}"
      data-sizes="auto"
      width="${lowsrc.width}"
      height="${lowsrc.height}"
      alt="${alt}"
      loading="lazy"
      class="${imageClass.join(' ')} lazy lazyload"
      decoding="async">
  </picture>`;
}

module.exports = (eleventyConfig) => {
  var responsiveImageOption = { responsive: {
    'srcset': {
      '*': [ {
        width: 320,
        rename: {
          suffix: '-small'
        }
      }, {
        width: 640,
        rename: {
          suffix: '-medium'
        }
      }, {
        width: 920,
        rename: {
          suffix: '-big'
        }
      } ]
    },
    'sizes': {
      '*': '(min-width: 36em) 33.3vw, 80vw, 100vw'
    }
  }
};
  const md = new markdownIt({
    html: true
  }).use(require('@gerhobbelt/markdown-it-responsive'), responsiveImageOption); ;
  eleventyConfig.addWatchTarget("./_includes/dawn/assets/built/main.min.js");

  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("shortDate", function (value) {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day > 9 ? "" : "0"}${day}-${day > 9 ? "" : "0"}${month}-${year}`;
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

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
    const date = new Date(value.startDate);
    const day = date.getDate();
    const month = date.getMonth();

    const duration = value.duration;
    return `${day} ${months[month]} | ${duration}h`;
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
    return res;
  });

  eleventyConfig.addPlugin(readingTime);
};
