import { ScreenModal } from '../common/ScreenModal'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'

export const MessageDialog = ({
  title,
  message,
  isOpen,
  buttonText,
  onClose
}) => {
  return (
    <ScreenModal isOpen={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {buttonText}
        </Button>
      </DialogActions>
    </ScreenModal>
  )
}
