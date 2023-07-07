import React from "react"
import DashboardBox from "../../components/DashboardBox"
import {  useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "../../state/api"

type Props = {}

const Row3 = (props: Props) => {
  const { data: kpiData } = useGetKpisQuery()
  const {data: transactionData} = useGetTransactionsQuery()
  const { data: productData } = useGetProductsQuery()

  // console.log("🚀 ~ file: Row3.tsx:9 ~ Row3 ~ transactionData:", transactionData)

  return (
    <>
      <DashboardBox gridArea="g"></DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>
      <DashboardBox gridArea="i"></DashboardBox>
      <DashboardBox gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3
