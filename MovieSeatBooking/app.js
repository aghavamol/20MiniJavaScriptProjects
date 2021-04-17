const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const moviePoster = document.getElementById('poster');

const populateUI = () => {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
};

populateUI();
let ticketPrice = +movieSelect.value;

const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
};

const setMovieData = (selectedMovie, selectedMoviePrice) => {
	localStorage.setItem('selectedMovieIndex', selectedMovie);
	localStorage.setItem('selectedMoviePrice', selectedMoviePrice);
};

movieSelect.addEventListener('change', (event) => {
	ticketPrice = +event.target.value;
	console.log(ticketPrice);
	setMovieData(event.target.selectedIndex, event.target.value);
	updateSelectedCount();
});

container.addEventListener('click', (event) => {
	const targetClassList = event.target.classList;

	if (
		targetClassList.contains('seat') &&
		!targetClassList.contains('occupied')
	) {
		targetClassList.toggle('selected');
		updateSelectedCount();
	}
});

updateSelectedCount();
