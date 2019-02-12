import React, { Component } from "react";

export default class SidebarBox extends Component {
    render() {
        return (
            <sidebar className="col-1">
                { this.props.children }
            </sidebar>
        );
    }
}