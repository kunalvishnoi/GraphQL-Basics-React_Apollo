import React, { Component } from 'react'

class Link extends Component {
    render() {
        return(
            <div>{this.props.description} {this.props.url}</div>
        )
    }
}
export default Link;