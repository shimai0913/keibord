import React from 'react'
import styled from 'styled-components'
import Alert from '@mui/material/Alert'
const ErrAlert = styled(Alert)`
  max-width: 300px;
  float: right;
  margin-bottom: 1rem;
  margin: 1rem auto;
`
const EnterRoomDialogErr = (props) => {
  const { inputErrFlag, notApplicableFlag, closeRoomFlag } = props
  return (
    <>
      {inputErrFlag &&
        <ErrAlert variant="outlined" severity="error">
          半角数字で入力してください
        </ErrAlert>
      }
      {notApplicableFlag &&
      <ErrAlert variant="outlined" severity="error">
        ルームが存在しません。
      </ErrAlert>
      }
      {closeRoomFlag &&
        <ErrAlert variant="outlined" severity="error">
          ルームが閉まっています。
        </ErrAlert>
      }
    </>
  )
}
export default EnterRoomDialogErr
