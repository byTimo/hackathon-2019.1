import * as React from "react";
import "./HorizontalLayout.css";

export interface HorizontalLayoutProps {

}

export class HorizontalLayout extends React.Component<HorizontalLayoutProps>{
    render() {
        return(
            <div
                className="HorizontalLayoutContainer"
            >
                {this.props.children}
            </div>
        )
    }
}