import React from 'react'
import Native from '../Native'

export default class Button extends Native{

  heart(option){
    return this.touchableOpacity({ ...option, background: require('res/image/icon/heart.png') }, {
      view: { ...this.size(0.04,0.04), position: 'absolute', top: 0, left: 0 },
      text: { ...this.fontSize(0.015), color: 'white', fontWeight: 'bold', textAlign: 'center' }
    })
  }

  grade(option, style){
    return this.touchableOpacity(option, {
      view: { ...this.size(0.06,0.06), borderRadius: 5, ...style.view },
      icon: { ...this.size(0.04,0.04), ...style.icon }
    })
  }

  audio(option, style){
    return this.touchableOpacity(option, {
      view: { ...this.size(0.03,0.03) },
      icon: { ...this.size(0.03,0.03), ...style? style.icon: {} }
    })
  }

  audioComment(option){
    return this.audio({ ...option, icon: require('res/image/icon/audio_comment.png') })
  }

  cross(option){
    return this.audio({ ...option, icon: require('res/image/button/cross_black.png') }, { icon: { ...this.size(0.025,0.025) } })
  }

  file(option){
    return this.audio({ ...option, icon: require('res/image/button/file_black.png') })
  }

  record(option){
    return this.audio({ ...option, icon: require('res/image/button/recorder.png') })
  }

  stop(option){
    return this.audio({ ...option, icon: require('res/image/button/stop.png') })
  }

  play(option){
    return this.audio({ ...option, icon: require('res/image/button/play.png') }, { icon: { ...this.size(0.025,0.025) } })
  }

  notice(option){
    return this.touchableOpacity(option, {
      view: { ...this.ui.style.border, backgroundColor: 'white', margin: '1%', borderRadius: 10, opacity: 0.9 },
      text: { ...this.fontSize(0.025), padding: 8 }
    })
  }

  add(option){
    return this.touchableOpacity({ ...option, icon: require('res/image/button/add_black.png') }, {
      view: { ...this.size(0.15,0.15), ...this.ui.style.border, opacity: 0.1 },
      icon: { ...this.size(0.05,0.05) }
    })
  }

  more(option){
    return this.touchableOpacity({ ...option, icon: require('res/image/button/dotdotdot.png') }, {
      view: { ...this.size(0.075,0.175), opacity: 0.1 },
      icon: this.size(0.05,0.05)
    })
  }

  preset(option){
    return this.touchableOpacity(option, {
      view: this.size(0.1,0.1),
      icon: { ...this.size(0.09,0.09), resizeMode: 'contain' }
    })
  }

  cameraShot(option){
    return this.touchableOpacity(option, { view: { ...this.size(0.08,0.08), opacity: 0.5 } })
  }

  back(option){
    return this.touchableOpacity({...option, background: require('res/image/button/back_arrow.png') },{
      view: { ...this.size(0.035,0.035), position: 'absolute', top: '4%', left: '3%' } })
  }

  image(option, style){
    return this.touchableOpacity(option, {
      icon: { ...this.ui.style.border, ...this.size(0.2,0.2), resizeMode: 'contain', backgroundColor: 'white', ...style }
    })
  }

  subView(option, selected){
    return this.touchableOpacity(option, {
      view: { ...this.ui.style.flexRowCC, flex: 1, height: '100%', backgroundColor: selected? 'white':'transparent' },
      text: {...this.fontSize(0.0175), color: selected? 'black': this.ui.color.grey[1] }
    })
  }

  tab(option){
    return this.touchableOpacity(
      {
        background: require('res/image/ui/tab_bar.png'),
        icon: option.onPress? (option.hide?
          require('res/image/icon/triangle_left.png'):
          require('res/image/icon/triangle_down.png'))
          : null,
        ...option
      },
      {
        view: { ...this.size(1,0.04,true), ...this.ui.style.flexRowCC, ...this.ui.style.shadow, shadowOffset: { height: 3 }},
        text: { ...this.size(0.975,0.025,true),...this.fontSize(0.02), textAlign: 'left', color: 'black', fontWeight: 'bold'},
        icon: { ...this.size(0.025,0.025) }
      }
    )
  }

  photo(option){
    return this.touchableOpacity(option, { view: this.size(0.09,0.09) })
  }

  nav(option){
    return this.touchableOpacity(option, { view: this.size(0.035,0.035) })
  }

  rectGreen(option){
    return this.rect({ background: require('res/image/button/rect_green.png'), ...option })
  }

  rectYellow(option){
    return this.rect({ background: require('res/image/button/rect_yellow.png'), ...option })
  }

  rectRed(option){
    return this.rect({ background: require('res/image/button/rect_red.png'), ...option })
  }

  rect(option){
    return this.touchableOpacity(option, {
      view: { ...this.ui.style.flexColCC, ...this.size(0.35, 0.045)},
      text: {...this.fontSize(0.0175), ...{ color: 'white', fontWeight: 'bold', textAlign: 'center' } } })
  }

}
