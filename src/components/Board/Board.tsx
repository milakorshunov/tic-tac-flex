import React, { CSSProperties } from "react";
import Cell from '../Cell/Cell';
import './Board.scss';

interface BoardProps {
    boardSize: number,
    data: string[],
    symbol: string,
    handleClick: (i: number) => void
}

const Board: React.FC<BoardProps> = ({ boardSize, data, symbol, handleClick }) => {
    
    function cellStyle(symbol: string): string {
        return symbol === 'X' ? 'cell-x' : 'cell-o';
        
    }

    function renderCell(row: number, col: number) {
        const index: number = row * boardSize + col;
        return (
            <Cell className={cellStyle(data[index])} key={index} onClick={() => handleClick(index)}>{data[index]}</Cell>
        );

    }


    function renderRow(row: number) {
        return (
            <tr key={row}>
                {Array.from({ length: boardSize }).map((_, col) => renderCell(row, col))}
            </tr>
        )

    }

    function renderTable() {
        return (
            <table className="board-table">
                <tbody>
                    {Array.from({ length: boardSize }).map((_, row) => renderRow(row))}
                </tbody>
            </table>
        );


    }

    return renderTable();


}

export default Board;