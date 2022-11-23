module.exports = (config) => {
  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/img');
  config.addPassthroughCopy('src/docs');
  // config.addPassthroughCopy('src/js');
  config.addFilter(
    "relative",
    (page, root = "/") =>
      `${require("path").relative(page.filePathStem, root)}/`
  );

  return {
    dir: {
      input: 'src',
    },
  };
};
