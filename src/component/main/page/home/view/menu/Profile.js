import React from 'react'
import View from '../View'
import Photo from 'component/element/Photo'

export default class Profile extends View {

  init({ store: { profile : { profile }, main: { photo } }, action: { page } }){
    page.set('nav', {
      title: ['PROFILE','個人檔案','个人档案']
    })
    this.setEditButton(this.app)
    this.state = { ...profile,
      edit: false,
      file: {
        name: profile.icon,
        type: 'profileIcon'
      },
      picked: photo,
      onChange: this.updatePicked
    }
  }

  view({ media, text, button, input, func, store: { user: { user }, ui: { style } }, action: { main } },
      { edit, picked, name, description, cardCount, featuredCount, source }){
    return(
      <div style={this.viewStyle}>
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Picture','照片','照片') })}
        {this.verSep(1)}
        {!edit && this.verGap(0.02)}
        {!edit && button.image({ icon: picked? picked: this.state.source, onPress: ()=>{ main.set('enlarger', this.state.source) } })}
        {edit && <Photo app={this.app} icon={picked? picked: source}/>}
        {edit && this.verSep(1)}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Name','名稱','名称') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: name })}
        {edit && input.shortText({
          value: name,
          placeholder: func.multiLang('Enter your name', '請輸入名稱', '请输入名称'),
          onChangeText: text => { this.setState({ name: text }) }
        })}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Introduction','自我介紹','自我介绍') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: description })}
        {edit && input.longText({
          value: description,
          placeholder: func.multiLang('Enter your introduction', '請輸入自我介紹', '请输入自我介绍'),
          onChangeText: text => { this.setState({ description: text }) }
        })}
        {this.verGap(0.02)}
        {!edit && text.title({ text: func.multiLang('Card(Featured)','卡片(精選)','卡片(精选)') })}
        {!edit && this.verSep(1)}
        {this.verGap(0.01)}
        {!edit && text.moderate({ text: cardCount + '(' + featuredCount + ')' })}
        {!edit && this.verGap(0.02)}
      </div>
    )
  }

  save({ action : { modal, profile } }, { name }){
    if(name === ''){
      return modal.invalid(()=>{ modal.off() })
    }
    modal.password(()=>{
      profile.update(this.state)
      this.setEditButton(this.app)
      this.setState({ edit: false })
    }, ()=>{ modal.off() })
  }

}
