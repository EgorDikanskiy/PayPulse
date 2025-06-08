import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';

const columns: GridColDef[] = [
  { field: 'number', headerName: '№', width: 50 },
  { field: 'company_name', headerName: 'Компания', width: 150 },
  { field: 'name', headerName: 'Название вакансии', width: 150 },
  { field: 'sphere_of_activity', headerName: 'Сфера деятельности', width: 150 },
  { field: 'work_schedule', headerName: 'График работы', width: 150 },
  { field: 'salary_gross', headerName: 'Зарплата (брутто)', width: 150 },
  { field: 'salary_net', headerName: 'Зарплата (нетто)', width: 150 },
  {
    field: 'benefits',
    headerName: 'Преимущества',
    width: 200,
    renderCell: (params) => (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: '1.5',
          padding: '8px 0',
        }}
        dangerouslySetInnerHTML={{ __html: params.value }}
      />
    ),
  },
  { field: 'city', headerName: 'Город', width: 120 },
  {
    field: 'requirements',
    headerName: 'Требования',
    width: 200,
    renderCell: (params) => (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: '1.5',
          padding: '8px 0',
        }}
      >
        {params.value}
      </div>
    ),
  },
  { field: 'info_from', headerName: 'Источник', width: 200 },
];

export default function RenderComponent() {
  const vacancyData = useSelector((state: RootState) => state.vacancy.vacancyData);

  const rows: GridRowsProp =
    vacancyData?.vacancies?.map((vacancy: any, index: number) => ({
      id: index + 1,
      number: index + 1,
      company_name: vacancy.company_name,
      name: vacancy.name,
      sphere_of_activity: vacancy.sphere_of_activity,
      work_schedule: vacancy.work_schedule,
      salary_gross: vacancy.salary_gross,
      salary_net: vacancy.salary_net,
      benefits: vacancy.benefits,
      city: vacancy.city,
      requirements: vacancy.requirements,
      info_from: vacancy.info_from,
    })) || [];

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        getRowHeight={() => 'auto'}
        sx={{
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            lineHeight: '1.5',
            padding: '8px',
          },
        }}
      />
    </div>
  );
}
