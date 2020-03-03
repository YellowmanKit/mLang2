import React from 'react'
import Row from '../Row'

export default class Ranking extends Row {

  init({ func, action, store: { card: { cards } } }, { index, ranking: { studentProject, profile, featured } }){
    const rankingCards = func.idsToItems(studentProject.cards, cards).filter(card => card.grade === 'featured')
    this.state = {
      size: this.size(1,0.1, true),
      title: profile.name,
      file: {
        name: profile.icon,
        type: 'profileIcon'
      },
      onPress: ()=>{
        if(featured > 0){
          action.card.set('viewingCards', rankingCards)
          action.card.set('viewingCard', rankingCards[0])
          action.page.push('card')
        }
      }
    }
  }

  custom({ func, text, store: { ui: { style } } }, { index, ranking: { featured } }){
    return(
      <div style={{...this.size(0.6,0.05, true), ...style.flexRowCC }}>
        {text.moderate({ text: '# ' + (index + 1) })}
        {this.horGap(0.04)}
        <img alt='' source={require('res/image/icon/star.png')} style={{...this.size(0.03,0.03)}}/>
        {this.horGap(0.02)}
        {text.moderate({ text: '' + featured })}
        {this.horGap(0.02)}
      </div>
    )
  }

}
