const baseURL = "http://localhost:1212/api";
const elHamburgeMenubtn = document.querySelector(".header__hamburger");
const elHeader = document.querySelector("header");
const elBody = document.querySelector("body");
const elCategoryLinksSection = document.querySelector(".products");
const elCategoryLinksList = document.querySelector(".products_linsk-list");
const elCategoryLinksItem = document.querySelectorAll(".products_links-item");
const elCategoryLinks = document.querySelectorAll(".products_links-link");
const elHeaderBtn = elHeader.querySelector(".header__btn");
const elHeaderTabletBtn = elHeader.querySelector(".header__btn--active");
let isActive = "Barchasi"
const elHeaderOrderModal = elHeader.querySelector(".header__order-modal");
const elHeaderOrderSuccessModal = elHeader.querySelector(
	".header__order-success"
	);
	const elHeaderOrderSuccessModalBtn = elHeader.querySelector(
		".header__order-success-btn"
		);
		const elForm = elHeader.querySelector(".header__order-form");
		const elFormInputName = elForm.querySelector("#userName");
		const elFormInputTel = elForm.querySelector("#userNumber");
		const elFormSelect = elForm.querySelector("#userCategory");
		const elFormDecrementButton = elForm.querySelector(
			".header__order-count-decrement"
			);
			let elFormProductCount = elForm.querySelector("#userProductCount");
			const elFormIncrementButton = elForm.querySelector(
				".header__order-count-increment"
				);
				const elProducts = document.querySelector(".products__main-box");
				const elDiscounts = document.querySelector(".discount_main-box")
				const elInterestingWrap = document.querySelector(".interesting__main-wrap");
				const elInterestingForm = document.querySelector(".interesting__form");
				const elFormInterestingInput = elInterestingForm.querySelector(
					".interesting__input"
					);
					let elFormInterestingError = document.querySelector(".interesting__error");
					const elInterestingSuccess = document.querySelector(".interesting__success");
					let count = 1;
					let validate = false;
					const elTemplate = document.querySelector("#categories").content
					const elProductsTemplate = document.querySelector("#products").content
					const elDiscountProductsTemplate = document.querySelector("#discounts").content
					const discountFragment = document.createDocumentFragment()

					let idd=1;




					const orderModal = () => {
						return elHeaderOrderModal.classList.toggle("hide");
					};

					elHamburgeMenubtn.addEventListener("click", () => {
						elBody.classList.toggle("sitenav__list-on");
						elBody.classList.toggle("overflow");
					});

					elHeaderBtn.addEventListener("click", () => {
						elBody.classList.toggle("sitenav__list-on");
						orderModal();
						elOverlay.classList.remove("hide");
					});

					elHeaderTabletBtn.addEventListener("click", () => {
						orderModal();
						elOverlay.classList.remove("hide");
					});

					elHeaderOrderModal.addEventListener("click", (evt) => {
						if (evt.target.matches(".form-close")) {
							orderModal();
							elOverlay.classList.add("hide");
						}
					});

					const increment = () => {
						count += 1;
						elFormDecrementButton.removeAttribute("disabled");
						return (elFormProductCount.textContent = count);
					};

					const decrement = () => {
						if (elFormProductCount > 1 || count > 1) {
							count -= 1;
							return (elFormProductCount.textContent = count);
						}

						if (elFormProductCount <= 1 || count <= 1) {
							elFormDecrementButton.setAttribute("disabled", "button");
						}
					};

					elFormIncrementButton.addEventListener("click", () => {
						increment();
					});

					elFormDecrementButton.addEventListener("click", () => {
						decrement();
					});


					elForm.addEventListener("submit", (evt) => {
						evt.preventDefault();
						const userValues = {
							name: elFormInputName.value,
							number: elFormInputTel.value,
							productName: elFormSelect.value,
							count:elFormProductCount.textContent
						};


						axios
						.post("http://localhost:1212/api/orders", userValues)
						.then((res) => {
							if(res.status >=200 && res.status <210) {
								elHeaderOrderSuccessModal.classList.toggle("hide");
							}
						})
						.catch((error) => {
							Toastify({
								text: error.response.data.message,
								duration: 5000,
								close: true,
								position: 'right', // `left`, `center` or `right`
								backgroundColor: "red",
								stopOnFocus: true, // Prevents dismissing of toast on hover
								onClick: function(){} // Callback after click
							}).showToast();
						});
					});

					elHeaderOrderSuccessModalBtn.addEventListener("click", (evt) => {
						elHeaderOrderSuccessModal.classList.toggle("hide");
						orderModal();
						elOverlay.classList.add("hide");
						(elFormInputName.value = ""),
						(elFormInputTel.value = ""),
						elFormSelect.value,
						(elFormProductCount.textContent = count);
					});

					/* Hero swiper start */

					const swiper = new Swiper(".mySwiper", {
						pagination: {
							el: ".hero__pagination",
							clickable: true,
							type: "progressbar",
						},
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
						autoplay: {
							delay: 1500,
							disableOnInteraction: false,
						},
						loop: true,
						watchSlidesProgress: true,
					});

					/* Hero swiper end */

					/* Counters start */

					const cu = new counterUp({
						duration: 1500,
						prepend: "",
						append: "",
						selector: ".countup",
						start: 0,
						end: 7,
						intvalues: true,
					});

					const customersCount = new counterUp({
						duration: 1000,
						prepend: "",
						append: "k+",
						selector: ".customers",
						start: 0,
						end: 10,
						interval: 10,
						intvalues: true,
					});

					const yearCount = new counterUp({
						duration: 1500,
						prepend: "",
						append: "",
						selector: ".year",
						start: 0,
						end: 10,
						intvalues: true,
					});

					const dayCount = new counterUp({
						duration: 1500,
						prepend: "",
						append: "",
						selector: ".day",
						start: 0,
						end: 3,
						intvalues: true,
					});

					cu.start();
					customersCount.start();
					yearCount.start();
					dayCount.start();

					/* Counters end */

					/* Products active link function start */

					async function getCategories() {
						try {
							console.log(elTemplate)
							const res = await fetch(`${baseURL}/products`);
							const data = await res.json();
							data?.categories?.forEach((category) => {
								const cloned = elTemplate.cloneNode(true)
								cloned.querySelector(".products_links-link").textContent = category.category
								let active = cloned.querySelector(".products_links-link")
								if(active.innerHTML == isActive) {
									active.classList.add("products_links-link--active")
								}
								else {
									active.classList.remove("products_links-link--active")
								}
								fragment.appendChild(cloned)
							});
							elCategoryLinksList.appendChild(fragment)
						} catch {}
					}

					getCategories();

					let testT = document.querySelector(".test-title")

					async function getProductsSelect() {
						try {
							const res = await fetch("http://localhost:1212/api/products");
							if(res.status >=200 && res.status < 210) {
								const data = await res.json();
								let products = data.products
								const clonedDiscount = elDiscountProductsTemplate.cloneNode(!0)
								products?.forEach((product, i) => {
									let option = document.createElement("option")
									option.textContent = product.name
									option.value = product.name
									elFormSelect.appendChild(option)
									// let images = product.product_images.replaceAll("[", '').replaceAll("]", '').replaceAll('"', "").split(",")
									// console.log(images)

									// const cloned = elProductsTemplate.cloneNode(!0)
									// cloned.querySelector(".products__zoom-btn").dataset.productIndex = product.id
									// cloned.querySelector(".products__imgg").src = `http://localhost:1212/products/${product?.product_images.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").split(",")[0]}`;

									// cloned.querySelectorAll(".products__zoom-selected").src = `http://localhost:1212/products/${product[i]?.product_images.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").split(",")[0]}`;

									// cloned.querySelector(".products__zoom-btn").addEventListener("click", (evt) => {
									// 	let finded = Number(evt.target.dataset.productIndex)
									// 	let findedData = products.find(item => item.id === finded)
									// 	let images = findedData.product_images.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").split(",")
									// 	cloned.querySelector(".img-1").src =  `http://localhost:1212/products/${images[0]}`;
									// 	cloned.querySelector(".img-1").src =  `http://localhost:1212/products/${images[1]}`;
									// 	cloned.querySelector(".img-1").src =  `http://localhost:1212/products/${images[2]};


									// )}
									cloned.querySelector(".products_right-title").textContent = product?.name
									cloned.querySelector(".weight").textContent = product.weight
									cloned.querySelector(".warranty").textContent = product.warranty
									cloned.querySelector(".size").textContent = product.size;
									cloned.querySelector(".capacity").textContent = product.capacity
									cloned.querySelector(".new").textContent = product.status === "1" ? "YANGI MAHSULOT" : ""
									product.status === "1" ? cloned.querySelector(".new").classList.add("products_new-btn") : ""
									cloned.querySelector(".products_right-desc").textContent = product.body;
									cloned.querySelector(".products_right-price-value").textContent = product.cost;

									fragment.appendChild(cloned)
								})
								let discountData = data?.products.filter(item => item.new_cost !== null)
								console.log(discountData)
								elProducts.appendChild(fragment)
								elDiscounts.appendChild(discountFragment)
								readyAllEvents()


						} catch (e) {
							console.error(e);
						}
					

					getProductsSelect();





					// const test = () => {
					// 	elCategoryLinks.forEach((link) => {
					// 		if (link.innerHTML == isActive) {
					// 			link.classList.add("products_links-link--active");
					// 		} else {
					// 			link.classList.remove("products_links-link--active");
					// 		}
					// 	});
					// };

					// elCategoryLinksList.addEventListener("click", (evt) => {
					// 	evt.preventDefault();
					// 	const targeted = evt.target;
					// 	console.log(targeted)
					// 	if (targeted.matches(".products_links-link")) {
					// 		isActive = targeted.innerHTML;
					// 	}else {
					// 		console.log("Noo")
					// 	}
					// })
					// // });

					/* Products active link function end */

					/* Product zoom modal function start */

					async function readyAllEvents() {





						const elProductsZoombtn = document.querySelectorAll(".products__zoom-btn");
						const elProductZoomBtn = document.querySelector(".products__zoom-btn")
						const elProductsZoomSelected = document.querySelector(
							".products__zoom-selected-box"
							);
							const elProductsZoomSelectedImg = document.querySelector(
								".products__zoom-selected"
								);
								const elProductsZoomItem = document.querySelectorAll(".products__zoom-item");
								const elProductsZommImg = document.querySelectorAll(".products__zoom-img");
								const elProductsZommCloseBtn = document.querySelector(".products__zoom-close");
								const elProductsRightOrderBtn = document.querySelector(".products_right-order");
								const elHeaderFormCloseBtn = document.querySelector(".form-close");
								const elOverlay = document.querySelector(".overlay");



								elProductsZoombtn.forEach(item => {
									item.addEventListener("click", () => {
										elProductsZoomSelected.classList.remove("hide");
										elOverlay.classList.remove("hide");
									})
								})


								elProductsZommCloseBtn.addEventListener("click", () => {
									elProductsZoomSelected.classList.add("hide");
									elOverlay.classList.add("hide");
								});


								elProductsZommImg.forEach((img) => {
									img.addEventListener("click", (evt) => {
										elProductsZoomSelectedImg.src = evt.target.src;
										elProductsZoomItem.forEach((item) => {
											item.classList.remove("mod");
										});
										img.parentElement.classList.add("mod");
									});
								});

								elProductsRightOrderBtn.addEventListener("click", () => {
									elOverlay.classList.remove("hide");
									orderModal();
								});

								/* Product zoom modal function end */


							}


							// document.onclick = () => {testt()}

							// const testt = () => {
							// 	if(navigator.onLine) {
							// 		console.log("Online")
							// 	}else {
							// 		console.log("Offline")
							// 	}
							// }

							/* Address swiper start */

							const addressSwiper = new Swiper(".addressSwiper", {
								pagination: {
									clickable: true,
								},
								autoplay: {
									delay: 8000,
									// disableOnInteraction: false,
								},

							});

							/* Address swiper end */

							/* Address inner swiper start */

							const addressSwiperInner = new Swiper(".addressSwiperInner", {
								pagination: {
									el: ".address__pagination",
									clickable: true,
									type: "progressbar",
								},
								autoplay: {
									delay: 2500,
								},
								// observer: true,
								// observeParents: true,
								// watchSlidesProgress: true,
							});

							/* Address inner swiper end */

							const showSuccessApellation = () => {
								elInterestingWrap.classList.toggle("hide");

								elInterestingSuccess.classList.toggle("hide");
								setTimeout(() => {
									elInterestingSuccess.classList.toggle("hide");
									elInterestingWrap.classList.toggle("hide");
								}, 2500);
							};

							elInterestingForm.addEventListener("submit", (evt) => {
								evt.preventDefault();

								let inputNumberValue = elFormInterestingInput.value;
								if (inputNumberValue.length === 7) {
									showSuccessApellation();
									elFormInterestingInput.value = "";
									elFormInterestingError.textContent = "";
								} else {
									elFormInterestingError.textContent =
									"Raqam 7 ta sondan iborat bo'lishi kerak !";
								}
							});

							// doubleLetters

							let words = ["O'", "G'", "Sh", "Ch"];

							// fakeData

							let me = [
								{
									first_name: "Shahobiddin",
									last_name: "Faxritdinov",
								},
							];

							// DoubleLetter generate

							let firstDoubleLetter = me[0]?.first_name
							?.charAt(0)
							?.concat(me[0]?.first_name?.charAt(1));
							let lastDoubleLetter = me[0]?.last_name
							?.charAt(0)
							?.concat(me[0]?.last_name?.charAt(1));
							// console.log(lastDoubleLetter)

							let fN, lN;

							// If data pending avoid null or NaN in span innerHTML

							try {
								fN = me[0]?.first_name ? me[0]?.first_name?.charAt(0) : "";
								lN = me[0]?.last_name ? me[0]?.last_name?.charAt(0) : "";
							} catch {}

							// Check and assignment user first/last name to doubleLetter

							words.forEach((word) => {
								if (word === firstDoubleLetter) {
									fN = word;
								}

								if (word === lastDoubleLetter) {
									lN = word;
								}
							});

							console.log(fN, lN);
