import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sub extends Component {
  componentWillReceiveProps() {
    console.log('sub willReceive')

  }
  render() {
    console.log('sub render')
    return (
      <div>
        Test
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    main: state.main
  }
}
export default connect(mapStateToProps)(Sub);