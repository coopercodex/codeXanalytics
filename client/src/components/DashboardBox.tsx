import { Box, styled } from "@mui/material"
import { Rnd } from "react-rnd"

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.3rem 0.15rem 0.1rem rgba(0,0,0, 0.8)",
  // resize: "both",
  // overflow: "auto",
}))

export default DashboardBox
