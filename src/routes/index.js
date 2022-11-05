import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from 'pages/Home/Home'
import '../style.scss'
// import context variables
// import { useNavigation } from 'hook/Context/NavigationContext'

const Routes = () => {
  // context variables
  // const { navigation } = useNavigation()
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default Routes
