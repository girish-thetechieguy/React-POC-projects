export const Pie = ({ data }) => (
    <div 
      data-testid="pie-chart" 
      data-projected-return={data.datasets[0].data[0]}
    />
  );