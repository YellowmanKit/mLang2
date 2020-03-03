import React from 'react'
import Application from './Application'

import actions from './redux/actions'
import { connect } from 'react-redux'

import Main from 'component/main/Main'

import Input from './component/native/prefab/Input'
import Button from './component/native/prefab/Button'
import Text from './component/native/prefab/Text'

import Alert from './utility/Alert'
import Function from './utility/Function'
import Media from './utility/Media'

class App extends Application {

  constructor(props){
    super(props)
    this.state = {
      save: this.save,
      load: this.load,
      write: this.write.bind(this),
      read: this.read.bind(this),
      path: 'FileSystem.CachesDirectoryPath',
      media: new Media({
        url: this.url.bind(this),
        fileExist: this.fileExist.bind(this),
        path: 'FileSystem.CachesDirectoryPath',
        fetchBlob: this.fetchBlob.bind(this),
        write: this.write.bind(this),
        read: this.read.bind(this)
      })
    }
  }

  render(){
    return this.main(this.props)
  }

  main({ store, action }){
    const props = {
      app: { store, action, func: new Function({ app: { store }}) }
    }
    return(
      <Main app={{
        ...this.state, ...props.app,
        input: new Input(props),
        button: new Button(props),
        text: new Text(props),
        alert: new Alert(props)
      }}/>
    )
  }

}

export default connect(store => { return { store } }, dispatch => { return actions(dispatch) })(App)
