const API_KEY = "fa82d9f862ff510e45ce55cd5fadf469";

async function getFlights(origin = "") {

    try {

        let url =
            `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}`;

        // Add airport filter if selected
        if (origin) {

            url += `&dep_iata=${origin}`;

        }

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        return data.data || [];

    }

    catch (error) {

        console.error(
            "Error fetching flights:",
            error
        );

        return [];

    }

}
