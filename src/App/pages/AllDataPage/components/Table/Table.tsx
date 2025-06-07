import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import React from 'react';

const rows: GridRowsProp = [
  { id: 1, name: 'Data Grid', description: 'the Community version' },
  { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
  { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
];

const columns: GridColDef[] = [
  { field: 'number', headerName: '№', width: 50 },
  { field: 'company', headerName: 'Компания', width: 150 },
  { field: 'name', headerName: 'Название вакансии', width: 150 },
  { field: 'oklad gross', headerName: 'Оклад GROSS', width: 150 },
  { field: 'zp gross', headerName: 'ЗП GROSS', width: 150 },
  { field: 'working hours', headerName: 'График работы', width: 150 },
  { field: 'motivations', headerName: 'Дополнительные способы мотивации', width: 150 },
  { field: 'city', headerName: 'Город', width: 150 },
  { field: 'сandidate requirements', headerName: 'Требования к кандидату', width: 150 },
  { field: 'source', headerName: 'Источник', width: 150 },
];

export default function RenderComponent() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
