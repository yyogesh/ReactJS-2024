
const Dearptment = () => {

    function handleClick() {
        alert("Hello Dearptment!")
    }
    // onclick javascript function
    // onClick react function
    // on-click angular function
    // (click) angular function

    const handleSubmitClick = (user: string) => {
        alert("Hello " + user + " Dearptment1!")
    }
    return (
        <div>
            <button onClick={handleClick}>
                Click me
            </button>
            <button onClick={() => {
                alert("Hello Dearptment1!")
            }}>
                Click me1
            </button>
            <button onClick={() => handleSubmitClick('user')}>
                Submit
            </button>
        </div>
    )
}

export default Dearptment