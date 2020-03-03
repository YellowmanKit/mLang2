import React from 'react'
import Component from 'component/Component'
import Audio from 'component/element/Audio'

export default class Tag extends Component {

  init({}, { comment, audioComment }){
    if(audioComment){
      this.state = {
        file: {
          name: audioComment,
          type: 'audioComment'
        }
      }
    }
  }

  content(){
    return this.tagArea(this.app, this.state, this.props)
  }

  tagArea({ button, action: { main }, store: { ui: { style } } }, { source }, { comment, audioComment }){
    return(
      <div style={{ ...this.size(0.03,0.06), ...style.flexColCE, position: 'absolute', bottom: 0, right: 0 }}>
        {button.touchableOpacity({
          background: require('res/image/icon/comment.png'),
          onPress: ()=>{ if(comment.length > 0){ main.set('enlarger', { text: comment }) } },
          disabled: comment.length === 0 },
        { view: { ...this.size(0.03, 0.03) } })}
        <Audio app={this.app} source={source} isAudioComment={true} hasAudioComment={audioComment}/>
      </div>
    )
  }

}
