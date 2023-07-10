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
        <Typography variant="h3" fontSize="16px">
          code
          <Typography
            variant="h3"
            fontSize="16px"
            component="span"
            color="#FC9D0F"
          >
            X
          </Typography>
          analytics
        </Typography>
      </FlexBetween>

      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.grey[300] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.grey[300] } }}>
          <Link
            to="/stocks"
            onClick={() => setSelected("stocks")}
            style={{
              color: selected === "stocks" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Stocks
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar
