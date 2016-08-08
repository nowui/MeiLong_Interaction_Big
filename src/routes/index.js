import React, { PropTypes } from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import NotFound from '../components/NotFound'
import Main from '../components/Main'
import Index from '../components/Index'
import Component0Index from '../components/0/Index'
import Component00Index from '../components/0/0/Index'
import Component01Index from '../components/0/1/Index'
import Component02Index from '../components/0/2/Index'
import Component1Index from '../components/1/Index'
import Component1Detail from '../components/1/Detail'
import Component2Index from '../components/2/Index'
import Component20Index from '../components/2/0/Index'
import Component21Index from '../components/2/1/Index'
import Component22Index from '../components/2/2/Index'
import Component3Index from '../components/3/Index'
import Component30Index from '../components/3/0/Index'
import Component31Index from '../components/3/1/Index'
import Component32Index from '../components/3/2/Index'
import Component4Index from '../components/4/Index'
import Component4Detail from '../components/4/Detail'

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/">
    	<IndexRedirect to="index" />
    	<Route component={Main}>
        <Route path="index" component={Index}></Route>
        <Route path="0/index" component={Component0Index}></Route>
        <Route path="0/0/index" component={Component00Index}></Route>
        <Route path="0/1/index" component={Component01Index}></Route>
        <Route path="0/2/index" component={Component02Index}></Route>
        <Route path="1/index" component={Component1Index}></Route>
        <Route path="1/detail/:id" component={Component1Detail}></Route>
        <Route path="2/index" component={Component2Index}></Route>
        <Route path="2/0/index" component={Component20Index}></Route>
        <Route path="2/1/index" component={Component21Index}></Route>
        <Route path="2/2/index" component={Component22Index}></Route>
        <Route path="3/index" component={Component3Index}></Route>
        <Route path="3/0/index" component={Component30Index}></Route>
        <Route path="3/1/index" component={Component31Index}></Route>
        <Route path="3/2/index" component={Component32Index}></Route>
        <Route path="4/index" component={Component4Index}></Route>
        <Route path="4/detail/:id" component={Component4Detail}></Route>
    	</Route>
	    <Route path="*" component={NotFound}></Route>
    </Route>
  </Router>

Routes.propTypes = {
  history: PropTypes.any,
}

export default Routes
