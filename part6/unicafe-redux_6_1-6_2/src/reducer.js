const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodChanged = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      
      return goodChanged
    case 'OK':
      const okChanged = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      
      return okChanged
    case 'BAD':
      const badChanged = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      
      return badChanged
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer