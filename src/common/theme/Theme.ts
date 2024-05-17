import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#66347F',
        },
        secondary: {
            main: '#9E4784',
        },
    },
    typography: {
        // eslint-disable-next-line quotes
        fontFamily: "'DM Sans', sans-serif;",
        h1: {
            fontWeight: 700,
            fontSize: '3.2rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '3rem',
        },
        h3: {
            fontWeight: 500,
            fontSize: '2.5rem',
        },
        h4: {
            fontWeight: 400,
            fontSize: '2rem',
        },
        button: {
            textTransform: 'none',
        }
    }
})

export default theme