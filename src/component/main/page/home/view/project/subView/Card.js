import React from 'react'
import SubView from '../../SubView'
import CardBasket from 'component/main/page/home/basket/item/Card'
import Filter from 'component/element/Filter'

export default class Card extends SubView {

  init({ func, action: { page, card }, store: { project: { viewingProject }, user: { user: { _id, type } }, page: { nav }, card: { filter } } }){
    if(func.isUserType(['teacher','student']) && !func.expired(viewingProject.endDate)){
      page.set('nav', { ...nav,
        right: {
          icon: require('res/image/button/add.png'),
          onPress: ()=>{ page.push('addCard') }
        }
      })
    }else{
      page.set('nav', { ...nav,
        right: null
      })
    }
  }

  subView({ func, store: { ui: { style }, card: { viewingCards } } }, {}, { cards, viewCards }){
    return(
      <div style={style.flexColCS}>
        {this.verGap(0.02)}
        <Filter app={this.app} cards={cards} viewCards={this.viewCards.bind(this)}/>
        <CardBasket app={this.app} tab={null} cards={viewingCards}/>
      </div>
    )
  }

}
