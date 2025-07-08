const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/YOUR_COHORT_NAME/events';


const state = {
  parties: [],
  selectedParty: null,
};


async function fetchParties() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    state.parties = data.data;
    render();
  } catch (error) {
    console.error('Failed to fetch parties:', error);
  }
}


async function fetchPartyById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    state.selectedParty = data.data;
    render();
  } catch (error) {
    console.error('Failed to fetch party details:', error);
  }
}


function createHeader() {
  const header = document.createElement('h1');
  header.textContent = 'Party List';
  return header;
}


function createPartyList() {
  const container = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = 'Upcoming Parties';
  container.appendChild(title);

  const ul = document.createElement('ul');

  state.parties.forEach(party => {
    const li = document.createElement('li');
    li.textContent = party.name;


    if (state.selectedParty && state.selectedParty.id === party.id) {
      li.classList.add('selected');
    }

    li.addEventListener('click', () => {
      fetchPartyById(party.id);
    });

    ul.appendChild(li);
  });

  container.appendChild(ul);
  return container;
}


function createPartyDetails() {
  const container = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = 'Party Details';
  container.appendChild(title);

  if (!state.selectedParty) {
    const msg = document.createElement('p');
    msg.textContent = 'Please select a party to see details.';
    container.appendChild(msg);
    return container;
  }

  const { name, id, date, description, location } = state.selectedParty;

  const details = document.createElement('div');
  details.innerHTML = `
    <h3>${name}</h3>
    <p><strong>ID:</strong> ${id}</p>
    <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Location:</strong> ${location}</p>
  `;

  container.appendChild(details);
  return container;
}

function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  app.appendChild(createHeader());

  const layout = document.createElement('div');
  layout.style.display = 'flex';
  layout.style.gap = '2rem';

  layout.appendChild(createPartyList());
  layout.appendChild(createPartyDetails());

  app.appendChild(layout);
}


document.addEventListener('DOMContentLoaded', () => {
  fetchParties();
  render();
});
