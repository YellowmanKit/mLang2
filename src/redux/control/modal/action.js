export const off = () => { return { type: 'off' } }
export const message = (english, chinese, simplifiedChinese, onConfirm, onCancel) => { return { type: 'define', payload: {
    modal: true,
    requirePassword: false,
    english, chinese, simplifiedChinese, onConfirm, onCancel
} } }
export const password = (onConfirm, onCancel) => { return { type: 'define', payload: {
  modal: true,
  requirePassword: true,
  english: 'Please enter current password to confirm changes!',
  chinese: '請輸入當前密碼以完成變更!',
  simplifiedChinese: '请输入当前密码以完成变更!',
  onConfirm, onCancel
} } }
export const invalid = onConfirm => { return { type: 'define', payload: {
  modal: true,
  requirePassword: false,
  english: 'Invalid information!',
  chinese: '資料輸入錯誤!',
  simplifiedChinese: '资料输入错误',
  onCancel: null, onConfirm
} } }
export const error = onConfirm => { return { type: 'define', payload: {
  modal: true,
  requirePassword: false,
  english: 'Unknown error!',
  chinese: '出現未知的錯誤!',
  simplifiedChinese: '出现未知的错误!',
  onCancel: null, onConfirm
} } }
export const confirm = (message, onConfirm, onCancel, requireInput) => { return { type: 'define', payload: {
  modal: true,
  requirePassword: false,
  english: message[0],
  chinese: message[1],
  simplifiedChinese: message[2],
  onConfirm, onCancel, requireInput
} } }
