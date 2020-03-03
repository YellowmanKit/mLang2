import React from 'react'
import Component from 'component/Component'

export default class Nav extends Component {

  content(){
    return this.nav(this.app, this.state, this.props)
  }

  nav({ store: { ui: { style, color, window } } }, { empty }, { switchCard }){
    return(
      <div style={{ ...style.bar, flexWrap: 'wrap' }}>
        {this.button(this.app, { icon: require('res/image/button/arrow.png'), onPress: ()=>{ switchCard(this.app, -1) } })}
        {this.indicators(this.app)}
        {this.button(this.app, { icon: require('res/image/button/arrow_right.png'), onPress: ()=>{ switchCard(this.app, 1) } })}
      </div>
    )
  }

  indicators({ func, text, store: { ui: { style, color, window }, card: { viewingCard, viewingCards} } }){
    return(
      <div style={{ ...style.flexRowCC, width: window.width * 0.65, flexWrap: 'wrap'}}>
        {viewingCards.map(card => this.indicator(this.app, { card }) )}
        {this.horGap(0.01)}
        {false && text.small({ text: (func.indexOf(viewingCard, viewingCards) + 1) + '/' + viewingCards.length }, { color: color.grey[2], width: window.width * 0.1 })}
      </div>
    )
  }

  indicator({ store: { ui: { style, color } , card: { viewingCard } } }, { card }){
    const viewing = card._id === viewingCard._id
    return(
      <div key={card._id} style={{ ...style.flexColCC, ...style.border, ...this.size(0.02,0.03),
        borderWidth: 1, margin: 1,  backgroundColor: viewing? 'white':color.grey[0], opacity: viewing? 1:0.25}}>
        {card.grade === 'passed' && <img alt='' source={require('res/image/icon/tick_green.png')} style={{ ...this.size(0.0125,0.0125)}}/>}
        {card.grade === 'failed' && <img alt='' source={require('res/image/icon/cross_red.png')} style={{ ...this.size(0.0125,0.0125)}}/>}
        {card.grade === 'featured' && <img alt='' source={require('res/image/icon/star_yellow.png')} style={{ ...this.size(0.0125,0.0125)}}/>}
      </div>
    )
  }

  button({ button, store: { ui: { color } } }, { icon, onPress, left, right }){
    return button.touchableOpacity({ icon, onPress  },{
      view: { ...this.size(0.075,0.075) },
      icon: { ...this.size(0.05, 0.05) }
    })
  }

}
