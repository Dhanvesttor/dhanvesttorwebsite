<?php
// Generated from src/content/calculators.ts by php/dev/export-content.mjs. Edit the source and re-run.
return [
  'calculators' => [
    [
      'slug' => 'sip',
      'name' => 'SIP',
      'group' => 'Grow',
      'title' => 'SIP calculator',
      'blurb' => 'What a monthly amount grows into.',
      'description' => 'Free SIP calculator: see what a monthly mutual fund investment could grow to, with the amount invested and estimated gains year by year.',
      'explainer' => [
        'A systematic investment plan, or SIP, invests a fixed amount in a mutual fund every month. You buy more units when prices fall and fewer when they rise, so you never have to time the market.',
        'This calculator assumes each instalment goes in at the start of the month and grows at a steady yearly rate. Real returns vary year to year and can be negative; the shape of the curve is the point, not the final number.',
      ],
      'faqs' => [
        [
          'q' => 'What return should I assume?',
          'a' => 'For a diversified equity fund held ten years or more, many planners use 10% to 12%. For hybrid funds, 8% to 10%. For debt, 6% to 7%. Lower is safer for planning.',
        ],
        [
          'q' => 'Is the SIP amount fixed forever?',
          'a' => 'No. You can raise, pause or stop it anytime. Raising it each year is powerful; see the step-up SIP calculator.',
        ],
        [
          'q' => 'Does this include tax?',
          'a' => 'No. Gains on equity funds held over a year are taxed as long-term capital gains above the annual exemption.',
        ],
      ],
    ],
    [
      'slug' => 'step-up-sip',
      'name' => 'Step-up SIP',
      'group' => 'Grow',
      'title' => 'Step-up SIP calculator',
      'blurb' => 'Raise your SIP every year and see the difference.',
      'description' => 'Step-up SIP calculator: see how increasing your monthly SIP by a fixed percentage each year changes your final corpus.',
      'explainer' => [
        'A step-up SIP raises your monthly instalment by a set percentage each year, usually in line with your salary. It is the simplest way to stop your investing from falling behind your income.',
        'Compare the result with a flat SIP to see how much of the final value comes from the step-up alone.',
      ],
      'faqs' => [
        [
          'q' => 'Can I set a step-up with my fund house?',
          'a' => 'Most fund houses offer a \'top-up\' or \'step-up\' facility when you register the SIP. We set it up for you.',
        ],
        [
          'q' => 'What step-up percentage is sensible?',
          'a' => '5% to 10% a year is common. Match it to how your income actually grows.',
        ],
      ],
    ],
    [
      'slug' => 'lumpsum',
      'name' => 'Lumpsum',
      'group' => 'Grow',
      'title' => 'Lumpsum investment calculator',
      'blurb' => 'One-time investment growth.',
      'description' => 'Lumpsum calculator: estimate the future value of a one-time investment at a chosen rate of return.',
      'explainer' => [
        'A lumpsum is a single investment: a bonus, an inheritance, a maturing FD. It compounds from day one, but it also takes the full brunt of whatever the market does next.',
        'If you are nervous about investing a large amount at once into equity, look at the STP calculator, which phases it in.',
      ],
      'faqs' => [
        [
          'q' => 'Lumpsum or SIP?',
          'a' => 'Over long periods lumpsum investing often wins because more money is invested for longer. SIP wins on peace of mind. An STP is the middle path.',
        ],
      ],
    ],
    [
      'slug' => 'swp',
      'name' => 'SWP',
      'group' => 'Plan',
      'title' => 'SWP calculator',
      'blurb' => 'Monthly income from a corpus.',
      'description' => 'SWP calculator: see how long a corpus lasts with a fixed monthly withdrawal, and what remains at the end.',
      'explainer' => [
        'A systematic withdrawal plan, or SWP, pays you a fixed amount from a mutual fund every month while the rest stays invested. It is how many retirees turn a corpus into an income.',
        'The calculator shows whether the corpus lasts the period you choose. If it runs out, reduce the withdrawal, extend the corpus, or choose a lower-risk, steadier fund.',
      ],
      'faqs' => [
        [
          'q' => 'How is an SWP taxed?',
          'a' => 'Each withdrawal is part capital, part gain. Only the gain portion is taxed, which often makes an SWP more tax-efficient than FD interest.',
        ],
        [
          'q' => 'What is a safe withdrawal rate?',
          'a' => 'There is no universal number. For a 25 to 30 year retirement, starting below 4% to 5% of the corpus a year gives more room for bad years.',
        ],
      ],
    ],
    [
      'slug' => 'stp',
      'name' => 'STP',
      'group' => 'Plan',
      'title' => 'STP calculator',
      'blurb' => 'Move from debt to equity gradually.',
      'description' => 'STP calculator: model a systematic transfer from a debt fund into an equity fund over months.',
      'explainer' => [
        'A systematic transfer plan parks a lumpsum in a debt or liquid fund and moves a fixed amount into an equity fund every month. You earn debt returns on what is waiting and avoid investing everything at a market peak.',
      ],
      'faqs' => [
        [
          'q' => 'How long should an STP run?',
          'a' => 'Six to eighteen months is typical. Longer reduces timing risk but keeps more money in lower-returning debt.',
        ],
      ],
    ],
    [
      'slug' => 'goal',
      'name' => 'Goal planner',
      'group' => 'Plan',
      'title' => 'Goal planning calculator',
      'blurb' => 'Work back from a target.',
      'description' => 'Goal planner: find the monthly SIP or one-time investment needed to reach a financial goal, adjusted for inflation.',
      'explainer' => [
        'Start with what the goal costs today, how many years away it is, and how fast that cost is rising. The calculator inflates the target, subtracts what your existing savings will grow to, and tells you the monthly SIP that closes the gap.',
      ],
      'faqs' => [
        [
          'q' => 'What inflation should I use?',
          'a' => '6% for general goals. Higher for education (8% to 10%) and healthcare. Lower for goals priced in a stable currency.',
        ],
      ],
    ],
    [
      'slug' => 'retirement',
      'name' => 'Retirement',
      'group' => 'Plan',
      'title' => 'Retirement calculator',
      'blurb' => 'How much is enough.',
      'description' => 'Retirement calculator: estimate the corpus you need to retire and the monthly SIP to get there, with inflation and post-retirement returns.',
      'explainer' => [
        'Your retirement corpus has to pay expenses that keep rising with inflation, for as long as you live. This calculator inflates today\'s expenses to your retirement date, works out the corpus that can fund them until your chosen age, and tells you the monthly SIP to build it.',
        'It assumes a lower return after retirement, because most people rightly hold less equity then.',
      ],
      'faqs' => [
        [
          'q' => 'What life expectancy should I plan for?',
          'a' => 'Plan for longer than you expect. Many planners use 85 to 90. Women, on average, live longer than men and should plan accordingly.',
        ],
        [
          'q' => 'Should EPF and PPF count?',
          'a' => 'Yes. Add their current balances under savings so far.',
        ],
      ],
    ],
    [
      'slug' => 'child-education',
      'name' => 'Child education',
      'group' => 'Plan',
      'title' => 'Child education calculator',
      'blurb' => 'Fund the degree, not the guess.',
      'description' => 'Child education calculator: estimate the future cost of your child\'s higher education and the monthly SIP needed.',
      'explainer' => [
        'Education costs rise faster than general inflation. This calculator takes today\'s cost of the course, inflates it to the year your child starts, and works out the monthly SIP you need from now.',
      ],
      'faqs' => [
        [
          'q' => 'Should I use a children\'s fund?',
          'a' => 'Solution-oriented children\'s funds carry a five-year lock-in that can enforce discipline. A diversified equity SIP, moved to debt in the last three years, works just as well for most families.',
        ],
      ],
    ],
    [
      'slug' => 'cagr',
      'name' => 'CAGR',
      'group' => 'Understand',
      'title' => 'CAGR calculator',
      'blurb' => 'The yearly rate behind any growth.',
      'description' => 'CAGR calculator: find the compound annual growth rate between a starting and ending value.',
      'explainer' => [
        'Compound annual growth rate is the steady yearly rate that would take a starting value to an ending value over a period. It is the fairest way to compare investments held for different lengths of time.',
      ],
      'faqs' => [
        [
          'q' => 'CAGR or absolute return?',
          'a' => 'Absolute return ignores time. 50% over two years and 50% over ten are very different; CAGR shows that.',
        ],
      ],
    ],
    [
      'slug' => 'inflation',
      'name' => 'Inflation',
      'group' => 'Understand',
      'title' => 'Inflation calculator',
      'blurb' => 'What today\'s money will cost tomorrow.',
      'description' => 'Inflation calculator: see the future cost of today\'s expenses and how purchasing power erodes over time.',
      'explainer' => [
        'Inflation is the reason \'safe\' money is not always safe. At 6% inflation, prices roughly double every twelve years. This calculator shows the future cost of an amount and how much of today\'s goods your money will buy.',
      ],
      'faqs' => [
        [
          'q' => 'What is India\'s long-run inflation?',
          'a' => 'Consumer price inflation has averaged roughly 5% to 7% over the last two decades, with sharp swings. Personal inflation, especially for education and healthcare, is often higher.',
        ],
      ],
    ],
    [
      'slug' => 'pms-fee',
      'name' => 'PMS fee illustration',
      'group' => 'Understand',
      'title' => 'PMS fee illustration',
      'blurb' => 'See exactly what our fees cost.',
      'description' => 'PMS fee calculator: illustrate Dhanvesttor\'s fixed and performance fees with hurdle and high-water mark across good and bad years.',
      'explainer' => [
        'SEBI requires portfolio managers to show clients how fees work across scenarios. This illustration applies our structure: a 2% fixed fee charged monthly, and a 20% performance fee only on returns above a 10% hurdle, with a high-water mark so you never pay a performance fee twice on the same gains.',
        'Try a negative year, a flat year and a strong year to see how the fee behaves.',
      ],
      'faqs' => [
        [
          'q' => 'What is a high-water mark?',
          'a' => 'The highest value your portfolio has reached, after fees. A performance fee is charged only on gains above it, so after a fall you pay no performance fee until the portfolio has recovered and cleared the hurdle.',
        ],
        [
          'q' => 'Is the hurdle on gross or net returns?',
          'a' => 'On returns net of the fixed fee and expenses.',
        ],
        [
          'q' => 'Is there a fixed-fee-only option?',
          'a' => 'Speak to us. We explain why a variable fee aligns our incentive with yours.',
        ],
      ],
    ],
  ],
];
