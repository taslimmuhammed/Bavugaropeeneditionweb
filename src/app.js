import React from 'react'
import Routes from './routes'

// context providers
import NavigationContextProvider from 'hook/Context/NavigationContext'
import { Web3Provider } from 'utils/Web3Provider'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
      <Web3Provider>
        <NavigationContextProvider>
          <Routes />
        </NavigationContextProvider>
        <Toaster />
      </Web3Provider>
  )
}

export default App
