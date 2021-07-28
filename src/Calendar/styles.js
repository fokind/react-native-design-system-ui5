const createStyles = theme => {
  const { legend, content, textColor, list } = theme;

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
    itemCurrent: {
      borderWidth: 3,
      borderColor: legend.currentDateTime,
    },
    itemWeekend: {
      backgroundColor: legend.nonWorkingBackground,
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
