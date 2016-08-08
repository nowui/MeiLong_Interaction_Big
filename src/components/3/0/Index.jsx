import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './Index.less'

let self

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      index: 0
    }

    this.props.socket.on('open', function (data) {
      if(data.user == 'small') {
        self.setState({
          index: data.data
        })
      }
    })
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    self.props.socket.removeAllListeners(['open'])
  }

  render() {
    return (
      <div className={styles.bg}>
      </div>
    )
  }
}

export default withRouter(Detail)