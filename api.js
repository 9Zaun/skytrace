const API_KEY = "74706835d8e8c58d536ae3daa63688fd";

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
