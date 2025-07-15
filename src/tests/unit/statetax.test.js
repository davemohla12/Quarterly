import { getStateTaxes, getStateSinglePayment, getStateQuarterlyPayment } from '$src/utilities/statetax.js'

describe('getStateTaxes', () => {
  it('should return the correct payments if income is decreasing', () => {
    const livedInCurrentStateAllLastYear = true
    const state = 'louisiana'
    const currentTaxQuarter = 'Q1'
    const filingStatus = 'single'
    const stateTaxPaidLastYear = 10000
    const incomeExpectationThisYear = 'decrease'
    const stateIncomeLastYear = 100000
    const expectedTotalIncomeThisYear = 80000
    const businessExpensesThisYear = 8000
    const retirementContributionsThisYear = 5000
    const studentLoanInterestThisYear = 1500
    const healthInsuranceThisYear = 3000
    const otherDeductionsThisYear = 2000
    const exemptions = 1
    const withholdings = 2000
    const payment1 = 0
    const payment2 = 0
    const payment3 = 0

    const stateTaxes = getStateTaxes(state, livedInCurrentStateAllLastYear, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
    const stateQuarterlyPayments = getStateQuarterlyPayment(state, currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)
    const stateSinglePayment = getStateSinglePayment(state, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)

    expect(stateQuarterlyPayments.q1StateQuarterlyPayment).toEqual(0)
    expect(stateQuarterlyPayments.q2StateQuarterlyPayment).toEqual(0)
    expect(stateQuarterlyPayments.q3StateQuarterlyPayment).toEqual(0)
    expect(stateQuarterlyPayments.q4StateQuarterlyPayment).toEqual(0)

    expect(stateSinglePayment.due).toEqual(0)
    expect(stateSinglePayment.paid).toEqual(0)
    expect(stateSinglePayment.remaining).toEqual(0)
  })

  it('should return the correct payments if income is increasing', () => {
    const livedInCurrentStateAllLastYear = true
    const state = 'oregon'
    const currentTaxQuarter = 'Q2'
    const filingStatus = 'married'
    const stateTaxPaidLastYear = 12000
    const incomeExpectationThisYear = 'increase'
    const stateIncomeLastYear = 130000
    const expectedTotalIncomeThisYear = 160000
    const businessExpensesThisYear = 20000
    const retirementContributionsThisYear = 10000
    const studentLoanInterestThisYear = 0
    const healthInsuranceThisYear = 8000
    const otherDeductionsThisYear = 5000
    const exemptions = 2
    const withholdings = 3000
    const payment1 = 1000
    const payment2 = 0
    const payment3 = 0

    const stateTaxes = getStateTaxes(state, livedInCurrentStateAllLastYear, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
    const stateQuarterlyPayments = getStateQuarterlyPayment(state, currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)
    const stateSinglePayment = getStateSinglePayment(state, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)

    expect(stateQuarterlyPayments.q1StateQuarterlyPayment).toEqual(1000)
    expect(stateQuarterlyPayments.q2StateQuarterlyPayment).toEqual(3500)
    expect(stateQuarterlyPayments.q3StateQuarterlyPayment).toEqual(2250)
    expect(stateQuarterlyPayments.q4StateQuarterlyPayment).toEqual(2250)

    expect(stateSinglePayment.due).toEqual(9000)
    expect(stateSinglePayment.paid).toEqual(1000)
    expect(stateSinglePayment.remaining).toEqual(8000)
  })
 
  it(`should return the correct payments if state doesn't support last year safe harbor`, () => {
    const livedInCurrentStateAllLastYear = true
    const state = 'indiana'
    const currentTaxQuarter = 'Q3'
    const filingStatus = 'head'
    const stateTaxPaidLastYear = 9000
    const incomeExpectationThisYear = 'same'
    const stateIncomeLastYear = 90000
    const expectedTotalIncomeThisYear = 90000
    const businessExpensesThisYear = 6000
    const retirementContributionsThisYear = 4000
    const studentLoanInterestThisYear = 2000
    const healthInsuranceThisYear = 5000
    const otherDeductionsThisYear = 1000
    const exemptions = 1
    const withholdings = 1000
    const payment1 = 1000
    const payment2 = 1000
    const payment3 = 0

    const stateTaxes = getStateTaxes(state, livedInCurrentStateAllLastYear, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
    const stateQuarterlyPayments = getStateQuarterlyPayment(state, currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)
    const stateSinglePayment = getStateSinglePayment(state, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)

    expect(stateQuarterlyPayments.q1StateQuarterlyPayment).toEqual(1000)
    expect(stateQuarterlyPayments.q2StateQuarterlyPayment).toEqual(1000)
    expect(stateQuarterlyPayments.q3StateQuarterlyPayment).toEqual(0)
    expect(stateQuarterlyPayments.q4StateQuarterlyPayment).toEqual(373)

    expect(stateSinglePayment.due).toEqual(2373)
    expect(stateSinglePayment.paid).toEqual(2000)
    expect(stateSinglePayment.remaining).toEqual(373)
  })

  it(`should return the correct payments if lived in multiple states last year`, () => {
    const livedInCurrentStateAllLastYear = false
    const state = 'georgia'
    const currentTaxQuarter = 'Q4'
    const filingStatus = 'separate'
    const stateTaxPaidLastYear = 7000
    const incomeExpectationThisYear = 'decrease'
    const stateIncomeLastYear = 95000
    const expectedTotalIncomeThisYear = 70000
    const businessExpensesThisYear = 7000
    const retirementContributionsThisYear = 6000
    const studentLoanInterestThisYear = 1000
    const healthInsuranceThisYear = 4000
    const otherDeductionsThisYear = 3000
    const exemptions = 1
    const withholdings = 500
    const payment1 = 250
    const payment2 = 500
    const payment3 = 250

    const stateTaxes = getStateTaxes(state, livedInCurrentStateAllLastYear, incomeExpectationThisYear, stateTaxPaidLastYear, stateIncomeLastYear, filingStatus, expectedTotalIncomeThisYear, businessExpensesThisYear, retirementContributionsThisYear, studentLoanInterestThisYear, healthInsuranceThisYear, otherDeductionsThisYear, exemptions)
    const stateQuarterlyPayments = getStateQuarterlyPayment(state, currentTaxQuarter, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)
    const stateSinglePayment = getStateSinglePayment(state, stateTaxes.safeHarborStateTaxesThisYear, withholdings, payment1, payment2, payment3, stateTaxes.initialExplanation)

    expect(stateQuarterlyPayments.q1StateQuarterlyPayment).toEqual(250)
    expect(stateQuarterlyPayments.q2StateQuarterlyPayment).toEqual(500)
    expect(stateQuarterlyPayments.q3StateQuarterlyPayment).toEqual(250)
    expect(stateQuarterlyPayments.q4StateQuarterlyPayment).toEqual(996)

    expect(stateSinglePayment.due).toEqual(1996)
    expect(stateSinglePayment.paid).toEqual(1000)
    expect(stateSinglePayment.remaining).toEqual(996)
  })
})

