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
      object: {
        id: '',
        pagecontent: ''
      }
    }

    this.props.socket.on('open', function (data) {
      if(data.user == 'small') {
        self.load(data.data)
      }
    })
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    self.props.socket.removeAllListeners(['open'])
  }

  load = function(id) {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/whytXzgfhPageContent/' + id,
      data: {

      },
      success: function(data) {
        self.setState({
          object: data
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
          <div className={styles.personname}>{this.state.object.personname}</div>
          <div className={styles.content} dangerouslySetInnerHTML={{__html: this.state.object.pagecontent}}></div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Detail)