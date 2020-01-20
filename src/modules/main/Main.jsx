import React from 'react';
import styles from './Main.less';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.main}>A React Front-End Project</div>
    );
  }
}
