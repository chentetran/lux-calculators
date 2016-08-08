# Financial Calculators REST API Documentation

## Retirement Calculator
**POST** 
> /retirement

**Parameters (all numbers) (all required):**
*annualIncome*: Total annual income
*age*: Current age
*lifeExpectancy*: Age expected to live until (average life expectancy is ~80)
*ageOfRetirement*: Age expected to retire (average retirement age is between 60-70)
*inflation*: Inflation rate as a % (average inflation rate is 2%)
*wageIncrease*: Expected wage increase rate as a % (enter 0 if no expected increase)
*avgAnnualReturn*: Expected annual return from investment as a % (historical long-term returns average around 7%)

**Example:**
> https://lux-calculators.herokuapp.com/retirement?annualIncome=65000&age=27&lifeExpectancy=80&ageOfRetirement=67&inflation=2&wageIncrease=1&avgAnnualReturn=7

