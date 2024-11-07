function AverageDPMComponent({ dpmList }) {
    const average = dpmList.length > 0 
        ? (dpmList.reduce((sum, item) => sum + item.dpmRatio, 0) / dpmList.length).toFixed(2)
        : 0;

    const logsFound = dpmList.length; 

    return (
        <div className="average-dpm">
            <div>
                Average DPM: {average}
            </div>
            <div> 
                Logs found: {logsFound}
            </div>
        </div>
    );
}
export default AverageDPMComponent