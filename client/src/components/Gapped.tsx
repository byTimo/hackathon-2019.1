import * as React from "react";

const styles = require("./Gapped.less");

export interface GappedProps {
    children: React.ReactNode;
    gap?: number;
    vertical?: boolean;
    alignItems?: React.CSSProperties["alignItems"];
    inline?: boolean;
}

export default class Gapped extends React.Component<GappedProps> {
    static defaultProps: Partial<GappedProps> = {
        gap: 10
    };

    render() {
        return (
            <div
                style={{
                    display: this.props.inline? "inline-flex": "flex",
                    flexDirection: this.props.vertical ? "column" : "row",
                    alignItems: this.props.alignItems
                }}
            >
                {React.Children.toArray(this.props.children)
                    .filter(item => item)
                    .map((item, index) => (
                        <div key={index} className={styles.wrapper} style={this.getItemStyles(index)}>
                            {item}
                        </div>
                    ))
                }
            </div>
        );
    }

    private getItemStyles = (index: number) => {
        let margin = this.props.vertical ? "marginTop" : "marginLeft";
        let gap = index === 0 ? undefined : this.props.gap;
        return {[margin]: gap};
    }
}
