

const h2Style = {
    color: 'navy'
}

const InlineStyleExample = () => {
  return (
    <div style={{backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', marginBottom: '10px'}}>
         <h2 style={h2Style}>
            Inline Style
         </h2>
    </div>
  )
}

export default InlineStyleExample