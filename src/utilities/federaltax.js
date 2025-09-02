import { federalRules } from '$src/rules/federal'
import { convertNumberToRoundedCurrency } from '$src/utilities/utilities'

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

const getNoIncomeText = () => {
  let explanation = `Since you don't plan to earn any income this year outside of paychecks, you aren't required to pay any quarterly payments. `
  return explanation
}

const getBelowMinimumTaxText = () => {
  let explanation = `Because you are below the minimum tax thresholds, you aren't required you to make any quarterly payments. `
  return explanation
}

const getNoExpectedIncomeText = () => {
  let explanation = `Since you don't expect to have any income this year you don't need to worry about quarterly taxes. `
  return explanation
}

const getBelowFederalMinimumTaxText = () => {
  let explanation = `For your federal payments, because you are below the minimum tax threshold, you aren't required you to make any quarterly payments. `
  return explanation
}

const getFederalTaxes = (incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, expectedSelfEmploymentIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear) => {
  let safeHarborFederalTaxesThisYear 
  let adjustedGrossIncomeThisYear 
  let taxableFederalIncomeThisYear
  let initialExplanation = ``
  let selfEmploymentTaxesThisYear 
  let estimatedIncomeTax
  let totalFederalTaxThisYear
  if (incomeExpectationThisYear == 'increase' || incomeExpectationThisYear == 'same') {
    let safeHarborHighIncome 
    let safeHarborPercentage
    if (filingStatus == 'separate') {
      safeHarborHighIncome = federalRules.lastYearSafeHarborHighIncome / 2
    }
    else {
      safeHarborHighIncome = federalRules.lastYearSafeHarborHighIncome
    }
    if (adjustedGrossIncomeLastYear > safeHarborHighIncome) {
      safeHarborPercentage = federalRules.lastYearSafeHarborHighPercentage
      safeHarborFederalTaxesThisYear = safeHarborPercentage * federalTaxPaidLastYear
    }
    else {
      safeHarborPercentage = federalRules.lastYearSafeHarborLowPercentage
      safeHarborFederalTaxesThisYear = safeHarborPercentage * federalTaxPaidLastYear
    }
    initialExplanation = `For your federal payments, we can use federal safe harbor rules to minimize the quarterly taxes you pay while preventing penalties. `
    initialExplanation += `Since your income is expected to ${getIncomeExpectationText(incomeExpectationThisYear)} this year, we can use the amount you paid in taxes last year to determine your quarterly payments this year. `
    initialExplanation += `Per federal tax rules, given your income, you can pay ${convertNumberToRoundedCurrency(safeHarborFederalTaxesThisYear)} in total quarterly payments with no penalty, which is ${Math.round(safeHarborPercentage * 100)}% of ${convertNumberToRoundedCurrency(federalTaxPaidLastYear)}, which is what you paid last year in taxes. `
  } 
  else {
    selfEmploymentTaxesThisYear = expectedSelfEmploymentIncomeThisYear * federalRules.selfEmploymenTaxRate * federalRules.selfEmploymentIncomePercentage
    adjustedGrossIncomeThisYear = expectedTotalIncomeThisYear - businessExpensesThisYear - retirementContributionsThisYear - studentLoanInterestThisYear - healthInsuranceThisYear - otherDeductionsThisYear - (selfEmploymentTaxesThisYear / 2)
    taxableFederalIncomeThisYear = Math.max(0, adjustedGrossIncomeThisYear - getStandardDeduction(filingStatus))
    estimatedIncomeTax = calculateTax(taxableFederalIncomeThisYear, filingStatus)
    totalFederalTaxThisYear = estimatedIncomeTax + selfEmploymentTaxesThisYear
    safeHarborFederalTaxesThisYear = federalRules.thisYearSafeHarborUsedPercentage * totalFederalTaxThisYear
    initialExplanation = `For your federal payments, we can use federal safe harbor rules to minimize the quarterly taxes you pay while preventing penalties. `
    initialExplanation += `Since your income is expected to ${getIncomeExpectationText(incomeExpectationThisYear)} this year, we need to estimate your annual taxes this year and then use that to determine your quarterly payments. `
    initialExplanation += `We first calculate your self-employment taxes this year to be ${convertNumberToRoundedCurrency(selfEmploymentTaxesThisYear)}. We get this by multiplying your ${convertNumberToRoundedCurrency(expectedSelfEmploymentIncomeThisYear)} in self-employment income by ${federalRules.selfEmploymentIncomePercentage * 100}%, which is the portion considered taxable, and then multiplying that by ${(federalRules.selfEmploymenTaxRate * 100).toFixed(1)}%, the self-employment tax rate. `
    initialExplanation += `Next, we estimate your adjusted gross income. We start with your expected total income of ${convertNumberToRoundedCurrency(expectedTotalIncomeThisYear)} and subtract your qualified deductions including your business expenses, retirement contributions, student loan interest, health insurance, and other deductions along with half of your self-employment tax, to get an adjusted gross income of ${convertNumberToRoundedCurrency(adjustedGrossIncomeThisYear)}. `
    initialExplanation += `We then subtract your standard deduction of ${convertNumberToRoundedCurrency(getStandardDeduction(filingStatus))} to get your taxable federal income of ${convertNumberToRoundedCurrency(taxableFederalIncomeThisYear)}. `
    initialExplanation += `We apply the federal tax brackets to estimate your federal income tax of ${convertNumberToRoundedCurrency(estimatedIncomeTax)} and then add your self-employment taxes of ${convertNumberToRoundedCurrency(selfEmploymentTaxesThisYear)} to get a total estimated annual federal tax of ${convertNumberToRoundedCurrency(totalFederalTaxThisYear)}. `
    initialExplanation += `We then apply the federal safe harbor percentage of ${federalRules.thisYearSafeHarborUsedPercentage * 100}% to get a safe harbor value of ${convertNumberToRoundedCurrency(safeHarborFederalTaxesThisYear)} for this year which is what you need to pay in total this year through quarterly payments. `
    // console.log(`selfEmploymentTaxesThisYear: ${selfEmploymentTaxesThisYear}`)
    // console.log(`expectedSelfEmploymentIncomeThisYear: ${expectedSelfEmploymentIncomeThisYear}`)
    // console.log(`expectedTotalIncomeThisYear: ${expectedTotalIncomeThisYear}`)
    // console.log(`businessExpensesThisYear: ${businessExpensesThisYear}`)
    // console.log(`retirementContributionsThisYear: ${retirementContributionsThisYear}`)
    // console.log(`studentLoanInterestThisYear: ${studentLoanInterestThisYear}`)
    // console.log(`healthInsuranceThisYear: ${healthInsuranceThisYear}`)
    // console.log(`otherDeductionsThisYear: ${otherDeductionsThisYear}`)
    // console.log(`adjustedGrossIncomeThisYear: ${adjustedGrossIncomeThisYear}`)
    // console.log(`taxableFederalIncomeThisYear: ${taxableFederalIncomeThisYear}`)
    // console.log(`estimatedIncomeTax: ${estimatedIncomeTax}`)
    // console.log(`totalFederalTaxThisYear: ${totalFederalTaxThisYear}`)
    // console.log(`initialExplanation: ${initialExplanation}`)
  }
  const taxes = {
    adjustedGrossIncomeThisYear: Math.round(adjustedGrossIncomeThisYear),
    taxableFederalIncomeThisYear: Math.round(taxableFederalIncomeThisYear), 
    safeHarborFederalTaxesThisYear: Math.round(safeHarborFederalTaxesThisYear),
    initialExplanation: initialExplanation
  }
  return taxes
}

const getFederalSinglePayment = (yearlyTaxes, withholdings, payment1, payment2, payment3, initialExplanation) => {
  let due = 0
  let paid = 0
  let remaining = 0
  const totalFederalTaxLiability  = yearlyTaxes - withholdings 
  let explanation = initialExplanation
  const safeToSkipFederalPayment = totalFederalTaxLiability  < federalRules.minimumTaxForQuarterlyPayments
  if (safeToSkipFederalPayment) {
    due = 0
    paid = Math.round(Number(payment1) + Number(payment2) + Number(payment3))
    remaining = 0
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} this year in federal taxes through your paycheck witholdings, so you need need to pay the remaining ${convertNumberToRoundedCurrency(totalFederalTaxLiability )}. `
    explanation += `Since this amount is less than ${convertNumberToRoundedCurrency(federalRules.minimumTaxForQuarterlyPayments)}, which is the minimum amount of that the federal rules requires for paying quarterly taxes, you are not due to pay any quarterly payments. `
  }
  else {
    due = Math.round(Number(totalFederalTaxLiability ))
    paid = Math.round(Number(payment1) + Number(payment2) + Number(payment3))
    remaining = Math.max(0, (totalFederalTaxLiability  - payment1 - payment2 - payment3))
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} in federal paycheck witholdings so you are due to pay the remaining ${convertNumberToRoundedCurrency(due)} in quarterly payments. `
    explanation += `You've paid ${convertNumberToRoundedCurrency(paid)} in quarterly payments so far so you need need to pay the remaining ${convertNumberToRoundedCurrency(remaining)} to cover all your quarterly payments. `
  }
  explanation += `${federalRules.userNote}`
  const payment = {
    safeToSkipFederalPayment: safeToSkipFederalPayment,
    totalFederalTaxLiability: Math.round(Number(totalFederalTaxLiability)),
    due: due,
    paid: paid,
    remaining: remaining,
    explanation: explanation
  }
  return payment
}

const getFederalQuarterlyPayment = (currentTaxQuarter, yearlyTaxes, withholdings, payment1, payment2, payment3, initialExplanation) => {
  let q1federalQuarterlyPayment = 0
  let q2federalQuarterlyPayment = 0
  let q3federalQuarterlyPayment = 0
  let q4federalQuarterlyPayment = 0 
  const totalFederalTaxLiability  = yearlyTaxes - withholdings 
  let explanation = initialExplanation
  if (withholdings > 0) {
    explanation += `You've paid ${convertNumberToRoundedCurrency(withholdings)} this year in federal taxes through your paycheck witholdings, so you need need to pay the remaining ${convertNumberToRoundedCurrency(totalFederalTaxLiability )} as total payment this year through quarterly installments. `
  }
  const safeToSkipFederalPayment = totalFederalTaxLiability  < federalRules.minimumTaxForQuarterlyPayments
  if (safeToSkipFederalPayment) {
    q1federalQuarterlyPayment = 0
    q2federalQuarterlyPayment = 0
    q3federalQuarterlyPayment = 0
    q4federalQuarterlyPayment = 0
    explanation += `Since this amount is less than ${convertNumberToRoundedCurrency(federalRules.minimumTaxForQuarterlyPayments)}, which is the minimum amount of that the federal rules requires for paying quarterly taxes, you have no quarterly payments this year. `
  }
  else {
    if (currentTaxQuarter == 'Q1') {
      q1federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q1)
      q2federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q2 - q1federalQuarterlyPayment)
      q3federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q3 - q1federalQuarterlyPayment - q2federalQuarterlyPayment)
      q4federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
      explanation += `For your April payment, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q1 * 100}% of your total payment which comes to a April payment of ${convertNumberToRoundedCurrency(q1federalQuarterlyPayment)}. `
      explanation += `For your June payment, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q2 * 100}% of your total payment and if we subtract your April payment, we get a June payment of ${convertNumberToRoundedCurrency(q2federalQuarterlyPayment)}. `
      explanation += `For your September payment, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3federalQuarterlyPayment)}. `
      explanation += `For your January payment, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4federalQuarterlyPayment)}. `
    }
    else if (currentTaxQuarter == 'Q2') {
      q1federalQuarterlyPayment = payment1
      q2federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q2 - q1federalQuarterlyPayment)
      q3federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q3 - q1federalQuarterlyPayment - q2federalQuarterlyPayment)
      q4federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
      explanation += `You've paid ${convertNumberToRoundedCurrency(payment1)} in April.  `
      explanation += `For June, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q2 * 100}% of your total payment and if we subtract your April payment, we get a June payment of ${convertNumberToRoundedCurrency(q2federalQuarterlyPayment)}. `
      explanation += `For September, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3federalQuarterlyPayment)}. `
      explanation += `For January, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4federalQuarterlyPayment)}. `
    }
    else if (currentTaxQuarter == 'Q3') {
      q1federalQuarterlyPayment = payment1
      q2federalQuarterlyPayment = payment2
      q3federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q3 - q1federalQuarterlyPayment - q2federalQuarterlyPayment)
      q4federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
      explanation += `You've paid ${convertNumberToRoundedCurrency(payment1)} in April and ${convertNumberToRoundedCurrency(payment2)} in June.  `
      explanation += `For September, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q3 * 100}% of your total payment and if we subtract your April and June payments, we get a September payment of ${convertNumberToRoundedCurrency(q3federalQuarterlyPayment)}. `
      explanation += `For January, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4federalQuarterlyPayment)}. `
    } 
    else if (currentTaxQuarter == 'Q4') {
      q1federalQuarterlyPayment = payment1
      q2federalQuarterlyPayment = payment2
      q3federalQuarterlyPayment = payment3
      q4federalQuarterlyPayment = Math.max(0, (totalFederalTaxLiability ) * federalRules.quarterlyCumulativeSchedule.Q4 - q1federalQuarterlyPayment - q2federalQuarterlyPayment - q3federalQuarterlyPayment)
      explanation += `You've paid ${convertNumberToRoundedCurrency(payment1)} in April, ${convertNumberToRoundedCurrency(payment2)} in June, and ${convertNumberToRoundedCurrency(payment3)} in September. `
      explanation += `For January, federal tax rules require you to have paid ${federalRules.quarterlyCumulativeSchedule.Q4 * 100}% of your total payment and if we subtract your April, June, and September payments, we get a January payment of ${convertNumberToRoundedCurrency(q4federalQuarterlyPayment)}. `  
    }
  }
  explanation += `${federalRules.userNote}`
  const payment = {
    totalFederalTaxLiability : Math.round(Number(totalFederalTaxLiability )),
    safeToSkipFederalPayment: safeToSkipFederalPayment,
    q1federalQuarterlyPayment: Math.round(Number(q1federalQuarterlyPayment)),
    q2federalQuarterlyPayment: Math.round(Number(q2federalQuarterlyPayment)),
    q3federalQuarterlyPayment: Math.round(Number(q3federalQuarterlyPayment)),
    q4federalQuarterlyPayment: Math.round(Number(q4federalQuarterlyPayment)),
    explanation: explanation
  }
  return payment
}

export { getFederalTaxes, getFederalSinglePayment, getFederalQuarterlyPayment, calculateTax, getNoIncomeText, getBelowMinimumTaxText, getNoExpectedIncomeText, getBelowFederalMinimumTaxText }