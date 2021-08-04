const createStyles = theme => {
  const { fontFamily, fontSize, field, content } = theme;
  const {
    textColor,
    background,
    borderWidth,
    borderColor,
    borderCornerRadius,
  } = field;

  return {
    input: {
      marginVertical: 4,
      lineHeight: content.lineHeight,
      fontWeight: 'normal',
      height: 36,
      paddingHorizontal: 10,
      minWidth: 44,
      color: textColor,
      backgroundColor: background,
      borderWidth,
      borderColor,
      borderRadius: borderCornerRadius,
      fontSize,
      fontFamily,
      outlineWidth: 0,
    },
    inputEmpty: {
      fontStyle: 'italic',
    },
  };
};

export default createStyles;
