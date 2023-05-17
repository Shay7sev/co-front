import './App.scss'

import { RouterGurad } from './routes/guard'

function App() {
  const element = RouterGurad()
  return <>{element}</>
}

export default App
