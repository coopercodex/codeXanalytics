import React, { useMemo } from "react"
import DashboardBox from "../../components/DashboardBox"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"

import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "../../state/api"
import BoxHeader from "../../components/BoxHeader"
import { useTheme } from "@emotion/react"
import { Box, Typography } from "@mui/material"
import { Cell, Pie, PieChart } from "recharts"
import FlexBetween from "../../components/FlexBetween"

type Props = {}

const Row3 = (props: Props) => {
  const { palette } = useTheme()
  const pieColors = [palette.primary[300], palette.tertiary[600]]
  const { data: kpiData } = useGetKpisQuery()
  const { data: transactionData } = useGetTransactionsQuery()
  const { data: productData } = useGetProductsQuery()

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.65,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.37,
      renderCell: (params: GridCellParams) =>
        `${(params.value as Array<string>).length}`,
    },
  ]

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            { name: key, value: value },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ]
        }
      )
    }
  }, [kpiData])

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} products`}
        />
        <Box
          mt="1rem"
          p="0 0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="-8%" />
        <FlexBetween mt="-0.55rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, index) => (
            <Box key={`${data[0].name}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  // cx={120}
                  // cy={200}
                  innerRadius={18}
                  outerRadius={34}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5" color={palette.grey[600]}>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary of Data" sideText="+7.8%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[300]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          The company has demonstrated strong financial performance, achieving
          consistent revenue growth and solid profitability over the past fiscal
          year. With a healthy balance sheet and efficient cost management, the
          company is well-positioned to capitalize on future opportunities and
          drive sustainable growth.
        </Typography>
      </DashboardBox>
    </>
  )
}

export default Row3
