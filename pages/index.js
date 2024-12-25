import { useState, useEffect } from 'react';
import PerformanceMetric from '@/components/PerformanceMetric';

export default function Home() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

      const fetchDataFromDb = async () => {
        try{

          const response = await fetch('/api/items')

          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
          }

          const result = await response.json();

          if ( result ) {
            setData(result['data'][0])
          }


        } catch (error) {
          console.log('Error', error)
          setError('Error fetching data');
        }
      }

      const intervalId = setInterval(() => {
        fetchDataFromDb();
      }, 1000);
      
      return () => {
        clearInterval(intervalId);
      }

  }, []);

  
  return (

    <div>
    {error && <div style={{ color: 'red' }}>{error}</div>}
      {data ? (
      <div className='m-16'>
        
        <h1 className='text-center text-4xl'>Metrics</h1>
        <h1 className='text-2xl m-10'>CPU [#0]: AMD Ryzen 5 4600H: Enhanced</h1>
        <div className='flex justify-evenly mt-10 w-auto'>
          <PerformanceMetric title='CPU (Tctl/Tdie)' value={parseFloat(data['CPU [#0]: AMD Ryzen 5 4600H: Enhanced'][0]['CPU (Tctl/Tdie)'])} />
          <PerformanceMetric title='CPU Core' value={parseFloat(data['CPU [#0]: AMD Ryzen 5 4600H: Enhanced'][1]['CPU Core'])} />
          <PerformanceMetric title='CPU SOC' value={parseFloat(data['CPU [#0]: AMD Ryzen 5 4600H: Enhanced'][2]['CPU SOC'])} />
        </div>

        <div className='mt-20'></div>
        <h1 className='text-2xl m-10'>GPU [#1]: AMD Radeon RX 5600 XT</h1>
        <div className='flex justify-evenly mt-10'>
          <PerformanceMetric title='GPU Temperature' value={parseFloat(data['GPU [#1]: AMD Radeon RX 5600 XT'][0]['GPU Temperature'])} />
          <PerformanceMetric title='GPU Memory Junction Temperature' value={parseFloat(data['GPU [#1]: AMD Radeon RX 5600 XT'][1]['GPU Memory Junction Temperature'])} />
          <PerformanceMetric title='GPU Hot Spot Temperature' value={parseFloat(data['GPU [#1]: AMD Radeon RX 5600 XT'][2]['GPU Hot Spot Temperature'])} />
          <PerformanceMetric title='Frame Rate' value={parseFloat(data['RTSS'][0]['Framerate'])} />
        </div>

      </div>
      ) : (
        <p>Loading data...</p>
      )}
      </div>
    );
  }

