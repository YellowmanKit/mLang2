import React from 'react'
import Cell from '../Cell'

export default class Card extends Cell {

  init({ func, action, store: { lang } }, { card: { icon, grade, langs, likeCount, comment, audioComment } }){
    this.state = {
      size: this.size(0.13,0.175),
      title: langs[0]? func.idToItem(langs[0], lang.langs).text: '',
      file: {
        name: icon,
        type: 'cardIcon'
      },
      badge: grade,
      like: likeCount,
      tag: true,
      hasComment: comment !== null && comment.length > 0,
      hasAudioComment: audioComment,
      onPress: ()=>{
        action.card.set('viewingCard', this.props.card)
        action.page.push('card')
      }
    }
  }

}
