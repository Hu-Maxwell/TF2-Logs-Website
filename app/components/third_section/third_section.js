import "./third_section.css";


import TopFiveWorstLogsComponent from './worst_logs.js';
import TopFiveBestLogsComponent from './best_logs.js';

function ThirdSectionComponent({ dpmList, loading }) {
    return (
        <div className="third-section"> 
            {loading === "SUCCESS" && ( 
                <div className="top-five-component">
                    <TopFiveWorstLogsComponent dpmList={dpmList} />
                    <TopFiveBestLogsComponent dpmList={dpmList} />
                </div>
            )}
        </div>
    );
}
export default ThirdSectionComponent