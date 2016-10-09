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
      id: 0,
      index: 0,
      page: 0,
      total: 0
    }

    this.props.socket.on('open', function (data) {
      if(data.user == 'small') {
        self.setState({
          id: data.data.id,
          index: data.data.index,
          page: 0
        })
      }

      if(data.data.id == 1) {
        let total = 0
        let index = data.data.index

        if(index == 0) {
          total = 8
        } else if(index == 1) {
          total = 15
        } else if(index == 2) {
          total = 8
        } else if(index == 3) {
          total = 6
        } else if(index == 4) {
          total = 7
        } else if(index == 5) {
          total = 7
        } else if(index == 6) {
          total = 7
        } else if(index == 7) {
          total = 7
        } else if(index == 8) {
          total = 7
        } else if(index == 9) {
          total = 8
        } else if(index == 10) {
          total = 6
        } else if(index == 11) {
          total = 6
        } else if(index == 12) {
          total = 7
        } else if(index == 13) {
          total = 6
        }

        self.setState({
          total: total
        })
      }
    })

    this.props.socket.on('up', function (data) {
      if(data.user == 'small') {
        if(self.state.page <= 0) {
          self.setState({
            page: self.state.total
          })
        } else {
          self.setState({
            page: self.state.page - 1
          })
        }
      }
    })

    this.props.socket.on('down', function (data) {
      if(data.user == 'small') {
        console.log(self.state.page + '-' + self.state.total)
        if(self.state.page >= self.state.total) {
          self.setState({
            page: 0
          })
        } else {
          self.setState({
            page: self.state.page + 1
          })
        }
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
          this.state.id == 0 ?
          <img src={require('../../../assets/image/map_' + this.state.id + '_' + this.state.index + '.png')} />
          :
          <img src={require('../../../assets/image/map_' + this.state.id + '_' + this.state.index + '_' + this.state.page + '.png')} />
        }
      </div>
    )
  }
}

export default withRouter(Detail)