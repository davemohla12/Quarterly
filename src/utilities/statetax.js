import { stateRules } from '$src/rules/state'
import { formulas } from '$src/rules/formulas'
import { convertStateToUpperCase } from '$src/utilities/utilities'
import { convertNumberToRoundedCurrency } from '$src/utilities/utilities'

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

const getIncomeExpectationText = (incomeExpectationThisYear) => { 
  if (incomeExpectationThisYear == 'increase') {
    return 'increase'
  }
  else if (incomeExpectationThisYear == 'same') {
    return 'stay the same'
  }
  else if (incomeExpectationThisYear == 'decrease') {
    return 'decrease'
  }
}

const getStateTaxes = (state, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions) => {
  let safeHarborStateTaxesThisYear 
  let stateAdjustableGrossIncomeThisYear 
  let taxableStateIncomeThisYear
  let initialExplanation = ``
  const allDeductions = {
    businessExpensesThisYear,
    retirementContributionsThisYear,
    studentLoanInterestThisYear,
    healthInsuranceThisYear,
    otherDeductionsThisYear
  }  
  if ((incomeExpectationThisYear == 'increase' || incomeExpectationThisYear == 'same') && stateRules[state].lastYearSafeHarborRule) {
    let safeHarborHighIncome = stateRules[state].lastYearSafeHarborHighIncome
    let safeHarborPercentage
    if (safeHarborHighIncome == null) {
      safeHarborHighIncome = Infinity
    } 
    else if (filingStatus === 'separate') {
      safeHarborHighIncome /= 2
    }
    if (stateIncomeLastYear > safeHarborHighIncome) {
      safeHarborPercentage = stateRules[state].lastYearSafeHarborHighPercentage
      safeHarborStateTaxesThisYear = safeHarborPercentage * stateTaxPaidLastYear
    }
    else {
      safeHarborPercentage = stateRules[state].lastYearSafeHarborLowPercentage
      safeHarborStateTaxesThisYear = safeHarborPercentage * stateTaxPaidLastYear
    }
    initialExplanation = `For your ${convertStateToUpperCase(state)} payments, since your income is expected to ${getIncomeExpectationText(incomeExpectationThisYear)} this year and ${convertStateToUpperCase(state)} supports it, we can use the amount you paid in taxes last year to determine your quarterly payments this year.  `
    initialExplanation += `This minimizes the quarterly taxes you pay while preventing penalties.  `
    initialExplanation += `Per ${convertStateToUpperCase(state)} tax rules, given your income, you can pay ${convertNumberToRoundedCurrency(safeHarborStateTaxesThisYear)} in total quarterly payments with no penalty, which is ${Math.round(safeHarborPercentage * 100)}% of ${convertNumberToRoundedCurrency(stateTaxPaidLastYear)}, which is what you paid last year in ${convertStateToUpperCase(state)} taxes.  `

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
    let standardDeduction = getStandardDeduction(state, filingStatus, stateAdjustableGrossIncomeThisYear, exemptions)
    taxableStateIncomeThisYear = Math.max(0, stateAdjustableGrossIncomeThisYear - standardDeduction)
    safeHarborStateTaxesThisYear = calculateTax(state, taxableStateIncomeThisYear, filingStatus)
    const multiplier = stateRules[state].thisYearSafeHarborUsedPercentage || 1
    safeHarborStateTaxesThisYear = multiplier * safeHarborStateTaxesThisYear
    if (!stateRules[state].lastYearSafeHarborRule) {
      initialExplanation = `For your ${convertStateToUpperCase(state)} payments, ${convertStateToUpperCase(state)} requires that you estimate your annual state taxes this year and use that to determine your quarterly paments. `
    }
    else { 
      initialExplanation = `For your ${convertStateToUpperCase(state)} payments, since your income is expected to ${getIncomeExpectationText(incomeExpectationThisYear)} this year, we need to estimate your annual ${convertStateToUpperCase(state)} taxes this year and then use that to determine your quarterly payments.  `
      initialExplanation += `This minimizes the quarterly taxes you pay while preventing penalties.  `
    }
    initialExplanation += `To estimate your annual ${convertStateToUpperCase(state)} taxes this year, we take your expected total income this year of ${convertNumberToRoundedCurrency(expectedTotalIncomeThisYear)} and subtract out the business deductions and exemptions that ${convertStateToUpperCase(state)} allows to get an adjusted state income of ${convertNumberToRoundedCurrency(stateAdjustableGrossIncomeThisYear)}.  `
    initialExplanation += `We then subtract out your standard deduction of ${convertNumberToRoundedCurrency(standardDeduction)} to get a taxable state income of ${convertNumberToRoundedCurrency(taxableStateIncomeThisYear)}.  `
    initialExplanation += `We use that to calculate an annual ${convertStateToUpperCase(state)} tax of ${convertNumberToRoundedCurrency(safeHarborStateTaxesThisYear)} this year which is what you need to pay in total this year through quarterly payments.  `
  }
  const taxes = {
    stateAdjustableGrossIncomeThisYear: Math.round(Number(stateAdjustableGrossIncomeThisYear)),
    taxableStateIncomeThisYear: Math.round(Number(taxableStateIncomeThisYear)), 
    safeHarborStateTaxesThisYear: Math.round(Number(safeHarborStateTaxesThisYear)),
    initialExplanation: initialExplanation
  }
  return taxes
}


const getStateSinglePayment = (state, yearlyTaxes, withholdings, payment1, payment2, payment3, initialExplanation) => {
  let due = 0
  let paid = 0
  let remaining = 0
  const nonWithheldSafeHarborStateTaxThisYear = yearlyTaxes - withholdings 
  let explanation = initialExplanation
  const safeToSkipStatePayment = nonWithheldSafeHarborStateTaxThisYear < stateRules[state].minimumTaxForQuarterlyPayments
  if (safeToSkipStatePayment) {
    due = 0 
    paid = Math.round(Number(payment1) + Number(payment2) + Number(payment3))
    remaining = 0
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} this year in ${convertStateToUpperCase(state)} taxes through your paycheck witholdings, so you need need to pay the remaining ${convertNumberToRoundedCurrency(nonWithheldSafeHarborStateTaxThisYear)}. `
    explanation += `Since this amount is less than ${convertNumberToRoundedCurrency(stateRules[state].minimumTaxForQuarterlyPayments)}, which is the minimum amount of that the ${convertStateToUpperCase(state)} rules requires for paying quarterly taxes, you are not due to pay any quarterly payments.  `
  } 
  else {
    due = Math.round(Number(nonWithheldSafeHarborStateTaxThisYear))
    paid = Math.round(Number(payment1) + Number(payment2) + Number(payment3))
    remaining = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear - payment1 - payment2 - payment3))
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} in ${convertStateToUpperCase(state)} paycheck witholdings so you are due to pay the remaining ${convertNumberToRoundedCurrency(due)} in quarterly payments. `
    explanation += `You've paid ${convertNumberToRoundedCurrency(paid)} in quarterly payments so far so you need to pay the remaining ${convertNumberToRoundedCurrency(remaining)} to cover all your quarterly pyaments.  `
  }
  if (stateRules[state].userNote) {
    explanation += `${stateRules[state].userNote}`
  }
  const payment = {
    safeToSkipStatePayment: safeToSkipStatePayment,
    due: due,
    paid: paid,
    remaining: remaining, 
    explanation: explanation
  }
  return payment
}

const getStateQuarterlyPayment = (state, currentQuarter, yearlyTaxes, withholdings, payment1, payment2, payment3, initialExplanation) => {
  let q1StateQuarterlyPayment = 0
  let q2StateQuarterlyPayment = 0
  let q3StateQuarterlyPayment = 0
  let q4StateQuarterlyPayment = 0
  const nonWithheldSafeHarborStateTaxThisYear = yearlyTaxes - withholdings 
  let explanation = initialExplanation
  if (withholdings > 0) {
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} this year in ${convertStateToUpperCase(state)} taxes through your paycheck witholdings, so you need need to pay the remaining ${convertNumberToRoundedCurrency(nonWithheldSafeHarborStateTaxThisYear)} as total payment this year through quarterly installments. `
  }
  const safeToSkipStatePayment = nonWithheldSafeHarborStateTaxThisYear < stateRules[state].minimumTaxForQuarterlyPayments
  if (safeToSkipStatePayment) {
    q1StateQuarterlyPayment = 0
    q2StateQuarterlyPayment = 0
    q3StateQuarterlyPayment = 0
    q4StateQuarterlyPayment = 0
    explanation += `Since this amount is less than ${convertNumberToRoundedCurrency(stateRules[state].minimumTaxForQuarterlyPayments)}, which is the minimum amount of that ${convertStateToUpperCase(state)} requires for paying quarterly taxes, you have no quarterly payments this year.  `
  }
  else {
    if (currentQuarter == 'Q1') {
      q1StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q1)
      q2StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q2 - q1StateQuarterlyPayment)
      q3StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `For your April payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q1 * 100}% of your total payment which comes to a April payment of ${convertNumberToRoundedCurrency(q1StateQuarterlyPayment)}.  `
      explanation += `For your June payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q2 * 100}% of your total payment and if we subtract your April payment, we get a June payment of ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)}.  `
      explanation += `For your September payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}.  `
      explanation += `For your January payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}.  `
    }
    else if (currentQuarter == 'Q2') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q2 - q1StateQuarterlyPayment)
      q3StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `For June, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q2 * 100}% of your total payment and if we subtract your April payment, we get a June payment of ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)}.  `
      explanation += `For September, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}.  `
      explanation += `For January, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}.  `
    }
    else if (currentQuarter == 'Q3') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = payment2
      q3StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `You've paid ${convertNumberToRoundedCurrency(payment1)} in April and ${convertNumberToRoundedCurrency(payment2)} in June.  `
      explanation += `For September, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}.  `
      explanation += `For January, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}.  `
    } 
    else if (currentQuarter == 'Q4') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = payment2
      q3StateQuarterlyPayment = payment3
      q4StateQuarterlyPayment = Math.max(0, (nonWithheldSafeHarborStateTaxThisYear) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `You've paid ${convertNumberToRoundedCurrency(payment1)} in April, ${convertNumberToRoundedCurrency(payment2)} in June, and ${convertNumberToRoundedCurrency(payment3)} in September. `
      explanation += `For January, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}.  `  
    }
  }
  if (stateRules[state].userNote) {
    explanation += `${stateRules[state].userNote}`
  }
  const payment = {
    nonWithheldSafeHarborStateTaxThisYear: Math.round(Number(nonWithheldSafeHarborStateTaxThisYear)),
    safeToSkipStatePayment: safeToSkipStatePayment,
    q1StateQuarterlyPayment: Math.round(Number(q1StateQuarterlyPayment)),
    q2StateQuarterlyPayment: Math.round(Number(q2StateQuarterlyPayment)),
    q3StateQuarterlyPayment: Math.round(Number(q3StateQuarterlyPayment)),
    q4StateQuarterlyPayment: Math.round(Number(q4StateQuarterlyPayment)),
    explanation: explanation
  }
  return payment
}

export { getStandardDeduction, calculateTax, getStateTaxes, getStateSinglePayment, getStateQuarterlyPayment }