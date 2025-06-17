const customSelectStyles = {
    control: (base: any) => ({
        ...base,
        borderColor: '#d1d5db', // gray-300
        boxShadow: 'none',
         backgroundColor: 'transparent', // white
        '&:hover': {
        borderColor: '#2563eb', // blue-600
       
        },
    }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#2563eb' // blue-600
      : state.isFocused
      ? '#e5e7eb' // gray-200
      : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#111827', // white or gray-900
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
  })
};

export default customSelectStyles;