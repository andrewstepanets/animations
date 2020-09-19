gsap.registerPlugin(ScrollTrigger);

const getTopPartsHeight = () => {
   return document.querySelector('.pen-top').clientHeight - 22;
};


function init(){
    
    // move part 3 to cover 2
    // const penTopHeight = document.querySelector('.pen-top').clientHeight;

    gsap.set('.part3', {
        y: () => {
            return -(getTopPartsHeight());
        },
        scrollTrigger: {
            id: 'pen-body',
            trigger: '.part3',
            start: 'top bottom-=270px',
            end: `+=${getTopPartsHeight()}`,
            pin: true,
            pinSpacing: false,
        }
    });

    // Part 6 will be  -842px - translateY
    // Part 5  = -722px
    // Part 4 = -547px

    gsap.set('.part4', {y: '-547px'});
    gsap.set('.part5', {y: '-722px'});
    gsap.set('.part6', {y: '-842px'});

    // tween the tip of the pen back to 0

    gsap.to('.part6', {y: 0, ease: 'none', scrollTrigger: {
        trigger: '.pen-body',
        start: 'top bottom-=640px',
        end: '+=842px',
        scrub: true,
        markers: true
    }});

}

window.addEventListener('load', function(){
    init();
});
