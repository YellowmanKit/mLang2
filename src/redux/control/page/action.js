export const push = view => { return { type: 'push', payload: view } }
export const pull = () => { return { type: 'pull' } }
export const setSubView = (subView, init) => { return { type: 'setSubView', payload: { subView, init } } }
