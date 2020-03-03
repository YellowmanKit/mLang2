import React from 'react'
import View from '../View'

export default class Credit extends View {

  init({ store: { page: { nav } }, action: { page } }){
    page.set('nav', {
      title: ['CREDIT','鳴謝','鸣谢'],
    })
  }

  view({ text, func, store: { ui: { style } } }){
    return(
      <div style={this.viewStyle}>
        {this.verGap(0.04)}
        {text.title({ text: func.multiLang('Organization','團體','团体') })}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {text.moderate({ text: func.multiLang('The University of Hong Kong', '香港大學', '香港大学') })}
        {text.moderate({ text: func.multiLang(
          'Hong Kong Applied Science and Technology Research Institute',
          '香港應用科技研究院',
          '香港应用科技研究院') }, { textAlign: 'center' })}
        {this.verGap(0.04)}
        {text.title({ text: func.multiLang('Director', '監督', '监督')})}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {text.moderate({ text: func.multiLang('Dr. Elizabeth Loh', '羅嘉怡博士', '罗嘉怡博士')})}
        {text.moderate({ text: func.multiLang('Dr. Vincent Lau', '劉文建博士', '刘文建博士')})}
        {text.moderate({ text: func.multiLang('Dr. W.W. Ki', '祁永華博士', '祁永华博士')})}
        {text.moderate({ text: func.multiLang('Dr. K.C. Lau', '劉國張博士', '刘国张博士')})}
        {this.verGap(0.04)}
        {text.title({ text: func.multiLang('Developer','開發者','开发者')})}
        {this.verSep(1)}
        {this.verGap(0.01)}
        {text.moderate({ text: func.multiLang('Mr. Wong Yan Kit', '黃人傑先生', '黄人杰先生')})}
        {this.verGap(0.04)}
      </div>
    )
  }

}
