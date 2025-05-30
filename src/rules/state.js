const stateRules = {
  alabama: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "40",
    incomeTaxPaidLine: "25",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "formula",
      formulaId: "alabama"
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 500, taxRate: 0.02 },
        { lowIncome: 500, highIncome: 3000, taxRate: 0.04 },
        { lowIncome: 3000, highIncome: Infinity, taxRate: 0.05 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 500, taxRate: 0.02 },
        { lowIncome: 500, highIncome: 3000, taxRate: 0.04 },
        { lowIncome: 3000, highIncome: Infinity, taxRate: 0.05 }
      ],
      head: [
        { lowIncome: 0, highIncome: 500, taxRate: 0.02 },
        { lowIncome: 500, highIncome: 3000, taxRate: 0.04 },
        { lowIncome: 3000, highIncome: Infinity, taxRate: 0.05 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.02 },
        { lowIncome: 1000, highIncome: 6000, taxRate: 0.04 },
        { lowIncome: 6000, highIncome: Infinity, taxRate: 0.05 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Some Alabama cities charge local income taxes, though it’s rare. These are not included in our estimate. Check with your city to confirm if this applies to you."
  },
  alaska: {
    stateHasQuarterlyTaxes: false,
  },
  arizona: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "140",
    incomeTaxPaidLine: "53",
    minimumTaxForQuarterlyPayments: 1,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 13350,
        married: 26700,
        separate: 13350,
        head: 20020,
        widow: 26700
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.025 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.025 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.025 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.025 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  arkansas: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "custom",
      customDeductions: [
        "businessExpensesThisYear",
        "retirementContributionsThisYear"
      ],
      stateIncomeForm: "AR1000F",
      stateIncomeLine: "25"
    },
    incomeTaxPaidForm: "AR1000F",
    incomeTaxPaidLine: "39",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "formula",
      formulaId: "arkansas"
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 5499.99, taxRate: 0.00 },
        { lowIncome: 5500, highIncome: 10899.99, taxRate: 0.02 },
        { lowIncome: 10900, highIncome: 15599.99, taxRate: 0.03 },
        { lowIncome: 15600, highIncome: 25699.99, taxRate: 0.034 },
        { lowIncome: 25700, highIncome: 29999.99, taxRate: 0.039 },
        { lowIncome: 30000, highIncome: 39999.99, taxRate: 0.039 },
        { lowIncome: 40000, highIncome: 49999.99, taxRate: 0.039 },
        { lowIncome: 50000, highIncome: 59999.99, taxRate: 0.039 },
        { lowIncome: 60000, highIncome: 69999.99, taxRate: 0.039 },
        { lowIncome: 70000, highIncome: 80000.99, taxRate: 0.039 },
        { lowIncome: 80001, highIncome: 92300.99, taxRate: 0.039 },
        { lowIncome: 92301, highIncome: 95500.99, taxRate: 0.039 },
        { lowIncome: 95501, highIncome: 99999.99, taxRate: 0.039 },
        { lowIncome: 100000, highIncome: Infinity, taxRate: 0.039 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 5499.99, taxRate: 0.00 },
        { lowIncome: 5500, highIncome: 10899.99, taxRate: 0.02 },
        { lowIncome: 10900, highIncome: 15599.99, taxRate: 0.03 },
        { lowIncome: 15600, highIncome: 25699.99, taxRate: 0.034 },
        { lowIncome: 25700, highIncome: 29999.99, taxRate: 0.039 },
        { lowIncome: 30000, highIncome: 39999.99, taxRate: 0.039 },
        { lowIncome: 40000, highIncome: 49999.99, taxRate: 0.039 },
        { lowIncome: 50000, highIncome: 59999.99, taxRate: 0.039 },
        { lowIncome: 60000, highIncome: 69999.99, taxRate: 0.039 },
        { lowIncome: 70000, highIncome: 80000.99, taxRate: 0.039 },
        { lowIncome: 80001, highIncome: 92300.99, taxRate: 0.039 },
        { lowIncome: 92301, highIncome: 95500.99, taxRate: 0.039 },
        { lowIncome: 95501, highIncome: 99999.99, taxRate: 0.039 },
        { lowIncome: 100000, highIncome: Infinity, taxRate: 0.039 }
      ],
      head: [
        { lowIncome: 0, highIncome: 5499.99, taxRate: 0.00 },
        { lowIncome: 5500, highIncome: 10899.99, taxRate: 0.02 },
        { lowIncome: 10900, highIncome: 15599.99, taxRate: 0.03 },
        { lowIncome: 15600, highIncome: 25699.99, taxRate: 0.034 },
        { lowIncome: 25700, highIncome: 29999.99, taxRate: 0.039 },
        { lowIncome: 30000, highIncome: 39999.99, taxRate: 0.039 },
        { lowIncome: 40000, highIncome: 49999.99, taxRate: 0.039 },
        { lowIncome: 50000, highIncome: 59999.99, taxRate: 0.039 },
        { lowIncome: 60000, highIncome: 69999.99, taxRate: 0.039 },
        { lowIncome: 70000, highIncome: 80000.99, taxRate: 0.039 },
        { lowIncome: 80001, highIncome: 92300.99, taxRate: 0.039 },
        { lowIncome: 92301, highIncome: 95500.99, taxRate: 0.039 },
        { lowIncome: 95501, highIncome: 99999.99, taxRate: 0.039 },
        { lowIncome: 100000, highIncome: Infinity, taxRate: 0.039 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 5499.99, taxRate: 0.00 },
        { lowIncome: 5500, highIncome: 10899.99, taxRate: 0.02 },
        { lowIncome: 10900, highIncome: 15599.99, taxRate: 0.03 },
        { lowIncome: 15600, highIncome: 25699.99, taxRate: 0.034 },
        { lowIncome: 25700, highIncome: 29999.99, taxRate: 0.039 },
        { lowIncome: 30000, highIncome: 39999.99, taxRate: 0.039 },
        { lowIncome: 40000, highIncome: 49999.99, taxRate: 0.039 },
        { lowIncome: 50000, highIncome: 59999.99, taxRate: 0.039 },
        { lowIncome: 60000, highIncome: 69999.99, taxRate: 0.039 },
        { lowIncome: 70000, highIncome: 80000.99, taxRate: 0.039 },
        { lowIncome: 80001, highIncome: 92300.99, taxRate: 0.039 },
        { lowIncome: 92301, highIncome: 95500.99, taxRate: 0.039 },
        { lowIncome: 95501, highIncome: 99999.99, taxRate: 0.039 },
        { lowIncome: 100000, highIncome: Infinity, taxRate: 0.039 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  california: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000, 
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "addBack",
      addBackDeductions: [
        "studentLoanInterestThisYear",
        "healthInsuranceThisYear"
      ],
      stateIncomeForm: "540",
      stateIncomeLine: "19"
    },
    incomeTaxPaidForm: "540",
    incomeTaxPaidLine: null, 
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 5403,
        married: 10806,
        separate: 5403,
        head: 10806,
        widow: 10806
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 10756, taxRate: 0.01 },
        { lowIncome: 10756, highIncome: 25499, taxRate: 0.02 },
        { lowIncome: 25499, highIncome: 40245, taxRate: 0.04 },
        { lowIncome: 40245, highIncome: 55866, taxRate: 0.06 },
        { lowIncome: 55866, highIncome: 70606, taxRate: 0.08 },
        { lowIncome: 70606, highIncome: 360659, taxRate: 0.093 },
        { lowIncome: 360659, highIncome: 432787, taxRate: 0.103 },
        { lowIncome: 432787, highIncome: 721314, taxRate: 0.113 },
        { lowIncome: 721314, highIncome: 1000000, taxRate: 0.123 },
        { lowIncome: 1000000, highIncome: Infinity, taxRate: 0.133 }
      ],
        separate: [
          { lowIncome: 0, highIncome: 10756, taxRate: 0.01 },
          { lowIncome: 10756, highIncome: 25499, taxRate: 0.02 },
          { lowIncome: 25499, highIncome: 40245, taxRate: 0.04 },
          { lowIncome: 40245, highIncome: 55866, taxRate: 0.06 },
          { lowIncome: 55866, highIncome: 70606, taxRate: 0.08 },
          { lowIncome: 70606, highIncome: 360659, taxRate: 0.093 },
          { lowIncome: 360659, highIncome: 432787, taxRate: 0.103 },
          { lowIncome: 432787, highIncome: 721314, taxRate: 0.113 },
          { lowIncome: 721314, highIncome: 1000000, taxRate: 0.123 },
          { lowIncome: 1000000, highIncome: Infinity, taxRate: 0.133 }
        ],
      head: [
        { lowIncome: 0, highIncome: 21527, taxRate: 0.01 },
        { lowIncome: 21528, highIncome: 51000, taxRate: 0.02 },
        { lowIncome: 51001, highIncome: 65744, taxRate: 0.04 },
        { lowIncome: 65745, highIncome: 81364, taxRate: 0.06 },
        { lowIncome: 81365, highIncome: 96107, taxRate: 0.08 },
        { lowIncome: 96108, highIncome: 490493, taxRate: 0.093 },
        { lowIncome: 490494, highIncome: 588593, taxRate: 0.103 },
        { lowIncome: 588594, highIncome: 980987, taxRate: 0.113 },
        { lowIncome: 980988, highIncome: Infinity, taxRate: 0.123 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 21512, taxRate: 0.01 },
        { lowIncome: 21512, highIncome: 50998, taxRate: 0.02 },
        { lowIncome: 50998, highIncome: 80490, taxRate: 0.04 },
        { lowIncome: 80490, highIncome: 111732, taxRate: 0.06 },
        { lowIncome: 111732, highIncome: 141212, taxRate: 0.08 },
        { lowIncome: 141212, highIncome: 721318, taxRate: 0.093 },
        { lowIncome: 721318, highIncome: 865574, taxRate: 0.103 },
        { lowIncome: 865574, highIncome: 1442628, taxRate: 0.113 },
        { lowIncome: 1442628, highIncome: 2000000, taxRate: 0.123 },
        { lowIncome: 2000000, highIncome: Infinity, taxRate: 0.133 }
      ]
    },
    quarterlyCumulativeSchedule: { 
      Q1: 0.30, 
      Q2: 0.70, 
      Q3: 0.70, 
      Q4: 1.00 
    },
  },
  colorado: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.7,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "104",
    incomeTaxPaidLine: "20",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.044 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.044 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.044 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.044 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  connecticut: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "CT-1040",
    incomeTaxPaidLine: "19", 
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.02 },
        { lowIncome: 10000, highIncome: 50000, baseTax: 200, taxRate: 0.045 },
        { lowIncome: 50000, highIncome: 100000, baseTax: 2000, taxRate: 0.055 },
        { lowIncome: 100000, highIncome: 200000, baseTax: 4750, taxRate: 0.06 },
        { lowIncome: 200000, highIncome: 250000, baseTax: 10750, taxRate: 0.065 },
        { lowIncome: 250000, highIncome: 500000, baseTax: 14000, taxRate: 0.069 },
        { lowIncome: 500000, highIncome: Infinity, baseTax: 31250, taxRate: 0.0699 }
      ],
      married: [
        { lowIncome: 0, highIncome: 20000, taxRate: 0.02 },
        { lowIncome: 20000, highIncome: 100000, baseTax: 400, taxRate: 0.045 },
        { lowIncome: 100000, highIncome: 200000, baseTax: 4000, taxRate: 0.055 },
        { lowIncome: 200000, highIncome: 400000, baseTax: 9500, taxRate: 0.06 },
        { lowIncome: 400000, highIncome: 500000, baseTax: 21500, taxRate: 0.065 },
        { lowIncome: 500000, highIncome: 1000000, baseTax: 28000, taxRate: 0.069 },
        { lowIncome: 1000000, highIncome: Infinity, baseTax: 62500, taxRate: 0.0699 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.02 },
        { lowIncome: 10000, highIncome: 50000, baseTax: 200, taxRate: 0.045 },
        { lowIncome: 50000, highIncome: 100000, baseTax: 2000, taxRate: 0.055 },
        { lowIncome: 100000, highIncome: 200000, baseTax: 4750, taxRate: 0.06 },
        { lowIncome: 200000, highIncome: 250000, baseTax: 10750, taxRate: 0.065 },
        { lowIncome: 250000, highIncome: 500000, baseTax: 14000, taxRate: 0.069 },
        { lowIncome: 500000, highIncome: Infinity, baseTax: 31250, taxRate: 0.0699 }
      ],
      head: [
        { lowIncome: 0, highIncome: 16000, taxRate: 0.02 },
        { lowIncome: 16000, highIncome: 80000, baseTax: 320, taxRate: 0.045 },
        { lowIncome: 80000, highIncome: 160000, baseTax: 3200, taxRate: 0.055 },
        { lowIncome: 160000, highIncome: 320000, baseTax: 7600, taxRate: 0.06 },
        { lowIncome: 320000, highIncome: 400000, baseTax: 17200, taxRate: 0.065 },
        { lowIncome: 400000, highIncome: 800000, baseTax: 22400, taxRate: 0.069 },
        { lowIncome: 800000, highIncome: Infinity, baseTax: 50000, taxRate: 0.0699 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 20000, taxRate: 0.02 },
        { lowIncome: 20000, highIncome: 100000, baseTax: 400, taxRate: 0.045 },
        { lowIncome: 100000, highIncome: 200000, baseTax: 4000, taxRate: 0.055 },
        { lowIncome: 200000, highIncome: 400000, baseTax: 9500, taxRate: 0.06 },
        { lowIncome: 400000, highIncome: 500000, baseTax: 21500, taxRate: 0.065 },
        { lowIncome: 500000, highIncome: 1000000, baseTax: 28000, taxRate: 0.069 },
        { lowIncome: 1000000, highIncome: Infinity, baseTax: 62500, taxRate: 0.0699 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  delaware: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "PIT-RES",
    incomeTaxPaidLine: "37",
    minimumTaxForQuarterlyPayments: 800,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 3250,
        married: 6500,
        separate: 3250,
        head: 3250,
        widow: 3250
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 2000, taxRate: 0.00 },
        { lowIncome: 2000, highIncome: 5000, baseTax: 0, taxRate: 0.022 },
        { lowIncome: 5000, highIncome: 10000, baseTax: 66, taxRate: 0.039 },
        { lowIncome: 10000, highIncome: 20000, baseTax: 261, taxRate: 0.048 },
        { lowIncome: 20000, highIncome: 25000, baseTax: 741, taxRate: 0.052 },
        { lowIncome: 25000, highIncome: 60000, baseTax: 1001, taxRate: 0.0555 },
        { lowIncome: 60000, highIncome: Infinity, baseTax: 2943, taxRate: 0.066 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 2000, taxRate: 0.00 },
        { lowIncome: 2000, highIncome: 5000, baseTax: 0, taxRate: 0.022 },
        { lowIncome: 5000, highIncome: 10000, baseTax: 66, taxRate: 0.039 },
        { lowIncome: 10000, highIncome: 20000, baseTax: 261, taxRate: 0.048 },
        { lowIncome: 20000, highIncome: 25000, baseTax: 741, taxRate: 0.052 },
        { lowIncome: 25000, highIncome: 60000, baseTax: 1001, taxRate: 0.0555 },
        { lowIncome: 60000, highIncome: Infinity, baseTax: 2943, taxRate: 0.066 }
      ],
      head: [
        { lowIncome: 0, highIncome: 2000, taxRate: 0.00 },
        { lowIncome: 2000, highIncome: 5000, baseTax: 0, taxRate: 0.022 },
        { lowIncome: 5000, highIncome: 10000, baseTax: 66, taxRate: 0.039 },
        { lowIncome: 10000, highIncome: 20000, baseTax: 261, taxRate: 0.048 },
        { lowIncome: 20000, highIncome: 25000, baseTax: 741, taxRate: 0.052 },
        { lowIncome: 25000, highIncome: 60000, baseTax: 1001, taxRate: 0.0555 },
        { lowIncome: 60000, highIncome: Infinity, baseTax: 2943, taxRate: 0.066 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 2000, taxRate: 0.00 },
        { lowIncome: 2000, highIncome: 5000, baseTax: 0, taxRate: 0.022 },
        { lowIncome: 5000, highIncome: 10000, baseTax: 66, taxRate: 0.039 },
        { lowIncome: 10000, highIncome: 20000, baseTax: 261, taxRate: 0.048 },
        { lowIncome: 20000, highIncome: 25000, baseTax: 741, taxRate: 0.052 },
        { lowIncome: 25000, highIncome: 60000, baseTax: 1001, taxRate: 0.0555 },
        { lowIncome: 60000, highIncome: Infinity, baseTax: 2943, taxRate: 0.066 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
 district_of_columbia: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "D-40",
    incomeTaxPaidLine: "34",
    minimumTaxForQuarterlyPayments: 100,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 13750,
        married: 27500,
        separate: 13750,
        head: 20600,
        widow: 27500
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.04 },
        { lowIncome: 10000, highIncome: 40000, baseTax: 400, taxRate: 0.06 },
        { lowIncome: 40000, highIncome: 60000, baseTax: 2200, taxRate: 0.065 },
        { lowIncome: 60000, highIncome: 250000, baseTax: 3500, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, baseTax: 19650, taxRate: 0.0925 },
        { lowIncome: 500000, highIncome: 1000000, baseTax: 42775, taxRate: 0.0975 },
        { lowIncome: 1000000, highIncome: Infinity, baseTax: 91525, taxRate: 0.1075 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.04 },
        { lowIncome: 10000, highIncome: 40000, baseTax: 400, taxRate: 0.06 },
        { lowIncome: 40000, highIncome: 60000, baseTax: 2200, taxRate: 0.065 },
        { lowIncome: 60000, highIncome: 250000, baseTax: 3500, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, baseTax: 19650, taxRate: 0.0925 },
        { lowIncome: 500000, highIncome: 1000000, baseTax: 42775, taxRate: 0.0975 },
        { lowIncome: 1000000, highIncome: Infinity, baseTax: 91525, taxRate: 0.1075 }
      ],
      head: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.04 },
        { lowIncome: 10000, highIncome: 40000, baseTax: 400, taxRate: 0.06 },
        { lowIncome: 40000, highIncome: 60000, baseTax: 2200, taxRate: 0.065 },
        { lowIncome: 60000, highIncome: 250000, baseTax: 3500, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, baseTax: 19650, taxRate: 0.0925 },
        { lowIncome: 500000, highIncome: 1000000, baseTax: 42775, taxRate: 0.0975 },
        { lowIncome: 1000000, highIncome: Infinity, baseTax: 91525, taxRate: 0.1075 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.04 },
        { lowIncome: 10000, highIncome: 40000, baseTax: 400, taxRate: 0.06 },
        { lowIncome: 40000, highIncome: 60000, baseTax: 2200, taxRate: 0.065 },
        { lowIncome: 60000, highIncome: 250000, baseTax: 3500, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, baseTax: 19650, taxRate: 0.0925 },
        { lowIncome: 500000, highIncome: 1000000, baseTax: 42775, taxRate: 0.0975 },
        { lowIncome: 1000000, highIncome: Infinity, baseTax: 91525, taxRate: 0.1075 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },
  florida: {
    stateHasQuarterlyTaxes: false,
  },
  georgia: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "500",
    incomeTaxPaidLine: "26", 
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 5400,
        married: 7100,
        separate: 3550,
        head: 5400,
        widow: 7100
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 750, taxRate: 0.01 },
        { lowIncome: 750, highIncome: 2250, baseTax: 7.50, taxRate: 0.02 },
        { lowIncome: 2250, highIncome: 3750, baseTax: 37.50, taxRate: 0.03 },
        { lowIncome: 3750, highIncome: 5250, baseTax: 82.50, taxRate: 0.04 },
        { lowIncome: 5250, highIncome: 7000, baseTax: 142.50, taxRate: 0.05 },
        { lowIncome: 7000, highIncome: Infinity, baseTax: 227.50, taxRate: 0.0575 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 750, taxRate: 0.01 },
        { lowIncome: 750, highIncome: 2250, baseTax: 7.50, taxRate: 0.02 },
        { lowIncome: 2250, highIncome: 3750, baseTax: 37.50, taxRate: 0.03 },
        { lowIncome: 3750, highIncome: 5250, baseTax: 82.50, taxRate: 0.04 },
        { lowIncome: 5250, highIncome: 7000, baseTax: 142.50, taxRate: 0.05 },
        { lowIncome: 7000, highIncome: Infinity, baseTax: 227.50, taxRate: 0.0575 }
      ],
      head: [
        { lowIncome: 0, highIncome: 750, taxRate: 0.01 },
        { lowIncome: 750, highIncome: 2250, baseTax: 7.50, taxRate: 0.02 },
        { lowIncome: 2250, highIncome: 3750, baseTax: 37.50, taxRate: 0.03 },
        { lowIncome: 3750, highIncome: 5250, baseTax: 82.50, taxRate: 0.04 },
        { lowIncome: 5250, highIncome: 7000, baseTax: 142.50, taxRate: 0.05 },
        { lowIncome: 7000, highIncome: Infinity, baseTax: 227.50, taxRate: 0.0575 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 750, taxRate: 0.01 },
        { lowIncome: 750, highIncome: 2250, baseTax: 7.50, taxRate: 0.02 },
        { lowIncome: 2250, highIncome: 3750, baseTax: 37.50, taxRate: 0.03 },
        { lowIncome: 3750, highIncome: 5250, baseTax: 82.50, taxRate: 0.04 },
        { lowIncome: 5250, highIncome: 7000, baseTax: 142.50, taxRate: 0.05 },
        { lowIncome: 7000, highIncome: Infinity, baseTax: 227.50, taxRate: 0.0575 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  hawaii: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "custom",
      customDeductions: [
        "retirementContributionsThisYear",
        "studentLoanInterestThisYear"
      ],
      stateIncomeForm: "N-11",
      stateIncomeLine: "26"
    },
    incomeTaxPaidForm: "N-11",
    incomeTaxPaidLine: "37", 
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 4400,
        married: 8800,
        separate: 4400,
        head: 6424,
        widow: 8800
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 2400, taxRate: 0.014 },
        { lowIncome: 2400, highIncome: 4800, baseTax: 33.60, taxRate: 0.032 },
        { lowIncome: 4800, highIncome: 9600, baseTax: 110.40, taxRate: 0.055 },
        { lowIncome: 9600, highIncome: 14400, baseTax: 374.40, taxRate: 0.064 },
        { lowIncome: 14400, highIncome: 19200, baseTax: 630.40, taxRate: 0.068 },
        { lowIncome: 19200, highIncome: 24000, baseTax: 966.40, taxRate: 0.072 },
        { lowIncome: 24000, highIncome: 36000, baseTax: 1314.40, taxRate: 0.076 },
        { lowIncome: 36000, highIncome: 48000, baseTax: 2226.40, taxRate: 0.079 },
        { lowIncome: 48000, highIncome: 150000, baseTax: 3174.40, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 175000, baseTax: 12471.90, taxRate: 0.09 },
        { lowIncome: 175000, highIncome: 200000, baseTax: 14721.90, taxRate: 0.10 },
        { lowIncome: 200000, highIncome: Infinity, baseTax: 17221.90, taxRate: 0.11 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 2400, taxRate: 0.014 },
        { lowIncome: 2400, highIncome: 4800, baseTax: 33.60, taxRate: 0.032 },
        { lowIncome: 4800, highIncome: 9600, baseTax: 110.40, taxRate: 0.055 },
        { lowIncome: 9600, highIncome: 14400, baseTax: 374.40, taxRate: 0.064 },
        { lowIncome: 14400, highIncome: 19200, baseTax: 630.40, taxRate: 0.068 },
        { lowIncome: 19200, highIncome: 24000, baseTax: 966.40, taxRate: 0.072 },
        { lowIncome: 24000, highIncome: 36000, baseTax: 1314.40, taxRate: 0.076 },
        { lowIncome: 36000, highIncome: 48000, baseTax: 2226.40, taxRate: 0.079 },
        { lowIncome: 48000, highIncome: 150000, baseTax: 3174.40, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 175000, baseTax: 12471.90, taxRate: 0.09 },
        { lowIncome: 175000, highIncome: 200000, baseTax: 14721.90, taxRate: 0.10 },
        { lowIncome: 200000, highIncome: Infinity, baseTax: 17221.90, taxRate: 0.11 }
      ],
      head: [
        { lowIncome: 0, highIncome: 2400, taxRate: 0.014 },
        { lowIncome: 2400, highIncome: 4800, baseTax: 33.60, taxRate: 0.032 },
        { lowIncome: 4800, highIncome: 9600, baseTax: 110.40, taxRate: 0.055 },
        { lowIncome: 9600, highIncome: 14400, baseTax: 374.40, taxRate: 0.064 },
        { lowIncome: 14400, highIncome: 19200, baseTax: 630.40, taxRate: 0.068 },
        { lowIncome: 19200, highIncome: 24000, baseTax: 966.40, taxRate: 0.072 },
        { lowIncome: 24000, highIncome: 36000, baseTax: 1314.40, taxRate: 0.076 },
        { lowIncome: 36000, highIncome: 48000, baseTax: 2226.40, taxRate: 0.079 },
        { lowIncome: 48000, highIncome: 150000, baseTax: 3174.40, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 175000, baseTax: 12471.90, taxRate: 0.09 },
        { lowIncome: 175000, highIncome: 200000, baseTax: 14721.90, taxRate: 0.10 },
        { lowIncome: 200000, highIncome: Infinity, baseTax: 17221.90, taxRate: 0.11 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 2400, taxRate: 0.014 },
        { lowIncome: 2400, highIncome: 4800, baseTax: 33.60, taxRate: 0.032 },
        { lowIncome: 4800, highIncome: 9600, baseTax: 110.40, taxRate: 0.055 },
        { lowIncome: 9600, highIncome: 14400, baseTax: 374.40, taxRate: 0.064 },
        { lowIncome: 14400, highIncome: 19200, baseTax: 630.40, taxRate: 0.068 },
        { lowIncome: 19200, highIncome: 24000, baseTax: 966.40, taxRate: 0.072 },
        { lowIncome: 24000, highIncome: 36000, baseTax: 1314.40, taxRate: 0.076 },
        { lowIncome: 36000, highIncome: 48000, baseTax: 2226.40, taxRate: 0.079 },
        { lowIncome: 48000, highIncome: 150000, baseTax: 3174.40, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 175000, baseTax: 12471.90, taxRate: 0.09 },
        { lowIncome: 175000, highIncome: 200000, baseTax: 14721.90, taxRate: 0.10 },
        { lowIncome: 200000, highIncome: Infinity, baseTax: 17221.90, taxRate: 0.11 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  idaho: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.0,
    lastYearSafeHarborHighIncome: null,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.8,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "40",
    incomeTaxPaidLine: "46",
    minimumTaxForQuarterlyPayments: 50,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 15000,
        married: 30000,
        separate: 15000,
        head: 22500,
        widow: 30000
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 4673, taxRate: 0 },
        { lowIncome: 4673, highIncome: Infinity, taxRate: 0.05695 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 4673, taxRate: 0 },
        { lowIncome: 4673, highIncome: Infinity, taxRate: 0.05695 }
      ],
      married: [
        { lowIncome: 0, highIncome: 9346, taxRate: 0 },
        { lowIncome: 9346, highIncome: Infinity, taxRate: 0.05695 }
      ],
      head: [
        { lowIncome: 0, highIncome: 9346, taxRate: 0 },
        { lowIncome: 9346, highIncome: Infinity, taxRate: 0.05695 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 9346, taxRate: 0 },
        { lowIncome: 9346, highIncome: Infinity, taxRate: 0.05695 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  illinois: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.0,
    lastYearSafeHarborHighIncome: null,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "IL-1040",
    incomeTaxPaidLine: "25",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "exemptions",
      exemptionAmountPerPerson: 2850
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0495 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0495 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0495 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0495 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0495 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  indiana: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: false,
    lastYearSafeHarborLowPercentage: null,
    lastYearSafeHarborHighPercentage: null,
    lastYearSafeHarborHighIncome: null,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm:  "IT-40",
    incomeTaxPaidLine: "9",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "exemptions",
      exemptionAmountPerPerson: 1000
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0475 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0475 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0475 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0475 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0475 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Indiana counties charge between 0.35% and 3.38% in local tax. We've used an average rate of 1.75% for simplicity."
  },  
  iowa: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "IA 1040",
    incomeTaxPaidLine: "29",
    minimumTaxForQuarterlyPayments: 200,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.038 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.038 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.038 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.038 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.038 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  kansas: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.0,
    lastYearSafeHarborHighIncome: null,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "K-40",
    incomeTaxPaidLine: "13",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 3605,
        married: 8240,
        separate: 4120,
        head: 6180,
        widow: 8240
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 23000, taxRate: 0.052 },
        { lowIncome: 23000, highIncome: Infinity, taxRate: 0.0558, baseTax: 1196, baseThreshold: 23000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 23000, taxRate: 0.052 },
        { lowIncome: 23000, highIncome: Infinity, taxRate: 0.0558, baseTax: 1196, baseThreshold: 23000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 23000, taxRate: 0.052 },
        { lowIncome: 23000, highIncome: Infinity, taxRate: 0.0558, baseTax: 1196, baseThreshold: 23000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 46000, taxRate: 0.052 },
        { lowIncome: 46000, highIncome: Infinity, taxRate: 0.0558, baseTax: 2392, baseThreshold: 46000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 46000, taxRate: 0.052 },
        { lowIncome: 46000, highIncome: Infinity, taxRate: 0.0558, baseTax: 2392, baseThreshold: 46000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  kentucky: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "custom",
      customDeductions: [
        "retirementContributionsThisYear",
        "healthInsuranceThisYear"
      ],
      stateIncomeForm: "740",
      stateIncomeLine: "11"
    },
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 3270,
        married: 3270, 
        separate: 3270,
        head: 3270,
        widow: 3270
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.04 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.04 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.04 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.04 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.04 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Some Kentucky cities and counties charge separate local income taxes. These are not included in our estimate and may require their own quarterly payments."
  },  
  louisiana: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.0, 
    lastYearSafeHarborHighIncome: null,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "IT-540",
    incomeTaxPaidLine: "18", 
    minimumTaxForQuarterlyPayments: 1000, 
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 12500,
        married: 25000,
        separate: 12500,
        head: 25000,
        widow: 25000
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.03 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.03 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.03 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.03 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.03 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  maine: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "1040ME",
    incomeTaxPaidLine: "22",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 14650,
        married: 29300,
        separate: 14650,
        head: 21900,
        widow: 29300
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 26800, taxRate: 0.058 },
        { lowIncome: 26800, highIncome: 63450, taxRate: 0.0675, baseTax: 1554, baseThreshold: 26800 },
        { lowIncome: 63450, highIncome: Infinity, taxRate: 0.0715, baseTax: 4028, baseThreshold: 63450 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 26800, taxRate: 0.058 },
        { lowIncome: 26800, highIncome: 63450, taxRate: 0.0675, baseTax: 1554, baseThreshold: 26800 },
        { lowIncome: 63450, highIncome: Infinity, taxRate: 0.0715, baseTax: 4028, baseThreshold: 63450 }
      ],
      head: [
        { lowIncome: 0, highIncome: 40200, taxRate: 0.058 },
        { lowIncome: 40200, highIncome: 95150, taxRate: 0.0675, baseTax: 2332, baseThreshold: 40200 },
        { lowIncome: 95150, highIncome: Infinity, taxRate: 0.0715, baseTax: 6041, baseThreshold: 95150 }
      ],
      married: [
        { lowIncome: 0, highIncome: 53600, taxRate: 0.058 },
        { lowIncome: 53600, highIncome: 126900, taxRate: 0.0675, baseTax: 3109, baseThreshold: 53600 },
        { lowIncome: 126900, highIncome: Infinity, taxRate: 0.0715, baseTax: 8057, baseThreshold: 126900 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 53600, taxRate: 0.058 },
        { lowIncome: 53600, highIncome: 126900, taxRate: 0.0675, baseTax: 3109, baseThreshold: 53600 },
        { lowIncome: 126900, highIncome: Infinity, taxRate: 0.0715, baseTax: 8057, baseThreshold: 126900 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "If your income increases by $500,000 or more compared to the same quarter last year, Maine requires you to pay estimated tax on that spike immediately. Our estimate assumes your income is steady and does not include this rule."
  },  
  maryland: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "502",
    incomeTaxPaidLine: "40",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "formula",
      formulaId: "maryland"
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.05 },
        { lowIncome: 1000, highIncome: 2000, taxRate: 0.06 },
        { lowIncome: 2000, highIncome: 3000, taxRate: 0.07 },
        { lowIncome: 3000, highIncome: 100000, taxRate: 0.0775 },
        { lowIncome: 100000, highIncome: 125000, taxRate: 0.08 },
        { lowIncome: 125000, highIncome: 150000, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 250000, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, taxRate: 0.0875 },
        { lowIncome: 500000, highIncome: Infinity, taxRate: 0.0875 }
      ],
      married: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.05 },
        { lowIncome: 1000, highIncome: 2000, taxRate: 0.06 },
        { lowIncome: 2000, highIncome: 3000, taxRate: 0.07 },
        { lowIncome: 3000, highIncome: 100000, taxRate: 0.0775 },
        { lowIncome: 100000, highIncome: 125000, taxRate: 0.08 },
        { lowIncome: 125000, highIncome: 150000, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 250000, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, taxRate: 0.0875 },
        { lowIncome: 500000, highIncome: Infinity, taxRate: 0.0875 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.05 },
        { lowIncome: 1000, highIncome: 2000, taxRate: 0.06 },
        { lowIncome: 2000, highIncome: 3000, taxRate: 0.07 },
        { lowIncome: 3000, highIncome: 100000, taxRate: 0.0775 },
        { lowIncome: 100000, highIncome: 125000, taxRate: 0.08 },
        { lowIncome: 125000, highIncome: 150000, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 250000, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, taxRate: 0.0875 },
        { lowIncome: 500000, highIncome: Infinity, taxRate: 0.0875 }
      ],
      head: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.05 },
        { lowIncome: 1000, highIncome: 2000, taxRate: 0.06 },
        { lowIncome: 2000, highIncome: 3000, taxRate: 0.07 },
        { lowIncome: 3000, highIncome: 100000, taxRate: 0.0775 },
        { lowIncome: 100000, highIncome: 125000, taxRate: 0.08 },
        { lowIncome: 125000, highIncome: 150000, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 250000, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, taxRate: 0.0875 },
        { lowIncome: 500000, highIncome: Infinity, taxRate: 0.0875 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.05 },
        { lowIncome: 1000, highIncome: 2000, taxRate: 0.06 },
        { lowIncome: 2000, highIncome: 3000, taxRate: 0.07 },
        { lowIncome: 3000, highIncome: 100000, taxRate: 0.0775 },
        { lowIncome: 100000, highIncome: 125000, taxRate: 0.08 },
        { lowIncome: 125000, highIncome: 150000, taxRate: 0.0825 },
        { lowIncome: 150000, highIncome: 250000, taxRate: 0.085 },
        { lowIncome: 250000, highIncome: 500000, taxRate: 0.0875 },
        { lowIncome: 500000, highIncome: Infinity, taxRate: 0.0875 }
      ]
    },    
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Maryland counties charge between 2.25% and 3.2% in local tax. We've used an average rate of 3.0% for simplicity.",
  },  
  massachusetts: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "addBack",
      addBackDeductions: [
        "studentLoanInterestThisYear",
        "retirementContributionsThisYear"
      ],
      stateIncomeForm: "1",
      stateIncomeLine: "19"
    },
    incomeTaxPaidForm: "1",
    incomeTaxPaidLine: "38",
    minimumTaxForQuarterlyPayments: 400,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 1083150, taxRate: 0.05 },
        { lowIncome: 1083150, highIncome: Infinity, taxRate: 0.09 }
      ],
      married: [
        { lowIncome: 0, highIncome: 1083150, taxRate: 0.05 },
        { lowIncome: 1083150, highIncome: Infinity, taxRate: 0.09 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 1083150, taxRate: 0.05 },
        { lowIncome: 1083150, highIncome: Infinity, taxRate: 0.09 }
      ],
      head: [
        { lowIncome: 0, highIncome: 1083150, taxRate: 0.05 },
        { lowIncome: 1083150, highIncome: Infinity, taxRate: 0.09 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 1083150, taxRate: 0.05 },
        { lowIncome: 1083150, highIncome: Infinity, taxRate: 0.09 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Massachusetts applies a 4% surtax on income over $1 million. Our estimate includes this surtax if your income is above that threshold."
  },    
  michigan: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "MI-1040",
    incomeTaxPaidLine: "30",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "exemptions",
      exemptionAmountPerPerson: 5000
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0425 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0425 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0425 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0425 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0425 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Several Michigan cities (including Detroit) charge local income taxes. Our estimate does not include these. Check with your city to see if separate payments are required."
  },  
  minnesota: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "M1",
    incomeTaxPaidLine: "20",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 14600,
        married: 29200,
        separate: 14600,
        head: 21900,
        widow: 29200
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 31230, taxRate: 0.0535 },
        { lowIncome: 31230, highIncome: 103300, taxRate: 0.068 },
        { lowIncome: 103300, highIncome: 192800, taxRate: 0.0785 },
        { lowIncome: 192800, highIncome: Infinity, taxRate: 0.0985 }
      ],
      married: [
        { lowIncome: 0, highIncome: 46410, taxRate: 0.0535 },
        { lowIncome: 46410, highIncome: 183340, taxRate: 0.068 },
        { lowIncome: 183340, highIncome: 304970, taxRate: 0.0785 },
        { lowIncome: 304970, highIncome: Infinity, taxRate: 0.0985 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 23205, taxRate: 0.0535 },
        { lowIncome: 23205, highIncome: 91670, taxRate: 0.068 },
        { lowIncome: 91670, highIncome: 152485, taxRate: 0.0785 },
        { lowIncome: 152485, highIncome: Infinity, taxRate: 0.0985 }
      ],
      head: [
        { lowIncome: 0, highIncome: 37910, taxRate: 0.0535 },
        { lowIncome: 37910, highIncome: 157870, taxRate: 0.068 },
        { lowIncome: 157870, highIncome: 209060, taxRate: 0.0785 },
        { lowIncome: 209060, highIncome: Infinity, taxRate: 0.0985 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 46410, taxRate: 0.0535 },
        { lowIncome: 46410, highIncome: 183340, taxRate: 0.068 },
        { lowIncome: 183340, highIncome: 304970, taxRate: 0.0785 },
        { lowIncome: 304970, highIncome: Infinity, taxRate: 0.0985 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  mississippi: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.8,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "80-105",
    incomeTaxPaidLine: "26",
    minimumTaxForQuarterlyPayments: 200,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 2300,
        married: 4600,
        separate: 2300,
        head: 3400,
        widow: 4600
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0 },
        { lowIncome: 10000, highIncome: Infinity, taxRate: 0.044 }
      ],
      married: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0 },
        { lowIncome: 10000, highIncome: Infinity, taxRate: 0.044 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0 },
        { lowIncome: 10000, highIncome: Infinity, taxRate: 0.044 }
      ],
      head: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0 },
        { lowIncome: 10000, highIncome: Infinity, taxRate: 0.044 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0 },
        { lowIncome: 10000, highIncome: Infinity, taxRate: 0.044 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  missouri: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "MO-1040",
    incomeTaxPaidLine: "46",
    minimumTaxForQuarterlyPayments: 100,
    standardDeductionMethod: {
      type: "formula",
      formulaId: "missouri"
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 1313, taxRate: 0.0 },
        { lowIncome: 1313, highIncome: 2626, taxRate: 0.02 },
        { lowIncome: 2626, highIncome: 3939, taxRate: 0.025, baseTax: 26, baseThreshold: 2626 },
        { lowIncome: 3939, highIncome: 5252, taxRate: 0.03, baseTax: 59, baseThreshold: 3939 },
        { lowIncome: 5252, highIncome: 6565, taxRate: 0.035, baseTax: 98, baseThreshold: 5252 },
        { lowIncome: 6565, highIncome: 7878, taxRate: 0.04, baseTax: 144, baseThreshold: 6565 },
        { lowIncome: 7878, highIncome: 9191, taxRate: 0.045, baseTax: 197, baseThreshold: 7878 },
        { lowIncome: 9191, highIncome: Infinity, taxRate: 0.047, baseTax: 256, baseThreshold: 9191 }
      ],
      married: "sameAsSingle",
      separate: "sameAsSingle",
      head: "sameAsSingle",
      widow: "sameAsSingle"
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "If you live or work in St. Louis or Kansas City, you may owe local income taxes. These are not included in your state return and may require separate estimated payments."
  },  
  montana: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "2",
    incomeTaxPaidLine: "13",   
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 14600,
        married: 29200,
        separate: 14600,
        head: 21900,
        widow: 29200
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 20500, taxRate: 0.047 },
        { lowIncome: 20500, highIncome: Infinity, taxRate: 0.059, baseTax: 963.50, baseThreshold: 20500 }
      ],
      married: [
        { lowIncome: 0, highIncome: 41000, taxRate: 0.047 },
        { lowIncome: 41000, highIncome: Infinity, taxRate: 0.059, baseTax: 1927, baseThreshold: 41000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 20500, taxRate: 0.047 },
        { lowIncome: 20500, highIncome: Infinity, taxRate: 0.059, baseTax: 963.50, baseThreshold: 20500 }
      ],
      head: [
        { lowIncome: 0, highIncome: 30750, taxRate: 0.047 },
        { lowIncome: 30750, highIncome: Infinity, taxRate: 0.059, baseTax: 1445.25, baseThreshold: 30750 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 41000, taxRate: 0.047 },
        { lowIncome: 41000, highIncome: Infinity, taxRate: 0.059, baseTax: 1927, baseThreshold: 41000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  nebraska: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "1040N",
    incomeTaxPaidLine: "17",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 8600,
        married: 17200,
        separate: 8600,
        head: 12600,
        widow: 17200
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 4030, taxRate: 0.0246 },
        { lowIncome: 4030, highIncome: 24120, taxRate: 0.0351, baseTax: 99.14, baseThreshold: 4030 },
        { lowIncome: 24120, highIncome: 38870, taxRate: 0.0501, baseTax: 804.30, baseThreshold: 24120 },
        { lowIncome: 38870, highIncome: Infinity, taxRate: 0.052, baseTax: 1543.28, baseThreshold: 38870 }
      ],
      married: [
        { lowIncome: 0, highIncome: 8040, taxRate: 0.0246 },
        { lowIncome: 8040, highIncome: 48250, taxRate: 0.0351, baseTax: 197.78, baseThreshold: 8040 },
        { lowIncome: 48250, highIncome: 77730, taxRate: 0.0501, baseTax: 1609.15, baseThreshold: 48250 },
        { lowIncome: 77730, highIncome: Infinity, taxRate: 0.052, baseTax: 3086.10, baseThreshold: 77730 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 4030, taxRate: 0.0246 },
        { lowIncome: 4030, highIncome: 24120, taxRate: 0.0351, baseTax: 99.14, baseThreshold: 4030 },
        { lowIncome: 24120, highIncome: 38870, taxRate: 0.0501, baseTax: 804.30, baseThreshold: 24120 },
        { lowIncome: 38870, highIncome: Infinity, taxRate: 0.052, baseTax: 1543.28, baseThreshold: 38870 }
      ],
      head: [
        { lowIncome: 0, highIncome: 7510, taxRate: 0.0246 },
        { lowIncome: 7510, highIncome: 38590, taxRate: 0.0351, baseTax: 184.75, baseThreshold: 7510 },
        { lowIncome: 38590, highIncome: 57630, taxRate: 0.0501, baseTax: 1275.66, baseThreshold: 38590 },
        { lowIncome: 57630, highIncome: Infinity, taxRate: 0.052, baseTax: 2229.56, baseThreshold: 57630 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 8040, taxRate: 0.0246 },
        { lowIncome: 8040, highIncome: 48250, taxRate: 0.0351, baseTax: 197.78, baseThreshold: 8040 },
        { lowIncome: 48250, highIncome: 77730, taxRate: 0.0501, baseTax: 1609.15, baseThreshold: 48250 },
        { lowIncome: 77730, highIncome: Infinity, taxRate: 0.052, baseTax: 3086.10, baseThreshold: 77730 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  nevada: {
    stateHasQuarterlyTaxes: false
  },
  new_hampshire: {
    stateHasQuarterlyTaxes: false,
    note: "New Hampshire doesn’t tax wages, but if you expect over $2,400 in interest or dividends, you may need to file state quarterly estimates.This isn’t included in our estimate — we recommend checking with a tax advisor or the state’s website."
  },
  new_jersey: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "addBack",
      addBackDeductions: [
        "retirementContributionsThisYear",
        "otherDeductionsThisYear"
      ],
      stateIncomeForm: "NJ-1040",
      stateIncomeLine: "42"
    },
    incomeTaxPaidForm: "NJ-1040",
    incomeTaxPaidLine: "57",
    minimumTaxForQuarterlyPayments: 400,
    standardDeductionMethod: {
      type: "exemptions",
      exemptionAmountPerPerson: 1000
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 20000, taxRate: 0.014 },
        { lowIncome: 20000, highIncome: 35000, taxRate: 0.0175, baseTax: 70, baseThreshold: 20000 },
        { lowIncome: 35000, highIncome: 40000, taxRate: 0.035, baseTax: 682.50, baseThreshold: 35000 },
        { lowIncome: 40000, highIncome: 75000, taxRate: 0.05525, baseTax: 1492.50, baseThreshold: 40000 },
        { lowIncome: 75000, highIncome: 500000, taxRate: 0.0637, baseTax: 2126.25, baseThreshold: 75000 },
        { lowIncome: 500000, highIncome: 1000000, taxRate: 0.0897, baseTax: 15126.25, baseThreshold: 500000 },
        { lowIncome: 1000000, highIncome: Infinity, taxRate: 0.1075, baseTax: 32926.25, baseThreshold: 1000000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 20000, taxRate: 0.014 },
        { lowIncome: 20000, highIncome: 50000, taxRate: 0.0175, baseTax: 70, baseThreshold: 20000 },
        { lowIncome: 50000, highIncome: 70000, taxRate: 0.0245, baseTax: 420, baseThreshold: 50000 },
        { lowIncome: 70000, highIncome: 80000, taxRate: 0.035, baseTax: 1154.50, baseThreshold: 70000 },
        { lowIncome: 80000, highIncome: 150000, taxRate: 0.05525, baseTax: 2775, baseThreshold: 80000 },
        { lowIncome: 150000, highIncome: 500000, taxRate: 0.0637, baseTax: 4042.50, baseThreshold: 150000 },
        { lowIncome: 500000, highIncome: 1000000, taxRate: 0.0897, baseTax: 17042.50, baseThreshold: 500000 },
        { lowIncome: 1000000, highIncome: Infinity, taxRate: 0.1075, baseTax: 34842.50, baseThreshold: 1000000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 20000, taxRate: 0.014 },
        { lowIncome: 20000, highIncome: 35000, taxRate: 0.0175, baseTax: 70, baseThreshold: 20000 },
        { lowIncome: 35000, highIncome: 40000, taxRate: 0.035, baseTax: 682.50, baseThreshold: 35000 },
        { lowIncome: 40000, highIncome: 75000, taxRate: 0.05525, baseTax: 1492.50, baseThreshold: 40000 },
        { lowIncome: 75000, highIncome: 500000, taxRate: 0.0637, baseTax: 2126.25, baseThreshold: 75000 },
        { lowIncome: 500000, highIncome: 1000000, taxRate: 0.0897, baseTax: 15126.25, baseThreshold: 500000 },
        { lowIncome: 1000000, highIncome: Infinity, taxRate: 0.1075, baseTax: 32926.25, baseThreshold: 1000000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 20000, taxRate: 0.014 },
        { lowIncome: 20000, highIncome: 50000, taxRate: 0.0175, baseTax: 70, baseThreshold: 20000 },
        { lowIncome: 50000, highIncome: 70000, taxRate: 0.0245, baseTax: 420, baseThreshold: 50000 },
        { lowIncome: 70000, highIncome: 80000, taxRate: 0.035, baseTax: 1154.50, baseThreshold: 70000 },
        { lowIncome: 80000, highIncome: 150000, taxRate: 0.05525, baseTax: 2775, baseThreshold: 80000 },
        { lowIncome: 150000, highIncome: 500000, taxRate: 0.0637, baseTax: 4042.50, baseThreshold: 150000 },
        { lowIncome: 500000, highIncome: 1000000, taxRate: 0.0897, baseTax: 17042.50, baseThreshold: 500000 },
        { lowIncome: 1000000, highIncome: Infinity, taxRate: 0.1075, baseTax: 34842.50, baseThreshold: 1000000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 20000, taxRate: 0.014 },
        { lowIncome: 20000, highIncome: 50000, taxRate: 0.0175, baseTax: 70, baseThreshold: 20000 },
        { lowIncome: 50000, highIncome: 70000, taxRate: 0.0245, baseTax: 420, baseThreshold: 50000 },
        { lowIncome: 70000, highIncome: 80000, taxRate: 0.035, baseTax: 1154.50, baseThreshold: 70000 },
        { lowIncome: 80000, highIncome: 150000, taxRate: 0.05525, baseTax: 2775, baseThreshold: 80000 },
        { lowIncome: 150000, highIncome: 500000, taxRate: 0.0637, baseTax: 4042.50, baseThreshold: 150000 },
        { lowIncome: 500000, highIncome: 1000000, taxRate: 0.0897, baseTax: 17042.50, baseThreshold: 500000 },
        { lowIncome: 1000000, highIncome: Infinity, taxRate: 0.1075, baseTax: 34842.50, baseThreshold: 1000000 }
      ],
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "New Jersey doesn’t allow many federal deductions like student loan interest or health insurance premiums. Our estimate assumes only deductions allowed under New Jersey law."
  },  
  new_mexico: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "PIT-1",
    incomeTaxPaidLine: "30",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 14600,
        married: 29200,
        separate: 14600,
        head: 21900,
        widow: 29200
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 5500, taxRate: 0.017 },
        { lowIncome: 5500, highIncome: 11000, taxRate: 0.032, baseTax: 93.50, baseThreshold: 5500 },
        { lowIncome: 11000, highIncome: 16000, taxRate: 0.047, baseTax: 269.50, baseThreshold: 11000 },
        { lowIncome: 16000, highIncome: 210000, taxRate: 0.049, baseTax: 504, baseThreshold: 16000 },
        { lowIncome: 210000, highIncome: Infinity, taxRate: 0.059, baseTax: 10055, baseThreshold: 210000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 8000, taxRate: 0.017 },
        { lowIncome: 8000, highIncome: 16000, taxRate: 0.032, baseTax: 136, baseThreshold: 8000 },
        { lowIncome: 16000, highIncome: 24000, taxRate: 0.047, baseTax: 408, baseThreshold: 16000 },
        { lowIncome: 24000, highIncome: 315000, taxRate: 0.049, baseTax: 784, baseThreshold: 24000 },
        { lowIncome: 315000, highIncome: Infinity, taxRate: 0.059, baseTax: 14047.50, baseThreshold: 315000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 5500, taxRate: 0.017 },
        { lowIncome: 5500, highIncome: 11000, taxRate: 0.032, baseTax: 93.50, baseThreshold: 5500 },
        { lowIncome: 11000, highIncome: 16000, taxRate: 0.047, baseTax: 269.50, baseThreshold: 11000 },
        { lowIncome: 16000, highIncome: 210000, taxRate: 0.049, baseTax: 504, baseThreshold: 16000 },
        { lowIncome: 210000, highIncome: Infinity, taxRate: 0.059, baseTax: 10055, baseThreshold: 210000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 8000, taxRate: 0.017 },
        { lowIncome: 8000, highIncome: 16000, taxRate: 0.032, baseTax: 136, baseThreshold: 8000 },
        { lowIncome: 16000, highIncome: 24000, taxRate: 0.047, baseTax: 408, baseThreshold: 16000 },
        { lowIncome: 24000, highIncome: 315000, taxRate: 0.049, baseTax: 784, baseThreshold: 24000 },
        { lowIncome: 315000, highIncome: Infinity, taxRate: 0.059, baseTax: 14047.50, baseThreshold: 315000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 8000, taxRate: 0.017 },
        { lowIncome: 8000, highIncome: 16000, taxRate: 0.032, baseTax: 136, baseThreshold: 8000 },
        { lowIncome: 16000, highIncome: 24000, taxRate: 0.047, baseTax: 408, baseThreshold: 16000 },
        { lowIncome: 24000, highIncome: 315000, taxRate: 0.049, baseTax: 784, baseThreshold: 24000 },
        { lowIncome: 315000, highIncome: Infinity, taxRate: 0.059, baseTax: 14047.50, baseThreshold: 315000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  new_york: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "addBack",
      addBackDeductions: [
        "healthInsuranceThisYear",
        "otherDeductionsThisYear"
      ],
      stateIncomeForm: "IT-201",
      stateIncomeLine: "38"
    },
    incomeTaxPaidForm: "IT-201",
    incomeTaxPaidLine: "62",
    minimumTaxForQuarterlyPayments: 300,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 8000,
        married: 16050,
        separate: 8000,
        head: 11200,
        widow: 16050
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 8500, taxRate: 0.04 },
        { lowIncome: 8500, highIncome: 11700, taxRate: 0.045, baseTax: 340, baseThreshold: 8500 },
        { lowIncome: 11700, highIncome: 13900, taxRate: 0.0525, baseTax: 484, baseThreshold: 11700 },
        { lowIncome: 13900, highIncome: 80650, taxRate: 0.055, baseTax: 600, baseThreshold: 13900 },
        { lowIncome: 80650, highIncome: 215400, taxRate: 0.06, baseTax: 4271, baseThreshold: 80650 },
        { lowIncome: 215400, highIncome: 1077550, taxRate: 0.0685, baseTax: 12356, baseThreshold: 215400 },
        { lowIncome: 1077550, highIncome: 5000000, taxRate: 0.0965, baseTax: 71413, baseThreshold: 1077550 },
        { lowIncome: 5000000, highIncome: 25000000, taxRate: 0.103, baseTax: 449929, baseThreshold: 5000000 },
        { lowIncome: 25000000, highIncome: Infinity, taxRate: 0.109, baseTax: 2509929, baseThreshold: 25000000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 17150, taxRate: 0.04 },
        { lowIncome: 17150, highIncome: 23600, taxRate: 0.045, baseTax: 686, baseThreshold: 17150 },
        { lowIncome: 23600, highIncome: 27900, taxRate: 0.0525, baseTax: 976, baseThreshold: 23600 },
        { lowIncome: 27900, highIncome: 161550, taxRate: 0.055, baseTax: 1202, baseThreshold: 27900 },
        { lowIncome: 161550, highIncome: 323200, taxRate: 0.06, baseTax: 8553, baseThreshold: 161550 },
        { lowIncome: 323200, highIncome: 2155350, taxRate: 0.0685, baseTax: 18252, baseThreshold: 323200 },
        { lowIncome: 2155350, highIncome: 5000000, taxRate: 0.0965, baseTax: 143754, baseThreshold: 2155350 },
        { lowIncome: 5000000, highIncome: 25000000, taxRate: 0.103, baseTax: 418263, baseThreshold: 5000000 },
        { lowIncome: 25000000, highIncome: Infinity, taxRate: 0.109, baseTax: 2478263, baseThreshold: 25000000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 8500, taxRate: 0.04 },
        { lowIncome: 8500, highIncome: 11700, taxRate: 0.045, baseTax: 340, baseThreshold: 8500 },
        { lowIncome: 11700, highIncome: 13900, taxRate: 0.0525, baseTax: 484, baseThreshold: 11700 },
        { lowIncome: 13900, highIncome: 80650, taxRate: 0.055, baseTax: 600, baseThreshold: 13900 },
        { lowIncome: 80650, highIncome: 215400, taxRate: 0.06, baseTax: 4271, baseThreshold: 80650 },
        { lowIncome: 215400, highIncome: 1077550, taxRate: 0.0685, baseTax: 12356, baseThreshold: 215400 },
        { lowIncome: 1077550, highIncome: 5000000, taxRate: 0.0965, baseTax: 71413, baseThreshold: 1077550 },
        { lowIncome: 5000000, highIncome: 25000000, taxRate: 0.103, baseTax: 449929, baseThreshold: 5000000 },
        { lowIncome: 25000000, highIncome: Infinity, taxRate: 0.109, baseTax: 2509929, baseThreshold: 25000000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 12800, taxRate: 0.04 },
        { lowIncome: 12800, highIncome: 17650, taxRate: 0.045, baseTax: 512, baseThreshold: 12800 },
        { lowIncome: 17650, highIncome: 20900, taxRate: 0.0525, baseTax: 730, baseThreshold: 17650 },
        { lowIncome: 20900, highIncome: 107650, taxRate: 0.055, baseTax: 901, baseThreshold: 20900 },
        { lowIncome: 107650, highIncome: 269300, taxRate: 0.06, baseTax: 5672, baseThreshold: 107650 },
        { lowIncome: 269300, highIncome: 1616450, taxRate: 0.0685, baseTax: 15371, baseThreshold: 269300 },
        { lowIncome: 1616450, highIncome: 5000000, taxRate: 0.0965, baseTax: 107651, baseThreshold: 1616450 },
        { lowIncome: 5000000, highIncome: 25000000, taxRate: 0.103, baseTax: 434163, baseThreshold: 5000000 },
        { lowIncome: 25000000, highIncome: Infinity, taxRate: 0.109, baseTax: 2494163, baseThreshold: 25000000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 17150, taxRate: 0.04 },
        { lowIncome: 17150, highIncome: 23600, taxRate: 0.045, baseTax: 686, baseThreshold: 17150 },
        { lowIncome: 23600, highIncome: 27900, taxRate: 0.0525, baseTax: 976, baseThreshold: 23600 },
        { lowIncome: 27900, highIncome: 161550, taxRate: 0.055, baseTax: 1202, baseThreshold: 27900 },
        { lowIncome: 161550, highIncome: 323200, taxRate: 0.06, baseTax: 8553, baseThreshold: 161550 },
        { lowIncome: 323200, highIncome: 2155350, taxRate: 0.0685, baseTax: 18252, baseThreshold: 323200 },
        { lowIncome: 2155350, highIncome: 5000000, taxRate: 0.0965, baseTax: 143754, baseThreshold: 2155350 },
        { lowIncome: 5000000, highIncome: 25000000, taxRate: 0.103, baseTax: 418263, baseThreshold: 5000000 },
        { lowIncome: 25000000, highIncome: Infinity, taxRate: 0.109, baseTax: 2478263, baseThreshold: 25000000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  north_carolina: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "D-400",
    incomeTaxPaidLine: "26c",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 13250,
        married: 26500,
        separate: 13250,
        head: 19900,
        widow: 26500
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0415 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0415 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0415 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0415 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0415 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  north_dakota: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "ND-1",
    incomeTaxPaidLine: "37",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 48475, taxRate: 0.0 },
        { lowIncome: 48475, highIncome: 244825, taxRate: 0.0195, baseTax: 0, baseThreshold: 48475 },
        { lowIncome: 244825, highIncome: Infinity, taxRate: 0.025, baseTax: 3828.83, baseThreshold: 244825 }
      ],
      married: [
        { lowIncome: 0, highIncome: 80975, taxRate: 0.0 },
        { lowIncome: 80975, highIncome: 298075, taxRate: 0.0195, baseTax: 0, baseThreshold: 80975 },
        { lowIncome: 298075, highIncome: Infinity, taxRate: 0.025, baseTax: 4233.45, baseThreshold: 298075 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 40475, taxRate: 0.0 },
        { lowIncome: 40475, highIncome: 149025, taxRate: 0.0195, baseTax: 0, baseThreshold: 40475 },
        { lowIncome: 149025, highIncome: Infinity, taxRate: 0.025, baseTax: 2116.73, baseThreshold: 149025 }
      ],
      head: [
        { lowIncome: 0, highIncome: 64950, taxRate: 0.0 },
        { lowIncome: 64950, highIncome: 271450, taxRate: 0.0195, baseTax: 0, baseThreshold: 64950 },
        { lowIncome: 271450, highIncome: Infinity, taxRate: 0.025, baseTax: 4026.75, baseThreshold: 271450 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 80975, taxRate: 0.0 },
        { lowIncome: 80975, highIncome: 298075, taxRate: 0.0195, baseTax: 0, baseThreshold: 80975 },
        { lowIncome: 298075, highIncome: Infinity, taxRate: 0.025, baseTax: 4233.45, baseThreshold: 298075 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  ohio: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "IT 1040",
    incomeTaxPaidLine: "14",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 26050, taxRate: 0.0 },
        { lowIncome: 26050, highIncome: 100000, taxRate: 0.02175, baseTax: 0, baseThreshold: 26050 },
        { lowIncome: 100000, highIncome: 115000, taxRate: 0.0235, baseTax: 1601, baseThreshold: 100000 },
        { lowIncome: 115000, highIncome: 133000, taxRate: 0.0275, baseTax: 1954, baseThreshold: 115000 },
        { lowIncome: 133000, highIncome: Infinity, taxRate: 0.035, baseTax: 2449, baseThreshold: 133000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 26050, taxRate: 0.0 },
        { lowIncome: 26050, highIncome: 100000, taxRate: 0.02175, baseTax: 0, baseThreshold: 26050 },
        { lowIncome: 100000, highIncome: 115000, taxRate: 0.0235, baseTax: 1601, baseThreshold: 100000 },
        { lowIncome: 115000, highIncome: 133000, taxRate: 0.0275, baseTax: 1954, baseThreshold: 115000 },
        { lowIncome: 133000, highIncome: Infinity, taxRate: 0.035, baseTax: 2449, baseThreshold: 133000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 26050, taxRate: 0.0 },
        { lowIncome: 26050, highIncome: 100000, taxRate: 0.02175, baseTax: 0, baseThreshold: 26050 },
        { lowIncome: 100000, highIncome: 115000, taxRate: 0.0235, baseTax: 1601, baseThreshold: 100000 },
        { lowIncome: 115000, highIncome: 133000, taxRate: 0.0275, baseTax: 1954, baseThreshold: 115000 },
        { lowIncome: 133000, highIncome: Infinity, taxRate: 0.035, baseTax: 2449, baseThreshold: 133000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 26050, taxRate: 0.0 },
        { lowIncome: 26050, highIncome: 100000, taxRate: 0.02175, baseTax: 0, baseThreshold: 26050 },
        { lowIncome: 100000, highIncome: 115000, taxRate: 0.0235, baseTax: 1601, baseThreshold: 100000 },
        { lowIncome: 115000, highIncome: 133000, taxRate: 0.0275, baseTax: 1954, baseThreshold: 115000 },
        { lowIncome: 133000, highIncome: Infinity, taxRate: 0.035, baseTax: 2449, baseThreshold: 133000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 26050, taxRate: 0.0 },
        { lowIncome: 26050, highIncome: 100000, taxRate: 0.02175, baseTax: 0, baseThreshold: 26050 },
        { lowIncome: 100000, highIncome: 115000, taxRate: 0.0235, baseTax: 1601, baseThreshold: 100000 },
        { lowIncome: 115000, highIncome: 133000, taxRate: 0.0275, baseTax: 1954, baseThreshold: 115000 },
        { lowIncome: 133000, highIncome: Infinity, taxRate: 0.035, baseTax: 2449, baseThreshold: 133000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Many cities in Ohio charge a separate local income tax. Our estimate does not include these local taxes. Check with your city or local tax office to see if you need to make separate quarterly payments."
  },  
  oklahoma: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.7,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "511",
    incomeTaxPaidLine: "34",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 6500,
        married: 13000,
        separate: 6500,
        head: 9700,
        widow: 13000
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.005 },
        { lowIncome: 1000, highIncome: 2500, taxRate: 0.01, baseTax: 5, baseThreshold: 1000 },
        { lowIncome: 2500, highIncome: 3750, taxRate: 0.02, baseTax: 20, baseThreshold: 2500 },
        { lowIncome: 3750, highIncome: 4900, taxRate: 0.03, baseTax: 45, baseThreshold: 3750 },
        { lowIncome: 4900, highIncome: 7200, taxRate: 0.04, baseTax: 84, baseThreshold: 4900 },
        { lowIncome: 7200, highIncome: Infinity, taxRate: 0.0475, baseTax: 176, baseThreshold: 7200 }
      ],
      married: [
        { lowIncome: 0, highIncome: 2000, taxRate: 0.005 },
        { lowIncome: 2000, highIncome: 5000, taxRate: 0.01, baseTax: 10, baseThreshold: 2000 },
        { lowIncome: 5000, highIncome: 7500, taxRate: 0.02, baseTax: 40, baseThreshold: 5000 },
        { lowIncome: 7500, highIncome: 9800, taxRate: 0.03, baseTax: 90, baseThreshold: 7500 },
        { lowIncome: 9800, highIncome: 12200, taxRate: 0.04, baseTax: 157, baseThreshold: 9800 },
        { lowIncome: 12200, highIncome: Infinity, taxRate: 0.0475, baseTax: 253, baseThreshold: 12200 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 1000, taxRate: 0.005 },
        { lowIncome: 1000, highIncome: 2500, taxRate: 0.01, baseTax: 5, baseThreshold: 1000 },
        { lowIncome: 2500, highIncome: 3750, taxRate: 0.02, baseTax: 20, baseThreshold: 2500 },
        { lowIncome: 3750, highIncome: 4900, taxRate: 0.03, baseTax: 45, baseThreshold: 3750 },
        { lowIncome: 4900, highIncome: 7200, taxRate: 0.04, baseTax: 84, baseThreshold: 4900 },
        { lowIncome: 7200, highIncome: Infinity, taxRate: 0.0475, baseTax: 176, baseThreshold: 7200 }
      ],
      head: [
        { lowIncome: 0, highIncome: 2000, taxRate: 0.005 },
        { lowIncome: 2000, highIncome: 5000, taxRate: 0.01, baseTax: 10, baseThreshold: 2000 },
        { lowIncome: 5000, highIncome: 7500, taxRate: 0.02, baseTax: 40, baseThreshold: 5000 },
        { lowIncome: 7500, highIncome: 9800, taxRate: 0.03, baseTax: 90, baseThreshold: 7500 },
        { lowIncome: 9800, highIncome: 12200, taxRate: 0.04, baseTax: 157, baseThreshold: 9800 },
        { lowIncome: 12200, highIncome: Infinity, taxRate: 0.0475, baseTax: 253, baseThreshold: 12200 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 2000, taxRate: 0.005 },
        { lowIncome: 2000, highIncome: 5000, taxRate: 0.01, baseTax: 10, baseThreshold: 2000 },
        { lowIncome: 5000, highIncome: 7500, taxRate: 0.02, baseTax: 40, baseThreshold: 5000 },
        { lowIncome: 7500, highIncome: 9800, taxRate: 0.03, baseTax: 90, baseThreshold: 7500 },
        { lowIncome: 9800, highIncome: 12200, taxRate: 0.04, baseTax: 157, baseThreshold: 9800 },
        { lowIncome: 12200, highIncome: Infinity, taxRate: 0.0475, baseTax: 253, baseThreshold: 12200 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  oregon: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "addBack",
      addBackDeductions: [
        "studentLoanInterestThisYear",
        "retirementContributionsThisYear"
      ],
      stateIncomeForm: "OR-40",
      stateIncomeLine: "19"
    },
    incomeTaxPaidForm: "OR-40",
    incomeTaxPaidLine: "40",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 2800,
        married: 5600,
        separate: 2800,
        head: 4500,
        widow: 5600
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 4400, taxRate: 0.0475 },
        { lowIncome: 4400, highIncome: 11050, taxRate: 0.0675, baseTax: 210, baseThreshold: 4400 },
        { lowIncome: 11050, highIncome: 125000, taxRate: 0.0875, baseTax: 660, baseThreshold: 11050 },
        { lowIncome: 125000, highIncome: Infinity, taxRate: 0.099, baseTax: 10630, baseThreshold: 125000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 8800, taxRate: 0.0475 },
        { lowIncome: 8800, highIncome: 22100, taxRate: 0.0675, baseTax: 420, baseThreshold: 8800 },
        { lowIncome: 22100, highIncome: 250000, taxRate: 0.0875, baseTax: 1320, baseThreshold: 22100 },
        { lowIncome: 250000, highIncome: Infinity, taxRate: 0.099, baseTax: 21260, baseThreshold: 250000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 4400, taxRate: 0.0475 },
        { lowIncome: 4400, highIncome: 11050, taxRate: 0.0675, baseTax: 210, baseThreshold: 4400 },
        { lowIncome: 11050, highIncome: 125000, taxRate: 0.0875, baseTax: 660, baseThreshold: 11050 },
        { lowIncome: 125000, highIncome: Infinity, taxRate: 0.099, baseTax: 10630, baseThreshold: 125000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 8800, taxRate: 0.0475 },
        { lowIncome: 8800, highIncome: 22100, taxRate: 0.0675, baseTax: 420, baseThreshold: 8800 },
        { lowIncome: 22100, highIncome: 250000, taxRate: 0.0875, baseTax: 1320, baseThreshold: 22100 },
        { lowIncome: 250000, highIncome: Infinity, taxRate: 0.099, baseTax: 21260, baseThreshold: 250000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 8800, taxRate: 0.0475 },
        { lowIncome: 8800, highIncome: 22100, taxRate: 0.0675, baseTax: 420, baseThreshold: 8800 },
        { lowIncome: 22100, highIncome: 250000, taxRate: 0.0875, baseTax: 1320, baseThreshold: 22100 },
        { lowIncome: 250000, highIncome: Infinity, taxRate: 0.099, baseTax: 21260, baseThreshold: 250000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  pennsylvania: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "custom",
      customDeductions: [],
      stateIncomeForm: "PA-40",
      stateIncomeLine: "11"  
    },
    incomeTaxPaidForm: "PA-40",
    incomeTaxPaidLine: "15",
    minimumTaxForQuarterlyPayments: 338, 
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0307 }
      ],
      married: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0307 }
      ],
      separate: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0307 }
      ],
      head: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0307 }
      ],
      widow: [
        { lowIncome: 0, highIncome: Infinity, taxRate: 0.0307 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    },
    userNote: "Pennsylvania taxes each type of income separately (e.g., wages, interest, business income). Losses in one category can’t offset gains in another. Our estimate assumes your income is all in one category. Most Pennsylvania municipalities charge a separate local income tax. Our estimate does not include these. Check with your local Earned Income Tax Office to see if payments are required."
  },  
  rhode_island: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.8,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "RI-1040",
    incomeTaxPaidLine: "14a",
    minimumTaxForQuarterlyPayments: 250,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 10900,
        married: 21800,
        separate: 10900,
        head: 16350,
        widow: 21800
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 79900, taxRate: 0.0375 },
        { lowIncome: 79900, highIncome: 181650, taxRate: 0.0475, baseTax: 2996.25, baseThreshold: 79900 },
        { lowIncome: 181650, highIncome: Infinity, taxRate: 0.0599, baseTax: 7829.38, baseThreshold: 181650 }
      ],
      married: [
        { lowIncome: 0, highIncome: 79900, taxRate: 0.0375 },
        { lowIncome: 79900, highIncome: 181650, taxRate: 0.0475, baseTax: 2996.25, baseThreshold: 79900 },
        { lowIncome: 181650, highIncome: Infinity, taxRate: 0.0599, baseTax: 7829.38, baseThreshold: 181650 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 79900, taxRate: 0.0375 },
        { lowIncome: 79900, highIncome: 181650, taxRate: 0.0475, baseTax: 2996.25, baseThreshold: 79900 },
        { lowIncome: 181650, highIncome: Infinity, taxRate: 0.0599, baseTax: 7829.38, baseThreshold: 181650 }
      ],
      head: [
        { lowIncome: 0, highIncome: 79900, taxRate: 0.0375 },
        { lowIncome: 79900, highIncome: 181650, taxRate: 0.0475, baseTax: 2996.25, baseThreshold: 79900 },
        { lowIncome: 181650, highIncome: Infinity, taxRate: 0.0599, baseTax: 7829.38, baseThreshold: 181650 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 79900, taxRate: 0.0375 },
        { lowIncome: 79900, highIncome: 181650, taxRate: 0.0475, baseTax: 2996.25, baseThreshold: 79900 },
        { lowIncome: 181650, highIncome: Infinity, taxRate: 0.0599, baseTax: 7829.38, baseThreshold: 181650 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  south_carolina: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "SC1040",
    incomeTaxPaidLine: "21",
    minimumTaxForQuarterlyPayments: 100,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 0,
        married: 0,
        separate: 0,
        head: 0,
        widow: 0
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 3560, taxRate: 0.0 },
        { lowIncome: 3560, highIncome: 17830, taxRate: 0.03, baseTax: 0, baseThreshold: 3560 },
        { lowIncome: 17830, highIncome: Infinity, taxRate: 0.062, baseTax: 428.1, baseThreshold: 17830 }
      ],
      married: [
        { lowIncome: 0, highIncome: 3560, taxRate: 0.0 },
        { lowIncome: 3560, highIncome: 17830, taxRate: 0.03, baseTax: 0, baseThreshold: 3560 },
        { lowIncome: 17830, highIncome: Infinity, taxRate: 0.062, baseTax: 428.1, baseThreshold: 17830 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 3560, taxRate: 0.0 },
        { lowIncome: 3560, highIncome: 17830, taxRate: 0.03, baseTax: 0, baseThreshold: 3560 },
        { lowIncome: 17830, highIncome: Infinity, taxRate: 0.062, baseTax: 428.1, baseThreshold: 17830 }
      ],
      head: [
        { lowIncome: 0, highIncome: 3560, taxRate: 0.0 },
        { lowIncome: 3560, highIncome: 17830, taxRate: 0.03, baseTax: 0, baseThreshold: 3560 },
        { lowIncome: 17830, highIncome: Infinity, taxRate: 0.062, baseTax: 428.1, baseThreshold: 17830 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 3560, taxRate: 0.0 },
        { lowIncome: 3560, highIncome: 17830, taxRate: 0.03, baseTax: 0, baseThreshold: 3560 },
        { lowIncome: 17830, highIncome: Infinity, taxRate: 0.062, baseTax: 428.1, baseThreshold: 17830 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  south_dakota: {
    stateHasQuarterlyTaxes: false,
  },
  tennessee: {
    stateHasQuarterlyTaxes: false,
  },
  texas: {
    stateHasQuarterlyTaxes: false,
  },
  utah: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: null,
    lastYearSafeHarborHighIncome: null,
    lastYearSafeHarborHighIncomeMarriedFilingSeparately: null,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "TC-40",
    incomeTaxPaidLine: "27 + 30",
    minimumTaxForQuarterlyPayments: 1000,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 14600,
      married: 29200,
      separate: 14600,
      head: 21900,
      widow: 29200
      }
    },
    incomeTaxRate: {
      single: [{ lowIncome: 0, highIncome: Infinity, taxRate: 0.0455 }],
      married: [{ lowIncome: 0, highIncome: Infinity, taxRate: 0.0455 }],
      separate: [{ lowIncome: 0, highIncome: Infinity, taxRate: 0.0455 }],
      head: [{ lowIncome: 0, highIncome: Infinity, taxRate: 0.0455 }],
      widow: [{ lowIncome: 0, highIncome: Infinity, taxRate: 0.0455 }]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },
  vermont: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "IN-111",
    incomeTaxPaidLine: "25",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 12950,
        married: 25900,
        separate: 12950,
        head: 19400,
        widow: 25900
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 49400, taxRate: 0.0335 },
        { lowIncome: 49400, highIncome: 119700, taxRate: 0.066, baseTax: 1655, baseThreshold: 49400 },
        { lowIncome: 119700, highIncome: 249700, taxRate: 0.076, baseTax: 6295, baseThreshold: 119700 },
        { lowIncome: 249700, highIncome: Infinity, taxRate: 0.0875, baseTax: 16175, baseThreshold: 249700 }
      ],
      married: [
        { lowIncome: 0, highIncome: 82500, taxRate: 0.0335 },
        { lowIncome: 82500, highIncome: 199450, taxRate: 0.066, baseTax: 2764, baseThreshold: 82500 },
        { lowIncome: 199450, highIncome: 304000, taxRate: 0.076, baseTax: 10482, baseThreshold: 199450 },
        { lowIncome: 304000, highIncome: Infinity, taxRate: 0.0875, baseTax: 18428, baseThreshold: 304000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 41250, taxRate: 0.0335 },
        { lowIncome: 41250, highIncome: 99725, taxRate: 0.066, baseTax: 1382, baseThreshold: 41250 },
        { lowIncome: 99725, highIncome: 152000, taxRate: 0.076, baseTax: 5241, baseThreshold: 99725 },
        { lowIncome: 152000, highIncome: Infinity, taxRate: 0.0875, baseTax: 9214, baseThreshold: 152000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 66200, taxRate: 0.0335 },
        { lowIncome: 66200, highIncome: 171000, taxRate: 0.066, baseTax: 2218, baseThreshold: 66200 },
        { lowIncome: 171000, highIncome: 276850, taxRate: 0.076, baseTax: 9135, baseThreshold: 171000 },
        { lowIncome: 276850, highIncome: Infinity, taxRate: 0.0875, baseTax: 17179, baseThreshold: 276850 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 82500, taxRate: 0.0335 },
        { lowIncome: 82500, highIncome: 199450, taxRate: 0.066, baseTax: 2764, baseThreshold: 82500 },
        { lowIncome: 199450, highIncome: 304000, taxRate: 0.076, baseTax: 10482, baseThreshold: 199450 },
        { lowIncome: 304000, highIncome: Infinity, taxRate: 0.0875, baseTax: 18428, baseThreshold: 304000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  virginia: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "760",
    incomeTaxPaidLine: "19a",
    minimumTaxForQuarterlyPayments: 150,
    standardDeductionMethod: {
      type: "fixed",
      values: {
        single: 8000,
        married: 16000,
        separate: 8000,
        head: 8000,
        widow: 16000
      }
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 3000, taxRate: 0.02 },
        { lowIncome: 3000, highIncome: 5000, taxRate: 0.03, baseTax: 60, baseThreshold: 3000 },
        { lowIncome: 5000, highIncome: 17000, taxRate: 0.05, baseTax: 120, baseThreshold: 5000 },
        { lowIncome: 17000, highIncome: Infinity, taxRate: 0.0575, baseTax: 720, baseThreshold: 17000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 3000, taxRate: 0.02 },
        { lowIncome: 3000, highIncome: 5000, taxRate: 0.03, baseTax: 60, baseThreshold: 3000 },
        { lowIncome: 5000, highIncome: 17000, taxRate: 0.05, baseTax: 120, baseThreshold: 5000 },
        { lowIncome: 17000, highIncome: Infinity, taxRate: 0.0575, baseTax: 720, baseThreshold: 17000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 3000, taxRate: 0.02 },
        { lowIncome: 3000, highIncome: 5000, taxRate: 0.03, baseTax: 60, baseThreshold: 3000 },
        { lowIncome: 5000, highIncome: 17000, taxRate: 0.05, baseTax: 120, baseThreshold: 5000 },
        { lowIncome: 17000, highIncome: Infinity, taxRate: 0.0575, baseTax: 720, baseThreshold: 17000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 3000, taxRate: 0.02 },
        { lowIncome: 3000, highIncome: 5000, taxRate: 0.03, baseTax: 60, baseThreshold: 3000 },
        { lowIncome: 5000, highIncome: 17000, taxRate: 0.05, baseTax: 120, baseThreshold: 5000 },
        { lowIncome: 17000, highIncome: Infinity, taxRate: 0.0575, baseTax: 720, baseThreshold: 17000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 3000, taxRate: 0.02 },
        { lowIncome: 3000, highIncome: 5000, taxRate: 0.03, baseTax: 60, baseThreshold: 3000 },
        { lowIncome: 5000, highIncome: 17000, taxRate: 0.05, baseTax: 120, baseThreshold: 5000 },
        { lowIncome: 17000, highIncome: Infinity, taxRate: 0.0575, baseTax: 720, baseThreshold: 17000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  washington: {
    stateHasQuarterlyTaxes: false,
    note: "Washington doesn’t have income tax, but if you sold over $250,000 in stocks or assets this year, you may owe capital gains tax. This isn’t included in our estimate — we recommend checking with a tax advisor or the state’s website."
  },
  west_virginia: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "federalAGI",
    },
    incomeTaxPaidForm: "IT-140",
    incomeTaxPaidLine: "15",
    minimumTaxForQuarterlyPayments: 600,
    standardDeductionMethod: {
      type: "exemptions",
      exemptionAmountPerPerson: 2000
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0236 },
        { lowIncome: 10000, highIncome: 25000, taxRate: 0.0315, baseTax: 236, baseThreshold: 10000 },
        { lowIncome: 25000, highIncome: 40000, taxRate: 0.0354, baseTax: 708.50, baseThreshold: 25000 },
        { lowIncome: 40000, highIncome: 60000, taxRate: 0.0472, baseTax: 1239.50, baseThreshold: 40000 },
        { lowIncome: 60000, highIncome: Infinity, taxRate: 0.0512, baseTax: 2183.50, baseThreshold: 60000 }
      ],
      married: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0236 },
        { lowIncome: 10000, highIncome: 25000, taxRate: 0.0315, baseTax: 236, baseThreshold: 10000 },
        { lowIncome: 25000, highIncome: 40000, taxRate: 0.0354, baseTax: 708.50, baseThreshold: 25000 },
        { lowIncome: 40000, highIncome: 60000, taxRate: 0.0472, baseTax: 1239.50, baseThreshold: 40000 },
        { lowIncome: 60000, highIncome: Infinity, taxRate: 0.0512, baseTax: 2183.50, baseThreshold: 60000 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 5000, taxRate: 0.0236 },
        { lowIncome: 5000, highIncome: 12500, taxRate: 0.0315, baseTax: 118, baseThreshold: 5000 },
        { lowIncome: 12500, highIncome: 20000, taxRate: 0.0354, baseTax: 354.25, baseThreshold: 12500 },
        { lowIncome: 20000, highIncome: 30000, taxRate: 0.0472, baseTax: 619.75, baseThreshold: 20000 },
        { lowIncome: 30000, highIncome: Infinity, taxRate: 0.0512, baseTax: 1091.75, baseThreshold: 30000 }
      ],
      head: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0236 },
        { lowIncome: 10000, highIncome: 25000, taxRate: 0.0315, baseTax: 236, baseThreshold: 10000 },
        { lowIncome: 25000, highIncome: 40000, taxRate: 0.0354, baseTax: 708.50, baseThreshold: 25000 },
        { lowIncome: 40000, highIncome: 60000, taxRate: 0.0472, baseTax: 1239.50, baseThreshold: 40000 },
        { lowIncome: 60000, highIncome: Infinity, taxRate: 0.0512, baseTax: 2183.50, baseThreshold: 60000 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 10000, taxRate: 0.0236 },
        { lowIncome: 10000, highIncome: 25000, taxRate: 0.0315, baseTax: 236, baseThreshold: 10000 },
        { lowIncome: 25000, highIncome: 40000, taxRate: 0.0354, baseTax: 708.50, baseThreshold: 25000 },
        { lowIncome: 40000, highIncome: 60000, taxRate: 0.0472, baseTax: 1239.50, baseThreshold: 40000 },
        { lowIncome: 60000, highIncome: Infinity, taxRate: 0.0512, baseTax: 2183.50, baseThreshold: 60000 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  wisconsin: {
    stateHasQuarterlyTaxes: true,
    lastYearSafeHarborRule: true,
    lastYearSafeHarborLowPercentage: 1.0,
    lastYearSafeHarborHighPercentage: 1.1,
    lastYearSafeHarborHighIncome: 150000,
    thisYearSafeHarborRule: true,
    thisYearSafeHarborActualPercentage: 0.9,
    thisYearSafeHarborUsedPercentage: 1.0,
    thisYearIncomeCalculationType: {
      type: "custom",
      customDeductions: [
        "studentLoanInterestThisYear",
        "otherDeductionsThisYear"
      ],
      stateIncomeForm: "1",
      stateIncomeLine: "11"
    },
    incomeTaxPaidForm: "1",
    incomeTaxPaidLine: "29",
    minimumTaxForQuarterlyPayments: 500,
    standardDeductionMethod: {
      type: "formula",
      formulaId: "wisconsin"
    },
    incomeTaxRate: {
      single: [
        { lowIncome: 0, highIncome: 14680, taxRate: 0.035 },
        { lowIncome: 14680, highIncome: 29370, taxRate: 0.044, baseTax: 513.80, baseThreshold: 14680 },
        { lowIncome: 29370, highIncome: 323290, taxRate: 0.053, baseTax: 1160.16, baseThreshold: 29370 },
        { lowIncome: 323290, highIncome: Infinity, taxRate: 0.0765, baseTax: 16737.92, baseThreshold: 323290 }
      ],
      married: [
        { lowIncome: 0, highIncome: 19580, taxRate: 0.035 },
        { lowIncome: 19580, highIncome: 39150, taxRate: 0.044, baseTax: 685.30, baseThreshold: 19580 },
        { lowIncome: 39150, highIncome: 431060, taxRate: 0.053, baseTax: 1546.38, baseThreshold: 39150 },
        { lowIncome: 431060, highIncome: Infinity, taxRate: 0.0765, baseTax: 22317.61, baseThreshold: 431060 }
      ],
      separate: [
        { lowIncome: 0, highIncome: 9790, taxRate: 0.035 },
        { lowIncome: 9790, highIncome: 19580, taxRate: 0.044, baseTax: 342.65, baseThreshold: 9790 },
        { lowIncome: 19580, highIncome: 215530, taxRate: 0.053, baseTax: 773.41, baseThreshold: 19580 },
        { lowIncome: 215530, highIncome: Infinity, taxRate: 0.0765, baseTax: 11158.76, baseThreshold: 215530 }
      ],
      head: [
        { lowIncome: 0, highIncome: 14680, taxRate: 0.035 },
        { lowIncome: 14680, highIncome: 29370, taxRate: 0.044, baseTax: 513.80, baseThreshold: 14680 },
        { lowIncome: 29370, highIncome: 323290, taxRate: 0.053, baseTax: 1160.16, baseThreshold: 29370 },
        { lowIncome: 323290, highIncome: Infinity, taxRate: 0.0765, baseTax: 16737.92, baseThreshold: 323290 }
      ],
      widow: [
        { lowIncome: 0, highIncome: 19580, taxRate: 0.035 },
        { lowIncome: 19580, highIncome: 39150, taxRate: 0.044, baseTax: 685.30, baseThreshold: 19580 },
        { lowIncome: 39150, highIncome: 431060, taxRate: 0.053, baseTax: 1546.38, baseThreshold: 39150 },
        { lowIncome: 431060, highIncome: Infinity, taxRate: 0.0765, baseTax: 22317.61, baseThreshold: 431060 }
      ]
    },
    quarterlyCumulativeSchedule: {
      Q1: 0.25,
      Q2: 0.50,
      Q3: 0.75,
      Q4: 1.00
    }
  },  
  wyoming: {
    stateHasQuarterlyTaxes: false,
  }
}

export { stateRules }