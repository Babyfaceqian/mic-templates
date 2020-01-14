import * as React from 'react';
import styles from './Main.less';
import { observer, inject } from "mobx-react";
@inject('main')
@observer
export default class Main extends React.Component {
	public render() {
		return (
			<div className={styles.main}>A React Front-End Project</div>
		);
	}
}