import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie(props) {
  return (
    <PieChart
      colors={['#1976d2', '#dc004e', '#ffb300', '#00a896']}
      series={[
        {
            data: props.data,
            innerRadius: 24,
            outerRadius: 100,
            paddingAngle: 3,
            cornerRadius: 5,
        },
      ]}
      width={500}
      height={200}
    />
  );
}