module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => {
        return data.title;
      },
      parent: (data) => data.parent,
    },
  },
};
