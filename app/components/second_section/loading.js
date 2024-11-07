// if loading, spin faster 
// if not, spin slower
function LoadingComponent({ setLoading }) { 
    return (
        <div className="loading-logo-container"> 
            <img className="loading-logo" src="logo.png" alt="Logo"/>
        </div> 
    ); 
}
export default LoadingComponent