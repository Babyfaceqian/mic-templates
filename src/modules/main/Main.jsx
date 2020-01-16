import React from 'react';
import styles from './Main.less';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    console.log('this.props', this.props);
    return (
      <div className={styles.main}>
        A React Front-End Project</div>
    );
  }
}
export default Main;