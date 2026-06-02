/* ------------------------------------------------
   Pulse — animated blob cursor
   Include this in every page:
   <script src="cursor.js" defer></script>
   ------------------------------------------------ */

(function () {
    /* Hide the default cursor site-wide */
    document.documentElement.style.cursor = 'none';

    /* ---- Create the two cursor elements ---- */
    const dot   = document.createElement('div');   // sharp centre dot
    const blob  = document.createElement('div');   // soft trailing blob

    dot.className  = 'cursor-dot';
    blob.className = 'cursor-blob';

    document.body.appendChild(blob);
    document.body.appendChild(dot);

    /* ---- Track mouse position ---- */
    let mouseX = -200, mouseY = -200;   // start off-screen
    let blobX  = -200, blobY  = -200;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* ---- Animate blob with lerp so it trails smoothly ---- */
    const SPEED = 0.10;   // 0–1: lower = more lag

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
        blobX = lerp(blobX, mouseX, SPEED);
        blobY = lerp(blobY, mouseY, SPEED);

        dot.style.transform  = `translate(${mouseX}px, ${mouseY}px)`;
        blob.style.transform = `translate(${blobX}px, ${blobY}px)`;

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    /* ---- Grow blob on hover over clickable elements ---- */
    const clickables = 'a, button, [role="button"], input, label, select, textarea, .topnav .icon';

    document.addEventListener('mouseover', (e) => {
        if (e.target.matches(clickables) || e.target.closest(clickables)) {
            blob.classList.add('cursor-blob--hover');
            dot.classList.add('cursor-dot--hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.matches(clickables) || e.target.closest(clickables)) {
            blob.classList.remove('cursor-blob--hover');
            dot.classList.remove('cursor-dot--hover');
        }
    });

    /* ---- Squish on click ---- */
    document.addEventListener('mousedown', () => blob.classList.add('cursor-blob--click'));
    document.addEventListener('mouseup',   () => blob.classList.remove('cursor-blob--click'));

    /* ---- Hide when cursor leaves window ---- */
    document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0';
        blob.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity  = '1';
        blob.style.opacity = '1';
    });
})();



const carousel = document.getElementById("projectCarousel");
const thumb = document.getElementById("carouselThumb");

carousel.addEventListener("scroll", () => {
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

    const progress = (scrollLeft / scrollWidth) * 100;

    thumb.style.width = progress + "%";
});

    