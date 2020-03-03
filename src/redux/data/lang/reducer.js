import { reducer } from '../../redux'

export const lang = (
  state = {
    langs: [],
    keys: {
      chinese_written: ['Chinese(Written)','中文(書面語)','中文(书面语)'],
      english: ['English','英文','英文'],
      chinese_spoken: ['Chinese(Spoken)','中文(口語)','中文(口语)'],
      pth_written: ['PTH(Written)','普通話(書面語)','普通话(书面语)'],
      pth_spoken: ['PTH(Spoken)','普通話(口語)','普通话(口语)'],
      hindi: ['Hindi','印度語','印度语'],
      urdu: ['Urdu','烏爾都語','乌尔都语'],
      nepalese: ['Nepalese','尼泊爾語','尼泊尔语'],
      tagalog: ['Tagalog','他加祿語','他加禄语'],
      japanese: ['Japanese','日語','日语'],
      spanish: ['Spanish','西班牙語','西班牙语'],
      german: ['German','德語','德语'],
      french: ['French','法語','法语'],
      korean: ['Korean','韓語','韩语'],
      vietnamese: ['Vietnamese','越南語','越南语']
    }
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
