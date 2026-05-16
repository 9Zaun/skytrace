const params = new URLSearchParams(window.location.search);

const selectedAirport =
    params.get("origin") || "";

async function loadFlights() {

    const table =
        document.getElementById("flightTable");

    table.innerHTML = "";

    try {

        const flights =
            await getFlights(selectedAirport);

        if (!flights || flights.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5"
                        style="
                            text-align:center;
                            color:var(--muted);
                            padding:40px;
                        ">
                        No flights found.
                    </td>
                </tr>
            `;

            return;
        }

        flights.slice(0, 15).forEach(flight => {

            const status =
                flight.flight_status || "Unknown";

            const statusClass =
                status === "active"
                    ? "status-active"
                    : status === "landed"
                        ? "status-landed"
                        : status === "delayed"
                            ? "status-delayed"
                            : status === "cancelled"
                                ? "status-cancelled"
                                : "";

            table.innerHTML += `
                <tr>

                    <td
                        style="
                            font-family:var(--font-mono);
                            color:var(--gold);
                            font-weight:700;
                            letter-spacing:2px;
                        "
                    >
                        ${flight.flight?.iata || "N/A"}
                    </td>

                    <td>
                        ${flight.departure?.airport || "Unknown"}
                    </td>

                    <td>
                        ${flight.arrival?.airport || "Unknown"}
                    </td>

                    <td style="font-family:var(--font-mono)">
                        ${flight.departure?.scheduled
                    ? new Date(
                        flight.departure.scheduled
                    )
                        .toTimeString()
                        .slice(0, 5)
                    : "N/A"
                }
                    </td>

                    <td>
                        <span class="status-badge ${statusClass}">
                            ${status.toUpperCase()}
                        </span>
                    </td>

                </tr>
            `;
        });

    }

    catch (err) {

        console.error(err);

        table.innerHTML = `
            <tr>
                <td colspan="5"
                    style="
                        text-align:center;
                        color:var(--muted);
                        padding:40px;
                    ">
                    Could not connect to flight data API.
                </td>
            </tr>
        `;
    }
}

loadFlights();
