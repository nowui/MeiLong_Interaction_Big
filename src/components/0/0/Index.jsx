import React, { Component } from 'react'
import { withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './Index.less'

let cx = classnames.bind(styles)

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
    let className = cx({
        [styles.bg_0]: this.state.index == 0,
        [styles.bg_1]: this.state.index == 1,
        [styles.bg_2]: this.state.index == 2,
        [styles.bg_3]: this.state.index == 3
    })

    return (
      <div className={className}>
      </div>
    )
  }
}

export default withRouter(Detail)