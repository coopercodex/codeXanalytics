import React, { useEffect, useMemo, useState } from "react"
import DashboardBox from "../../components/DashboardBox"
import BoxHeader from "../../components/BoxHeader"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "@mui/material"
import { Box, Typography } from "@mui/material"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"

import {
  // useGetKpisQuery,
  // useGetProductsQuery,
  useGetTransactionsQuery,
} from "../../state/api"
import SearchBar from "../../components/SearchBar"

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

type Props = {}

const Row4 = (props: Props) => {
  const { palette: palette } = useTheme()
  const { data: transactionData } = useGetTransactionsQuery()
  // const pieColors = [palette.primary[300], palette.tertiary[600]]
  const [stockData, setStockData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [stockName, setStockName] = useState("")
  const [symbol, setSymbol] = useState("")

    const handleChange = (event) => {
      event.preventDefault()
      setStockName(event.target.value)
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=${import.meta.env.VITE_SECRET_KEY}`
        )
        .then((res) => res.json())
        .then((data) => {
          console.log(data["bestMatches"])
          setSearchData(data["bestMatches"])
          // setSymbol(data["bestMatches"]["1. symbol"][0])
          // setTimeout(() =>  getStockData(), 1000);
         
        })
      }
      console.log(searchData)

      console.log(symbol)
    useEffect(() => {
      
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=${
          import.meta.env.VITE_SECRET_KEY
        }`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🚀 ~ file: Row4.tsx:82 ~ .then ~ data:", data)
          
          setStockData(data["Time Series (Daily)"])
        })
    
    },[stockName])

    const searchDetails = useMemo(() => {
      return (
        searchData &&
        Object.keys(searchData).map((stock) => {
          return {
            name: searchData[stock]["2. name"],
            symbol: searchData[stock]["1. symbol"]
          }
        })
      )
    }, [searchData])
    console.log("🚀 ~ file: Row4.tsx:109 ~ searchDetails ~ searchDetails:", searchDetails)
    
    

  const stockDetails = useMemo(() => {
    return (
      stockData &&
      Object.keys(stockData).map((stock) => {
        Number(stock)
        const [year, month, day] = stock.split("-")
        const date = new Date(stock)
        date.setMonth(+month - 1)
        let newestDay = date.toLocaleString("en-US", { month: "long" })
        return {
          date: `${newestDay} ${day}`,
          price: stockData[stock]["1. open"],
          high: stockData[stock]["2. high"],
          low: stockData[stock]["3. low"],
        }
      })
    )
  }, [stockData])

  const min = stockDetails?.reduce((a, b) => Math.min(a, b.low), Infinity)
  const max = stockDetails?.reduce((a, b) => Math.max(a, b.high), -Infinity)

  return (
    <>
      <DashboardBox gridArea="a">
        <SearchBar  setStockName={setStockName}  searchDetails={searchDetails} handleChange={handleChange} setSymbol={setSymbol} />
        <BoxHeader
          title={stockName}
          subtitle="Top line revenue, bottom line expenses"
          sideText=""
          color="none"
        />

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={stockDetails?.reverse()}
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
              {/* <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
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
              </linearGradient> */}
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              allowDataOverflow={true}
              axisLine={{ stroke: "0" }}
              domain={[min, max]}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={palette.primary[300]}
              dot={false}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Tooltip />
            {/* <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.tertiary[500]}
              dot={true}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            /> */}
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <Box bgcolor="grey" gridArea="b">
        b
      </Box>
      {/* <Box bgcolor="grey"gridArea="c"> */}

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Recent Orders"
          // sideText={`${transactionData?.length} products`}
        />
        <Box
          mt="1rem"
          p="0 0 0.5rem"
          height="90%"
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
      {/* </Box> */}
    </>
  )
}

export default Row4
