import React from 'react'
import Basket from '../Basket'
import CardCell from '../cell/item/Card'

export default class Card extends Basket {

  cells({ cards }){
    return cards.map(card => {
      return this.card(this.app, { card })
    })
  }

  card({ store: { ui: { style } } },{ card }){
    return(
      <div style={{ ...style.flexColCC, ...this.size(0.15,0.225) }} key={card._id}>
        <CardCell app={this.app} card={card}/>
      </div>
    )
  }

}
