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
       sx={{
        "& .MuiAutocomplete-inputRoot": {
          color: "grey",
          "&.Mui-focused .MuiInputLabel-outlined": {
            color: "grey"
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
          },
          "&.Mui-focused .MuiButtonBase-root": {
            color: "grey"
          },
          ".MuiSvgIcon-root": {
            color: "grey"
          }
        },
        width: 200,
        margin: "auto"
      }}
      disablePortal
      onChange={(event, newInputValue) => {
        setSymbol(newInputValue)
        console.log("🚀 ~ file: SearchBar.tsx:23 ~ newInputValue:", newInputValue)
      }}
      id="combo-box-demo"
      options={searchData?.map((n) => n.symbol)}
      renderInput={(params) => (
        <TextField {...params} label="" onChange={handleChange}  />
        )}
        noOptionsText={"No companies with that name found..."}
      />
    </>
  )
}

export default SearchBar
