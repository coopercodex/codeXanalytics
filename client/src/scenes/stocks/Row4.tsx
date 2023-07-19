import React, { useEffect, useMemo, useState } from "react"
import DashboardBox from "../../components/DashboardBox"
import BoxHeader from "../../components/BoxHeader"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "@mui/material"
import { Box, Typography } from "@mui/material"
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid"

import { useGetTransactionsQuery } from "../../state/api"
import SearchBar from "../../components/SearchBar"
import {
  fetchBuySellData,
  fetchHistoricalData,
  fetchMarketNews,
  fetchQuote,
  fetchStockDetails,
  fetchStockList,
  searchSymbols,
} from "../../state/stock.api"
import Draggable from "react-draggable"
import { mockData } from "../../Mockdata"
import clsx from "clsx"


const mostActiveColumns: GridColDef[] = [
  {
    field: "ticker",
    headerName: "Ticker",
    cellClassName: "super-app-theme--cell",
    flex: 0.5,
  },
  {
    field: "price",
    headerName: "Value",
    flex: 0.65,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
  {
    field: "volume",
    headerName: "Volume",
    flex: 0.45,
  },
  {
    field: "change_amount",
    headerName: "Change",
    flex: 0.47,
    width: 140,
    cellClassName: (params: GridCellParams<any, string>) => {
      if (params.value == null) {
        return ""
      }

      return clsx("super-app", {
        negative: params.value < "0",
        positive: params.value > "0",
      })
    },
  },
  {
    field: "change_percentage",
    headerName: "Change %",
    flex: 0.47,
    cellClassName: (params: GridCellParams<any, string>) => {
      if (params.value == null) {
        return ""
      }

      return clsx("super-app", {
        negative: params.value < "0",
        positive: params.value > "0",
      })
    },
  },
]

const NewsColumns: GridColDef[] = [
  {
    field: "headline",
    headerName: "Headline",
    cellClassName: "super-app-theme--cell",
    flex: 1.3,
  },
  {
    field: "source",
    headerName: "News",
    flex: 0.2,
  },
  {
    field: "url",
    headerName: "Link",
    flex: 0.27,
    renderCell: (params: GridCellParams<any, string, string>) => (
      <a
        style={{ color: "inherit" }}
        href={params.value}
        target="_blank"
        rel="noreferrer"
      >
        {params.value}
      </a>
    ),
  },
  {
    field: "datetime",
    headerName: "Research",
    flex: 0.25,
    renderCell: (params: GridCellParams<any, any>) => {
      const milliseconds = Number(params.value) * 1000
      return new Date(milliseconds).toLocaleDateString()
    },
  },
]

type Props = {}

const Row4 = (props: Props) => {
  const { palette: palette } = useTheme()
  const { data: transactionData } = useGetTransactionsQuery()
  // const pieColors = [palette.primary[300], palette.tertiary[600]]
  const [stockData, setStockData] = useState({})
  const [searchData, setSearchData] = useState([])
  const [stockList, setStockList] = useState(mockData["most_actively_traded"])
  const [symbol, setSymbol] = useState("META")
  const [quote, setQuote] = useState({})
  const [filter, setFilter] = useState("1W")
  const [chartData, setChartData] = useState([])
  const [buySellData, setBuySellData] = useState([])
  const [news, setNews] = useState([])

  // SPLIT IN DIFF FILE  //
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
        date: unixTimestampToDate(data?.t[idx]),
        low: data?.l[idx].toFixed(2),
        high: data?.h[idx].toFixed(2),
      }
    })
  }

  const handleChange = async (event) => {
    event.preventDefault()
    setSymbol(event.target.value)
    const searchResults = await searchSymbols(event.target.value)
    const result = searchResults.result
    setSearchData(result)
  }

  useEffect(() => {
    const updateStockDetails = async () => {
      const result = await fetchStockDetails(symbol)
      setStockData(result)
    }
    const updateStockOverview = async () => {
      const result = await fetchQuote(symbol)
      setQuote(result)
    }
    const updateBuySellData = async () => {
      const result = await fetchBuySellData(symbol)
      setBuySellData(result.reverse())
    }
    const updateStockList = async () => {
      // const result = await fetchStockList()
      // setStockList(mockData)
    }
    const updateMarketNews = async () => {
      const result = await fetchMarketNews()
      setNews(result)
    }
    updateStockDetails()
    updateStockOverview()
    updateBuySellData()
    updateStockList()
    updateMarketNews()
  }, [symbol])

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
  console.log(chartData.length)

  return (
    <>
      <DashboardBox gridArea="a">
        <SearchBar
          handleChange={handleChange}
          setSymbol={setSymbol}
          searchData={searchData}
        />
        <BoxHeader
          title={stockData?.name}
          subtitle={`${stockData?.exchange}`}
          sideText={`${quote?.pc} ${stockData?.currency}`}
          change={quote?.d}
          color={`${
            quote?.d > "0" ? palette.primary[300] : palette.tertiary[600]
          }`}
          changePercent={`(${quote?.dp})%`}
        />

        <ResponsiveContainer width="100%">
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 14,
              right: 20,
              left: -7,
              bottom: 76,
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
      <Draggable>
        <DashboardBox gridArea="e">
          <BoxHeader
            title="Latest Global News"
            // sideText={`${transactionData?.length} products`}
          />
          {/* palette.primary[300] : palette.tertiary[600] */}
          <Box
            mt=".5rem"
            p="0 0 1rem"
            height="95%"
            sx={{
              "& .super-app-theme--cell": {
                color: palette.grey[300],
                fontWeight: "600",
              },
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none",
                fontWeight: "600",
                fontSize: ".9rem",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: palette.grey[500],
                border: "none",
                fontWeight: "600",
                fontSize: ".9rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `none !important`,
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]}!important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                borderRight: `1px solid ${palette.grey[300]}!important`,
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25}
              rowHeight={30}
              hideFooter={true}
              rows={news || []}
              columns={NewsColumns}
              getRowId={(row) => row.id}
            />
          </Box>
        </DashboardBox>
      </Draggable>
      <Draggable>
        <DashboardBox gridArea="c">
          <BoxHeader
            title="Most Actively Traded"
            sideText={`${news?.length} Results`}
          />
          <Box
            mt=".5rem"
            p="0 0 0.7rem"
            height="95%"
            sx={{
              "& .super-app-theme--cell": {
                color: palette.grey[300],
                fontWeight: "600",
                fontSize: ".88rem",
              },
              "& .super-app.negative": {
                color: palette.tertiary[600],
                fontWeight: "600",
                fontSize: ".85rem",
              },
              "& .super-app.positive": {
                color: palette.primary[300],
                fontWeight: "600",
                fontSize: ".85rem",
              },
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none",
                fontWeight: "600",
                fontSize: ".8rem",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: palette.grey[500],
                border: "none",
                fontWeight: "600",
                fontSize: ".85rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]}!important`,
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]}!important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                borderRight: `1px solid ${palette.grey[300]}!important`,
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25}
              rowHeight={55}
              hideFooter={true}
              rows={stockList || []}
              columns={mostActiveColumns}
              getRowId={(row) => row.volume}
            />
          </Box>
        </DashboardBox>
      </Draggable>
      {/* SPlIT HERE TO DIFF COMP  */}

      <DashboardBox gridArea="b">
        <BoxHeader
          title={`${stockData?.name} Daily Performance`}
          subtitle="Daily lows, highs, and value"
          // sideText={`${profitMargin}%`}
          color={palette.grey[300]}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            layout="vertical"
            width={500}
            height={400}
            data={chartData?.slice(240, chartData.length -1)}
            margin={{
              top: 20,
              right: 5,
              left: -0,
              bottom: 25,
            }}
          >
            <CartesianGrid stroke={palette.grey[900]} />
            <XAxis
              type="number"
              tickLine={false}
              domain={["dataMin", "dataMax"]}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              dataKey="date"
              type="category"
              axisLine={false}
              tickLine={false}
              // dot={false}
              style={{ fontSize: "10px" }}
            />
            {/* <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            /> */}
            <Tooltip />
            <Legend height={30} />
            <Line
              // activeDot={{ r: 1 }}
              dot={false}
              type="monotone"
              dataKey="low"
              stroke='#FF10F0'
              // fillOpacity={1}
              fill="url(#colorRevenue)"
            />
             <Line
             dot={false}
              type="monotone"
              dataKey="high"
              fill="url(#colorExpenses)"
              stroke={palette.primary[300]}
            />
            <Line
             dot={false}
              type="monotone"
              dataKey="value"
              fill="url(#colorExpenses)"
              stroke={palette.tertiary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <Draggable>
        <DashboardBox bgcolor="grey" gridArea="d">
          <BoxHeader
            title={`${stockData?.name || "Your"} Recommendation Trends`}
            subtitle="Suggested investment strategies"
            sideText=""
            color={palette.tertiary[600]}
          />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={buySellData}
              margin={{
                top: 18,
                right: 15,
                left: -15,
                bottom: 34,
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
              <XAxis dataKey="period" axisLine={false} />
              <YAxis />
              <Legend height={20} wrapperStyle={{ margin: "0 0px 3px 30px" }} />
              <Tooltip />
              {/* <Bar yAxisId="left" dataKey="sell" fill="url(#colorRevenue)" /> */}
              <Bar dataKey="sell" stackId="a" fill={palette.tertiary[600]} />
              <Bar dataKey="hold" stackId="a" fill={palette.grey[300]} />
              <Bar dataKey="buy" stackId="a" fill={palette.primary[300]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Draggable>
    </>
  )
}

export default Row4


