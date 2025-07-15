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

const getStateTaxes = (state, livedInCurrentStateAllLastYear, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions) => {
  let safeHarborStateTaxesThisYear 
  let stateAdjustableGrossIncomeThisYear 
  let taxableStateIncomeThisYear
  let initialExplanation = ``
  let standardDeduction
  if ((incomeExpectationThisYear == 'increase' || incomeExpectationThisYear == 'same') && stateRules[state].lastYearSafeHarborRule && livedInCurrentStateAllLastYear) {
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
    initialExplanation = `For your ${convertStateToUpperCase(state)} payments, we can use ${convertStateToUpperCase(state)} safe harbor rules to minimize the quarterly taxes you pay while preventing penalties. `
    initialExplanation += `Since your income is expected to ${getIncomeExpectationText(incomeExpectationThisYear)} this year and ${convertStateToUpperCase(state)} supports it, we can use the amount you paid in taxes last year to determine your quarterly payments this year. `
    initialExplanation += `Per ${convertStateToUpperCase(state)} tax rules, given your income, you can pay ${convertNumberToRoundedCurrency(safeHarborStateTaxesThisYear)} in total quarterly payments with no penalty, which is ${Math.round(safeHarborPercentage * 100)}% of ${convertNumberToRoundedCurrency(stateTaxPaidLastYear)}, which is what you paid last year in ${convertStateToUpperCase(state)} taxes. `
  } 
  else {
    const taxes = getThisYearSafeHarborStateTaxes(state, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
    safeHarborStateTaxesThisYear = taxes.safeHarborStateTaxesThisYear
    standardDeduction = taxes.standardDeduction
    stateAdjustableGrossIncomeThisYear = taxes.stateAdjustableGrossIncomeThisYear
    taxableStateIncomeThisYear = taxes.taxableStateIncomeThisYear
    if (!livedInCurrentStateAllLastYear) {
      initialExplanation += `Since you lived in multiple states last year, we can use ${convertStateToUpperCase(state)} safe harbor rules applied to this year's expected income to minimize the quarterly taxes you pay while preventing penalties. `
    }
    else if (!stateRules[state].lastYearSafeHarborRule) {
      initialExplanation = `For your ${convertStateToUpperCase(state)} payments, we can use ${convertStateToUpperCase(state)} safe harbor rules applied to this year's expected income to minimize the quarterly taxes you pay while preventing penalties. `
    }
    else { 
      initialExplanation = `For your ${convertStateToUpperCase(state)} payments, we can use ${convertStateToUpperCase(state)} safe harbor rules to minimize the quarterly taxes you pay while preventing penalties. `
      initialExplanation += `Since your income is expected to ${getIncomeExpectationText(incomeExpectationThisYear)} this year, we need to estimate your annual ${convertStateToUpperCase(state)} taxes this year and then use that to determine your quarterly payments. `
    }
    initialExplanation += `To estimate your annual ${convertStateToUpperCase(state)} taxes this year, we take your expected total income this year of ${convertNumberToRoundedCurrency(expectedTotalIncomeThisYear)} and subtract out the business deductions and exemptions that ${convertStateToUpperCase(state)} allows to get an adjusted state income of ${convertNumberToRoundedCurrency(stateAdjustableGrossIncomeThisYear)}. `
    initialExplanation += `We then subtract out your standard deduction of ${convertNumberToRoundedCurrency(standardDeduction)} to get a taxable state income of ${convertNumberToRoundedCurrency(taxableStateIncomeThisYear)}. `
    initialExplanation += `We use that to calculate an annual ${convertStateToUpperCase(state)} tax of ${convertNumberToRoundedCurrency(safeHarborStateTaxesThisYear)} this year which is what you need to pay in total this year through quarterly payments. `
  }
  const taxes = {
    stateAdjustableGrossIncomeThisYear: Math.round(Number(stateAdjustableGrossIncomeThisYear)),
    taxableStateIncomeThisYear: Math.round(Number(taxableStateIncomeThisYear)), 
    safeHarborStateTaxesThisYear: Math.round(Number(safeHarborStateTaxesThisYear)),
    initialExplanation: initialExplanation
  }
  return taxes
}

const getThisYearSafeHarborStateTaxes = (state, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions) => {
  const allDeductions = {
    businessExpensesThisYear,
    retirementContributionsThisYear,
    studentLoanInterestThisYear,
    healthInsuranceThisYear,
    otherDeductionsThisYear
  }  
  let stateAdjustableGrossIncomeThisYear
  let taxableStateIncomeThisYear
  let safeHarborStateTaxesThisYear
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
  return {
    safeHarborStateTaxesThisYear: safeHarborStateTaxesThisYear,
    standardDeduction: standardDeduction,
    taxableStateIncomeThisYear: taxableStateIncomeThisYear,
    stateAdjustableGrossIncomeThisYear: stateAdjustableGrossIncomeThisYear  
  }
}

const getNumberOfTaxStates = (q1State, q2State, q3State, q4State) => {
  let numberOfTaxStates = 0
  if (stateRules[q1State].stateHasQuarterlyTaxes) {
    numberOfTaxStates++
  }
  if (stateRules[q2State].stateHasQuarterlyTaxes) {
    numberOfTaxStates++
  }
  if (stateRules[q3State].stateHasQuarterlyTaxes) {
    numberOfTaxStates++
  }
  if (stateRules[q4State].stateHasQuarterlyTaxes) {
    numberOfTaxStates++
  }
  return numberOfTaxStates
}

const getMultiStateTaxes = (q1State, q2State, q3State, q4State, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions) => {
  let numberOfTaxStates = getNumberOfTaxStates(q1State, q2State, q3State, q4State)
  let q1Taxes = {}
  let q2Taxes = {}
  let q3Taxes = {}
  let q4Taxes = {}
  q1Taxes.safeHarborStateTaxesThisYear = 0
  q2Taxes.safeHarborStateTaxesThisYear = 0
  q3Taxes.safeHarborStateTaxesThisYear = 0
  q4Taxes.safeHarborStateTaxesThisYear = 0
  let safeHarborStateTaxesThisYear = 0
  if (stateRules[q1State].stateHasQuarterlyTaxes) {
    q1Taxes = getThisYearSafeHarborStateTaxes(q1State, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
  }
  if (stateRules[q2State].stateHasQuarterlyTaxes) {
    q2Taxes = getThisYearSafeHarborStateTaxes(q2State, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
  }
  if (stateRules[q3State].stateHasQuarterlyTaxes) {
    q3Taxes = getThisYearSafeHarborStateTaxes(q3State, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
  }
  if (stateRules[q4State].stateHasQuarterlyTaxes) {
    q4Taxes = getThisYearSafeHarborStateTaxes(q4State, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
  }
  if (numberOfTaxStates > 0) {
    safeHarborStateTaxesThisYear = (q1Taxes.safeHarborStateTaxesThisYear + q2Taxes.safeHarborStateTaxesThisYear + q3Taxes.safeHarborStateTaxesThisYear + q4Taxes.safeHarborStateTaxesThisYear) / numberOfTaxStates
  }
 return {
  safeHarborStateTaxesThisYear: Math.round(Number(safeHarborStateTaxesThisYear))
 }
}

const getStateSinglePayment = (state, yearlyTaxes, withholdings, payment1, payment2, payment3, initialExplanation) => {
  let due = 0
  let paid = 0
  let remaining = 0
  const totalStateTaxLiability  = yearlyTaxes - withholdings 
  let explanation = initialExplanation
  const safeToSkipStatePayment = totalStateTaxLiability  < stateRules[state].minimumTaxForQuarterlyPayments
  if (safeToSkipStatePayment) {
    due = 0 
    paid = Math.round(Number(payment1) + Number(payment2) + Number(payment3))
    remaining = 0
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} this year in ${convertStateToUpperCase(state)} taxes through your paycheck witholdings, so you need need to pay the remaining ${convertNumberToRoundedCurrency(totalStateTaxLiability )}. `
    explanation += `Since this amount is less than ${convertNumberToRoundedCurrency(stateRules[state].minimumTaxForQuarterlyPayments)}, which is the minimum amount of that the ${convertStateToUpperCase(state)} rules requires for paying quarterly taxes, you are not due to pay any quarterly payments. `
  } 
  else {
    due = Math.round(Number(totalStateTaxLiability ))
    paid = Math.round(Number(payment1) + Number(payment2) + Number(payment3))
    remaining = Math.max(0, (totalStateTaxLiability  - payment1 - payment2 - payment3))
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} in ${convertStateToUpperCase(state)} paycheck witholdings so you are due to pay the remaining ${convertNumberToRoundedCurrency(due)} in quarterly payments. `
    explanation += `You've paid ${convertNumberToRoundedCurrency(paid)} in quarterly payments so far so you need to pay the remaining ${convertNumberToRoundedCurrency(remaining)} to cover all your quarterly payments. `
  }
  if (stateRules[state].userNote) {
    explanation += `${stateRules[state].userNote}`
  }
  const payment = {
    safeToSkipStatePayment: safeToSkipStatePayment,
    totalStateTaxLiability: Math.round(Number(totalStateTaxLiability)),
    due: due,
    paid: paid,
    remaining: remaining, 
    explanation: explanation
  }
  return payment
}

const getStateQuarterlyPayment = (state, currentTaxQuarter, yearlyTaxes, withholdings, payment1, payment2, payment3, initialExplanation) => {
  let q1StateQuarterlyPayment = 0
  let q2StateQuarterlyPayment = 0
  let q3StateQuarterlyPayment = 0
  let q4StateQuarterlyPayment = 0
  const totalStateTaxLiability  = yearlyTaxes - withholdings 
  let explanation = initialExplanation
  if (withholdings > 0) {
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} this year in ${convertStateToUpperCase(state)} taxes through your paycheck witholdings, so you need need to pay the remaining ${convertNumberToRoundedCurrency(totalStateTaxLiability )} as total payment this year through quarterly installments. `
  }
  const safeToSkipStatePayment = totalStateTaxLiability  < stateRules[state].minimumTaxForQuarterlyPayments
  if (safeToSkipStatePayment) {
    q1StateQuarterlyPayment = 0
    q2StateQuarterlyPayment = 0
    q3StateQuarterlyPayment = 0
    q4StateQuarterlyPayment = 0
    explanation += `Since this amount is less than ${convertNumberToRoundedCurrency(stateRules[state].minimumTaxForQuarterlyPayments)}, which is the minimum amount of that ${convertStateToUpperCase(state)} requires for paying quarterly taxes, you have no quarterly payments this year. `
  }
  else {
    if (currentTaxQuarter == 'Q1') {
      q1StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q1)
      q2StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q2 - q1StateQuarterlyPayment)
      q3StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `For your April payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q1 * 100}% of your total payment which comes to a April payment of ${convertNumberToRoundedCurrency(q1StateQuarterlyPayment)}. `
      explanation += `For your June payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q2 * 100}% of your total payment and if we subtract your April payment, we get a June payment of ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)}. `
      explanation += `For your September payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}. `
      explanation += `For your January payment, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `
    }
    else if (currentTaxQuarter == 'Q2') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q2 - q1StateQuarterlyPayment)
      q3StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `For June, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q2 * 100}% of your total payment and if we subtract your April payment, we get a June payment of ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)}. `
      explanation += `For September, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}. `
      explanation += `For January, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `
    }
    else if (currentTaxQuarter == 'Q3') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = payment2
      q3StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q3 - q1StateQuarterlyPayment - q2StateQuarterlyPayment)
      q4StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `You've paid ${convertNumberToRoundedCurrency(payment1)} in April and ${convertNumberToRoundedCurrency(payment2)} in June.  `
      explanation += `For September, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}. `
      explanation += `For January, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `
    } 
    else if (currentTaxQuarter == 'Q4') {
      q1StateQuarterlyPayment = payment1
      q2StateQuarterlyPayment = payment2
      q3StateQuarterlyPayment = payment3
      q4StateQuarterlyPayment = Math.max(0, (totalStateTaxLiability ) * stateRules[state].quarterlyCumulativeSchedule.Q4 - q1StateQuarterlyPayment - q2StateQuarterlyPayment - q3StateQuarterlyPayment)
      explanation += `You've paid ${convertNumberToRoundedCurrency(payment1)} in April, ${convertNumberToRoundedCurrency(payment2)} in June, and ${convertNumberToRoundedCurrency(payment3)} in September. `
      explanation += `For January, ${convertStateToUpperCase(state)} tax rules require you to have paid ${stateRules[state].quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `  
    }
  }
  if (stateRules[state].userNote) {
    explanation += `${stateRules[state].userNote}`
  }
  const payment = {
    totalStateTaxLiability : Math.round(Number(totalStateTaxLiability )),
    safeToSkipStatePayment: safeToSkipStatePayment,
    q1StateQuarterlyPayment: Math.round(Number(q1StateQuarterlyPayment)),
    q2StateQuarterlyPayment: Math.round(Number(q2StateQuarterlyPayment)),
    q3StateQuarterlyPayment: Math.round(Number(q3StateQuarterlyPayment)),
    q4StateQuarterlyPayment: Math.round(Number(q4StateQuarterlyPayment)),
    explanation: explanation
  }
  return payment
}


const getCurrentState = (currrenQuarter, q1State, q2State, q3State, q4State) => {
  if (currrenQuarter === 'Q1') {
    return q1State
  }
  else if (currrenQuarter === 'Q2') {
    return q2State
  }
  else if (currrenQuarter === 'Q3') {
    return q3State
  }
  else if (currrenQuarter === 'Q4') {
    return q4State
  }
}

const getUnderPayments = (q1State, q2State, q3State, q4State, currentTaxQuarter, payment1, payment2, payment3, paymentPerQuarter) => {
  const currentQuarterState = getCurrentState(currentTaxQuarter, q1State, q2State, q3State, q4State)
  const underpaidAmountsByState = {}
  let currentStateUnderPayment = 0
  let otherStatesToPay = []
  if (currentTaxQuarter === 'Q2' || currentTaxQuarter === 'Q3' || currentTaxQuarter === 'Q4') {
    if (stateRules[q1State].stateHasQuarterlyTaxes) {
      if (payment1 < paymentPerQuarter) {
          const q1Underpayment = paymentPerQuarter - payment1
          underpaidAmountsByState[q1State] = (underpaidAmountsByState[q1State] || 0) + q1Underpayment
      }
    }
  }
  if (currentTaxQuarter === 'Q3' || currentTaxQuarter === 'Q4') {
    if (stateRules[q2State].stateHasQuarterlyTaxes) {
    if (payment2 < paymentPerQuarter) {
        const q2Underpayment = paymentPerQuarter - payment2
        underpaidAmountsByState[q2State] = (underpaidAmountsByState[q2State] || 0) + q2Underpayment
      }
    }
  }
  if (currentTaxQuarter === 'Q4') {
    if (stateRules[q3State].stateHasQuarterlyTaxes) {
      if (payment3 < paymentPerQuarter) {
        const q3Underpayment = paymentPerQuarter - payment3
        underpaidAmountsByState[q3State] = (underpaidAmountsByState[q3State] || 0) + q3Underpayment
      }
    }
  }
  for (const stateName in underpaidAmountsByState) {
    if (stateName === currentQuarterState) {
      currentStateUnderPayment = underpaidAmountsByState[stateName]
    }
    else {
      otherStatesToPay.push({
        state: stateName,
        amount: underpaidAmountsByState[stateName],
        markPaid: false
      })
    }
  }
  return {
    currentStateUnderPayment,
    otherStatesToPay
  }
}

const getMultiStatePayments = (q1State, q2State, q3State, q4State, currentTaxQuarter, yearlyTaxes, withholdings, payment1, payment2, payment3) => {
  const totalStateTaxLiability = Math.max(0, yearlyTaxes - withholdings)
  const numberOfTaxStates = getNumberOfTaxStates(q1State, q2State, q3State, q4State)
  const paymentPerQuarter = Math.round(totalStateTaxLiability / numberOfTaxStates)
  
  let explanation = `Since you're living in multiple states this year, we can use safe harbor rules based on this year's expected income to minimize the quarterly taxes you pay while preventing penalties. `
  explanation += `We first calculate your total state safe harbor taxes this year of ${convertNumberToRoundedCurrency(yearlyTaxes)}. We determined this number by calculating the safe harbor taxes for each state you're living in this year that has income taxes and then used a weighted average based on how long you are in each state. `
  explanation += `We then subtract ${convertNumberToRoundedCurrency(withholdings)}, which is what you've already paid in state taxes through paycheck withholdings, to get your remaining tax liability of ${convertNumberToRoundedCurrency(totalStateTaxLiability)}. `
  explanation += `We divide this evenly across the quarters, which comes out to ${convertNumberToRoundedCurrency(paymentPerQuarter)} which is what you need to pay to the states you are living in that collect income taxes. `

  let q1StateQuarterlyPayment = 0
  let q2StateQuarterlyPayment = 0
  let q3StateQuarterlyPayment = 0
  let q4StateQuarterlyPayment = 0
  let otherStatesToPay = []

  if (currentTaxQuarter === 'Q1') {
    if (stateRules[q1State].stateHasQuarterlyTaxes) { 
      q1StateQuarterlyPayment = paymentPerQuarter
      explanation += `Your April payment to ${convertStateToUpperCase(q1State)} is ${convertNumberToRoundedCurrency(q1StateQuarterlyPayment)}. `
    }
    else {
      q1StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q1State)} does not collect income taxes, you don't need to pay any taxes to them in April. `
    }
    if (stateRules[q2State].stateHasQuarterlyTaxes) {
      q2StateQuarterlyPayment = paymentPerQuarter
      explanation += `Your June payment to ${convertStateToUpperCase(q2State)} is ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)}. `
    }
    else {
      q2StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q2State)} does not collect income taxes, you don't need to pay any taxes to them in June. `
    }
    if (stateRules[q3State].stateHasQuarterlyTaxes) {
      q3StateQuarterlyPayment = paymentPerQuarter
      explanation += `Your September payment to ${convertStateToUpperCase(q3State)} is ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}. `
    }
    else {
      q3StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q3State)} does not collect income taxes, you don't need to pay any taxes to them in September. `
    }
    if (stateRules[q4State].stateHasQuarterlyTaxes) {
      q4StateQuarterlyPayment = paymentPerQuarter 
      explanation += `Your January payment to ${convertStateToUpperCase(q4State)} is ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `
    }
    else {
      q4StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q4State)} does not collect income taxes, you don't need to pay any taxes to them in January. `
    }
  }
  else if (currentTaxQuarter === 'Q2') {
    q1StateQuarterlyPayment = payment1
    explanation += `You've already paid ${convertNumberToRoundedCurrency(q1StateQuarterlyPayment)} to ${convertStateToUpperCase(q1State)} in April. `
    const underPayments = getUnderPayments(q1State, q2State, q3State, q4State, currentTaxQuarter, payment1, payment2, payment3, paymentPerQuarter)
    if (stateRules[q2State].stateHasQuarterlyTaxes) {
      q2StateQuarterlyPayment = paymentPerQuarter + underPayments.currentStateUnderPayment
      if (underPayments.currentStateUnderPayment > 0) {
        explanation += `Your June payment to ${convertStateToUpperCase(q2State)} is ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)} which includes a catch up payment of ${convertNumberToRoundedCurrency(underPayments.currentStateUnderPayment)} to make up for your underpayments in past quarters. `
      }
      else {
        explanation += `Your June payment to ${convertStateToUpperCase(q2State)} is ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)}. `
      }
    }
    else {
      q2StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q2State)} does not collect income taxes, you don't need to pay any taxes to them in June. `
    }
    if (stateRules[q3State].stateHasQuarterlyTaxes) {
      q3StateQuarterlyPayment = paymentPerQuarter
      explanation += `Your September payment to ${convertStateToUpperCase(q3State)} is ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}. `
    }
    else {
      q3StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q3State)} does not collect income taxes, you don't need to pay any taxes to them in September. `
    }
    if (stateRules[q4State].stateHasQuarterlyTaxes) {
      q4StateQuarterlyPayment = paymentPerQuarter
      explanation += `Your January payment to ${convertStateToUpperCase(q4State)} is ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `
    }
    else {
      q4StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q4State)} does not collect income taxes, you don't need to pay any taxes to them in January. `
    }
    otherStatesToPay = underPayments.otherStatesToPay
    if (otherStatesToPay.length > 0) {
      for (const state of otherStatesToPay) {
        explanation += `You also need to pay ${convertNumberToRoundedCurrency(state.amount)} to ${convertStateToUpperCase(state.state)} this quarter to make up for your underpayments in past quarters. `
      }
    }
  }
  else if (currentTaxQuarter === 'Q3') {
    q1StateQuarterlyPayment = payment1
    explanation += `You've already paid ${convertNumberToRoundedCurrency(q1StateQuarterlyPayment)} to ${convertStateToUpperCase(q1State)} in April. `
    q2StateQuarterlyPayment = payment2
    explanation += `You've already paid ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)} to ${convertStateToUpperCase(q2State)} in June. `
    const underPayments = getUnderPayments(q1State, q2State, q3State, q4State, currentTaxQuarter, payment1, payment2, payment3, paymentPerQuarter)
    if (stateRules[q3State].stateHasQuarterlyTaxes) {
      q3StateQuarterlyPayment = paymentPerQuarter + underPayments.currentStateUnderPayment
      if (underPayments.currentStateUnderPayment > 0) {
        explanation += `Your September payment to ${convertStateToUpperCase(q3State)} is ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)} which includes a catch up payment of ${convertNumberToRoundedCurrency(underPayments.currentStateUnderPayment)} to make up for your underpayments in past quarters. `
      }
      else {
        explanation += `Your September payment to ${convertStateToUpperCase(q3State)} is ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)}. `
      }
    }
    else {
      q3StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q3State)} does not collect income taxes, you don't need to pay any taxes to them in September. `
    }
    if (stateRules[q4State].stateHasQuarterlyTaxes) {
      q4StateQuarterlyPayment = paymentPerQuarter
      explanation += `Your January payment is ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `
    }
    else {
      explanation += `Since ${convertStateToUpperCase(q4State)} does not collect income taxes, you don't need to pay any taxes to them in January. `
    }
    otherStatesToPay = underPayments.otherStatesToPay
    if (otherStatesToPay.length > 0) {
      for (const state of otherStatesToPay) {
        explanation += `You also need to pay ${convertNumberToRoundedCurrency(state.amount)} to ${convertStateToUpperCase(state.state)} this quarter to make up for your underpayments in past quarters. `
      }
    }
  }
  else if (currentTaxQuarter === 'Q4') {
    q1StateQuarterlyPayment = payment1
    q2StateQuarterlyPayment = payment2
    q3StateQuarterlyPayment = payment3
    explanation += `You've already paid ${convertNumberToRoundedCurrency(q1StateQuarterlyPayment)} to ${convertStateToUpperCase(q1State)} in April, ${convertNumberToRoundedCurrency(q2StateQuarterlyPayment)} to ${convertStateToUpperCase(q2State)} in June, and ${convertNumberToRoundedCurrency(q3StateQuarterlyPayment)} to ${convertStateToUpperCase(q3State)} in September. `
    const underPayments = getUnderPayments(q1State, q2State, q3State, q4State, currentTaxQuarter, payment1, payment2, payment3, paymentPerQuarter)
    if (stateRules[q4State].stateHasQuarterlyTaxes) {
      q4StateQuarterlyPayment = paymentPerQuarter + underPayments.currentStateUnderPayment
      if (underPayments.currentStateUnderPayment > 0) {
        explanation += `Your January payment to ${convertStateToUpperCase(q4State)} is ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)} which includes a catch up payment of ${convertNumberToRoundedCurrency(underPayments.currentStateUnderPayment)} to make up for your underpayments in past quarters. `
      }
      else {
        explanation += `Your January payment to ${convertStateToUpperCase(q4State)} is ${convertNumberToRoundedCurrency(q4StateQuarterlyPayment)}. `
      }
    }
    else {
      q4StateQuarterlyPayment = 0
      explanation += `Since ${convertStateToUpperCase(q4State)} does not collect income taxes, you don't need to pay any taxes to them in January. `
    }
    otherStatesToPay = underPayments.otherStatesToPay
    if (otherStatesToPay.length > 0) {
      for (const state of otherStatesToPay) {
        explanation += `You also need to pay ${convertNumberToRoundedCurrency(state.amount)} to ${convertStateToUpperCase(state.state)} this quarter to make up for your underpayments in past quarters. `
      }
    }
  }
  explanation += `Note that these payments assume that you lived in each state for the full quarter which is a close enough approximation in most cases. `
  return {
    totalStateTaxLiability: Math.round(Number(totalStateTaxLiability )),
    q1StateQuarterlyPayment: Math.round(Number(q1StateQuarterlyPayment)),
    q2StateQuarterlyPayment: Math.round(Number(q2StateQuarterlyPayment)),
    q3StateQuarterlyPayment: Math.round(Number(q3StateQuarterlyPayment)),
    q4StateQuarterlyPayment: Math.round(Number(q4StateQuarterlyPayment)),
    otherStatesToPay,
    explanation
  }
}

const getNoStateTaxesText = (state) => {
  let explanation = `For your ${convertStateToUpperCase(state)} payments, because it doesn't have income taxes, you aren't required you to make any quarterly payments. `
  return explanation
} 

const stateBelowMinimumTaxText = (state) => {
  let explanation = `For your ${convertStateToUpperCase(state)} payments, because you are below the minimum tax threshold, you aren't required you to make any quarterly payments. `
  return explanation
} 

const getNoneOfStatesTaxesText = () => {
  let explanation = `For your state payments, since you don't plan to live in any states that collect income taxes, you don't need to pay any quarterly payments. `
  return explanation
} 


export { getStandardDeduction, calculateTax, getStateTaxes, getStateSinglePayment, getStateQuarterlyPayment, getMultiStatePayments, getMultiStateTaxes, getNoStateTaxesText, stateBelowMinimumTaxText, getNoneOfStatesTaxesText }
