const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//Fetch random users and add money
const getRandomUser = async () => {
	addUserBtn.lastChild.classList.toggle('hidden');
	addUserBtn.lastChild.classList.toggle('visible');

	const res = await fetch('https://randomuser.me/api');
	const jsonData = await res.json();

	const user = jsonData.results[0];
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};

	addData(newUser);
	updateDOM(data);
	addUserBtn.lastChild.classList.toggle('hidden');
	addUserBtn.lastChild.classList.toggle('visible');
};

const addData = (obj) => {
	data.push(obj);
};

//Update the DOM
const updateDOM = (providedData = data) => {
	//Clear the main div
	main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
	providedData.forEach((user) => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(
			user.money
		)}`;
		main.appendChild(element);
	});
};

//Fomat number as money
const formatMoney = (number) => {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

//Double the money
const doubleMoney = () => {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});

	updateDOM(data);
};

//Sort the list in descending order
const sortByRichest = () => {
	const sortedData = data.sort((elOne, elTwo) => {
		return elTwo.money - elOne.money;
	});

	updateDOM(sortedData);
};

//Show only millionaires
const filterMillionaires = () => {
	const millionaires = data.filter((user) => {
		return user.money > 1000000;
	});

	updateDOM(millionaires);
};

//Calculate total wealth
const calculateWealth = () => {
	const wealth = data.reduce((accumulator, user) => {
		return (accumulator += user.money);
	}, 0);

	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
		wealth
	)}</strong></h3>`;

	main.appendChild(wealthEl);
};

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
