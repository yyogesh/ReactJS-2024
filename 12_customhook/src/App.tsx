import './App.css'
import SearchFilter from './components/SearchFilter'
import useFetch from './hooks/useFetch';
import useToggle from './hooks/useToggle'
import useWindowSize from './hooks/useWindowSize';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [toggle, setToggle] = useToggle();
  const windowSize = useWindowSize();
  const {data: users, isLoading: loading} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');


  console.log(windowSize);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {toggle}
      {/* <button onClick={() => setToggle(true)}>Toggle</button> */}
      {/* <SearchFilter /> */}

      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
