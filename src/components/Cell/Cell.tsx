import React from "react";
import './Cell.scss';

interface CellProps {
    className?: string,
    onClick: ()=> void,
    children?: React.ReactNode
}
const Cell: React.FC<CellProps> = ({className, onClick, children}) => (

    <td className={className} onClick = {onClick} role ={"gridcell"}>
        {children}
    </td>

);

export default Cell;