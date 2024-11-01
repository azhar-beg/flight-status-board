export const lightTheme = {
  colors: {
    background: 'aliceblue',
    primary: '#F6F5F2',
    secondary: '#F0EBE3',
    header: '#B5C0D0',
    hover: '#D9D9D9',
    text: '#555555',
    tableHeaderText: '#FFFFFF',
    status: {
      onTime: 'green',
      delayed: 'orange',
      boarding: 'blue',
      departed: 'gray'
    }
  }
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#333333',
    primary: '#444444',
    secondary: '#555555',
    header: '#666666',
    hover: '#777777',
    text: '#FFFFFF',
    tableHeaderText: '#000000'
  }
};

export default lightTheme;
