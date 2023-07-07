import React, { useMemo } from "react"
import DashboardBox from "../../components/DashboardBox"
import { useGetKpisQuery, useGetProductsQuery } from "../../state/api"
import BoxHeader from "../../components/BoxHeader"
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"
import { useTheme } from "@emotion/react"
import FlexBetween from "../../components/FlexBetween"
import { Box, Typography } from "@mui/material"

type Props = {}
const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group A", value: 400 },
]

const Row2 = (props: Props) => {
  const { palette } = useTheme()
  const pieColors = [palette.primary[500], palette.tertiary[500]]
  const { data: productData } = useGetProductsQuery()
  const { data: operationalData } = useGetKpisQuery()

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          }
        }
      )
    )
  }, [operationalData])

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        }
      })
    )
  }, [productData])
  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational Vs Non-Operational Cost"
          subtitle="Top line profit, bottom line revenue"
          sideText="+5.5%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            // width={500}
            // height={400}
            data={operationalExpenses}
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
              orientation="left"
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
            {/* <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} /> */}
            <Line
              yAxisId="left"
              activeDot={{ r: 6 }}
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+6%" />
        <FlexBetween mt="0.2rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            // onMouseEnter={}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              // cx={120}
              // cy={200}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="25%" textAlign="center">
            <Typography variant="h5" color={palette.primary[300]}>
              Target Sales
            </Typography>
            <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
              72
            </Typography>
            <Typography variant="h6" m="0.3rem 0">
              Financial goals of the campaign
            </Typography>
          </Box>
          <Box flexBasis="25%">
            <Typography variant="h5" mt="0.4rem" color={palette.primary[300]}>
              Profit Margins
            </Typography>
            <Typography variant="h6">Profit Margins are up 23%</Typography>
            <Typography variant="h5" color={palette.tertiary[500]}>
              Losses in Revenue
            </Typography>
            <Typography variant="h6">Losses are down 15%</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
          data={productExpenseData}
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid storke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v) => `$${v}`}
            />
            <Scatter
              name="Product Expense Ratio"
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2
