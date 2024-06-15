import * as React from 'react'
import * as ReactDOM from 'react-dom/client';
import {App} from './App'
import { SignState } from './context/windowSign';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store,persistor } from './store';
import './main.scss'

declare module '@mui/material/styles'
{
  interface Palette {
    main: Palette['primary'];
    main2: Palette['primary'];
  }
  

  interface PaletteOptions {
    main?: PaletteOptions['primary'];
    main2?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    main: true;
    main2: true;
  }
}
declare module '@mui/material/IconButton'{
  interface IconButtonPropsColorOverrides {
    main: true;
    main2: true;
  }
}
declare module '@mui/material/ButtonGroup'{
  interface ButtonGroupPropsColorOverrides {
    main: true;
    main2: true;
  }
}
declare module '@mui/material/Badge'{
  interface BadgePropsColorOverrides {
    main: true;
    main2: true;
  }
}
declare module '@mui/material/FormControl'{
  interface FormControlPropsColorOverrides {
    main: true;
    main2: true;
  }
}
declare module '@mui/material'{
  interface TextFieldPropsColorOverrides {
    main: true;
    main2: true;
  }
}
declare module '@mui/icons-material/ShoppingCart'{
  interface svgIconPropsColorOverrides {
    main: true;
    main2: true;
  }
}
declare module '@mui/material/Tabs'{
  interface TabsPropsColorOverrides {
    main: true;
    main2: true;
  }
}


const theme = createTheme({
  palette: {
    main: {
      main: '#ffee00',
    },
    main2: {
      main: '#ffae00',
    },
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SignState>
      <ThemeProvider  theme={theme}>
    <App />
    </ThemeProvider>
      </SignState>
    </PersistGate>
    </Provider>
  </React.StrictMode>
  
)
