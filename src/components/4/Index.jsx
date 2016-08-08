import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../common/Helper'
import styles from './index.less'

let self
let object

class Index extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isLoad: false,
      object: {},
      zttplist: []
    }
  }

  componentDidMount() {
    if(typeof(object) == 'undefined') {
      self.load()
    } else {
      self.setState({
        object: object,
        zttplist: object.zttplist
      })
    }
  }

  load = function() {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/whytZttp/5',
      data: {

      },
      success: function(data) {
        object = data

        self.setState({
          object: data,
          zttplist: data.zttplist
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
          <div className={styles.picture}>
            <img src={Helper.host + this.state.object.picture} className={styles.pictureImg} />
            <div className={styles.pictureDiv}></div>
          </div>
          <div className={styles.description} dangerouslySetInnerHTML={{__html: this.state.object.description}}></div>
          <div className={styles.zttplist}>
          {
            this.state.zttplist.map(function (item, index) {
              return (
                index  < 9 ?
                <img key={item.id} src={Helper.host + item.picture} className={styles.zttplistImg} />
                :
                ''
              )
            }.bind(this))
          }
          </div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Index)