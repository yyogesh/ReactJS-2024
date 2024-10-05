import { useState } from "react";
import { useApi, User } from "./hooks/useApi"
import { axiosInstance } from "./util/axiosConfig";
import { AxiosError } from "axios";


function App() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: fetchData, loading: fetchLoading = false, error: fetchError } = useApi('https://jsonplaceholder.typicode.com/users');

  const fetchDataWithAxios = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<User[]>('/users');
      setData(response.data);
    } catch(error) {
        const axiosError = error as AxiosError;
        setError(`An error occurred: ${axiosError.message}`);
    } finally {
      setLoading(false);
    }
  }

  const postDataWithAxios = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post<User>('/users', {
        name: 'John Doe',
        email: 'b9qFP@example.com'
      });
      console.log(response.data);
    } catch(error) {
        const axiosError = error as AxiosError;
        setError(`An error occurred: ${axiosError.message}`);
    } finally {
      setLoading(false);
    }
  }



  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          {
            fetchLoading && <p className="text-gray-600">Loading...</p>
          }
          {
            fetchError && <p className="text-red-500">{fetchError}</p>
          }
          {
            fetchData && (
              <ul className="list-disc pl-6">
                {fetchData.map(user => <li className="mb-2" key={user.id}>{user.name} - {user.email}</li>)}
              </ul>
            )
          }
        </div>

        <hr/>

        <div className="mb-8">
          {
            loading && <p className="text-gray-600">Loading...</p>
          }
          {
            error && <p className="text-red-500">{error}</p>
          }
          {
            data && (
              <ul className="list-disc pl-6">
                {data.map(user => <li className="mb-2" key={user.id}>{user.name} - {user.email}</li>)}
              </ul>
            )
          }
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchDataWithAxios}>
          Fetch with axios
        </button>
      </div>
    </>
  )
}

export default App
