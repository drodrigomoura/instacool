import React from "react";
import { faThumbsUp, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const styles = {
    button: {
        cursor: 'pointer',
        padding: '10px 15px',
        textAlign: 'center',
        flex: 1,
    }, footer: {
        backgroundColor: '#eee',
        display: 'flex',
        marginBottom: '-10px',
        marginLeft: '-15px',
        width: 'calc(100% + 30px)'
    }
}

interface IFooterProps {
    like: () => void,
    share: () => void,
}

export default class Footer extends React.Component<IFooterProps> {
    public render() {
        const { like, share } = this.props
        return (
            <div style={styles.footer}>
                <div onClick={like} style={styles.button as React.CSSProperties}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Like
                </div>

                <div onClick={share} style={styles.button as React.CSSProperties}>
                    <FontAwesomeIcon icon={faRetweet} />
                Share
                </div>
            </div>
        )
    }
}