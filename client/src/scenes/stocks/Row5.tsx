import React from "react"
import DashboardBox from "../../components/DashboardBox"
import BoxHeader from "../../components/BoxHeader"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "@mui/material"
import { Box } from "@mui/material"
import Draggable from "react-draggable"

type Props = {}

const Row5 = (props: Props) => {
  const { palette } = useTheme()
  return (
    <>
      {/* <Draggable>
        <DashboardBox gridArea="d">
          <BoxHeader
            title="Operational Vs Non-Operational Cost"
            subtitle="Top line profit, bottom line revenue"
          />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              // width={500}
              // height={400}
              // data={operationalExpenses}
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
              {/* <Line
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
                fill="url(#colorRevenue)"
                stroke={palette.primary[300]}
              />
            </LineChart> */}
          {/* </ResponsiveContainer>
        </DashboardBox>
      </Draggable> */} 

      {/* <Draggable>
        <Box bgcolor="grey" gridArea="b">
          e
        </Box>
      </Draggable> */}
      {/* <Draggable>
        <Box bgcolor="grey" gridArea="f">
          f
        </Box>
      </Draggable> */}
    </>
  )
}

export default Row5
