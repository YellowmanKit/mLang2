import React from 'react'
import Component from 'component/Component'

export default class Filter extends Component {

  content(){
    return this.filter(this.app, this.props)
  }

  filter({ func, text, action: { card }, store: { ui: { style, color }, card: { filter } } }, { viewCards, cards }){
    return(
      <div style={{ ...style.bar, ...this.size(0.75,0.03,true)}}>
        {text.small({ text: func.multiLang('All','全部','全部'), onPress: ()=>{
          viewCards(this.app, { cards, filter: { grade: 'all', author: filter.author } })
        } },
        { color: filter.grade === 'all'? 'black': color.grey[1], padding: 2 })}
        {text.small({ text: func.multiLang('Featured','精選','精选'), onPress: ()=>{
          viewCards(this.app, { cards, filter: { grade: 'featured', author: filter.author } })
        } },
        { color: filter.grade === 'featured'? 'black': color.grey[1], padding: 2 })}
        {text.small({ text: func.multiLang('Passed','及格','及格'), onPress: ()=>{
          viewCards(this.app, { cards, filter: { grade: 'passed', author: filter.author } })
        } },
        { color: filter.grade === 'passed'? 'black': color.grey[1], padding: 2 })}
        {text.small({ text: func.multiLang('Failed','不及格','不及格'), onPress: ()=>{
          viewCards(this.app, { cards, filter: { grade: 'failed', author: filter.author } })
        } },
        { color: filter.grade === 'failed'? 'black': color.grey[1], padding: 2 })}
        {text.small({ text: func.multiLang('Not Graded','未評級','未评级'), onPress: ()=>{
          viewCards(this.app, { cards, filter: { grade: 'notGraded', author: filter.author } })
        } },
        { color: filter.grade === 'notGraded'? 'black': color.grey[1], padding: 2 })}
      </div>
    )
  }

}
