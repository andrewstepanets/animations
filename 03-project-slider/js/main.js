
gsap.registerPlugin(SplitText);

function init(){

    // welcome to the projects gallery
    gsap.set('.projects', {autoAlpha: 1});
    gsap.set('.project', {x: '-100%'});

    let currentStep = 1;
    const totalSlides = document.querySelectorAll('.project').length;

    createTimelineIn('prev', currentStep);

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

    function getGoToIndex(direction, index){

        let goToIndex = index;

        if(direction === 'next') {
            goToIndex = index < totalSlides ? index + 1 : 1;
        } else {
            goToIndex = index > 1 ? index - 1 : totalSlides ;
        }

        return goToIndex;
    }

    function updateCurrentStep(goToIndex){
        currentStep = goToIndex;
    }

    function transition(direction, index){

        const goToIndex = getGoToIndex(direction, index);
        
        const tlTransition = gsap.timeline({
            onStart: function() {
                console.log({index}, {goToIndex});
                updateCurrentStep(goToIndex);
            }
        });

        const tlOut = createTimelineOut(direction, index);
        const tlIn = createTimelineIn(direction, goToIndex);

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
       !isTweening() && transition('next', currentStep);
   });
   document.querySelector('button.prev').addEventListener('click', function(e){
       e.preventDefault();
       !isTweening() && transition('prev', currentStep);
   });

    function updateClass(projectClass) {
        document.querySelector('body').className = projectClass;
    }

}

window.addEventListener('load', function(){
    init();
});
