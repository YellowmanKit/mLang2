export const spawn = notice => { return { type: 'update', payload: { key: 'notices', value: [notice] } } }
export const kill = _id => { return { type: 'update', payload: { key: 'notices', value: [{ _id, dead: true }]} } }
export const clear = () => { return { type: 'clear' } }
export const greeting = onPress => { return { type: 'update', payload: { key: 'notices', value: [{
  _id: 'greeting',
  english: 'Welcome back!',
  chinese: '歡迎回來!',
  simplifiedChinese: '欢迎回来!',
  onPress
}]} } }
