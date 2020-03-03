import React from 'react'
import Component from 'component/Component'
import Nyan from 'component/element/Nyan'

export default class Notice extends Component {

  content({ store: { page: { view } } }){
    if(view !== 'index'){ return null }
    return this.notices(this.app)
  }

  notices({ func, button, action, store: { toggle: { notice }, notice: { notices }, ui: { window: { width, height }, style, color } } }){
    return(
      <div style={{ ...style.flexColEE, position: 'absolute', bottom: height * 0.03, right: width * 0.01  }}>
        {notice && notices.map(notice => this.notice(this.app, notice) )}
        {!notice && func.undeadCount(notices) > 0 && button.notice({ text: func.undeadCount(notices), onPress: ()=>{ action.toggle.set('notice', !notice) } })}
        <Nyan app={this.app} status={(notice && func.undeadCount(notices) > 0)? 'sniff': func.randomNyan(['sit','ennui','fly','tail','lick','relax','sleep','stretch'])}
        onPress={()=>{ action.toggle.set('notice', !notice) }}/>
      </div>
    )
  }

  notice({ func, button }, { english, chinese, simplifiedChinese, onPress, _id, dead }){
    if(dead){ return null }
    return button.notice({ text: func.multiLang(english, chinese, simplifiedChinese), onPress, key: _id })
  }

}
