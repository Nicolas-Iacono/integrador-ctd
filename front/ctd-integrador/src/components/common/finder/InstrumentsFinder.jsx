import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { searchInstrumentsByName } from '../../../api/instruments'
import { Code } from '../../../api/constants'
import { useAppStates } from '../../utils/global.context'
import { actions } from '../../utils/actions'
import { InputFinder } from './InputFinder'
import { DateRangeFinder } from './DateRangeFinder'
import { ButtonFinder } from './ButtonFinder'
import dayjs from 'dayjs'

export const Finder = () => {
  const [searchPattern, setSearchPattern] = useState()
  const [sendPattern, setSendPattern] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showSugests, setShowSugests] = useState(false)
  const [data, code] = searchInstrumentsByName(searchPattern)
  const [found, setFound] = useState(false)
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()

  const { dispatch } = useAppStates()

  useEffect(() => {
    if (sendPattern) {
      dispatch({ type: actions.FIND_INSTRUMENT, payload: searchPattern })
      setShowSugests(false)
      setSendPattern(false)
    }
  }, [sendPattern])

  useEffect(() => {
    if (isSearching) return

    setIsSearching(true)
  }, [searchPattern])

  useEffect(() => {
    if (code === Code.SUCCESS) {
      setFound(true)
      setShowSugests(true)
    } else setFound(false)
    setIsSearching(false)
  }, [data, code])

  const handleKeyUp = (keyCode) => {
    if (keyCode === 27) {
      setSearchPattern('')
      setSendPattern(true)
    }
  }

  const handleSelected = (value) => {
    setSearchPattern(value)
    setShowSugests(true)
  }

  const handleSubmitSearch = () => {
    setSendPattern(true)
  }

  return (
    <Box
      sx={{
        padding: '.5rem',
        display: {
          xs: 'none',
          md: 'flex'
        },
        flexDirection: 'column',
        justifyContent: { md: 'center' },
        alignItems: { md: 'center' },
        width: '100%'
      }}
    >
      <Box
        sx={{
          padding: '.5rem',
          display: {
            xs: 'none',
            md: 'flex'
          },
          flexDirection: 'row',
          justifyContent: { md: 'center' },
          alignItems: { md: 'center' },
          width: '100%'
        }}
      >
        <InputFinder
          label="Encuentra tu instrumento favorito"
          onKeyup={handleKeyUp}
          value={searchPattern}
          setValue={setSearchPattern}
        />
        <DateRangeFinder
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          minFromDateDefault={dayjs()}
          minToDateDefault={dayjs().add(1, 'day')}
        />
        <ButtonFinder variant="contained" onClick={handleSubmitSearch}>
          Buscar
        </ButtonFinder>
      </Box>
      {showSugests && found && (
        <Box
          sx={{
            backgroundColor: 'white',
            width: '60%',
            borderRadius: '5px',
            boxShadow: '5px 5px 10px rgba(0,0,0,0.5);'
          }}
        >
          <List>
            {data &&
              data.map((instrument, index) => (
                <ListItem
                  id={`instrument-name-${index}`}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSelected(instrument.name)}
                >
                  <ListItemText primary={instrument.name} />
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </Box>
  )
}
