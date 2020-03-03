import React from 'react'
import Component from 'component/Component'
import Audio from 'component/element/Audio'

export default class Comment extends Component {

  init({ store: { card: { viewingCard } }}){
    this.state = {
      file: {
        name: viewingCard.audioComment,
        type: 'commentAudio'
      }
    }
  }

  content(){
    return this.comment(this.app, this.state, this.props)
  }

  comment({ func, input, action: { card }, store: { ui: { style, color }, card: { viewingCard } } }, { source }, { status: { commenting, audioCommenting }, mark }){
    return(
      <div style={{ ...style.bar, ...this.size(0.675,0.0475,true), opacity: (commenting || audioCommenting)? 1: 0.25  }}>
        {commenting && input.shortText({
          value: viewingCard.comment,
          placeholder: func.multiLang('Enter your comment', '請輸入評語', '请输入评语'),
          onChangeText: text => {
            viewingCard.comment = text
            card.set('viewingCard', viewingCard)
            mark(viewingCard)
          }
        })}
        {audioCommenting &&  <Audio id={viewingCard._id + '_audioComment'} app={this.app} source={source}
        canDelete={viewingCard.audioComment || viewingCard.path || false}
        onDelete={()=>{
          viewingCard.audioComment = ''
          card.set('viewingCard', viewingCard)
          mark(viewingCard)
        }}
        onRecord={path=>{
          viewingCard.audioComment = { path }
          card.set('viewingCard', viewingCard)
          mark(viewingCard)
        }}/>}
      </div>
    )
  }

}
