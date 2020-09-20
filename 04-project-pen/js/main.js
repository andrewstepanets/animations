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

    // add class to all parts to reveal the text

    const allParts = gsap.utils.toArray('.part');
    allParts.forEach((part, index) => {
        

        let startPosition = 'top center';

        if(index === 2) {
            startPosition = `top-=100 center`;
            // this should be work?
            // startPosition = `top+=${getTopPartsHeight()} center`;
        }

        gsap.set(part, {
            scrollTrigger: {
                id: `${part.getAttribute('class')}`,
                trigger: part,
                start: startPosition,
                toggleClass: 'fade-in'
        }
    })

    });
   

    // using GSAP utils toArray

    // Part 6 will be  -842px - translateY
    // Part 5  = -722px
    // Part 4 = -547px

    const partTopOffsets = [547, 722, 842];

    const fixPart = (el, offset, index) => {
        gsap.set(el, { y: -offset });

        gsap.to(el, {
            y: 0, ease: 'none', scrollTrigger: {
                trigger: '.pen-body',
                start: 'top bottom-=640px',
                end: `+=${offset}`,
                scrub: true,
                // markers: true
            }
        });
    };

    gsap.utils
        .toArray(['.part4', '.part5', '.part6'])
        .forEach((part, index) => {
            fixPart(part, partTopOffsets[index], index);
        });

    

    // gsap.set('.part4', {y: '-547px'});
    // gsap.set('.part5', {y: '-722px'});
    // gsap.set('.part6', {y: '-842px'});

    // tween the tip of the pen back to 0

    // gsap.to('.part6', {y: 0, ease: 'none', scrollTrigger: {
    //     trigger: '.pen-body',
    //     start: 'top bottom-=640px',
    //     end: '+=842px',
    //     scrub: true,
    //     markers: true
    // }});
    // gsap.to('.part5', {y: 0, ease: 'none', scrollTrigger: {
    //     trigger: '.pen-body',
    //     start: 'top bottom-=640px',
    //     end: '+=722px',
    //     scrub: true,
    //     markers: true
    // }});
    // gsap.to('.part4', {y: 0, ease: 'none', scrollTrigger: {
    //     trigger: '.pen-body',
    //     start: 'top bottom-=640px',
    //     end: '+=547px',
    //     scrub: true,
    //     markers: true
    // }});

}

window.addEventListener('load', function(){
    init();
});
