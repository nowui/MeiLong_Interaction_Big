import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video'
import styles from './index.less'

let self

class Index extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isPlay: false
    }

    this.props.socket.on('open', function (data) {
      if(data.user == 'small') {
        self.setState({
          isPlay: data.data == 5
        })

        if(data.data == 5) {
          self.refs.video.load()
          self.refs.video.play()
        } else {

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
          this.state.isPlay ?
          <Video loop muted
            ref="video"
            style={{width: '100%'}}
            poster="http://sourceposter.jpg"
            onCanPlayThrough={() => {

            }}>
            <source src="video.mp4" type="video/mp4"/>
          </Video>
          :
          ''
        }
      </div>
    )
  }
}

export default withRouter(Index)