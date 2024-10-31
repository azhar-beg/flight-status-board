import { useEffect, useState } from 'react';
import { flightServiceClient } from '../api/httpClient';
import { BOARD_UPDATE_INTERVAL } from '../utils/constants';

interface UseFlightDataResult<T> {
  response: T | null;
  error: boolean;
  loading: boolean;
}

const useFlightData = <T>(id?: number): UseFlightDataResult<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const apiUrl = id ? `/flights/${id}` : '/flights';
        const res = await flightServiceClient.get<T>(apiUrl);
        setResponse(res.data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlightData();

    if (!id) {
      const intervalId = setInterval(fetchFlightData, BOARD_UPDATE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [id]);

  return { response, error, loading };
};

export default useFlightData;
