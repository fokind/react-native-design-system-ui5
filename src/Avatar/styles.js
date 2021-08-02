const createStyles = theme => {
  const { content } = theme;

  return {
    text: {
      color: content.contrastTextColor,
    },
  };
};

export default createStyles;
