import React from 'react'
import Component from 'component/Component'

import Page from './page/Page'
//import Camera from './mask/Camera'
//import Preset from './mask/Preset'
//import Enlarger from './mask/Enlarger'
//import Recorder from './mask/Recorder'
import Modal from './mask/Modal'

export default class Main extends Component {

  init({ action }){
    action.main.set('status', 'entrance')
    action.ui.set('window', { width: window.innerWidth, height: window.innerHeight } )
  }

  content(app){
    return this.main(app)
  }

  main({ store: { ui: { window, style } } }){
    return(
      <div style={{...window, ...style.flexColCC, overflow: 'hidden' }}>
        <Page app={this.app}/>
        <Modal app={this.app}/>
      </div>
    )
  }

  /*
  <Camera app={this.app}/>
  <Preset app={this.app}/>
  <Enlarger app={this.app}/>
  <Recorder app={this.app}/>
  */

}
