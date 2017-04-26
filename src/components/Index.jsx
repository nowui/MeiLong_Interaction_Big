import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay} from 'react-html5video'
import styles from './index.less'

let self

class Index extends Component {

    constructor(props) {
        super(props)

        self = this

        this.state = {
            isStandby: false,
            isPlay: false
        }

        this.props.socket.on('open', function (data) {
            if (data.user == 'small') {
                let isStandby = self.state.isStandby;

                if (data.data == -1) {
                    isStandby = !isStandby;
                } else {
                    isStandby = false;
                }


                self.setState({
                    isPlay: data.data == 5,
                    isStandby: isStandby
                })

                if (data.data == 5) {
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
                               style={{
                                   height: '720px',
                                   paddingLeft: '320px',
                                   paddingRight: '320px',
                                   backgroundColor: '#000000'
                               }}
                               poster="http://sourceposter.jpg"
                               onCanPlayThrough={() => {

                               }}>
                            <source src="video.mp4" type="video/mp4"/>
                        </Video>
                        :
                        ''
                }
                {
                    this.state.isStandby ?
                        <div className={styles.standby}></div>
                        :
                        ''
                }
            </div>
        )
    }
}

export default withRouter(Index)