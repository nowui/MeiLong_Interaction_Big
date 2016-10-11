import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../../common/Helper'
import styles from './Index.less'

let self

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isLoad: false,
      id: '',
      object: {
        id: '',
        pagecontent: ''
      },
      page: 1,
      limit: 1,
      total: 0
    }

    this.props.socket.on('open', function (data) {
      if(data.user == 'small') {
        self.setState({
          id: data.data,
          page: 1
        })

        self.load()
      }
    })

    this.props.socket.on('up', function (data) {
      if(data.user == 'small') {
        if(self.state.page > 1) {
          self.setState({
            page: self.state.page - 1
          })

          self.load()
        }
      }
    })

    this.props.socket.on('down', function (data) {
      if(data.user == 'small') {
        console.log(self.state.page)
        console.log(self.state.total)
        if(self.state.page < self.state.total) {
          self.setState({
            page: self.state.page + 1
          })

          self.load()
        }
      }
    })
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    self.props.socket.removeAllListeners(['open'])
    self.props.socket.removeAllListeners(['up'])
    self.props.socket.removeAllListeners(['down'])
  }

  load = function() {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/lhsgkContent/' + self.state.id + '-' + self.state.page + '-' + self.state.limit,
      data: {

      },
      success: function(data) {
        self.setState({
          object: data.list[0],
          total: data.totalPage
        })
      },
      complete: function() {
        self.setState({
          isLoad: false
        })
      }
    })
  }

  render() {
    return (
      <Spin size="large" spinning={this.state.isLoad}>
        <div className={styles.bg}>
          <div className={styles.content} dangerouslySetInnerHTML={{__html: this.state.object.content}}></div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Detail)