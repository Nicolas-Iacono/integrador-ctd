import { styled } from '@mui/material/styles'
import { PickersActionBar } from '@mui/x-date-pickers/PickersActionBar'

const CustomPickersActionBar = styled(PickersActionBar)(({ theme }) => ({
  padding: '1rem',
  button: {
    color: theme.palette.secondary.main
  }
}))

export const BookingPickersActionBar = (props) => {
  const {
    actions,
    className,
    onAccept,
    onCancel,
    onClear,
    onSetToday,
    ownerState
  } = props

  return (
    <CustomPickersActionBar
      actions={actions}
      className={className}
      onAccept={onAccept}
      onCancel={onCancel}
      onClear={onClear}
      onSetToday={onSetToday}
      ownerState={ownerState}
    />
  )
}
