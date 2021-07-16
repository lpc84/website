

module.exports = {
    eleventyComputed: {
      eleventyNavigation: {
        key: data => {
            console.log(data);
            return data.title
        },
        parent: data => data.parent
      }
    }
  };