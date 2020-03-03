import React from 'react'
import Component from 'component/Component'

export default class View extends Component {

  content({ store: { ui: { style, color } } }){
    this.viewStyle = { ...this.size(1,1.25,true), ...style.flexColCS, backgroundColor: 'white' }
    return(
      <div style={{...this.size(1,0.95,true), backgroundColor: color.grey[0] }}>
        {this.view(this.app, this.state, this.props)}
      </div>
    )
  }

  viewCards({ func, action: { card }, store: { project: { viewingProject } } }, { cards, filter: { grade, author } }){
    card.set('filter', { grade, author })
    card.set('viewingCards', cards.filter(card => { return (card.grade === grade || grade === 'all') && ((card.author === author) || (author === undefined)) } ))
  }

  subViewBar({ button, store: { page, ui: { style } } },{ subViews }){
    return(
      <div style={{...this.size(1, 0.04, true), ...style.flexRowCC}}>
        {subViews.map(subView=>{
          if(subView.sep){ return this.horSep(0.03) }
          return button.subView(subView, page.subView === subView.key)
        })}
      </div>
    )
  }

  setLeaveButton({ action: { modal }, store: { page: { nav } }, action: { page } }){
    page.set('nav', { ...nav, right: {
      icon: require('res/image/button/exit.png'),
      onPress: ()=>{
        modal.confirm(['Confirm leave class?','確定離開班別?','确定离开班别?'],
        ()=>{ this.leave(this.app, this.state, this.props) },
        ()=>{ modal.off() })
      }
    }})
  }

  setSaveButton({ store: { page: { nav } }, action: { page } }){
    page.set('nav', { ...nav, right: {
      icon: require('res/image/button/save.png'),
      onPress: ()=>{ this.save(this.app, this.state, this.props) }
    }})
  }

  setEditButton({ store: { page: { nav } }, action: { page } }, onPress){
    page.set('nav', { ...nav,
      right: {
        icon: require('res/image/button/edit.png'),
        onPress: ()=>{
          this.setState({ edit: true })
          this.setSaveButton(this.app)
          if(onPress){ onPress() }
        }
      }
    })
  }

  updatePicked({ app: { store: { main: { photo } } } }, prevState){
    if(photo){ return { ...prevState, picked: photo } }
    return null
  }

}
