const federalRules = {
  lastYearSafeHarborRule: true,
  lastYearSafeHarborLowPercentage: 1.0,
  lastYearSafeHarborHighPercentage: 1.1,
  lastYearSafeHarborHighIncome: 150000,
  thisYearSafeHarborRule: true,
  thisYearSafeHarborActualPercentage: 0.9,
  thisYearSafeHarborUsedPercentage: 1.0,
  minimumTaxForQuarterlyPayments: 1000,
  incomeTaxPaidForm: "1040",
  incomeTaxPaidLine: "24",
  adjustedGrossIncomeForm: "1040",
  adjustedGrossIncomeLine: "11",
  selfEmploymenTaxRate: 0.153,
  selfEmploymentIncomePercentage: 0.9235,
  standardDeduction: {
    single: 15000,
    separate: 15000,
    married: 30000,
    head: 22500,
    widow: 30000
  },
  incomeTaxRate: {
    single: [
      { lowIncome: 0, highIncome: 11925, taxRate: 0.10 },
      { lowIncome: 11925, highIncome: 48475, taxRate: 0.12 },
      { lowIncome: 48475, highIncome: 103350, taxRate: 0.22 },
      { lowIncome: 103350, highIncome: 197300, taxRate: 0.24 },
      { lowIncome: 197300, highIncome: 250525, taxRate: 0.32 },
      { lowIncome: 250525, highIncome: 626350, taxRate: 0.35 },
      { lowIncome: 626350, highIncome: Infinity, taxRate: 0.37 }
    ],
    married: [
      { lowIncome: 0, highIncome: 23850, taxRate: 0.10 },
      { lowIncome: 23850, highIncome: 96950, taxRate: 0.12 },
      { lowIncome: 96950, highIncome: 206700, taxRate: 0.22 },
      { lowIncome: 206700, highIncome: 394600, taxRate: 0.24 },
      { lowIncome: 394600, highIncome: 501050, taxRate: 0.32 },
      { lowIncome: 501050, highIncome: 752700, taxRate: 0.35 },
      { lowIncome: 752700, highIncome: Infinity, taxRate: 0.37 }
    ],
    separate: [
      { lowIncome: 0, highIncome: 11925, taxRate: 0.10 },
      { lowIncome: 11925, highIncome: 48475, taxRate: 0.12 },
      { lowIncome: 48475, highIncome: 103350, taxRate: 0.22 },
      { lowIncome: 103350, highIncome: 197300, taxRate: 0.24 },
      { lowIncome: 197300, highIncome: 250525, taxRate: 0.32 },
      { lowIncome: 250525, highIncome: 376350, taxRate: 0.35 },
      { lowIncome: 376350, highIncome: Infinity, taxRate: 0.37 }
    ],
    head: [
      { lowIncome: 0, highIncome: 17550, taxRate: 0.10 },
      { lowIncome: 17550, highIncome: 63100, taxRate: 0.12 },
      { lowIncome: 63100, highIncome: 103350, taxRate: 0.22 },
      { lowIncome: 103350, highIncome: 197350, taxRate: 0.24 },
      { lowIncome: 197350, highIncome: 252600, taxRate: 0.32 },
      { lowIncome: 252600, highIncome: 626350, taxRate: 0.35 },
      { lowIncome: 626350, highIncome: Infinity, taxRate: 0.37 }
    ],
    widow: [
      { lowIncome: 0, highIncome: 23850, taxRate: 0.10 },
      { lowIncome: 23850, highIncome: 96950, taxRate: 0.12 },
      { lowIncome: 96950, highIncome: 206700, taxRate: 0.22 },
      { lowIncome: 206700, highIncome: 394600, taxRate: 0.24 },
      { lowIncome: 394600, highIncome: 501050, taxRate: 0.32 },
      { lowIncome: 501050, highIncome: 752700, taxRate: 0.35 },
      { lowIncome: 752700, highIncome: Infinity, taxRate: 0.37 }
    ],
  },
  quarterlyCumulativeSchedule: {
    Q1: 0.25,
    Q2: 0.50,
    Q3: 0.75,
    Q4: 1.00
  },
  payLink: 'https://www.irs.gov/payments',
  userNote: "Note that the federal payments assume you are not a farmer, fisherman, or subject to annualized income installment rules. Special payment schedules may apply in those cases."
}

export { federalRules }
