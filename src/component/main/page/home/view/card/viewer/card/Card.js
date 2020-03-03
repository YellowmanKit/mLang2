import React from 'react'
import Component from 'component/Component'
import Lang from './Lang'
import Tag from './Tag'

export default class Card extends Component {

  init({ action, store: { user: { user }, page: { nav } } }, { card, setEditButton, grading, studentRead }){
    this.state = {
      file: {
        name: card.icon,
        type: 'cardIcon'
      }
    }
    if(!grading){
      if(card.author === user._id && (card.grade === 'notGraded' || user.type === 'teacher')){
        setEditButton(this.app, ()=>{ action.page.push('editCard') })
      }else{
        action.page.set('nav', { ...nav,  right: null } )
      }
    }
    if(user._id === card.author && card.grade !== 'notGraded' && !studentRead){
      action.card.read(card._id)
    }
  }

  content(){
    return this.card(this.app, this.state, this.props)
  }

  card({ func, button, action, store: { user: { user }, ui: { style, color }, lang } }, { source }, { card: { _id, langs, grade, likeCount, comment, audioComment } }){
    return(
      <div style={{ ...style.flexColCS, ...style.border, ...style.shadow, ...this.size(0.4,0.65), backgroundColor: 'white' }}>
        <div style={{ ...style.flexRowCC, ...this.size(0.4,0.4) }}>
          {button.image({ icon: source, onPress: ()=>{ action.main.set('enlarger', this.state.source) } },
          { ...this.size(0.399, 0.401), borderColor: color.grey[1] })}
        </div>
        <div style={{ ...style.flexRowCC, ...this.size(0.4,0.25) }}>
          <Lang app={this.app} langs={func.idsToItems(langs, lang.langs)}/>
        </div>
        {grade === 'featured' && button.heart({ text: '' + likeCount, onPress: ()=>{ action.card.like(_id, user._id) } })}
        {this.badge({ grade })}
        {this.info(this.app, this.props)}
        <Tag app={this.app} comment={comment} audioComment={audioComment} key={comment + audioComment}/>
      </div>
    )
  }

  info({ func, text, store: { ui: { style }, profile: { profiles } } }, { card: { createdAt, author }}){
    return(
      <div style={{ ...style.flexRowCS, ...this.size(0.35, 0.015), position: 'absolute', bottom: 0, left: 0 }}>
        {this.horGap(0.01)}
        {text.tiny({ text: func.userToProfile(author, profiles).name })}
        {this.horGap(0.02)}
        {text.tiny({ text: func.dateString(createdAt) })}
        {this.horGap(0.02)}
        {text.tiny({ text: func.timeString(createdAt) })}
      </div>
    )
  }

  badge({ grade }){
    return <img alt='' source={
      grade === 'failed'? require('res/image/badge/failed.png'):
      grade === 'passed'? require('res/image/badge/passed.png'):
      grade === 'featured'? require('res/image/badge/featured.png'): null}
      style={{ ...this.size(0.175,0.175), resizeMode: 'contain', position: 'absolute', top: -2, right: -2 }}/>
  }

}
