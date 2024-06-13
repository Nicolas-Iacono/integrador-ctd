import { Search } from './Search'
import { SearchIconWrapper } from './SearchIconWrapper'
import { StyledInputBase } from './StyledInputBase'
import SearchIcon from '@mui/icons-material/Search'

export const InputFinder = ({
  value,
  setValue,
  onKeyUp,
  onKeyDown,
  inputRef
}) => {
  const handleKeyUp = (event) => {
    const keyCode = event.keyCode

    if (typeof onKeyUp === 'function') onKeyUp(keyCode)
  }

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode

    if (typeof onKeyDown === 'function') onKeyDown(keyCode)
  }

  const handleChange = (event) => {
    const value = event.target.value

    if (typeof setValue === 'function') setValue(value.trim())
  }

  return (
    <Search ref={inputRef}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Busca tu instrumento favorito..."
        inputProps={{ 'aria-label': 'búsqueda' }}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        value={value}
      />
    </Search>
  )
}