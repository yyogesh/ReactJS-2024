import './App.css'
// import Department from './components/Department';
// import Employee from './components/Employee';
import {Department, Employee} from './components/index'

function App() {
  // JavaScript
  const name = "ABC"
  const age = 30;

  const employee = {
    name: "John Doe",
    age: 35,
    department: "IT",
    jobTitle: "Software Engineer",
  }
  const isAdmin = false;

  const renderDepartment = () => {
     if(isAdmin) {
      return <Department/>
     } else {
      return <p>NO department</p>
     }
  }

  function renderEmployee() {

  }

  if(!isAdmin) {
    return <p>NO record found</p>
  }

  // html 
  return (
    <>
      <div>Hello {name}</div>
      <p>{age} {[10, 20, 30][1]}</p>
      <p>{employee.age}</p>
      <p>{employee.department + " " + employee.jobTitle}</p>
      <Employee />
      <Employee />
      <Employee />
      <Employee />
      {/* {
      isAdmin && <Department/>
      } */}
     {renderDepartment()}

     {
      isAdmin ? <Department/> : <p>NO Deparment in ternary operator</p>
     }
    </>
  )
}

export default App
