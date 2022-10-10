const app = {};

// namespace variables
app.menuIcon = document.querySelector('.navIcon');
app.closeIcon = document.querySelector('.buttonContainer');
app.slideOut = document.getElementById('slideOutNavElement');

// init method that will run when our app first loads
app.init = () => {
    app.showClass();
    app.hideClass();
}

// function that will show slide out menu
app.showClass = () => {
    app.menuIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('hide');
        app.slideOut.classList.add('show');
    });
}

// function that will hide slide out menu
app.hideClass = () => {
    app.closeIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('show');
        app.slideOut.classList.add('hide');
    });
}

app.init()