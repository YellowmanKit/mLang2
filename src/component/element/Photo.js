import React from 'react'
import Component from 'component/Component'

export default class Photo extends Component {

  content(){
    return this.photo(this.app, this.props)
  }

  photo({ button, store: { ui: { style, color } }, action: { main } }, { icon }){
    return(
      <div style={{...this.size(1,0.225,true), ...style.flexRowCC, backgroundColor: color.grey[0] }}>
        <div style={{...this.size(0.125,0.225), ...style.flexColCC }}>
          {false && button.photo({ background: require('res/image/button/image.png'), onPress: ()=>{ main.set('preset', true) } })}
        </div>
        {button.image({ icon, onPress: ()=>{ if(icon){ main.set('enlarger', icon) } } })}
        <div style={{...this.size(0.125,0.225), ...style.flexColCC, justifyContent: 'space-evenly' }}>
          {button.photo({ background: require('res/image/button/file.png'), onPress: ()=>{ this.onFileSelected(this.app) } })}
          {button.photo({ background: require('res/image/button/camera.png'), onPress: ()=>{ main.set('camera', true) } })}
        </div>
      </div>
    )
  }

  async onFileSelected({ func: { to }, action: { main, modal } }){
    var err, data
    //[err, data]= await to(DocumentPicker.pick({ type: 'image/*' }))
    if(data){ main.set('photo', data) }
  }

}
