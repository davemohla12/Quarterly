import { stateRules } from '$src/rules/state'
import { formulas } from '$src/rules/formulas'

const getStandardDeduction = (state, status, income, exemptions) => {
  if (stateRules[state].standardDeductionMethod.type == 'fixed') {
    if (status == 'single') { 
      return Math.round(stateRules[state].standardDeductionMethod.values.single)
    }
    else if (status == 'married') {
      return Math.round(stateRules[state].standardDeductionMethod.values.married)
    } 
    else if (status == 'separate') {        
      return Math.round(stateRules[state].standardDeductionMethod.values.separate)
    }
    else if (status == 'head') {
      return Math.round(stateRules[state].standardDeductionMethod.values.head)
    }
    else if (status == 'widow') {
      return Math.round(stateRules[state].standardDeductionMethod.values.widow)
    }
  }
  else if (stateRules[state].standardDeductionMethod.type == 'exemptions') {
    return Math.round(stateRules[state].standardDeductionMethod.exemptionAmountPerPerson * exemptions)
  }
  else if (stateRules[state].standardDeductionMethod.type == 'formula') {
    return Math.round(formulas[stateRules[state].standardDeductionMethod.formulaId](income, status))
  }
} 

const calculateTax = (state, income, filingStatus) => {
  let tax = 0 
  for (const bracket of stateRules[state].incomeTaxRate[filingStatus]) {
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

const getStateTaxes = (state, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions) => {
  let safeHarborStateTaxesThisYear 
  let stateAdjustableGrossIncomeThisYear 
  let taxableStateIncomeThisYear
  const allDeductions = {
    businessExpensesThisYear,
    retirementContributionsThisYear,
    studentLoanInterestThisYear,
    healthInsuranceThisYear,
    otherDeductionsThisYear
  }  
  if ((incomeExpectationThisYear == 'increase' || incomeExpectationThisYear == 'same') && stateRules[state].lastYearSafeHarborRule) {
    let safeHarborHighIncome = stateRules[state].lastYearSafeHarborHighIncome
    if (safeHarborHighIncome == null) {
      safeHarborHighIncome = Infinity
    } 
    else if (filingStatus === 'separate') {
      safeHarborHighIncome /= 2
    }
    if (stateIncomeLastYear > safeHarborHighIncome) {
      safeHarborStateTaxesThisYear = stateRules[state].lastYearSafeHarborHighPercentage * stateTaxPaidLastYear
    }
    else {
      safeHarborStateTaxesThisYear = stateRules[state].lastYearSafeHarborLowPercentage * stateTaxPaidLastYear
    }
  } 
  else {
    if (stateRules[state].thisYearIncomeCalculationType.type === 'federalAGI') {
      stateAdjustableGrossIncomeThisYear = expectedTotalIncomeThisYear - Object.values(allDeductions).reduce((a, b) => Number(a) + Number(b), 0)
    }
    else if (stateRules[state].thisYearIncomeCalculationType.type === 'addBack') {
      stateAdjustableGrossIncomeThisYear = expectedTotalIncomeThisYear - Object.values(allDeductions).reduce((a, b) => Number(a) + Number(b), 0) + stateRules[state].thisYearIncomeCalculationType.addBackDeductions.reduce((acc, key) => Number(acc) + Number(allDeductions[key] || 0), 0)
    } 
    else if (stateRules[state].thisYearIncomeCalculationType.type === 'custom') {
      stateAdjustableGrossIncomeThisYear = expectedTotalIncomeThisYear - stateRules[state].thisYearIncomeCalculationType.customDeductions.reduce((acc, key) => Number(acc) + Number(allDeductions[key] || 0), 0)
    }
    taxableStateIncomeThisYear = Math.max(0, stateAdjustableGrossIncomeThisYear - getStandardDeduction(state, filingStatus, stateAdjustableGrossIncomeThisYear, exemptions))
    safeHarborStateTaxesThisYear = calculateTax(state, taxableStateIncomeThisYear, filingStatus)
    const multiplier = stateRules[state].thisYearSafeHarborUsedPercentage || 1
    safeHarborStateTaxesThisYear = multiplier * safeHarborStateTaxesThisYear
  }
  const taxes = {
    stateAdjustableGrossIncomeThisYear: Math.round(Number(stateAdjustableGrossIncomeThisYear)),
    taxableStateIncomeThisYear: Math.round(Number(taxableStateIncomeThisYear)), 
    safeHarborStateTaxesThisYear: Math.round(Number(safeHarborStateTaxesThisYear)),
  }
  return taxes
}

const getStateQuarterlyPayment = (state, currentQuarter, yearlyTaxes, withholdings, payment1, payment2, payment3) => {
  let q1StateQuarterlyPayment = 0
  let q2StateQuarterlyPayment = 0
  let q3StateQuarterlyPayment = 0
  let q4StateQuarterlyPayment = 0
  const nonWithheldSafeHarborStateTaxThisYear = yearlyTaxes - withholdings 
  const safeToSkipStatePayment = nonWithheldSafeHarborStateTaxThisYear < stateRules[state].minimumTaxForQuarterlyPayments
  if (safeToSkipStatePayment) {
    q1StateQuarterlyPayment = 0
    q2StateQuarterlyPayment = 0
    q3StateQuarterlyPayment = 0
    q4StateQuarterlyPayment = 0
  }
  else {
    if (currentQuarter == 'Q1') {
      q1StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q1)
      q2StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q2 - q1StateQuarterlyPayment)
      q3StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
    }
    else if (currentQuarter == 'Q2') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q2 - q1StateQuarterlyPayment)
      q3StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
    }
    else if (currentQuarter == 'Q3') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = payment2
      q3StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
    } 
    else if (currentQuarter == 'Q4') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = payment2
      q3StateQuarterlyPayment = payment3
      q4StateQuarterlyPayment = Math.max(0, (yearlyTaxes - withholdings) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
    }
  }
  const payment = {
    nonWithheldSafeHarborStateTaxThisYear: Math.round(Number(nonWithheldSafeHarborStateTaxThisYear)),
    safeToSkipStatePayment: safeToSkipStatePayment,
    q1StateQuarterlyPayment: Math.round(Number(q1StateQuarterlyPayment)),
    q2StateQuarterlyPayment: Math.round(Number(q2StateQuarterlyPayment)),
    q3StateQuarterlyPayment: Math.round(Number(q3StateQuarterlyPayment)),
    q4StateQuarterlyPayment: Math.round(Number(q4StateQuarterlyPayment)),
  }
  return payment
}

export { getStandardDeduction, calculateTax, getStateTaxes, getStateQuarterlyPayment }