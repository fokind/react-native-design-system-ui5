const createStyles = theme => {
  const { fontFamily, fontSmallSize, fontWeight, content, shell } = theme;

  return {
    container: {
      backgroundColor: content.badgeBackground,
      borderRadius: 16,
      padding: 4,
    },
    text: {
      lineHeight: 12,
      fontSize: fontSmallSize,
      fontWeight,
      fontFamily,
      color: shell.textColor,
    },
  };
};

export default createStyles;
