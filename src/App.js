import {BrowserRouter, Route, Switch} from 'react-router-dom'

import WinningPage from './components/WinningPage'
import GameLoss from './components/GameLoss'

import './App.css'
import ColorGame from './components/ColorGame'

import LogIn from './components/LogIn'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route exact path="/ColorGame" component={ColorGame} />
      <Route path="/winning-page" component={WinningPage} />
      <Route path="/game-loss" component={GameLoss} />
    </Switch>
  </BrowserRouter>
)

export default App
