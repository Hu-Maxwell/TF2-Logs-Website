import TopFiveWorstLogsComponent from './worst_logs.js';
import TopFiveBestLogsComponent from './best_logs.js';

function ThirdSectionComponent({ dpmList, loading }) {
    return (
        <div className="third-section"> 
            {loading === "SUCCESS" && ( 
                <>
                    <TopFiveWorstLogsComponent dpmList={dpmList} />
                    <TopFiveBestLogsComponent dpmList={dpmList} />
                </>
            )}
        </div>
    );
}
export default ThirdSectionComponent