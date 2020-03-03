import { reducer } from '../../redux'

export const ui = (
  state = {
    style, color,
    window: { width: 0, height: 0 }
  }, action) => reducer(state, action, result)

const result = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}

const style = {
  flexColCC: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  flexColCS: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' },
  flexColCE: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' },
  flexColSS: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' },
  flexColEE: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' },

  flexRowCC: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  flexRowSS: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' },
  flexRowCS: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },

  shadow: { shadowColor: '#888888', shadowOpacity: 0.5, shadowOffset: { width: 5, height: 5 } },
  background: { width: '100%', height: '100%', position: 'absolute', resizeMode: 'stretch' },
  border: { borderStyle: 'solid', borderWidth: 1, borderColor: '#9b9b9b' },
  bar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
         justifyContent: 'space-evenly', borderWidth: 1, borderRadius: 5, borderColor: '#c4c4c4' }
}

const color = {
  green: ['#91c33b'],
  grey: ['#f3f3f3', '#d9d9d9', '#b5b5b5', '#9b9b9b'],
  red: ['#e60f00'],
  yellow: ['#f2f222']
}
