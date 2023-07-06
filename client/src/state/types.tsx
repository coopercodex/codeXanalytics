export interface ExpensesByCategory {
  salaries: number
  services: number
  supplies: number
}

export interface Month {
  id: string
  _id: string
  expenses: number
  month: string
  nonOperationalExpenses: number
  operationalExpenses: number
  revenue: number
}

export interface Day {
  id: string
  _id: string
  expenses: number
  date: string
  revenue: number
}

export interface GetKpisResponse {
  _id: string
  id: string
  __v: number
  totalProfit: number
  totalRevenue: number
  totalExpenses: number
  expensesByCategory: ExpensesByCategory
  monthlyData: Array<Month>
  dailyData: Array<Day>
}
