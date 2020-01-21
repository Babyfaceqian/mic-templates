import React from 'react';
import styles from './Main.less';
import { connect } from 'react-redux';
import * as Acts from '../../model/main/action';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleClick = () => {
    this.props.dispatch(Acts.addTodo('text'));
  }
  componentWillReceiveProps(){
  }
  render() {
    console.log(this.props, 'render');
    return (
      <div className={styles.main}>{this.props.main.todos.text}<button onClick={this.handleClick}>button</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    main: state.main
  }
}
export default connect(mapStateToProps)(Main);
