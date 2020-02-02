import React from 'react'
import './App.css'
import Search from './Components/search'
import SearchEpisode from './Components/searchEpisode'
import Header from './Components/header'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App () {
  return (
    <Router>
      <Header />
      <div>
        <div>
          <nav>
            <div>
              <Link to='/characters' className='heading2'>Search</Link>
            </div>
            <div>
              <Link to='/episodes' className='heading2'>SearchEpisode</Link>
            </div>
          </nav>
        </div>
        <span>
          <Switch>
            <Route path='/characters'>
              <Search />
            </Route>
            <Route path='/episodes'>
              <SearchEpisode />
            </Route>
          </Switch>
        </span>
      </div>
    </Router>
  )
}

export default App
