import React from 'react'
import View from '../../View'
import Card from './card/Card'
import Nav from './item/Nav'
import Grader from './item/Grader'
import Editor from './item/Editor'

export default class Viewer extends View {

  init({ action: { page }, store: { page: { trace }, user: { user: { type } }, card: { viewingCard } } }){
    page.set('nav', {
      title: ['CARD','卡片','卡片'],
    })
    this.state = {
      canSwitch: true,
      marked: {},
      mark: card => {
        var marked = this.state.marked
        marked[card._id] = true
        this.setState({ marked })
      }
    }
  }

  view({ func, text, store: { user: { user }, ui: { style, color }, card: { viewingCard }, toggle: { grading } } }, { source, mark }){
    return(
      <div style={{ ...this.viewStyle, ...style.flexColCS, backgroundColor: 'transparent' }}>
        <div style={{ ...style.flexColCC, ...this.size(1,0.1,true)}}>
          <Nav app={this.app} switchCard={this.switchCard.bind(this)}/>
        </div>
        <Card app={this.app} grading={grading} card={viewingCard} key={viewingCard._id + grading} setEditButton={this.setEditButton.bind(this)}/>
        <div style={{ ...style.flexColCS, ...this.size(1,0.17,true) }}>
          <div style={{ ...style.flexRowCC, ...this.size(1,0.0425,true)}}>
            {user.type === 'teacher' && this.statusBar(this.app)}
          </div>
          {grading && <Grader app={this.app} mark={mark} setSaveButton={this.setSaveButton.bind(this)} save={this.save.bind(this)}
            switchCard={this.switchCard.bind(this)} source={source}/>}
          {false && !grading && <Editor app={this.app}/>}
        </div>
      </div>
    )
  }

  statusBar({ func, text, action: { toggle }, store: { ui: { style, color }, toggle: { grading } } }){
    return(
      <div style={{ ...style.bar, ...this.size(0.4,0.025,true) }}>
        {text.small({ text: func.multiLang('Editing','修改','修改'), onPress: ()=>{ toggle.set('grading', false) } },
        { color: !grading? 'black': color.grey[1], padding: 2 })}
        {text.small({ text: func.multiLang('Grading','評核','评核'), onPress: ()=>{ toggle.set('grading', true) } },
        { color: grading? 'black': color.grey[1], padding: 2 })}
      </div>
    )
  }

  switchCard({ func, action: { card }, store: { card: { viewingCard, viewingCards } } }, delta){
    if(this.state.canSwitch){
      const index = func.clamp(func.indexOf(viewingCard, viewingCards) + delta, 0, viewingCards.length - 1)
      card.set('viewingCard', viewingCards[index])
      this.setState({ canSwitch: false })
      setTimeout(()=>{ this.setState({ canSwitch: true })}, 500)
    }
  }

  save({ func, action: { card }, store: { card: { cards } } }){
    const markedCards = func.idsToItems(Object.keys(this.state.marked), cards)
    if(markedCards.length === 0){ return }
    card.grade({ cards: markedCards })
  }

}
