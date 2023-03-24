const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const select = document.querySelector("#movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();   //bilgileri alıp uygulama üzerine dağıtma işlemi.
calculateTotal();   //hesaplama işlemleri.

container.addEventListener('click', function(e) {   //click, event'i eklendi. Function, e paremetresi verildi.
    // console.log(e.taget);
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle("selected");   //elemanın içinde selected varsa siler yoksa ekler.
        calculateTotal();
    }
});

select.addEventListener('change', function(e) {   //change, event'i eklendi. Function, e paremetresi verildi.
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];   //boş elemanlar
    const seatsArr = [];

    selectedSeats.forEach(function(seat) {   //function içerisindeki her bir eleman seat olarak karşımıza gelir.
        selectedSeatsArr.push(seat);   // boş elemanları doldurup diziye cevirildi.
    });

    seats.forEach(function(seat) {
        seatsArr.push(seat);
    });

    //localStorage index listesi oluşturma
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {   //Her bir eleman 'seat' icerisine teker teker kopyalanacak
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;   //eşleşen elemanların(.seat.selected) sayısı alındı.
    count.innerHTML = selectedSeatCount;
    amount.innerHTML = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    //secili koltukları sayfa uzerine dagıtma
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("seleceted");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}