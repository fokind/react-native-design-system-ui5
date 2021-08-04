const createStyles = theme => {
  const {
    content,
    fontFamily,
    fontSize,
    fontWeight,
    selectedColor,
    field,
  } = theme;

  return {
    text: {
      lineHeight: 16,
      fontSize,
      fontWeight,
      fontFamily,
      color: content.labelColor,
      marginLeft: 6,
    },
    icon: {
      color: selectedColor,
    },
    iconWarning: {
      color: field.warningColor,
    },
    iconError: {
      color: field.invalidColor,
    },
    iconSuccess: {
      color: field.successColor,
    },
    iconInformation: {
      color: field.informationColor,
    },
  };
};

export default createStyles;
