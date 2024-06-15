import { createContext, useContext, useReducer, useMemo } from 'react'
import { actions } from './actions'

import alternative from '../../assets/alternative.svg'
import classic from '../../assets/classic.svg'
import ancestral from '../../assets/ancestral.svg'

import instrumentCase from '../../assets/instrumentCase.svg'
import support from '../../assets/support.svg'
import tuner from '../../assets/tuner.svg'
import microphone from '../../assets/microphone.svg'
import phoneHolder from '../../assets/phoneHolder.svg'

const initialState = {
  instruments: [],
  favorites: [],
  tematics: [
    { name: 'Alternativo', image: alternative },
    { name: 'Clásico', image: classic },
    { name: 'Ancestral', image: ancestral }
  ],
  characteristics: [
    { name: 'Estuche', image: instrumentCase, id: 'instrumentCase' },
    { name: 'Soporte', image: support, id: 'support' },
    { name: 'Afinador', image: tuner, id: 'tuner' },
    { name: 'Micrófono', image: microphone, id: 'microphone' },
    { name: 'Phone holder', image: phoneHolder, id: 'phoneHolder' }
  ],
  searchOptions: {
    found: undefined
  },
  categoryCreated: undefined,
  categoryUpdated: undefined
}

const ContextGlobal = createContext()

const appReducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_INSTRUMENTS:
      return { ...state, instruments: action.payload }
    case actions.FIND_INSTRUMENT:
      return {
        ...state,
        searchOptions: {
          found: action.payload.found
        }
      }
    case actions.CATEGORY_CREATED:
      return {
        ...state,
        categoryCreated: action.payload.created
      }
    case actions.CATEGORY_UPDATED:
      return {
        ...state,
        categoryUpdated: action.payload.updated
      }
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
