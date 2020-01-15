import React from 'react';
import styles from './Main.less';
import { Button } from 'antd';
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
      <div className={styles.main}>
        <Button>ceshi</Button>
        A React Front-End Project</div>
    );
  }
}
