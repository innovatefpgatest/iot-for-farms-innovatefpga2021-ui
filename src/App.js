import React, {Suspense, lazy} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Loading from './Components/Loading'
import NotFound from './Components/NotFound'
import store from './redux/store'
import './App.less'

const SiderMenu = lazy(() => import(/* webpackChunkName: "home" */ /* webpackPrefetch: true */ './Components/SiderMenu'))
const AboutUs = lazy(() => import(/* webpackChunkName: "home" */ /* webpackPrefetch: true */ './Pages/AboutUs'))

const App = () => {
  return (
    <Provider store={store}>
      <SiderMenu>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading/>}>
                  <AboutUs/>
                </Suspense>
              }
            />
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </Router>
      </SiderMenu>
    </Provider>
  )
}

export default App
