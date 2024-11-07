function AverageDPMComponent({ dpmList }) {
    const averageDpm = dpmList.length > 0 
        ? (dpmList.reduce((sum, item) => sum + item.dpmRatio, 0) / dpmList.length).toFixed(2)
        : 0;

    const averageKd = dpmList.length > 0 
        ? (dpmList.reduce((sum, item) => sum + item.kdRatio, 0) / dpmList.length).toFixed(2)
        : 0;

    const logsFound = dpmList.length; 

    return (
        <div className="average-dpm">
            <div>
                Average DPM: {averageDpm}
            </div>
            <div>
                Average KD: {averageKd}
            </div>
            <div> 
                Logs found: {logsFound}
            </div>
        </div>
    );
}
export default AverageDPMComponent