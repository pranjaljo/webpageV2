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
	header.querySelectorAll(".active").forEach((btn) => {btn.classList.remove('active')});
	if(event.indexh === 0){
		header.querySelector("button[data-header='home']").classList.add('active')
    header.querySelector('.inner-nav-container button').innerHTML = header.querySelectorAll(`.inner-nav-link`)[0].innerHTML
	} else if(event.indexh ===1){
    header.querySelector('.inner-nav-container button').classList.add('active');
    header.querySelector('.inner-nav-container button').innerHTML = header.querySelectorAll(`.inner-nav-link`)[event.indexv].innerHTML
	} else if(event.indexh ===2){
		header.querySelector("button[data-header='projects']").classList.add('active')
    header.querySelector('.inner-nav-container button').innerHTML = header.querySelectorAll(`.inner-nav-link`)[0].innerHTML
	}
  } );


