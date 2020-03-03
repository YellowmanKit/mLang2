import React from 'react'

export default class Component extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
    this.update(props)
    if(this.init){ this.init(props.app, props) }
  }

  update(props){
    this.app = props.app
    this.store = props.app.store
    this.ui = props.app.store.ui
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.onChange){
      return prevState.onChange(nextProps, prevState)
    }
    return null
  }

  componentDidMount(){
    if(this.state.file && this.state.file.name && this.state.source === undefined){
      this.createSource(this.app, this.state)
    }
  }

  componentWillUnmount(){
    this.dead = true
    if(this.onUnmount){ this.onUnmount(this.state) }
  }

  async createSource({ media }, { file }){
    const source = await media.source(file)
    if(!this.dead){
      this.setState({ source })
    }
  }

  render(){
    this.update(this.props)
    return this.content(this.props.app, this.props)
  }

  horGap(widthScale){
    return this.gap(this.ui, { widthScale })
  }

  verGap(heightScale){
    return this.gap(this.ui, { heightScale })
  }

  gap({ window }, { widthScale, heightScale }){
    return <div style={{
      width: window.width * (widthScale? widthScale: 0),
      height: window.height * (heightScale?  heightScale: 0),
      flexShrink: 0
    }} key={this.key()}/>
  }

  horSep(heightScale){
    return this.sep(this.ui, { heightScale })
  }

  verSep(widthScale){
    return this.sep(this.ui, { widthScale })
  }

  sep({ color, window }, { widthScale, heightScale }){
    return <div style={{
      width: widthScale? window.width * widthScale: 1,
      height: heightScale? window.height * heightScale: 1,
      backgroundColor: color.grey[1],
      flexShrink: 0
    }} key={this.key()}/>
  }

  size(widthScale, heightScale, useWidth){
    return {
      width: (useWidth? this.ui.window.width: this.ui.window.height) * widthScale,
      height: this.ui.window.height * heightScale
    }
  }

  minSize(widthScale, heightScale, useWidth){
    return {
      minWidth: (useWidth? this.ui.window.width: this.ui.window.height) * widthScale,
      minHeight: this.ui.window.height * heightScale
    }
  }

  fontSize(scale){
    return { fontSize: this.ui.window.height * scale }
  }

  key(){ return Math.round(Math.random() * 10000000);  }

}
