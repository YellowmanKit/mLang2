import React from 'react'
import Component from 'component/Component'

import Entrance from './entrance/Entrance'
import Home from './home/Home'

export default class Page extends Component {

  init(app){
    this.state = {
      app,
      onChange: this.onChange
    }
  }

  onChange(nextProps, prevState){
    const prevStatus = prevState.app.store.main.status
    const nextStatus = nextProps.app.store.main.status
    if(prevStatus === 'entrance' && nextStatus === 'home'){
      const user = nextProps.app.store.user.user
      nextProps.app.save('id', user.id)
      nextProps.app.save('pw', user.pw)
      return { app: nextProps.app }
    }else if(prevStatus === 'home' && nextStatus === 'entrance'){
      return { app: nextProps.app }
    }
    return null
  }

  content(app){
    switch (this.store.main.status) {
      case 'entrance':
        return <Entrance app={app}/>
      case 'home':
        return <Home app={app}/>
      default:
        return null
    }
  }

}
