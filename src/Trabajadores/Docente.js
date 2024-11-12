import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
    const intervalId = setInterval(fetchClientes, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalId);
  }, []);

  const chartData = {
    labels: clientes.map(cliente => cliente.nombre),
    datasets: [
      {
        label: 'IDs de Clientes',
        data: clientes.map(cliente => cliente.id),
        backgroundColor: ['#4bc0c0', '#ff6384', '#36a2eb', '#ff9f40'],
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">LISTA DE CLIENTES</h1>
      <div className="row">
        {clientes.map((cliente) => (
          <div className="col-md-3 mb-4" key={cliente.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">ID: {cliente.id}</h5>
                <p className="card-text"><strong>Nombre:</strong> {cliente.nombre}</p>
                <p className="card-text"><strong>Teléfono:</strong> {cliente.telefono}</p>
                <p className="card-text"><strong>Sexo:</strong> {cliente.sexo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-center my-4">Gráfico de IDs de Clientes</h2>
      <div className="chart-container">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ListaClientes;