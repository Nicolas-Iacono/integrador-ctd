import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetch = (endpoint, initial) => {
  const [data, setData] = useState(initial)

  useEffect(() => {
    axios.get(endpoint).then((res) => setData(res.data))
  }, [endpoint])

  return [data]
}
