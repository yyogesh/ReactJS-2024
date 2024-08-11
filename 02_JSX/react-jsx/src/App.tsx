import './App.css'
import Product from './components/Product';

function Button() {
  return (
    <button>
      I'm a button
    </button>
  );
}

// const Input = function() {
//   return (
//     <input aria-label='test' type="text"/>
//   );
// }


const Input = () => {
  return (
    <input aria-label='test' type="text" />
  );
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

const imageStyle = {
  width: user.imageSize,
  height: user.imageSize,
  border: "4px solid silver",
  marginLeft: "10px", // margin-left
}


function App() {
  // props
  let isAdmin = true;
  let content; // content will hold a component
  if(!isAdmin) {
    content = <Button />
  } else {
    content = <Input />
  }

  // loading
  return (
    <>
      <h1>{user.name}</h1>
      <img
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        className='avatar'
        style={imageStyle}
      />
      <h2 className={"heading"}>Hello these are our custom components</h2>
     
      {content}

      {
        isAdmin ? <Input /> : <Button />
      }

      {
        isAdmin && <Input />
      }

      <hr/>
      <Product/>
    </>
  )
}

export default App
