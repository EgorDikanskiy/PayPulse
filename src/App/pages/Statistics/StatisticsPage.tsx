import { Box, Paper, Typography, Container } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Scale,
  CoreScaleOptions,
  Tick,
} from 'chart.js';
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Nav from 'components/Nav';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const StatisticsPage: React.FC = () => {
  // Sample data for median salary trend
  const medianSalaryData = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
    datasets: [
      {
        label: 'Медианная зарплата',
        data: [65000, 68000, 72000, 75000, 78000, 80000],
        fill: false,
        borderColor: '#63D72A',
        tension: 0.1,
      },
    ],
  };

  // Sample data for CDEK vs Market salary comparison
  const salaryComparisonData = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
    datasets: [
      {
        label: 'CDEK',
        data: [65000, 68000, 72000, 75000, 78000, 80000],
        fill: false,
        borderColor: '#63D72A',
        tension: 0.1,
      },
      {
        label: 'Среднерыночная',
        data: [60000, 62000, 65000, 68000, 70000, 72000],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  // Sample data for regional salary comparison
  const regionalSalaryData = {
    labels: ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Казань'],
    datasets: [
      {
        label: 'Средняя зарплата',
        data: [95000, 85000, 75000, 70000, 65000],
        backgroundColor: '#63D72A',
        borderRadius: 5,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Динамика зарплат',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (this: Scale<CoreScaleOptions>, tickValue: number | string) {
            return `${Number(tickValue).toLocaleString()} ₽`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Средняя зарплата по регионам',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (this: Scale<CoreScaleOptions>, tickValue: number | string) {
            return `${Number(tickValue).toLocaleString()} ₽`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
          Статистика зарплат
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {/* Median Salary Trend Chart */}
            <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                  Изменение медианной зарплаты по месяцам
                </Typography>
                <Line data={medianSalaryData} options={lineChartOptions} />
              </Paper>
            </Box>

            {/* CDEK vs Market Salary Comparison Chart */}
            <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                  Сравнение зарплат CDEK и среднерыночных
                </Typography>
                <Line data={salaryComparisonData} options={lineChartOptions} />
              </Paper>
            </Box>
          </Box>

          {/* Regional Salary Comparison Chart */}
          <Box>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                Средняя зарплата по регионам
              </Typography>
              <Bar data={regionalSalaryData} options={barChartOptions} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default StatisticsPage;
