import axios from 'axios'
import { useEffect, useState } from 'react'

export const useGetFetch = (endpoint, initial) => {
  const [data, setData] = useState(initial)

  useEffect(() => {
    axios.get(endpoint).then((res) => setData(res.data))
  }, [endpoint])

  return [data]
}

export const postFetch = (endpoint, payload) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(endpoint, payload)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

  return promise
}

export const putFetch = (endpoint, payload) => {
  const promise = new Promise((resolve, reject) => {
    axios.put(endpoint, payload)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

  return promise
}
