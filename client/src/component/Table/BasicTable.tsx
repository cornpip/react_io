import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({ headrows, rows }: any) {
    // console.log(headrows)
    // console.log(rows)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headrows.length && headrows.map((head_row: string, i: number) => {
                            if (i==0) return <TableCell key={head_row}>{head_row}</TableCell>
                            return <TableCell key={head_row} align='right'>{head_row}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow
                            key={row[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row.map((v: any, i: number) => {
                                if (i==0) return (
                                    <TableCell key={v} component="th" scope="row">{v}</TableCell>
                                )
                                return (<TableCell key={v} align="right">{v}</TableCell>)
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

