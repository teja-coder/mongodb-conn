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
      }, 2000);
      
      return () => {
        clearInterval(intervalId);
      }

  }, []);

  const keysToIgnore = ['_id', 'id'];

  return (

    <div>
    {error && <div style={{ color: 'red' }}>{error}</div>}
      {data ? (
      <div className='m-16'>
        
        <h1 className='text-center text-4xl'>Metrics</h1>
        {Object.keys(data).filter(key => !keysToIgnore.includes(key)).map((key, index) => (
          <div key={key}>
            <h1 className='text-2xl m-10'>{key}</h1>
              <div className='mt-10 flex flex-col justify-evenly md:flex md:flex-row md:content-evenly md:m-0'>
                {data[key].map((device, deviceIndex) => (
                  <div className='flex flex-col justify-evenly mb-10 md:flex md:flex-row md:content-evenly'>
                    {Object.keys(data[key][deviceIndex]).map((k, i) => (
                      <PerformanceMetric title={k} value={parseFloat(device[k])} />
                    ))}
                </div>
                ))}
              </div>
            
          </div>
        ))}
      
      </div>
      ) : (
        <p>Loading data...</p>
      )}
      </div>
    );
  }

