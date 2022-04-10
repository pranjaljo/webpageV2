Reveal.initialize({
    hashOneBasedIndex: true,
    hash: true,
    controls: true,
    controlsTutorial: true,
    controlsBackArrows: 'visible',
    progress: false,
    history: true,
    center: true,
    transition: 'convex',
    backgroundTransition: 'slide',
    autoAnimateDuration: 0.1,
    transitionSpeed: 'slow'
});

const header = document.querySelector("header");
Reveal.on( 'slidechanged', event => {
	console.log('sdsd');
	header.querySelectorAll("button").forEach((btn) => {btn.classList.remove('active')});
	if(event.indexh === 0){
		header.querySelector("button[data-header='home']").classList.add('active')
	} else if(event.inhdexh ===1){

	} else if(event.indexh ===2){
		//slide3
		header.querySelector("button[data-header='projects']").classList.add('active')
	}
  } );


