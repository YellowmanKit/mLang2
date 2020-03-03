import React from 'react'
import { api, to } from './redux/redux'
import { set, get } from 'idb-keyval';

export default class Application extends React.Component {

  async fileExist(name){
    /*var err, res
    [err, res] = await to(FileSystem.readDir(this.state.path))
    if(err){ return false }
    for(var i=0;i<res.length;i++){
      if(res[i].name === name){
        //console.log(name + ' exist locally')
        return true
      }
    }
    //console.log(name + ' not exist locally')*/
    return false
  }

  url({ name, type }){
    const url = api() + '/download/' + type + '/' + name
    return url
  }

  async fetchBlob(file){
    var err, res
    //[err, res] = await to(FetchBlob.config({ fileCache: true }).fetch('GET', this.url(file)))
    //if(err){ console.log(err); return false }
    return res
  }

  async write({ name, data, encode }){
    var err, res
    //[err, res] = await to(FileSystem.writeFile(this.state.path + '/' + name, data, encode))
    //if(err){ console.log(err); return false }
    return res
  }

  async read({ name, encode }){
    var err, res
    //[err, res] = await to(FileSystem.readFile(this.state.path + '/' + name, encode))
    //if(err){ console.log(err); return false }
    return res
  }

  save(key, value){ set(key, value) }

  load(key){ return get(key) }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  updateWindowDimensions() {
    this.props.action.ui.set('window', { width: window.innerWidth, height: window.innerHeight })
  }

}
