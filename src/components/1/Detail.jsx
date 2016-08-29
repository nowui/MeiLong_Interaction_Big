import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../common/Helper'
import styles from './Detail.less'

let self

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isLoad: false,
      id: self.props.params.id,
      sId: 0,
      page: 1,
      limit: 2,
      list: []
    }

    this.props.socket.on('open', function (data) {
      if(data.user == 'small') {
      console.log(data.data)
        self.setState({
          id: data.data.id,
          sId: data.data.sId,
          page: data.data.page
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
        if(self.state.list.length == 2) {
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
      url: '/services/whytDjxmhPageContent/' + self.state.id + '-' + self.state.sId + '-' + self.state.page + '-' + self.state.limit,
      data: {

      },
      success: function(data) {
        self.setState({
          list: data.list
        })
      },
      complete: function() {
        self.setState({
          isLoad: false
        })

        //self.refs['content'].scrollTop = 200
      }
    })
  }

  render() {
    return (
      <Spin size="large" spinning={this.state.isLoad}>
        <div className={styles.bg}>
          <div className={styles.content} ref='content'>
            {
              this.state.list.map(function (item, index) {
                return (
                  <div key={index} className={styles.contentDiv} dangerouslySetInnerHTML={{__html: item.pagecontent}}></div>
                )
              }.bind(this))
            }
          </div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Detail)