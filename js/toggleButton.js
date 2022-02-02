const moreInfoDiv = document.getElementById('more-div');
document.getElementById("more-btn").addEventListener('click', function(e) {
    if (moreInfoDiv.style.display === "none") {
        moreInfoDiv.style.display = "flex";
    } else {
        moreInfoDiv.style.display = "none";
    }
    e.preventDefault();
});