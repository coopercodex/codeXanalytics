const baseUrl = "https://finnhub.io/api/v1"

export const searchSymbols = async (query:string) => {
  const url = `${baseUrl}/search?q=${query}&token=cipeob1r01qm3lighsd0cipeob1r01qm3lighsdg`  
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json()
}

export const fetchStockDetails = async (stockSymbol:string) => {
    const url = `${baseUrl}/stock/profile2?symbol=${stockSymbol}&token=cipeob1r01qm3lighsd0cipeob1r01qm3lighsdg` 
    const res = await fetch(url)
    if (!res.ok) {
      const message = `An error : ${res.status}`
      throw new Error(message);
      
    }
    return await res.json() 
}

export const fetchQuote = async (stockSymbol:string) => {
  const url = `${baseUrl}/quote?symbol=${stockSymbol}&token=cipeob1r01qm3lighsd0cipeob1r01qm3lighsdg` 
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json() 
}

export const fetchHistoricalData = async (stockSymbol: string,resolution: string, from: number, to: number) => {
  const url = `${baseUrl}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=cipeob1r01qm3lighsd0cipeob1r01qm3lighsdg` 
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json() 
}