import HeaderComponent from './header.js';
import InputComponent from './input.js';

function FirstSectionComponent({ setId64, setLoading }) { 
    const handleSearch = (inputId64) => {
        setId64(inputId64); 
    };


    return (
        <div className="first-section"> 
            <HeaderComponent/> 

            <InputComponent handleSearch={handleSearch} setLoading={setLoading}/>
        </div> 
    );
}
export default FirstSectionComponent