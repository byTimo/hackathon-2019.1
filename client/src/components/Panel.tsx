import * as React from "react";
import "./Panel.css";

export interface PanelProps {
    width?: React.CSSProperties["width"];
}

export class Panel extends React.Component<PanelProps>{
    render() {
        return (
            <div className="Panel" style={{width: this.props.width || 300}}>
                {this.props.children}
            </div>
        )
    }
}