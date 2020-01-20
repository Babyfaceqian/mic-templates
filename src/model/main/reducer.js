const todos = (state = { text: '' }, action) => {
  // 深拷贝state
  switch (action.type) {
    case 'ADD_TODO':
      state.text = action.payload;
      return state;
    default:
      return state
  }
}

export default todos