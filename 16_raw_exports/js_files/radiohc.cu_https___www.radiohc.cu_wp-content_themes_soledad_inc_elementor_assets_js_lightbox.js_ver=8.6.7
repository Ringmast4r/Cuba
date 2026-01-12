(function () {
	function fixSwiperLazy(img) {
		if (img.dataset && img.dataset.src) {
			img.src = img.dataset.src;
			img.classList.remove("swiper-lazy");
			img.removeAttribute("data-src");

			// Wait for image to fully load before removing preloader
			img.addEventListener("load", function () {
				const preloader = img
					.closest(".swiper-zoom-container")
					?.querySelector(".swiper-lazy-preloader");
				if (preloader) preloader.remove();
			});
		}
	}

	function fixAllExisting() {
		document.querySelectorAll("img.swiper-lazy").forEach(fixSwiperLazy);
	}

	// Run initially on page load
	document.addEventListener("DOMContentLoaded", fixAllExisting);

	// Observe for dynamically added lazy images
	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach(function (node) {
				if (node.nodeType === 1) {
					if (node.matches("img.swiper-lazy")) {
						fixSwiperLazy(node);
					}

					node.querySelectorAll?.("img.swiper-lazy").forEach(
						fixSwiperLazy
					);
				}
			});
		});
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
})();
