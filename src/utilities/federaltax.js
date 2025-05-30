import { federalRules } from '$src/rules/federal'

const getStandardDeduction = (status) => {
  if (status == 'single') { 
    return federalRules.standardDeduction.single
  }
  else if (status == 'married') {
    return federalRules.standardDeduction.married
  } 
  else if (status == 'separate') {        
    return federalRules.standardDeduction.separate
  }
  else if (status == 'head') {
    return federalRules.standardDeduction.head
  }
  else if (status == 'widow') {
    return federalRules.standardDeduction.widow
  }
} 

const calculateTax = (income, filingStatus) => {
  let tax = 0 
  for (const bracket of federalRules.incomeTaxRate[filingStatus]) {
    if (income > bracket.lowIncome) {
      const taxableAtThisRate = Math.max(0, Math.min(income, bracket.highIncome) - bracket.lowIncome)
      tax += taxableAtThisRate * bracket.taxRate
    } 
    else { 
      break
    }
  }
  return tax
}

const getFederalTaxes = (incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear) => {
  let safeHarborFederalTaxesThisYear 
  let adjustedGrossIncomeThisYear 
  let taxableFederalIncomeThisYear
  if (incomeExpectationThisYear == 'increase' || incomeExpectationThisYear == 'same') {
    let safeHarborHighIncome 
    if (filingStatus == 'separate') {
      safeHarborHighIncome = federalRules.lastYearSafeHarborHighIncome / 2
    }
    else {
      safeHarborHighIncome = federalRules.lastYearSafeHarborHighIncome
    }
    if (adjustedGrossIncomeLastYear > safeHarborHighIncome) {
      safeHarborFederalTaxesThisYear = federalRules.lastYearSafeHarborHighPercentage * federalTaxPaidLastYear
    }
    else {
      safeHarborFederalTaxesThisYear = federalRules.lastYearSafeHarborLowPercentage * federalTaxPaidLastYear
    }
  } 
  else {
    adjustedGrossIncomeThisYear = expectedTotalIncomeThisYear - businessExpensesThisYear - retirementContributionsThisYear - studentLoanInterestThisYear - healthInsuranceThisYear - otherDeductionsThisYear
    taxableFederalIncomeThisYear = Math.max(0, adjustedGrossIncomeThisYear - getStandardDeduction(filingStatus))
    safeHarborFederalTaxesThisYear = calculateTax(taxableFederalIncomeThisYear, filingStatus)
    safeHarborFederalTaxesThisYear = federalRules.thisYearSafeHarborUsedPercentage * safeHarborFederalTaxesThisYear
  }
  const taxes = {
    adjustedGrossIncomeThisYear: Math.round(adjustedGrossIncomeThisYear),
    taxableFederalIncomeThisYear: Math.round(taxableFederalIncomeThisYear), 
    safeHarborFederalTaxesThisYear: Math.round(safeHarborFederalTaxesThisYear),
  }
  return taxes
}

const getFederalQuarterlyPayment = (currentQuarter, yearlyTaxes, withholdings, payment1, payment2, payment3) => {
  let q1federalQuarterlyPayment = 0
  let q2federalQuarterlyPayment = 0
  let q3federalQuarterlyPayment = 0
  let q4federalQuarterlyPayment = 0
  const nonWithheldSafeHarborFederalTaxThisYear = yearlyTaxes - withholdings 
  const safeToSkipFederalPayment = nonWithheldSafeHarborFederalTaxThisYear < federalRules.minimumTaxForQuarterlyPayments
  if (safeToSkipFederalPayment) {
    q1federalQuarterlyPayment = 0
    q2federalQuarterlyPayment = 0
    q3federalQuarterlyPayment = 0
    q4federalQuarterlyPayment = 0
  }
  else {
    if (currentQuarter == 'Q1') {
      q1federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q1)
      q2federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q2 - q1federalQuarterlyPayment)
      q3federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q3 - q1federalQuarterlyPayment - q2federalQuarterlyPayment)
      q4federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
    }
    else if (currentQuarter == 'Q2') {
      q1federalQuarterlyPayment = payment1
      q2federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q2 - q1federalQuarterlyPayment)
      q3federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q3 - q1federalQuarterlyPayment - q2federalQuarterlyPayment)
      q4federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
    }
    else if (currentQuarter == 'Q3') {
      q1federalQuarterlyPayment = payment1
      q2federalQuarterlyPayment = payment2
      q3federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q3 - q1federalQuarterlyPayment - q2federalQuarterlyPayment)
      q4federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
    } 
    else if (currentQuarter == 'Q4') {
      q1federalQuarterlyPayment = payment1
      q2federalQuarterlyPayment = payment2
      q3federalQuarterlyPayment = payment3
      q4federalQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
    }
  }
  const payment = {
    nonWithheldSafeHarborFederalTaxThisYear: Math.round(Number(nonWithheldSafeHarborFederalTaxThisYear)),
    safeToSkipFederalPayment: safeToSkipFederalPayment,
    q1federalQuarterlyPayment: Math.round(Number(q1federalQuarterlyPayment)),
    q2federalQuarterlyPayment: Math.round(Number(q2federalQuarterlyPayment)),
    q3federalQuarterlyPayment: Math.round(Number(q3federalQuarterlyPayment)),
    q4federalQuarterlyPayment: Math.round(Number(q4federalQuarterlyPayment)),
  }
  return payment
}

export { getFederalTaxes, getFederalQuarterlyPayment, calculateTax }