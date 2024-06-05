import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { searchInstrumentsByName } from '../../../api/instruments'
import { ContrastInput } from './ContrastInput'
import { Code } from '../../../api/constants'
import { useAppStates } from '../../utils/global.context'
import { actions } from '../../utils/actions'

export const Finder = () => {
  const [searchPattern, setSearchPattern] = useState()
  const [isSearching, setIsSearching] = useState(false)
  const [data, code] = searchInstrumentsByName(searchPattern)
  const [found, setFound] = useState(false)
  const { dispatch } = useAppStates()

  useEffect(() => {
    if (isSearching) return

    setIsSearching(true)
  }, [searchPattern])

  useEffect(() => {
    if (code === Code.SUCCESS) {
      setFound(true)
    } else setFound(false)
  }, [data, code])

  const handleChange = (value) => {
    setSearchPattern(value)
    dispatch({ type: actions.FIND_INSTRUMENT, payload: value })
  }

  const handleSelected = (value) => {
    dispatch({ type: actions.FIND_INSTRUMENT, payload: value })
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
        width: '100%'
      }}
    >
      <ContrastInput
        label="Encuentra tu instrumento favorito"
        onChange={handleChange}
      />
      {found && (
        <Box sx={{ backgroundColor: 'white' }}>
          <List>
            {data.map((instrument, index) => (
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
