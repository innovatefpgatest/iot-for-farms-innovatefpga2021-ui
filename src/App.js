import React, {Suspense} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import store from './redux/store'
import './App.less'
import Loading from './Components/Loading'
import NotFound from './Components/NotFound'
import SiderMenu from './Components/SiderMenu'
import AboutUs from './Pages/AboutUs'
import NodesManagement from './Pages/NodesManagement'
import DataManagement from './Pages/DataManagement'
import CommandsManagement from './Pages/CommandsManagement'
import SlaveNodesManagement from './Pages/SlaveNodesManagement'
import LogIn from "./Pages/LogIn";

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <SiderMenu>
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loading/>}>
                  <LogIn/>
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading/>}>
                  <NodesManagement/>
                </Suspense>
              }
            />
            <Route
              path="/slave-nodes"
              element={
                <Suspense fallback={<Loading/>}>
                  <SlaveNodesManagement/>
                </Suspense>
              }
            />
            <Route
              path="/data"
              element={
                <Suspense fallback={<Loading/>}>
                  <DataManagement/>
                </Suspense>
              }
            />
            <Route
              path="/commands"
              element={
                <Suspense fallback={<Loading/>}>
                  <CommandsManagement/>
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Loading/>}>
                  <AboutUs/>
                </Suspense>
              }
            />
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </SiderMenu>
      </Router>
    </Provider>
  )
}

export default App
