const global = $state( {
  email: null,
  loggedIn: false,
  showMenu: false,
  openDropdownQuarter: '',
  makeButtonActive: false,
  showResumeBanner: false,
  showConfirmationBanner: false,
  justSignedUp : false,
  states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],

  showPaidDates: false,
  q1FederalPaidDate: null,
  q2FederalPaidDate: null,
  q3FederalPaidDate: null,
  q4FederalPaidDate: null,
  q1StatePaidDate: null,
  q2StatePaidDate: null,
  q3StatePaidDate: null,
  q4StatePaidDate: null,
  singleFederalPaidDate: null,
  singleStatePaidDate: null,
})

export { global}