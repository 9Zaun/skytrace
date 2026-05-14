const fromSel = document.getElementById("from");
const toSel = document.getElementById("to");

DESTINATIONS.forEach(d=>{
  fromSel.innerHTML += `<option>${d.city}</option>`;
  toSel.innerHTML += `<option>${d.city}</option>`;
});

function search(){
  const from = fromSel.value;
  const to = toSel.value;

  const res = FLIGHTS.filter(f =>
    f.from.includes(from) && f.to.includes(to)
  );

  render(res);
}

function render(arr){
  const div = document.getElementById("results");
  div.innerHTML="";

  arr.forEach(f=>{
    div.innerHTML += `
      <div>
        ${f.id} - ${f.from} → ${f.to}
        <span class="status-badge ${f.status.toLowerCase().replace(" ","-")}">
        ${f.status}
        </span>
      </div>
    `;
  });
}
