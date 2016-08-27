import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Swiper from 'swiper'
import Helper from '../../common/Helper'
import 'swiper/dist/css/swiper.min.css'
import styles from './Index.less'
import './Index.css'

let self
let object
let swiper

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

      setTimeout(function() {
        swiper = new Swiper('.swiper-container', {
          slidesPerView: 8,
          autoplay: 1000,
          autoplayDisableOnInteraction: false,
          loop: true
        })
      }, 10)
    }
  }

  componentWillUnmount() {
    swiper.destroy()
  }

  load = function() {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/whytZttp/3',
      data: {

      },
      success: function(data) {
        object = data

        self.setState({
          object: data,
          zttplist: data.zttplist
        })

        swiper = new Swiper('.swiper-container', {
          slidesPerView: 8,
          autoplay: 1000,
          autoplayDisableOnInteraction: false,
          loop: true
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
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {
                  this.state.zttplist.map(function (item, index) {
                    return (
                    <div key={index} className="swiper-slide">
                      <img key={item.id} src={Helper.host + item.picture} className={styles.zttplistImg} />
                    </div>
                    )
                  }.bind(this))
                }
              </div>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Index)