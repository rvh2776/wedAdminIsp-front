'use client'
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAuth } from '@/context/AuthContext';
import { fetchAsistencias } from '@/services/Soporte.services';

interface Asistencia {
  id: string;
  createdAt: string;
  agente: string;
  userId: string;
  diaCliente: string;
  horarios: string;
  problema: string;
  observaciones: string;
}

const GarphicBars = ({ handleUserId, handleAsistenciaId } : { handleUserId: (value: string) => void, handleAsistenciaId: (value: string) => void }) => {
  const { userData } = useAuth();
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);

  const cant = asistencias?.map(asistencia => 1).filter(importe => importe !== undefined) || [];

  const userIds = asistencias?.map(asistencia => asistencia.userId) || [];
  const AsistenciaIds = asistencias?.map(asistencia => asistencia.id) || [];

  const fechas = asistencias?.map(asistencia => new Date(asistencia.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })).filter(observacion => observacion !== undefined) || [];


    useEffect(() => {
      const getRelevamientos = async () => {
        if (userData){
          try {      
            const data = await fetchAsistencias(userData.tokenData.token);
            setAsistencias(data);
            console.log("asistencias: ", data);
          } catch (error) {
            console.error("Error al cargar las asistencias");
          }
        }
      };
      getRelevamientos();
    }, [userData]);

  const options: ApexOptions = {
    series: [{
      name: "Cantidad de solicitudes",
      data:cant,
    },
  ],
  chart: {
    height: 350,
    type: 'bar',
    events: {
      dataPointSelection: (event, chartContext, { dataPointIndex }) => {
        const selectedUserId = userIds[dataPointIndex];
        const selectedAsistenciaId = AsistenciaIds[dataPointIndex];
        console.log("UserId seleccionado:", selectedUserId);
        console.log("AsistenciaId seleccionads:", selectedAsistenciaId);
        handleUserId(selectedUserId);
        handleAsistenciaId(selectedAsistenciaId)
      }
    }
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
    colors: ["#379fab"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return  val;
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
          return " " + val;
        }
      }
    },
    legend: {
      show: false  // Oculta la leyenda
    }
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
