async function getGameProgress(gameId, tmaInitDataRaw) {
    try {
        const response = await fetch(`https://a2c5-217-151-231-165.ngrok-free.app/api/game_progress?game_id=${gameId}`, {
            method: "GET",
            headers: {
                "Authorization": `tma ${tmaInitDataRaw}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Return save_data if it exists, otherwise return null
        return data?.save_data || null;
    } catch (err) {
        console.error("Error fetching game progress:", err);
        return null;
    }
}


async function setGameProgress(gameId, score, saveData, tmaInitDataRaw) {
    await fetch("https://a2c5-217-151-231-165.ngrok-free.app/api/game_progress", {
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