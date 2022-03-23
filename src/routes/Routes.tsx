import * as React from 'react'
import { Switch } from 'react-router'
import Layouts from '../layouts/Layouts'
import Pages from '../pages'
import Login from '../pages/Login/Login'

function Routes() {
    return (
        <div>
          <Switch>
              {/* <Login/> */}
                {/* <Layouts> */}
                    <Pages />
                {/* </Layouts> */}
            </Switch>
        </div>
    )
}

export default Routes
