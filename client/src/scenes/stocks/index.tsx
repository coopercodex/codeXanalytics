import { Box, useMediaQuery } from "@mui/material"
import Row4 from "./Row4"
import Row5 from "./Row5"
import React from "react"

const gridTemplateLargeScreens = `
"a b c"
"a b c"
"d b c"
"d b c"
"e e c"
"e e c"
`

const gridTemplateSmallScreens = `
"a"
"a"
"a"
"a"
"b"
"b"
"b"
"b"

"c"
"c"
"c"
"d"
"d"
"d"
"d"
"e"
"e"
"e"
`

const Stocks = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(6, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridTemplateAreas: gridTemplateSmallScreens,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <Row4 />
      <Row5 />
    </Box>
  )
}
export default Stocks
