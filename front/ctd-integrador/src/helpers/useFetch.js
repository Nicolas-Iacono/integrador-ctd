import axios from 'axios'
import { useEffect, useState } from 'react'
import { Code } from '../api/constants'

export const useGetFetch = (endpoint, initial) => {
  const [data, setData] = useState(initial)
  const [code, setCode] = useState()

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setCode(Code.SUCCESS)
        setData(res.data)
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          setCode(Code.NOT_FOUND)
        } else {
          setCode(Code.SERVER_ERROR)
        }
        setData(initial)
      })
  }, [endpoint])

  return [data, code]
}

export const postFetch = (endpoint, payload) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .post(endpoint, payload)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

  return promise
}

export const putFetch = (endpoint, payload) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .put(endpoint, payload)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

  return promise
}

export const deleteFetch = (endpoint, payload) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .delete(endpoint, { data: payload })
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })

  return promise
}
