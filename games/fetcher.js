async function getGameProgress(gameId, tmaInitDataRaw) {
    return await fetch(`https://3a8b-94-25-229-237.ngrok-free.app/api/game_progress?game_id=${gameId}`, {
        method: "GET",
        headers: {
            "Authorization": `tma ${tmaInitDataRaw}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.json();
        return data["save_data"];
    }).catch(err => {
        console.log(err);
        return null;
    });
}


async function setGameProgress(gameId, score, saveData, tmaInitDataRaw) {
    await fetch("https://3a8b-94-25-229-237.ngrok-free.app/api/game_progress", {
        method: "POST",
        headers: {
            "Authorization": `tma ${tmaInitDataRaw}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(
            {
                game_id: gameId,
                score: score,
                save_data: JSON.stringify(saveData)
            }
        ),
    });
}