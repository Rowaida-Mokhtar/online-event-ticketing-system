import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../services/axios';


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

const EventAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get('/users/events/analytics')
    .then(res => {
      const transformed = res.data.eventStats.map(stat => ({
        name: stat.eventName,
        value: stat.ticketsSold
      }));
      setData(transformed);
    })
    .catch(err => console.error('Failed to load analytics', err));
}, []);



  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Event Booking Analytics</h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ textAlign: 'center' }}>No booking data to display.</p>
      )}
    </div>
  );
};

export default EventAnalytics;
