function TopFiveWorstLogsComponent({ dpmList }) {
    // Sort the list in ascending order and pick the top 5 worst logs
    const worstLogs = [...dpmList].sort((a, b) => a.dpmRatio - b.dpmRatio).slice(0, 5);

    return (
        <div className="top-five-worst-logs">
            <h3>Top 5 Worst Logs</h3>
            {worstLogs.map((log) => (
                <div key={log.id}> 
                    https://logs.tf/{log.id}: {log.dpmRatio} DPM
                </div>
            ))}
        </div>
    );
}
export default TopFiveWorstLogsComponent