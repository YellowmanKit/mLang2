import React from 'react'
import Component from 'component/Component'

export default class Editor extends Component {

  content(){
    return this.editor(this.app, this.state, this.props)
  }

  editor({ button, store: { ui: { style, color }, user: { user }, studentProject: { viewingStudentProject } } }){
    const canEdit = viewingStudentProject && (user.type === 'teacher' || user._id === viewingStudentProject.student)
    return(
      <div style={{ ...this.size(0.975,0.125,true), ...style.flexColCE, opacity: canEdit? 1: 0.33 }} pointerEvents={canEdit?'auto': 'none'}>
        <div style={{ ...style.bar, ...this.size(0.35,0.075,true) }}>
          {button.grade({
            icon: require('res/image/icon/swipe_left.png'),
            onPress: ()=>{ this.swipe(this.app, { delta: -1 }) }
          },{ view: { backgroundColor: color.grey[2] }})}
          {button.grade({
            icon: require('res/image/icon/swipe_right.png'),
            onPress: ()=>{ this.swipe(this.app, { delta: 1 }) }
          },{ view: { backgroundColor: color.grey[3] }})}
        </div>
      </div>
    )
  }

  swipe({ func, action, store: { studentProject: { viewingStudentProject }, card: { viewingCard } } },{ delta }){

  }

}
