import { useEffect } from "react";

export function withLogging(WrappedComponent: any) {
  return function WithLogging(props: any) {
    // if(!isAuth) {
    //     return <div></div>
    // } 
    useEffect(() => {
        console.log(`Component ${WrappedComponent.name} mounted`);
        return () => {
          console.log(`Component ${WrappedComponent.name} unmounted`);
        };
      }, []);
    return <div className="hoc">
      <WrappedComponent {...props} />
    </div>
  }
}