async function searchFlights() {

    const from =
        document.getElementById("fromInput")
            .value
            .trim()
            .toUpperCase();

    const to =
        document.getElementById("toInput")
            .value
            .trim()
            .toUpperCase();

    const flights = await getFlights(from);

    const container =
        document.getElementById("resultsContainer");

    container.innerHTML = "";

    const filtered = flights.filter(flight => {

        const arrivalIata =
            flight.arrival?.iata?.toUpperCase() || "";

        const arrivalAirport =
            flight.arrival?.airport?.toUpperCase() || "";

        return (
            arrivalIata.includes(to) ||
            arrivalAirport.includes(to)
        );

    });

    if (filtered.length === 0) {

        container.innerHTML = `
            <div class="text-gray-500">
                No flights found.
            </div>
        `;

        return;
    }

    filtered.slice(0, 12).forEach(flight => {

        container.innerHTML += `

            <div class="flight-card rounded-xl p-6">

                <div class="flex justify-between mb-6">

                    <div>

                        <div class="text-2xl font-bold gold">
                            ${flight.flight?.iata || "N/A"}
                        </div>

                        <div class="text-gray-500 text-sm">
                            ${flight.airline?.name || "Unknown Airline"}
                        </div>

                    </div>

                    <div class="text-right">

                        <div class="text-sm text-gray-500">
                            STATUS
                        </div>

                        <div class="gold uppercase text-sm">
                            ${flight.flight_status || "ACTIVE"}
                        </div>

                    </div>

                </div>

                <div class="grid grid-cols-2 gap-6">

                    <div>

                        <div class="text-gray-500 text-sm mb-2">
                            DEPARTURE
                        </div>

                        <div class="text-lg">
                            ${flight.departure?.airport || "Unknown"}
                        </div>

                    </div>

                    <div>

                        <div class="text-gray-500 text-sm mb-2">
                            ARRIVAL
                        </div>

                        <div class="text-lg">
                            ${flight.arrival?.airport || "Unknown"}
                        </div>

                    </div>

                </div>

            </div>

        `;
    });

}
