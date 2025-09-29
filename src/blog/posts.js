import dayjs from 'dayjs'

const posts = [
  {
    slug: "quarterly-taxes-101",
    title: "Quarterly Taxes 101: A Simple Guide for Freelancers and Solo Entrepreneurs",
    description: "Understanding your quarterly tax payments shouldn’t be overwhelming. Here’s a clear, no-jargon guide to help you stay compliant, avoid IRS penalties, and keep more of what you earn.",
    date: dayjs("2026-01-01")
  },
  {
    slug: "how-much-should-you-pay",
    title: "How Much Should You Pay in Quarterly Taxes? A Step-by-Step Calculator Walkthrough",
    description: "Not sure how much to set aside for quarterly taxes? Here’s a clear, step-by-step guide to estimate your payments accurately — without the stress or confusion.",
    date: dayjs("2026-01-12")
  },
  {
    slug: "avoiding-irs-penalties",
    title: "Avoiding IRS Penalties: What Happens If You Miss a Quarterly Tax Payment?",
    description: "Missed a quarterly tax payment or worried you might? Here’s what actually happens, how much it can cost you, and what you can do to avoid IRS penalties.",
    date: dayjs("2026-01-23")
  },
  {
    slug: "do-you-need-to-pay-quarterly-taxes",
    title: "Do You Need to Pay State Quarterly Taxes? A State-by-State Breakdown",
    description: "Many freelancers and solo entrepreneurs know about federal quarterly taxes — but what about state taxes? Here’s what you need to know, state by state.",
    date: dayjs("2026-02-01")
  },
  {
    slug: "top-tax-deductions",
    title: "Top Tax Deductions for Freelancers and Small Business Owners",
    description: "Want to save money on taxes? Here’s a simple guide to the most valuable deductions freelancers and small business owners can use to lower their tax bill.",
    date: dayjs("2026-02-11")
  },
  {
    slug: "how-to-calculate-quarterly-taxes",
    title: "How to Calculate Quarterly Taxes If You Earn from Multiple States or Sources",
    description: "Do you earn income from clients in different states or have multiple income streams? Here’s a simple guide to calculating your quarterly taxes accurately — without the headache.",
    date: dayjs("2026-02-22")
  },
  {
    slug: "when-are-quarterly-taxes-due",
    title: "When Are Quarterly Taxes Due? 2025–2026 IRS Quarterly Tax Deadlines",
    description: "Not sure when to pay your quarterly taxes? Here’s your clear, up-to-date guide to the IRS deadlines for 2025 and 2026 — so you never miss a payment.",
    date: dayjs("2026-03-05")
  },
  {
    slug: "the-easiest-way-to-calculate-and-pay",
    title: "The Easiest Way to Calculate and Pay Quarterly Taxes (Without Hiring an Accountant)",
    description: "Think you need an accountant to handle quarterly taxes? Think again. Here’s how freelancers and solo entrepreneurs can easily calculate and pay estimated taxes on their own.",
    date: dayjs("2026-03-13")
  },
  {
    slug: "what-are-estimated-taxes-and-who-has-to-pay-them",
    title: "What Are Estimated Taxes and Who Has to Pay Them?",
    description: "Estimated taxes can be confusing. Here’s a clear guide to who needs to pay them and why they matter.",
    date: dayjs("2026-03-21")
  },
  {
    slug: "do-i-have-to-pay-quarterly-taxes-if-im-a-freelancer",
    title: "Do I Have to Pay Quarterly Taxes If I’m a Freelancer?",
    description: "Freelancers often owe quarterly taxes — but how do you know if you’re one of them? This guide breaks it down.",
    date: dayjs("2026-03-30")
  },
  {
    slug: "a-beginners-guide-to-self-employment-tax",
    title: "A Beginner’s Guide to Self-Employment Tax",
    description: "Self-employment tax is different from income tax. Here’s what it is, how it works, and how to stay compliant.",
    date: dayjs("2026-04-07")
  },
  {
    slug: "how-to-calculate-quarterly-taxes-without-an-accountant",
    title: "How to Calculate Quarterly Taxes Without an Accountant",
    description: "Want to skip the accountant? Here’s how to accurately calculate your quarterly taxes on your own.",
    date: dayjs("2026-04-15")
  },
  {
    slug: "what-income-triggers-quarterly-taxes",
    title: "What Income Triggers Quarterly Taxes?",
    description: "Not sure what income triggers quarterly tax payments? This guide will help you determine if you need to pay.",
    date: dayjs("2026-04-26")
  },
  {
    slug: "what-is-form-1040-es-and-do-i-need-to-use-it",
    title: "What Is Form 1040-ES and Do I Need to Use It?",
    description: "Form 1040-ES is the IRS form for estimated taxes. Here’s how it works and whether you actually need it.",
    date: dayjs("2026-05-07")
  },
  {
    slug: "what-counts-as-income-for-quarterly-taxes",
    title: "What Counts as Income for Quarterly Taxes?",
    description: "Learn what types of income count toward quarterly taxes so you don’t get caught off guard by the IRS.",
    date: dayjs("2026-05-15")
  },
  {
    slug: "do-i-still-owe-quarterly-taxes-if-i-had-a-loss-this-quarter",
    title: "Do I Still Owe Quarterly Taxes If I Had a Loss This Quarter?",
    description: "Lost money this quarter? You may still need to file. Here’s what to do if you had a business loss.",
    date: dayjs("2026-05-26")
  },
  {
    slug: "quarterly-tax-deadline-what-you-need-to-know",
    title: "Quarterly Tax Deadline: What You Need to Know",
    description: "Here’s what every freelancer and business owner needs to know about upcoming quarterly tax deadlines.",
    date: dayjs("2026-06-05")
  },
  {
    slug: "how-to-catch-up-on-missed-quarterly-tax-payments",
    title: "How to Catch Up on Missed Quarterly Tax Payments",
    description: "Missed a quarterly tax payment? Don’t panic. Here’s how to catch up and minimize penalties.",
    date: dayjs("2026-06-14")
  },
  {
    slug: "how-to-start-the-year-right-with-quarterly-taxes",
    title: "How to Start the Year Right with Quarterly Taxes",
    description: "The new year is the best time to get on track with your taxes. Here’s how to start strong.",
    date: dayjs("2026-06-23")
  },
  {
    slug: "missed-a-quarterly-tax-deadline-heres-what-to-do-next",
    title: "Missed a Quarterly Tax Deadline? Here’s What To Do Next",
    description: "Missed the deadline? Here’s how to handle it, minimize penalties, and stay on track going forward.",
    date: dayjs("2026-07-04")
  },
  {
    slug: "how-to-avoid-a-penalty-when-youre-late-paying-quarterly-taxes",
    title: "How to Avoid a Penalty When You’re Late Paying Quarterly Taxes",
    description: "Late paying your quarterly taxes? Here’s how to avoid or reduce penalties — and fix it fast.",
    date: dayjs("2026-07-15")
  },
  {
    slug: "quarterly-taxes-for-consultants-a-simple-guide",
    title: "Quarterly Taxes for Consultants: A Simple Guide",
    description: "Consultants: here’s your no-jargon guide to managing quarterly tax payments with confidence.",
    date: dayjs("2026-07-23")
  },
  {
    slug: "side-hustle-to-full-time-when-to-start-paying-quarterly-taxes",
    title: "Side Hustle to Full-Time: When to Start Paying Quarterly Taxes",
    description: "Not sure when to start paying quarterly taxes for your side hustle? This guide will help.",
    date: dayjs("2026-08-01")
  },
  {
    slug: "quarterly-taxes-for-substack-writers-and-content-creators",
    title: "Quarterly Taxes for Substack Writers and Content Creators",
    description: "Substack writers and creators: here’s how to handle your quarterly tax payments simply.",
    date: dayjs("2026-08-09")
  },
  {
    slug: "how-to-handle-quarterly-taxes-if-you-sell-digital-products",
    title: "How to Handle Quarterly Taxes If You Sell Digital Products",
    description: "Selling digital products? Here’s what you need to know about estimated taxes and how to pay.",
    date: dayjs("2026-08-19")
  },
  {
    slug: "photographers-designers-and-other-creatives-your-quarterly-tax-cheat-sheet",
    title: "Photographers, Designers, and Other Creatives: Your Quarterly Tax Cheat Sheet",
    description: "Creative professionals: here’s a simple breakdown of what you owe and when — no stress.",
    date: dayjs("2026-08-28")
  },
  {
    slug: "quarterly-taxes-zenguider-vs-turbotax-vs-doing-it-yourself",
    title: "Quarterly Taxes: Zenguider vs. TurboTax vs. Doing It Yourself",
    description: "How does Zenguider stack up against other options? See the pros, cons, and best fit.",
    date: dayjs("2026-09-06")
  },
  {
    slug: "hiring-a-tax-pro-vs-using-a-quarterly-tax-app-whats-best-for-you",
    title: "Hiring a Tax Pro vs. Using a Quarterly Tax App — What’s Best for You?",
    description: "Trying to choose between hiring a pro or using a tool? Here’s a smart way to decide.",
    date: dayjs("2026-09-14")
  },
  {
    slug: "why-paying-too-much-in-quarterly-taxes-isnt-safer-its-costly",
    title: "Why Paying Too Much in Quarterly Taxes Isn’t Safer — It’s Costly",
    description: "Overpaying feels safe — but it might be costing you. Here’s how to pay just the right amount.",
    date: dayjs("2026-09-21")
  },
  {
    slug: "how-much-can-irs-penalties-actually-cost-you-real-examples",
    title: "How Much Can IRS Penalties Actually Cost You? Real Examples",
    description: "Wondering what IRS penalties actually cost? We’ve broken it down with real examples.",
    date: dayjs("2026-09-29")
  },
  {
    slug: "can-quickbooks-or-wave-handle-your-quarterly-taxes",
    title: "Can QuickBooks or Wave Handle Your Quarterly Taxes?",
    description: "Can tools like QuickBooks or Wave handle quarterly taxes? Here’s where they fall short.",
    date: dayjs("2026-10-07")
  },
  {
    slug: "how-zenguider-calculates-your-quarterly-tax-payments",
    title: "How Zenguider Calculates Your Quarterly Tax Payments",
    description: "Want to know how Zenguider calculates your payments? Here’s a peek behind the scenes.",
    date: dayjs("2026-10-18")
  },
  {
    slug: "5-features-that-make-zenguider-a-no-brainer-for-solo-entrepreneurs",
    title: "5 Features That Make Zenguider a No-Brainer for Solo Entrepreneurs",
    description: "From reminders to multistate support — here’s what makes Zenguider stand out.",
    date: dayjs("2026-10-29")
  },
  {
    slug: "why-a-quarterly-tax-app-is-the-best-insurance-against-irs-headaches",
    title: "Why a Quarterly Tax App Is the Best Insurance Against IRS Headaches",
    description: "IRS penalties are expensive. Here’s why Zenguider is a smart investment.",
    date: dayjs("2026-11-05")
  },
  {
    slug: "how-zenguider-helps-if-you-moved-to-a-new-state-mid-year",
    title: "How Zenguider Helps If You Moved to a New State Mid-Year",
    description: "Moved to a new state this year? Zenguider helps you pay the right taxes in each one.",
    date: dayjs("2026-11-15")
  },
  {
    slug: "can-zenguider-help-if-you-missed-a-prior-quarter-yes-heres-how",
    title: "Can Zenguider Help If You Missed a Prior Quarter? Yes — Here’s How",
    description: "Behind on your payments? Here’s how Zenguider helps you catch up — fast.",
    date: dayjs("2026-11-22")
  },
  {
    slug: "quarterly-taxes-are-broken-heres-how-were-fixing-them",
    title: "Quarterly Taxes Are Broken — Here’s How We’re Fixing Them",
    description: "The system is broken. Here’s why quarterly taxes are harder than they need to be — and how we’re fixing it.",
    date: dayjs("2026-12-01")
  },
  {
    slug: "why-solo-business-owners-shouldnt-have-to-be-tax-experts",
    title: "Why Solo Business Owners Shouldn’t Have to Be Tax Experts",
    description: "You run a business — not a tax office. Here’s why you shouldn’t have to be a tax expert too.",
    date: dayjs("2026-12-10")
  },
  {
    slug: "youre-not-lazy-quarterly-taxes-are-just-way-too-complicated",
    title: "You’re Not Lazy — Quarterly Taxes Are Just Way Too Complicated",
    description: "Quarterly taxes aren’t your fault — they’re just unnecessarily complex. We make it simple.",
    date: dayjs("2026-12-17")
  },
  {
    slug: "taxes-are-the-cost-of-freedom-but-they-shouldnt-be-a-full-time-job",
    title: "Taxes Are the Cost of Freedom — But They Shouldn’t Be a Full-Time Job",
    description: "Paying taxes is part of the job — but it shouldn’t take over your life. Here’s a better way.",
    date: dayjs("2026-12-24")
  }
]

export { posts }
