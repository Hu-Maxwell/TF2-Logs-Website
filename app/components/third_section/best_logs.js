function TopFiveBestLogsComponent({ dpmList }) {
    // Sort the list in descending order and pick the top 5 best logs
    const bestLogs = [...dpmList].sort((a, b) => b.dpmRatio - a.dpmRatio).slice(0, 5);

    return (
        <div className="top-five-best-logs">
            <h3>Top 5 Best Logs</h3>
            {bestLogs.map((log) => (
                <div key={log.id}> 
                    https://logs.tf/{log.id}: {log.dpmRatio} DPM
                </div>
            ))}
        </div>
    );
}
export default TopFiveBestLogsComponent