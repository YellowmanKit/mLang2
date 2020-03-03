import React from 'react'
import View from '../View'
import CardBasket from 'component/main/page/home/basket/item/Card'
import Filter from 'component/element/Filter'

export default class Student extends View {

  init({ func, action: { page }, store: { card: { cards, filter }, studentProject: { viewingStudentProject } } }){
    page.set('nav', {
      title: ['STUDENT','學生','学生'],
    })
    this.viewCards(this.app, { cards: func.idsToItems(viewingStudentProject.cards, cards), filter })
  }

  view({ func, button, store: { studentProject: { viewingStudentProject }, profile: { viewingProfile }, card: { cards, viewingCards }, ui: { style } } }){
    const cardsPool = func.idsToItems(viewingStudentProject.cards, cards)
    return(
      <div style={style.flexColCS}>
        {button.tab({ text: viewingProfile.name })}
        {this.verGap(0.02)}
        <Filter app={this.app} cards={cardsPool} viewCards={this.viewCards.bind(this)}/>
        <CardBasket app={this.app} tab={null} cards={viewingCards}/>
      </div>
    )
  }

}
