import React, { Component } from 'react'
import { withRouter } from 'react-router'
import classnames from 'classnames'
import styles from './Index.less'

let cx = classnames.bind(styles);

let self

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      id: -1,
      index: -1
    }

    this.props.socket.on('open', function (data) {
      if(data.user == 'small') {
        self.setState({
          id: data.data.id,
          index: data.data.index
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
        {
          (this.state.id == 0 && this.state.index != 4 && this.state.index != 5 && this.state.index != 6 && this.state.index != 7 && this.state.index != 8) || (this.state.id == 1) ?
          <img src={require('../../../assets/image/map_' + this.state.id + '_' + this.state.index + '.png')} />
          :
          ''
        }
      </div>
    )
  }
}

export default withRouter(Detail)