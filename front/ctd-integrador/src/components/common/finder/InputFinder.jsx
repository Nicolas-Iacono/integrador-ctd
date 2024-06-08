import { Search } from './Search'
import { SearchIconWrapper } from './SearchIconWrapper'
import { StyledInputBase } from './StyledInputBase'
import SearchIcon from '@mui/icons-material/Search'

export const InputFinder = ({ value, setValue, onKeyup }) => {
  const handleKeyup = (event) => {
    const keyCode = event.keyCode

    if (typeof onKeyup === 'function') onKeyup(keyCode)
  }

  const handleChange = (event) => {
    const value = event.target.value

    if (typeof setValue === 'function') setValue(value)
  }

  return (
    <Search className="busqueda">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Busca tu instrumento favorito..."
        inputProps={{ 'aria-label': 'búsqueda' }}
        onChange={handleChange}
        onKeyUp={handleKeyup}
        value={value}
      />
    </Search>
  )
}
