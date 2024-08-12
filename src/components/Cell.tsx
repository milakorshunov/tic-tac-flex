import React from "react";

interface CellProps {
    style: React.CSSProperties,
    onClick: ()=> void,
    children?: React.ReactNode
}
const Cell: React.FC<CellProps> = ({style, onClick, children}) => (

    <td style={style} onClick = {onClick}>
        {children}
    </td>

);

export default Cell;