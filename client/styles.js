const primaryColor = 'blue'
const secondaryColor = 'purple'
const flexBoxJustifiedAndAlignedCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const headerStyle = {
  primary: {
    color: primaryColor
  },
  secondary: {
    color: secondaryColor
  }
}

export const subHeaderStyle = {
  primary: {
    color: primaryColor
  },
  secondary: {
    color: secondaryColor
  }
}

export const buttonStyle = {
  primary: {
    ...flexBoxJustifiedAndAlignedCenter,
    padding: '15px',
    width: '100px',
    backgroundColor: secondaryColor,
    color: primaryColor
  },
  secondary: {
    ...flexBoxJustifiedAndAlignedCenter,
    padding: '15px',
    width: '100px',
    backgroundColor: primaryColor,
    color: secondaryColor
  }
}

export const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
}

export const thStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
  padding: '3px',
}

export const tdStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
  padding: '3px',
  textAlign: 'center',
}
