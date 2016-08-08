import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './Index.less'

let self

class Detail extends Component {

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

export default withRouter(Detail)