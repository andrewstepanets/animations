gsap.registerPlugin(ScrollTrigger);

function init(){
    
    // move part 3 to cover 2
    const penTopHeight = document.querySelector('.pen-top').clientHeight;

    gsap.set('.part3', {
        y: () => {
            return -(penTopHeight  - 22);
        },
        scrollTrigger: {
            id: 'pen-body',
            trigger: '.part3',
            start: 'top bottom-=270px',
            end: `+=${penTopHeight - 22}`,
            pin: true,
            markers: true
        }
    });

}

window.addEventListener('load', function(){
    init();
});
