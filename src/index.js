import 'react-datepicker/dist/react-datepicker.css'
import 'styles/index'

import 'vendor/core-js'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from 'state/store'

import Auth from 'components/global/auth'
import LoginPage from 'components/pages/login/loginPage'
import App from 'components/global/app'
import ProjectsPage from 'components/pages/projects/projectsPage'
import ProjectPage from 'components/pages/project/projectPage'
import BoardPage from 'components/pages/board/boardPage'
import SettingsPage from 'components/pages/settings/settingsPage'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <span>
        <Route exact path="/login" component={LoginPage} />
        <Auth>
          <App>
            <Route exact path="/" component={ProjectsPage} />
            <Route path="/projects/:project_id" component={ProjectPage} />
            <Route path="/boards/:board_id" component={BoardPage} />
            <Route path="/settings" component={SettingsPage} />
          </App>
        </Auth>
      </span>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

