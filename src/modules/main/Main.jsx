import React from 'react';
import styles from './Main.less';
import { connect } from 'react-redux';
import * as Acts from '../../model/main/action';
import Sub from './Sub';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
  }
  componentDidMount() {
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
      <Sub />
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
