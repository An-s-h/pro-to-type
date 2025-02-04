import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React from 'react';
import { useTheme } from '../Contexts/ThemeContext';

const TableUserData = ({ data }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full flex justify-center">
      <TableContainer component={Paper} style={{ backgroundColor: theme.typeBoxTest, borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: theme.textColor, opacity: 0.9 }}>
              <TableCell
                style={{ color: theme.background, fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }}
              >
                WPM
              </TableCell>
              <TableCell
                style={{ color: theme.background, fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }}
              >
                Accuracy
              </TableCell>
              <TableCell
                style={{ color: theme.background, fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }}
              >
                Characters
              </TableCell>
              <TableCell
                style={{ color: theme.background, fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }}
              >
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((i, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? theme.background : theme.typeBoxTest,
                    transition: 'all 0.3s ease-in-out',
                  }}
                  className="hover:bg-opacity-70"
                >
                  <TableCell style={{ color: theme.textColor, textAlign: 'center', fontSize: '0.9rem' }}>
                    {i.wpm}
                  </TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: 'center', fontSize: '0.9rem' }}>
                    {i.accuracy}%
                  </TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: 'center', fontSize: '0.9rem' }}>
                    {i.characters}
                  </TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: 'center', fontSize: '0.9rem' }}>
                    {i.timestamp?.toDate().toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center', color: theme.textColor, fontSize: '1rem' }}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableUserData;
