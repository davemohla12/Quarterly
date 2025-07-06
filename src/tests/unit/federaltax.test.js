import { getFederalTaxes, getFederalSinglePayment, getFederalQuarterlyPayment } from '$src/utilities/federaltax.js'

describe('getFederalTaxes', () => {
  it('should return the correct payments if income is decreasing', () => {
    const currentTaxQuarter = 'Q2'
    const filingStatus = 'married'
    const federalTaxPaidLastYear = 18000
    const adjustedGrossIncomeLastYear = 180000
    const incomeExpectationThisYear = 'decrease'
    const expectedTotalIncomeThisYear = 120000
    const businessExpensesThisYear = 15000
    const retirementContributionsThisYear = 8000
    const studentLoanInterestThisYear = 0
    const healthInsuranceThisYear = 6000
    const otherDeductionsThisYear = 2000
    const withholdings = 2000
    const payment1 = 1500
    const payment2 = 0
    const payment3 = 0

    const federalTaxes = getFederalTaxes(incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear)
    const federalQuarterlyPayments = getFederalQuarterlyPayment(currentTaxQuarter, federalTaxes.safeHarborFederalTaxesThisYear, withholdings, payment1, payment2, payment3, federalTaxes.initialExplanation)
    const federalSinglePayment = getFederalSinglePayment(federalTaxes.safeHarborFederalTaxesThisYear, withholdings, payment1, payment2, payment3, federalTaxes.initialExplanation)
    
    expect(federalQuarterlyPayments.q1federalQuarterlyPayment).toEqual(1500)
    expect(federalQuarterlyPayments.q2federalQuarterlyPayment).toEqual(802)
    expect(federalQuarterlyPayments.q3federalQuarterlyPayment).toEqual(1151)
    expect(federalQuarterlyPayments.q4federalQuarterlyPayment).toEqual(1151)

    expect(federalSinglePayment.due).toEqual(4603)
    expect(federalSinglePayment.paid).toEqual(1500)
    expect(federalSinglePayment.remaining).toEqual(3103)
  })  

  it('should return the correct payments if income is increasing', () => {
    const currentTaxQuarter = 'Q3'
    const filingStatus = 'single'
    const federalTaxPaidLastYear = 10000
    const adjustedGrossIncomeLastYear = 140000
    const incomeExpectationThisYear = 'increase'
    const expectedTotalIncomeThisYear = 160000
    const businessExpensesThisYear = 5000
    const retirementContributionsThisYear = 5000
    const studentLoanInterestThisYear = 0
    const healthInsuranceThisYear = 0
    const otherDeductionsThisYear = 0
    const withholdings = 1000
    const payment1 = 500
    const payment2 = 500
    const payment3 = 0

    const federalTaxes = getFederalTaxes(incomeExpectationThisYear, federalTaxPaidLastYear, adjustedGrossIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear)
    const federalQuarterlyPayments = getFederalQuarterlyPayment(currentTaxQuarter, federalTaxes.safeHarborFederalTaxesThisYear, withholdings, payment1, payment2, payment3, federalTaxes.initialExplanation)
    const federalSinglePayment = getFederalSinglePayment(federalTaxes.safeHarborFederalTaxesThisYear, withholdings, payment1, payment2, payment3, federalTaxes.initialExplanation)

    expect(federalQuarterlyPayments.q1federalQuarterlyPayment).toEqual(500)
    expect(federalQuarterlyPayments.q2federalQuarterlyPayment).toEqual(500)
    expect(federalQuarterlyPayments.q3federalQuarterlyPayment).toEqual(5750)
    expect(federalQuarterlyPayments.q4federalQuarterlyPayment).toEqual(2250)

    expect(federalSinglePayment.due).toEqual(9000)
    expect(federalSinglePayment.paid).toEqual(1000)
    expect(federalSinglePayment.remaining).toEqual(8000)
  })
})

