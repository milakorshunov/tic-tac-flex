import React, { CSSProperties } from "react";
import Cell from "./Cell";

interface BoardProps {
    boardSize: number,
    data: string[],
    symbol: string,
    handleClick: (i: number) => void
}

const Board: React.FC<BoardProps> = ({ boardSize, data, symbol, handleClick }) => {

    const tdStyle: React.CSSProperties = {
        width: "100px",
        height: "100px",
        border: "1px solid grey",
        textAlign: "center",
        fontSize: "24px",
    };
   
    const tableStyle: React.CSSProperties = {
        margin: "20px auto",
        borderCollapse: "collapse"
    }
    
    function cellStyle(symbol: string): CSSProperties {
        return {
            ...tdStyle,
            color: symbol === 'X' ? 'green' : 'red'
        };
    }

    function renderCell(row: number, col: number) {
        const index: number = row * boardSize + col;
        return (
            <Cell style={cellStyle(data[index])} key={index} onClick={() => handleClick(index)}>{data[index]}</Cell>
        );

    }


    function renderRow(row: number) {
        return (
            <tr>
                {Array.from({ length: boardSize }).map((_, col) => renderCell(row, col))}
            </tr>
        )

    }

    function renderTable() {
        return (
            <table style={tableStyle}>
                <tbody>
                    {Array.from({ length: boardSize }).map((_, row) => renderRow(row))}
                </tbody>
            </table>
        );


    }

    return renderTable();


}

export default Board;