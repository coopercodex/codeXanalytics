import { useTheme } from "@emotion/react"
import { Box, Typography } from "@mui/material"
import FlexBetween from "../FlexBetween"
import { useState } from "react"
import { BubbleChart } from "@mui/icons-material"
import { Link } from "react-router-dom"

type Props = {}

const Navbar = (props: Props) => {
  const { palette } = useTheme()
  const [selected, setSelected] = useState("dashboard")

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="0.50rem">
        <BubbleChart sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          codeXanalytics
        </Typography>
      </FlexBetween>

      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          ></Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          ></Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar
