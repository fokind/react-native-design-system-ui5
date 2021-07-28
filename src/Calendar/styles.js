const createStyles = theme => {
  const { legend, content, textColor, list, calendar } = theme;

  return {
    container: {
      backgroundColor: list.background,
    },
    item: {
      height: 44,
      minWidth: 34,
      margin: 1,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: legend.workingBackground,
    },
    itemActive: {
      backgroundColor: content.selected.background,
    },
    itemOtherMonth: {
      backgroundColor: list.background,
    },
    text: {
      color: textColor,
    },
    textActive: {
      color: content.selected.textColor,
    },
  };
};

export default createStyles;
