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
import {
  fetchHistoricalData,
  fetchQuote,
  fetchStockDetails,
  searchSymbols,
} from "../../state/stock.api"

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
  const [stockData, setStockData] = useState({})
  const [searchData, setSearchData] = useState([])
  const [stockName, setStockName] = useState("")
  const [symbol, setSymbol] = useState("FB")
  const [quote, setQuote] = useState({})

  const [filter, setFilter] = useState("1W")
  const [chartData, setChartData] = useState([])

  // conveting timestamps
  const dateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000)
  }

  const unixTimestampToDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000
    return new Date(milliseconds).toLocaleDateString()
  }

  const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days + 7 * weeks)
    newDate.setMonth(newDate.getMonth() + months)
    newDate.setFullYear(newDate.getFullYear() + years)
    return newDate
  }
  const chartConfig = {
    "1D": { days: 1, weeks: 0, months: 0, years: 0, resolution: "1" },
    "1W": { days: 0, weeks: 1, months: 0, years: 0, resolution: "15" },
    "1M": { days: 0, weeks: 0, months: 1, years: 0, resolution: "60" },
    "1Y": { days: 0, weeks: 0, months: 0, years: 1, resolution: "D" },
  }
  const formatData = (data) => {
    return data.c.map((stock, idx) => {
      return {
        value: stock.toFixed(2),
        date: unixTimestampToDate(data.t[idx]),
      }
    })
  }

  const handleChange = async (event) => {
    event.preventDefault()
    setSymbol(event.target.value)
    // fetch(
    //   `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=${import.meta.env.VITE_SECRET_KEY}`
    //   )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data["bestMatches"])
    //     setSearchData(data["bestMatches"])
    // setSymbol(data["bestMatches"]["1. symbol"][0])
    // setTimeout(() =>  getStockData(), 1000);

    const searchResults = await searchSymbols(event.target.value)
    const result = searchResults.result
    setSearchData(result)
    // })
  }
  console.log(searchData)

  console.log(symbol)
  useEffect(() => {
    const updateStockDetails = async () => {
      // fetch(
      //   `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=${import.meta.env.VITE_SECRET_KEY}`
      //   )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data["bestMatches"])
      //     setSearchData(data["bestMatches"])
      // setSymbol(data["bestMatches"]["1. symbol"][0])
      // setTimeout(() =>  getStockData(), 1000);
      const result = await fetchStockDetails(symbol)
      setStockData(result)
      console.log("🚀 ~ file: Row4.tsx:99 ~ //.then ~ setStockData:", stockData)
    }

    const updateStockOverview = async () => {
      const result = await fetchQuote(symbol)
      setQuote(result)
    }

    updateStockDetails()
    updateStockOverview()
  }, [symbol])
  console.log(quote)

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter]

      const endDate = new Date()
      const startDate = createDate(endDate, -days, -weeks, -months, -years)

      const startTimeStampUnix = dateToUnixTimestamp(startDate)
      const endTimeStampUnix = dateToUnixTimestamp(endDate)
      return { startTimeStampUnix, endTimeStampUnix }
    }
    const updateChartData = async () => {
      const { startTimeStampUnix, endTimeStampUnix } = getDateRange()
      const resolution = chartConfig[filter].resolution
      const result = await fetchHistoricalData(
        symbol,
        resolution,
        startTimeStampUnix,
        endTimeStampUnix
      )
      setChartData(formatData(result))
    }
    updateChartData()
  }, [symbol, filter])

  // fetch(
  // console.log("🚀 ~ file: Row4.tsx:115 ~ useEffect ~ stockName:", stockName)
  //   `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=${
  //     import.meta.env.VITE_SECRET_KEY
  //   }`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("🚀 ~ file: Row4.tsx:82 ~ .then ~ data:", data)

  //     setStockData(data["Time Series (Daily)"])
  //   })

  // },[stockName])

  // const searchDetails = useMemo(() => {
  //   return (
  //     searchData &&
  //     Object.keys(searchData).map((stock) => {
  //       return {
  //         name: searchData[stock]["2. name"],
  //         symbol: searchData[stock]["1. symbol"]
  //       }
  //     })
  //   )
  // }, [searchData])
  // console.log("🚀 ~ file: Row4.tsx:109 ~ searchDetails ~ searchDetails:", searchDetails)

  // const stockDetails = useMemo(() => {
  //   return (
  //     stockData &&
  //     Object.keys(stockData).map((stock) => {
  //       Number(stock)
  //       const [year, month, day] = stock.split("-")
  //       const date = new Date(stock)
  //       date.setMonth(+month - 1)
  //       let newestDay = date.toLocaleString("en-US", { month: "long" })
  //       return {
  //         date: `${newestDay} ${day}`,
  //         price: stockData[stock]["1. open"],
  //         high: stockData[stock]["2. high"],
  //         low: stockData[stock]["3. low"],
  //       }
  //     })
  //   )
  // }, [stockData])

  // const min = stockDetails?.reduce((a, b) => Math.min(a, b.low), Infinity)
  // const max = stockDetails?.reduce((a, b) => Math.max(a, b.high), -Infinity)

  return (
    <>
      <DashboardBox gridArea="a">
        <SearchBar
          // searchDetails={searchDetails}
          handleChange={handleChange}
          setSymbol={setSymbol}
          searchData={searchData}
        />
        <BoxHeader
          title={stockData?.name}
          subtitle={`${stockData?.exchange}`}
          sideText={`${quote?.pc} ${stockData?.currency}`}
          change={quote?.d}
          color={`${quote?.d > "0" ? "green" : "red"}`}
          changePercent={`(${quote?.dp})`}
          // color="red"
        />

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={chartData}
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
              domain={["dataMin", "dataMax"]}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Area
              type="monotone"
              dataKey="value"
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
