import * as React from "react";

import "./Content.css"

export interface ContentProps {
    width?: React.CSSProperties["width"];
    justifyContent?: React.CSSProperties["justifyContent"];
    alignItems?: React.CSSProperties["alignItems"];
}

export class Content extends React.Component<ContentProps> {
    render() {
        return (
            <div
                className="ContentContent"
                style={{
                    width: this.props.width,
                    justifyContent: this.props.justifyContent,
                    alignItems: this.props.alignItems
                }}
            >
                {this.props.children}
            </div>
        )
    }
}