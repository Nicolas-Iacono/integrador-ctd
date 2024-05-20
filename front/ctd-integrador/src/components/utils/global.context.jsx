import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react'
import { actions } from './actions'

const initialState = {
  instruments: [],
  favorites: [],
  tematics: [
    { name: 'Alternativo', image: '/src/assets/alternative.svg' },
    { name: 'Clásico', image: '/src/assets/classic.svg' },
    { name: 'Ancestral', image: '/src/assets/ancestral.svg' },
  ],
}

const ContextGlobal = createContext()

const appReducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_INSTRUMENTS:
      return { ...state, instruments: action.payload }
    default:
      return state
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const data = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <ContextGlobal.Provider value={data}>{children}</ContextGlobal.Provider>
  )
}

export const useAppStates = () => useContext(ContextGlobal)
