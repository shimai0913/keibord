import { createTheme } from '@mui/material/styles'

export const screenWidth = window.innerWidth
export const screenHeight = window.innerHeight
// ボード横幅(px)
// export const bordWidth = screenWidth - 20
// ボード縦幅(px)
// export const bordHeight = screenHeight - 20
// バッジサイズ(px)
export const badgeSize = 60

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrast: '#000000'
    },
    secondary: {
      main: '#000000',
      contrast: '#ffffff'
    }
  }
})
