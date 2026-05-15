const API_KEY = "fa82d9f862ff510e45ce55cd5fadf469";

async function getFlights() {
    try {
        const response = await fetch(
            `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}`
        );

        const data = await response.json();

        console.log(data);

        return data.data;
    } catch (error) {
        console.error("Error fetching flights:", error);
    }
}
