import React from 'react'
import Component from 'component/Component'
import Comment from './Comment'

export default class Grader extends Component {

  init({}, { setSaveButton }){
    this.state = {
      commenting: false,
      audioCommenting: false
    }
    setSaveButton(this.app)
  }

  content(){
    return this.grader(this.app, this.state, this.props)
  }

  grader({ button, action: { card }, store: { ui: { style, color }, user: { user }, card: { viewingCard } } }, { commenting, audioCommenting }, { switchCard, mark }){
    const canGrade = viewingCard.author !== user._id
    return(
      <div style={{ ...this.size(0.975,0.125,true), ...style.flexColCC, opacity: canGrade? 1: 0.33 }} pointerEvents={canGrade?'auto': 'none'}>
        <Comment app={this.app} status={this.state} key={viewingCard.audioComment} mark={mark}/>
        <div style={{ ...style.bar, ...this.size(0.8,0.075,true) }}>
          {button.grade({
            icon: require('res/image/icon/tick_white.png'),
            onPress: ()=>{
              this.grade(this.app, this.props, { grade: 'passed' })
              switchCard(this.app, 1)
            }
          },{ view: { backgroundColor: color.green[0] }})}
          {button.grade({
            icon: require('res/image/icon/cross.png'),
            onPress: ()=>{
              this.grade(this.app, this.props, { grade: 'failed' })
              switchCard(this.app, 1)
            }
          },{ view: { backgroundColor: color.red[0] }, icon: { ...this.size(0.03,0.03) }})}
          {button.grade({
            icon: require('res/image/icon/star_white.png'),
            onPress: ()=>{
              this.grade(this.app, this.props, { grade: 'featured' })
              switchCard(this.app, 1)
            }
          },{ view: { backgroundColor: color.yellow[0] }})}
          {button.grade({
            icon: require('res/image/icon/comment_white.png'),
            onPress: ()=>{ this.setState({ commenting: !commenting, audioCommenting: false }) }
          },{ view: { backgroundColor: color.grey[2] }})}
          {button.grade({
            icon: require('res/image/icon/audio_comment_white.png'),
            onPress: ()=>{ this.setState({ commenting: false, audioCommenting: !audioCommenting }) }
          },{ view: { backgroundColor: color.grey[3] }})}
        </div>
      </div>
    )
  }

  grade({ action: { card, page, modal }, store: { card: { viewingCard }, page: { nav } } }, { mark, save }, { grade }){
    viewingCard.grade = grade
    mark(viewingCard)
    page.set('nav', { ...nav,
      left: {
        icon: require('res/image/button/back_arrow.png'),
        onPress: ()=>{
          modal.confirm(['Save changes before leaving?','離開前儲存更改?','离开前储存更改?'], ()=>{
            save(this.app)
         }, ()=>{
           modal.off()
           page.pull()
         }) }
      }
    })
  }

}
