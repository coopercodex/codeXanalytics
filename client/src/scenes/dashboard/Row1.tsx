import React, { useMemo } from "react"
import DashboardBox from "../../components/DashboardBox"
import { useGetKpisQuery } from "../../state/api"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { useTheme } from "@mui/material"
import BoxHeader from "../../components/BoxHeader"

const Row1 = () => {
  const { palette } = useTheme()
  const { data } = useGetKpisQuery()

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  }, [data])

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        // console.log(revenue[9])
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  }, [data])

  const pctChange = revenue
    ? (
        ((revenue[10].revenue - revenue[11].revenue) / revenue[10].revenue) *
        100
      ).toFixed(2)
    : null

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        }
      })
    )
  }, [data])

  const getR = (): number => {
    let rx = revenueProfit?.reduce<number>((acc, n) => {
      acc += n.revenue
      return acc
    }, 0)
    return rx!
  }

  const getP = (): number => {
    let px = revenueProfit?.reduce<number>((acc, n) => {
      acc += Number(n.profit)
        return acc
    }, 0)
    return px!
  }
  const profitMargin = ((100 * getP()) / getR()).toFixed(2)

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line revenue, bottom line expenses"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 20,
              left: -5,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="1 15" />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={{ stroke: "0" }}
              domain={[8000, 23000]}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary[300]}
              dot={true}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.tertiary[500]}
              dot={true}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Top line profit, bottom line revenue"
          sideText={`${profitMargin}%`}
          color={palette.grey[300]}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
            <Line
              yAxisId="left"
              activeDot={{ r: 6 }}
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              fill="url(#colorRevenue)"
              stroke={palette.primary[300]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle=" graph representing revenue month by month"
          sideText={`-${pctChange}%`}
          color={palette.tertiary[600]}
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 20,
              right: 15,
              left: -5,
              bottom: 55,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" axisLine={false} />
            <YAxis yAxisId="left" orientation="left" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row1
