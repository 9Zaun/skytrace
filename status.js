const params = new URLSearchParams(window.location.search);

const selectedAirport =
    params.get("origin") || "";

async function loadFlights() {

    const flights =
        await getFlights(selectedAirport);

    const table =
        document.getElementById("flightTable");

    table.innerHTML = "";

    flights.slice(0, 15).forEach(flight => {

        table.innerHTML += `
            <tr>
                <td>${flight.flight?.iata || "N/A"}</td>

                <td>
                    ${flight.departure?.airport || "Unknown"}
                </td>

                <td>
                    ${flight.arrival?.airport || "Unknown"}
                </td>

                <td>
                    ${flight.departure?.scheduled || "N/A"}
                </td>

                <td>
                    ${flight.flight_status || "Unknown"}
                </td>
            </tr>
        `;

    });

}

loadFlights();
