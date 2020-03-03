import React from 'react'
import View from '../../View'
import Photo from 'component/element/Photo'
import Langs from './lang/Langs'

export default class Editor extends View {

  init({ func, action: { page }, store: { main: { photo }, user: { user }, project: { viewingProject }, studentProject: { viewingStudentProject }, card: { viewingCard }, lang: { langs } } }, { add }){
    this.state = {
      add,
      file: add? null: {
        name: viewingCard.icon,
        type: 'cardIcon'
      },
      author: add? user._id: null,
      project: viewingProject._id,
      studentProject: !func.isEmpty(viewingStudentProject)? viewingStudentProject: undefined,
      isTeacher: user.type === 'teacher',
      grade: user.type === 'teacher'? 'featured': 'notGraded',
      picked: photo,
      onChange: this.updatePicked,
      ...add? {}: viewingCard,
      langs: add? [{ id: this.key(), key: 'chinese_written', text: '' }]: func.idsToItems(viewingCard.langs, langs)
    }
    page.set('nav', {
      title: add? ['ADD CARD','製作卡片','制作卡片']: ['EDIT CARD','修改卡片','修改卡片']
    })
    this.setSaveButton(this.app)
  }

  view({ func, text, store: { ui: { style } } }, { picked, source, langs, add }){
    return(
      <div style={{ ...style.flexColCS, backgroundColor: 'white' }}>
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Icon','圖標','图标') })}
        {this.verSep(1)}
        <Photo app={this.app} icon={picked? picked: source}/>
        {this.verSep(1)}
        {this.verGap(0.02)}
        {text.title({ text: func.multiLang('Language','語言','语言') })}
        {this.verSep(1)}
        <Langs app={this.app} langs={langs} add={add}
        onChange={this.onChange.bind(this)}/>
        {this.verSep(1)}
      </div>
    )
  }

  onChange(lang, index){
    var newLangs = this.state.langs
    if(!lang){ newLangs.splice(index, 1) }
    else if(!index && index !== 0){ newLangs.push({ ...lang, id: this.key() }) }
    else{ newLangs[index] = lang }
    this.setState({ langs: newLangs })
  }

  save({ action: { card, modal } }, { picked, langs }, { add }){
    if(add){
      if(!picked){ return modal.message('Icon is missing!','未有圖標!','未有图标!', ()=>{ modal.off() }) }
      for(var i=0;i<langs.length;i++){
        if(!langs[i].path && !langs[i].text){
          return modal.message('language row is incompleted!','語言欄未完成!','语言栏未完成!', ()=>{ modal.off() })
        }
      }
    }
    card.update(this.state)
  }

}
