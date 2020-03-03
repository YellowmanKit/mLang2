import React from 'react'
import Component from 'component/Component'

export default class Native extends Component {

  picker({ options, value, onChange }, style){
    /*return(
      <Picker style={style} selectedValue={value} onValueChange={onChange}>
        {options.map(({ text, value }, i) => <Picker.Item label={text} value={value} key={value}/>)}
      </Picker>
    )*/
    return null
  }

  checkboxBar(option, style){
    return(
      <div style={style.view}>
        {this.checkbox(option, style.checkbox)}
        {this.horGap(0.02)}
        {this.text(option, style.text)}
      </div>
    )
  }

  checkbox({ value, onPress }, style){
    return(
      <div style={{...{ backgroundColor: 'white', borderColor: 'grey', borderRadius: 2 }, ...style}} onPress={onPress}>
        {value && this.background(require('res/image/icon/tick.png')) }
      </div >
    )
  }

  text({ text, onPress, key }, style){
    return <div style={{ cursor: onPress? 'pointer':'default', ...style }} onClick={onPress} key={key}>{text}</div>
  }

  textInput({ value, placeholder, onChangeText, isPassword, multiline }, style){
    return(
      <input type={isPassword?'password':'text'}
        defaultValue={value}
        placeholder={placeholder}
        onChange={event=>{ onChangeText(event.target.value) }}
        style={style}
      />
    )
  }

  touchableOpacity({ background, icon, text, onPress, key, disabled }, style){
    return(
      <button style={{ opacity: disabled? 0.1:1, ...this.ui.style.flexColCC,
        backgroundImage: 'url(' + background + ')',
        border: 'none',
        cursor: 'pointer',
        backgroundSize: '100% 100%',
        backgroundColor: 'transparent',
        ...style.view
      }} onClick={disabled? null: onPress} key={key}>
        {text && this.text({ text }, { ...style.text, cursor: 'pointer' })}
        {<img style={style.icon} src={icon?icon:null} />}
      </button>
    )
  }

  background(url){
    return <div style={{ position: 'absolute', width: '100%', height: '100%', resizeMode: 'stretch'  }} source={url?url:null} />
  }

}
