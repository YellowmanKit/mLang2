import React from 'react'
import Component from 'component/Component'
import Login from './view/item/Login'
import Acquire from './view/item/Acquire'
import Retrieve from './view/item/Retrieve'

export default class Entrance extends Component {

  init(){
    this.state = { status: 'login' }
  }

  content(app){
    return this.entrance(app, this.ui)
  }

  entrance(app, { style, window }){
    return(
      <div style={{...window, ...style.flexColCC,
        backgroundImage: 'url(' + require('res/image/background.png') + ')',
        backgroundSize: '20% 20%'}}>
        {this.view(app, status=>{ this.setState({ status }) })}
      </div>
    )

  }

  view(app, set){
    switch (this.state.status) {
      case 'login':
        return <Login app={app} set={set}/>
      case 'acquire':
        return <Acquire app={app} set={set}/>
      case 'retrieve':
        return <Retrieve app={app} set={set}/>
      default:
        return null
    }
  }


}
