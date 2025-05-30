const formulas = {
  alabama: (income, filingStatus) => {
    let maxDeduction
    let minDeduction
    const phaseStart = 23000
    const phaseEnd = 30000
    if (filingStatus === 'single' || filingStatus === 'separate') {
      maxDeduction = 2500
      minDeduction = 2000
    } 
    else if (filingStatus === 'married' || filingStatus === 'widow') {
      maxDeduction = 7500
      minDeduction = 4000
    } 
    else if (filingStatus === 'head') {
      maxDeduction = 3500
      minDeduction = 3000
    } 
    else {
      return 0
    }
    if (income <= phaseStart) { 
      return maxDeduction
    }
    else if (income >= phaseEnd) {
      return minDeduction
    }
    else {
      const deductionRange = maxDeduction - minDeduction
      const incomeOverStart = income - phaseStart
      const phaseoutRange = phaseEnd - phaseStart
      const reduction = (deductionRange * incomeOverStart) / phaseoutRange
      return maxDeduction - reduction
    }
  },
  arkansas: (income, filingStatus) => {
    if (filingStatus === 'married' || filingStatus === 'widow') {
      return 4400
    }
    else {  
      return 2200
    }
  },
  maryland: (income, filingStatus) => {
    let maxDeduction
    let minDeduction
    if (filingStatus === 'single' || filingStatus === 'separate') {
      maxDeduction = 2325
      minDeduction = 2300
    } 
    else if (filingStatus === 'married' || filingStatus === 'widow') {
      maxDeduction = 4650
      minDeduction = 4600
    } 
    else if (filingStatus === 'head') {
      maxDeduction = 3090
      minDeduction = 3450
    } 
    else {
      return 0
    }
    const reduction = 0.15 * Math.max(0, income - 100000)
    const adjustedDeduction = maxDeduction - reduction
    return Math.max(minDeduction, Math.min(adjustedDeduction, maxDeduction))
  },
  missouri: (income, filingStatus) => {
    if (income > 125000) {
      return 0
    }
    else if (filingStatus === 'single' || filingStatus === 'separate') {
      return 13850
    }
    else if (filingStatus === 'married' || filingStatus === 'widow') {
      return 27700
    }
    else if (filingStatus === 'head') {
      return 20800
    }
    else {
      return 0
    }
  },
  wisconsin: (income, filingStatus) => {
    let phaseoutStart
    let phaseoutEnd
    let maxDeduction
    let phaseoutRate
    if (filingStatus === 'married' || filingStatus === 'widow') {
      phaseoutStart = 28209
      phaseoutEnd = 155169
      maxDeduction = 25110
      phaseoutRate = 0.19778
    } 
    else if (filingStatus === 'single') {
      phaseoutStart = 15380
      phaseoutEnd = 89789
      maxDeduction = 17280
      phaseoutRate = 0.12
    } 
    else if (filingStatus === 'head') {
      phaseoutStart = 19890
      phaseoutEnd = 105579
      maxDeduction = 21760
      phaseoutRate = 0.15934
    } 
    else if (filingStatus === 'separate') {
      phaseoutStart = 14105
      phaseoutEnd = 77609
      maxDeduction = 16110
      phaseoutRate = 0.14448
    } 
    else {
      return 0
    }
    if (income <= phaseoutStart) {
      return maxDeduction
    }
    else if (income > phaseoutEnd) {
      return 0
    }
    else { 
      const reduction = phaseoutRate * (income - phaseoutStart)
      return Math.max(0, maxDeduction - reduction)
    }
  }
}

export { formulas }
