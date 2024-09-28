// import Button from './comonents/Button/Button'
import InlineStyleExample from './comonents/InlineStyleExample'
import StyledComponentButton from './comonents/StyledComponentButton/StyledComponentButton'
import { Header, Button } from './style/style'

function App() {

  return (
    <>
       <Header>
        this is header tag
        <Button>Default Button</Button>
        <Button primary>Primary Button</Button>
       </Header>
      <InlineStyleExample/>
      // <Button/>
      <StyledComponentButton/>
    </>
  )
}

export default App
