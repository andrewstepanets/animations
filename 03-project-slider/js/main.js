
gsap.registerPlugin(SplitText);

function init(){

    // welcome to the projects gallery
    gsap.set('.projects', {autoAlpha: 1});
    gsap.set('.project', {x: '-100%'});

    let currentStep = 1;
    const totalSlides = document.querySelectorAll('.project').length;

    createTimelineIn('next', currentStep);

    function createTimelineIn(direction, index) {

        const goPrev = direction === 'prev';

        const element = document.querySelector(`div.project0${index}`);
        const projectClasses = element.className.split(' ');
        const projectClass = projectClasses[1];
        const title = element.querySelector('.project-title');
        const subtitle = element.querySelector('.project-subtitle');
        const button = element.querySelector('.button-container');
        const splitHeadline = new SplitText(title, {type: "words, chars"});
        const chars = splitHeadline.chars;

        const letters = goPrev ? chars.reverse() : chars;

        const tlIn = gsap.timeline({
            id: "tlIn",
            defaults: {
                modifiers: {
                    x: gsap.utils.unitize(function (x) {
                        // console.log({ x }, { xF: Math.abs(x)});
                        return goPrev ? Math.abs(x) : x;
                    }),
                    rotation: gsap.utils.unitize(function (rotation) {
                        // console.log({ x }, { xF: Math.abs(x)});
                        return goPrev ? -rotation : rotation;
                    })
                }
            }
        });
        tlIn.fromTo(element, {
            autoAlpha: 0,
            x: '-100%'
        },
            {
                duration: 0.7,
                x: 0,
                autoAlpha: 1,
                ease: Power4.out,
                onStart: updateClass,
                onStartParams: [projectClass]
            })
            .from(letters, {
                x: -20, y: 30, autoAlpha: 0, scale: 0.1,
                rotation: '60deg',
                transformOrigin: '0 100% 0',
                stagger: 0.01,
                duration: 0.2,
                ease: Power1.out
            })
            .from([subtitle, button], {
                duration: 0.2,
                x: -20,
                autoAlpha: 0,
                stagger: 0.08
            }, '-=0.1');
        return tlIn;
    };

    function createTimelineOut(direction, index) {

        const goPrev = direction === 'prev';

        const element = document.querySelector(`div.project0${index}`);

        const tlOut = gsap.timeline();
        tlOut.to(element,
            {
                duration: 0.7,
                x: 250,
                autoAlpha: 0,
                modifiers: {
                    x: gsap.utils.unitize(function (x) {
                        // console.log({ x }, { xF: Math.abs(x)});
                        return goPrev ? -x : x;
                    })
                },
                ease: "back.in(2)"
            });
        return tlOut;
    }


    function updateCurrentStep(goToIndex){
        currentStep = goToIndex;

        // set active class to the correct dot
        document.querySelectorAll('.dot').forEach(
            (element, index) => {
                element.setAttribute('class', 'dot')
                if(index+1 === currentStep){
                    element.classList.add('active');
                }
            } 
        );
        positionDot();
    }

    function transition(direction, toIndex){

        
        const tlTransition = gsap.timeline({
            onStart: function() {
                console.log({fromIndex: currentStep}, {toIndex});
                updateCurrentStep(toIndex);
            }
        });

        const tlOut = createTimelineOut(direction, currentStep);
        const tlIn = createTimelineIn(direction, toIndex);

        tlTransition
            .add(tlOut)
            .add(tlIn);
        
        return tlTransition;
    }

function isTweening(){
    return gsap.isTweening('.project');
}

   document.querySelector('button.next').addEventListener('click', function(e){
       e.preventDefault();

       const isLast = currentStep === totalSlides;
       const nextStep = isLast ? 1 : currentStep + 1;

       !isTweening() && transition('next', nextStep);
   });
   document.querySelector('button.prev').addEventListener('click', function(e){
       e.preventDefault();

        const isFirst = currentStep === 1;
        const prevStep = isFirst ? totalSlides : currentStep - 1;

       !isTweening() && transition('prev', prevStep);
   });

    function updateClass(projectClass) {
        document.querySelector('body').className = projectClass;
    }

    function createNavigation(){

        //creative dots container
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'dots');

        // add active spot 
        const spot  = document.createElement('div');
        spot.setAttribute('class', 'spot');

        // create a dot for each slide
        for (let index = 1; index < totalSlides+1; index++) {
            const element = document.createElement('button');
            const text = document.createTextNode(index);
            element.appendChild(text);
            element.setAttribute('class', 'dot');
            if(currentStep === index) {
                element.classList.add('active')
            }

            element.addEventListener('click', () => {
                if( !isTweening() && currentStep !== index ) {
                    const direction = index > currentStep ? 'next' : 'prev';
                    transition(direction, index);
                }
            })
            newDiv.appendChild(element);
        }

        // add dots to the project container and add spots
        newDiv.appendChild(spot);
        document.querySelector('.projects').appendChild(newDiv);
        positionDot();
    }


    function positionDot(){
        const activeDotX = document.querySelector('.dot.active').offsetLeft;
        const spot = document.querySelector('.spot');
        const spotX = spot.offsetLeft;
        const destinationX = Math.round(activeDotX - spotX + 5);

        const dotTl = gsap.timeline();
        dotTl
            .to(spot, {
                        duration: 0.4, 
                        x: destinationX,
                        scale: 2.5,
                        ease: 'power1.Out'
                    })
            .to(
                spot, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'power1.in'
                });
    }

    createNavigation();
}

window.addEventListener('load', function(){
    init();
});
