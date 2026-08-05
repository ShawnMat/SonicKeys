document.querySelectorAll(".whiteKeys, .blackKeys").forEach(key => {

    key.addEventListener("click", function () {

        this.classList.add("active");

        setTimeout(() => {
            this.classList.remove("active");
        }, 300);

    });

});

document.addEventListener("keydown",function(e){
    const pianoKey = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`);
    console.log(pianoKey);
    
})