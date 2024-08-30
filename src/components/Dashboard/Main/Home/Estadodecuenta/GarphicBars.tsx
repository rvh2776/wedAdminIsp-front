'use client'
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAuth } from '@/context/AuthContext';

const GarphicBars = () => {
  const { userData } = useAuth();

  const facturas = userData?.userData.facturas;
  const importes = facturas?.map(factura => factura.importe).filter(importe => importe !== undefined) || [];
  const fechas = facturas?.map(factura => factura.observaciones).filter(observacion => observacion !== undefined) || [];
  const colores = userData?.userData.facturas
    .map(factura => factura.pagado ? '#379fab' : '#d12424') || [];

  const options: ApexOptions = {
    series: [{
      name: 'Montos de Facturas',
      data: importes
    }],
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
        distributed: true,
      }
    },
    colors: colores,
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return "$" + val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: fechas,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: number) {
          return "$" + val;
        }
      }
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default GarphicBars;
