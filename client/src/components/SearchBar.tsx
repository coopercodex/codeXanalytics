import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import TextField from "@mui/material/TextField"
import { Autocomplete, Button } from "@mui/material"
import { useTheme } from "@mui/material"

type Props = {}

const SearchBar = ({
  setStockName,
  handleChange,
  searchDetails,
  setSymbol,
  searchData
}) => {
  const {palette: palette} = useTheme()
  return (
    <>
      <Autocomplete
      style={{color: `${palette.grey[400]}`,}}
      disablePortal
      onChange={(event, newInputValue) => {
        setSymbol(newInputValue)
        console.log("🚀 ~ file: SearchBar.tsx:23 ~ newInputValue:", newInputValue)
        
      }}
      id="combo-box-demo"
      // isOptionEqualToValue={searchData.map((option, value) => value === undefined || option?.symbol?.toString() === (value?.symbol ?? value)?.toString())}
      
      options={searchData?.map((n) => n.symbol)}
      renderInput={(params) => (
        <TextField {...params} label="" onChange={handleChange}  />
        )}
        sx={{ width: 200, height: 30, backgroundColor: palette.grey[500], margin: "auto",  }}
        noOptionsText={"No companies with that name found..."}
      />
    </>
  )
}

export default SearchBar
