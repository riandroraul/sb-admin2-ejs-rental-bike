$("#contact-us").on("submit", function (e) {
  // alert("btn submit clicked");
  // console.log(window.location.href);
  e.preventDefault();
  window.location.replace("/login");
});

$(document).ready(function () {
  $("#booking-form").on("submit", function (e) {
    e.preventDefault();
    // Tambahkan logika pengiriman data booking di sini
    alert("Booking berhasil!");
    $("#bookingModal").modal("hide");
  });
});
