const baseUrl = "https://finnhub.io/api/v1"
const alphaUrl = "https://www.alphavantage.co"

export const searchSymbols = async (query:string) => {
  const url = `${baseUrl}/search?q=${query}&token=${import.meta.env.VITE_SECRET_KEY}`  
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json()
}

export const fetchStockDetails = async (stockSymbol:string) => {
    const url = `${baseUrl}/stock/profile2?symbol=${stockSymbol}&token=${import.meta.env.VITE_SECRET_KEY}` 
    const res = await fetch(url)
    if (!res.ok) {
      const message = `An error : ${res.status}`
      throw new Error(message);
      
    }
    return await res.json() 
}

export const fetchQuote = async (stockSymbol:string) => {
  const url = `${baseUrl}/quote?symbol=${stockSymbol}&token=${import.meta.env.VITE_SECRET_KEY}` 
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json() 
}

export const fetchHistoricalData = async (stockSymbol: string,resolution: string, from: number, to: number) => {
  const url = `${baseUrl}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${import.meta.env.VITE_SECRET_KEY}` 
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json() 
}

export const fetchBuySellData = async (stockSymbol: string) => {
  const url = `${baseUrl}/stock/recommendation?symbol=${stockSymbol}&token=${import.meta.env.VITE_SECRET_KEY}` 
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json() 
}

export const fetchMarketNews = async () => {
  const url = `${baseUrl}/news?category=forex&minId=10&token=${import.meta.env.VITE_SECRET_KEY}` 
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json() 
}

export const fetchStockList = async () => {
  const url =  `${alphaUrl}/query?function=TOP_GAINERS_LOSERS&apikey=${import.meta.env.VITE_STOCKLIST_KEY}`
  const res = await fetch(url)
  if (!res.ok) {
    const message = `An error : ${res.status}`
    throw new Error(message);
    
  }
  return await res.json() 
}