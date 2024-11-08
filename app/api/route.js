function convertToId3(id64) {
    // stuff
    // base log 76561197960265728
    const steamIdBase = BigInt("76561197960265728");
    const convertedId64 = BigInt(id64);
    const id3 = BigInt(convertedId64 - steamIdBase);
    
    return `[U:1:${id3.toString()}]`; 
}

// todo: only allow 6s games
export async function fetchLogList(id64) {
    const response = await fetch(`https://logs.tf/api/v1/log?player=${id64}`);
    const data = await response.json();
    
    // Ensure unique log IDs
    const uniqueLogs = Array.from(
        new Set(
            data.logs
            .filter(log => log.players === 12) 
            .map(log => log.id)
        )
    );

    return uniqueLogs;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id64 = searchParams.get('id64');

    if (!id64) {
        return new Response('id64 is required', { status: 400 });
    }

    const logsList = await fetchLogList(id64); 
    const id3 = convertToId3(id64);

    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    (async () => {
        for(let i = 0; i < logsList.length; i++) {
            console.log(logsList[i]); 
            const response = await fetch(`https://logs.tf/api/v1/log/${logsList[i]}`);

            if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
                console.error(`Skipping log ${logsList[i]} due to invalid response.`);
                continue;
            }

            const logData = await response.json(); 
            const userPlayer = logData.players[id3];

            
            if(
                userPlayer.class_stats[0].type == "medic" ||
                userPlayer.class_stats[0].total_time < 1200 || 
                logData.length < 1200
            ) { 
                console.log("BB" + logsList[i]); 
                // skip
            } else { 
                let userDpm = 0;
                let userKd = 0;

                let totalDpm = 0; 
                let totalKd = 0; 

                let playerCount = 0; 
                
                for (const key in logData.players) {
                    const player = logData.players[key];
    
                    if (player === userPlayer) {
                        userDpm = userPlayer.dapm;
                        userKd = Number(userPlayer.kpd); 
                        playerCount++;
                    } else {
                        if (
                            player.class_stats[0].type != "medic" && 
                            player.class_stats[0].total_time > 1200
                        ) {
                            totalDpm += player.dapm;
                            totalKd += Number(player.kpd); 
                            playerCount++; 
                        }
                    }
                }
    
                let avgDpm = totalDpm / playerCount; 
                let dpmRatio = userDpm / avgDpm; 
                
                let avgKd = totalKd / playerCount; 
                let kdRatio = userKd / avgKd; 
    
                await writer.write(encoder.encode(JSON.stringify({
                    id: logsList[i],
                    dpmRatio: dpmRatio, 
                    kdRatio: kdRatio 
                }) + '\n'));
            }
        }

        await writer.close(); 
    })(); 

    return new Response(stream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
}

