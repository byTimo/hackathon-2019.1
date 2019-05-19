import * as React from "react";
import {IBar} from "../types/common";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";

export interface BarTableProps {
    bars: IBar[];
}

export class BarTable extends React.Component<BarTableProps> {
    render() {
        return (
            <Table>
                <TableBody>
                    {this.props.bars.map((x, i) => (
                        <TableRow key={x.id}>
                            <TableCell align={"left"}>{i+1}</TableCell>
                            <TableCell>{x.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
}