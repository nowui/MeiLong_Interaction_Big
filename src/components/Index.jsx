import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './index.less'

let self

class Index extends Component {

  constructor(props) {
    super(props)

    self = this
  }

  componentDidMount() {

  }

  render() {
    return (
    	<div className={styles.bg}>
      </div>
    )
  }
}

export default withRouter(Index)