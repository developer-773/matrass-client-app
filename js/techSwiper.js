import {baseURL} from "./constants"
const fragment = document.createDocumentFragment();
const elTechSwiperWrap = document.querySelector(".techWrapper");
let slidesPerVieww=1,
	spaceBetweenn=2,
	centered=true

const renderTechSwiper = async () => {
	try {
		const res = await fetch(`${baseURL}/technology`);
		const data = await res.json();
		data?.forEach((item) => {
			let box = document.createElement("div");
			box.classList.add("swiper-slide");
			box.innerHTML = `
			<h3 class="swiper-title techSwiper-title">${item?.name}</h3>
			<div class="video">
					<a class="video__link" href="https://youtu.be/${item?.link}">
						<picture>
							<source
								class="source"
								srcset="
								https://i.ytimg.com/vi_webp/${item?.thumbnail}/maxresdefault.webp
								"
								type="image/webp"
							/>
							<img
								class="video__media"
								src="https://i.ytimg.com/vi/${item?.thumbnail}/maxresdefault.jpg"
							/>
						</picture>
					</a>
					<button class="video__button" aria-label="Play video">
						<svg
							width="50"
							height="50"
							viewBox="0 0 50 50"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="25" cy="25" r="25" fill="#01384D" />
							<path
								class="video__button-shape"
								d="M31.0001 23.1581C32.3335 23.9279 33.0001 24.3128 33.0001 24.8902C33.0001 25.4675 32.3335 25.8524 31.0001 26.6222L22.0001 31.8184C20.6668 32.5882 20.0001 32.9731 19.5001 32.6844C19.0001 32.3958 19.0001 31.626 19.0001 30.0864V19.694C19.0001 18.1544 19.0001 17.3846 19.5001 17.096C20.0001 16.8073 20.6668 17.1922 22.0001 17.962L31.0001 23.1581Z"
								fill="white"
							/>
						</svg>
					</button>
				</div>
				<p class="swiper-description techDesc">${item?.description}</p>`
			fragment.appendChild(box)
		});
		elTechSwiperWrap.appendChild(fragment);
	} catch (error){
		console.log(error)
	}
}

renderTechSwiper();


function findVideos() {
    let videos = document.querySelectorAll(".video")
    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
        let iframe = createIframe(id);

        link.remove();
        button.remove();
        video.appendChild(iframe);
    });
    link.removeAttribute('href');
    video.classList.add('video--enabled');
}

function parseMediaURL(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
}

function createIframe(id) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');
    return iframe;
}

function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
}

setTimeout(() => {
	findVideos();
}, 1500)



const adaptiveTechSwipers = () => {
	if ((window.matchMedia("(min-width: 768px)")).matches) {
		(slidesPerVieww = 3), (spaceBetweenn = 30), (centered=false);

	}
};

adaptiveTechSwipers()


let techSwiper = new Swiper(".techSwiper", {
	pagination: {
		el: ".tech__pagination",
		clickable: true,
	},
	autoplay: {
			delay: 2500,
		},
		centeredSlides: centered,
		slidesPerView: slidesPerVieww,
		spaceBetween: spaceBetweenn,
		
	});
