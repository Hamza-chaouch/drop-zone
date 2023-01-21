
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":root {\r\n    --drop-border-color: rgba(148, 149, 152, 0.7);\r\n    --drop-border-color-hover: #4D94F4;\r\n}\r\n.drop-files {\r\n    border: 2px dashed var(--drop-border-color);\r\n    border-radius: 3px;\r\n    position: relative;\r\n    transition: border .3s;\r\n    padding: 10px 5px;\r\n}\r\n\r\n.drop-files.is-hovered {\r\n    border-color:  var(--drop-border-color-hover);\r\n}\r\n.drop-files.is-hovered .drop-files__explanations {\r\n    color:  var(--drop-border-color-hover);\r\n}\r\n.drop-files .drop-files__explanations {\r\n    color:  var(--drop-border-color);\r\n}\r\n.drop-files__explanations {\r\n    padding: 40px 0;\r\n    text-align: center;\r\n}\r\n\r\n.drop-files__fake {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    opacity: 0;\r\n}\r\n\r\n.drop-files.is-hovered input:last-child {\r\n    z-index: 3;\r\n}\r\n\r\n.drop-files__files {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.drop-files__file {\r\n    position: relative;\r\n    max-width: 100px;\r\n    width: 100%;\r\n    flex: none;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: 5px;\r\n    z-index: 2;\r\n}\r\n\r\n.drop-files__file em {\r\n    opacity: .75;\r\n    font-size: .9em;\r\n}\r\n\r\n.drop-files__file svg {\r\n    width: 50px;\r\n    height: 50px;\r\n}\r\n\r\n.drop-files__file img {\r\n    width: 100%;\r\n    height: 50px;\r\n    object-fit: cover;\r\n}\r\n\r\n.drop-files__fileinfo {\r\n    margin-top: .5rem;\r\n    display: flex;\r\n    align-items: flex-end;\r\n    width: 100%;\r\n}\r\n\r\n.drop-files__fileinfo span {\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n}\r\n\r\n.drop-files__fileinfo em {\r\n    flex: none;\r\n    margin-left: auto;\r\n    transition: opacity .3s;\r\n}\r\n\r\n.drop-files__file:hover .drop-files__fileinfo em {\r\n    opacity: 0;\r\n}\r\n\r\n.drop-files__explanations strong {\r\n    display: block;\r\n    font-weight: 500;\r\n    font-size: 1.2rem;\r\n}\r\n\r\n.drop-files__explanations em {\r\n    display: block;\r\n    margin-top: 5px;\r\n    opacity: .75;\r\n    font-weight: 400;\r\n    font-size: .9rem;\r\n    font-style: normal;\r\n}\r\n\r\n.drop-files__explanations em:empty {\r\n    display: none;\r\n}\r\n\r\n.drop-files.has-files .drop-files__explanations {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    opacity: 0;\r\n    background-color: rgba(255, 255, 255, 0.8);\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    pointer-events: none;\r\n    transition: .3s;\r\n}\r\n\r\n.drop-files.has-files.is-hovered .drop-files__explanations {\r\n    opacity: 1;\r\n    z-index: 3;\r\n}\r\n\r\n.drop-files__delete {\r\n    box-sizing: border-box;\r\n    color: #E94962;\r\n    position: absolute;\r\n    bottom: 0;\r\n    right: 0;\r\n    padding-left: 5px;\r\n    padding-top: 5px;\r\n    width: 25px !important;\r\n    height: 25px !important;\r\n    transition: opacity .3s;\r\n    opacity: 0;\r\n    cursor: pointer;\r\n}\r\n\r\n.drop-files__file:hover .drop-files__delete {\r\n    opacity: 1;\r\n}\r\n\r\n";
styleInject(css_248z);

function arrayToFileList(files) {
    const data = new ClipboardEvent('').clipboardData || new DataTransfer();
    files.forEach(file => data.items.add(file));
    return data.files;
}
function mergeFiles(files1, files2) {
    const files = [...files1];
    files2.forEach(file => {
        if (files.find(f => f.size === file.size && f.name === file.name) === undefined) {
            files.push(file);
        }
    });
    return files;
}
function mergeFileLists(files1, files2) {
    return arrayToFileList(mergeFiles(Array.from(files1), Array.from(files2)));
}
function diffFiles(oldFiles, newFiles) {
    if (oldFiles === null) {
        return [Array.from(newFiles), []];
    }
    const added = Array.from(newFiles).filter(f => !Array.from(oldFiles).includes(f));
    const removed = Array.from(oldFiles).filter(f => !Array.from(newFiles).includes(f));
    return [added, removed];
}
function removeFile(fileList, file) {
    return arrayToFileList(Array.from(fileList).filter(f => f !== file));
}

function strToDom(str) {
    return document.createRange().createContextualFragment(str);
}

function humanSize(size, precision = 2) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(precision).toString() + ['o', 'ko', 'Mo', 'Go', 'To'][i];
}

var pdf = `<svg viewBox="0 0 60 58.5" xmlns="http://www.w3.org/2000/svg" ><path d="M10.6 0h38.8C55.2 0 60 4.8 60 10.6v37.2c0 5.9-4.8 10.6-10.6 10.6H10.6C4.8 58.5 0 53.7 0 47.9V10.6C0 4.8 4.8 0 10.6 0z" fill="#b30b00"/><path d="M48.2 33.9C47 32.6 44.7 32 41.4 32c-1.8 0-3.7.2-5.5.5-1.2-1.1-2.2-2.4-3.2-3.7-.7-1-1.4-2-2-3.1 1-2.8 1.6-5.8 1.8-8.8 0-2.7-1.1-5.6-4.1-5.6-1 0-2 .6-2.5 1.5-1.3 2.2-.8 6.7 1.3 11.4-.7 2.1-1.5 4.2-2.4 6.5-.8 2-1.7 3.9-2.8 5.7-3.1 1.2-9.6 4.2-10.2 7.5-.2 1 .1 2 .9 2.6.7.6 1.7 1 2.7.9 3.9 0 7.8-5.4 10.5-10.1 1.5-.5 3-1 4.6-1.4 1.7-.4 3.3-.8 4.8-1.1 4.2 3.6 7.9 4.2 9.7 4.2 2.5 0 3.5-1.1 3.8-2 .4-1.1.2-2.3-.6-3.1zm-2.7 1.9c-.1.7-.9 1.2-1.9 1.2-.3 0-.6 0-.9-.1-2-.5-3.9-1.5-5.5-2.8 1.3-.2 2.7-.3 4-.3.9 0 1.8.1 2.7.2.9.2 1.9.6 1.6 1.8zM27.6 13.7c.2-.3.5-.5.9-.6 1 0 1.2 1.1 1.2 2.1-.1 2.3-.5 4.5-1.2 6.7-1.7-4.3-1.5-7.2-.9-8.2zm5.6 19.2c-1.1.2-2.2.5-3.3.8-.8.2-1.6.5-2.5.7.4-.9.8-1.8 1.2-2.6.5-1.1.9-2.2 1.3-3.3.4.6.7 1.1 1.1 1.6.7 1 1.5 1.9 2.2 2.8zm-12.1 5.8c-2.5 4-5 6.6-6.4 6.6-.2 0-.5-.1-.6-.2-.3-.2-.4-.6-.3-.9.2-1.5 3.1-3.6 7.3-5.5z" fill="#fff"/></svg>`;

var doc = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 1818.2 2500" style="enable-background:new 0 0 1818.2 2500;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#4285F4;}
	.st1{fill:#F1F1F1;}
	.st2{fill:#A1C2FA;}
</style>
<g>
	<path class="st0" d="M1136.4,0H170.4C79.6,0,0,79.5,0,170.5v2159.1c0,90.9,79.5,170.5,170.5,170.5h1477.3
		c90.9,0,170.5-79.5,170.5-170.5V681.8l-397.7-284.1L1136.4,0z"/>
	<path class="st1" d="M454.5,1818.2h909.1v-113.6H454.6L454.5,1818.2L454.5,1818.2z M454.5,2045.5h681.8v-113.6H454.5V2045.5z
		 M454.5,1250v113.6h909.1V1250H454.5z M454.5,1590.9h909.1v-113.6H454.6L454.5,1590.9L454.5,1590.9z"/>
	<path class="st2" d="M1136.4,0v511.4c0,90.9,79.5,170.4,170.4,170.4h511.4L1136.4,0z"/>
</g>
</svg>`;

var xls = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.12979372698077785 0 32.12979372698078 32" ><g data-name="STYLE = COLOR"><path d="M20 2H9.333A1.333 1.333 0 0 0 8 3.333V9l12 7 6 2.532L32 16V9z" fill="#21a366"/><path fill="#107c41" d="M8 9h12v7H8z"/><path d="M30.667 2H20v7h12V3.333A1.333 1.333 0 0 0 30.667 2z" fill="#33c481"/><path d="M20 16H8v12.667A1.333 1.333 0 0 0 9.333 30h21.334A1.333 1.333 0 0 0 32 28.667V23z" fill="#185c37"/><path fill="#107c41" d="M20 16h12v7H20z"/><path d="M16.667 7H8v19h8.667A1.337 1.337 0 0 0 18 24.667V8.333A1.337 1.337 0 0 0 16.667 7z" opacity=".1"/><path d="M15.667 8H8v19h7.667A1.337 1.337 0 0 0 17 25.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".2"/><path d="M15.667 8H8v17h7.667A1.337 1.337 0 0 0 17 23.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".2"/><path d="M14.667 8H8v17h6.667A1.337 1.337 0 0 0 16 23.667V9.333A1.337 1.337 0 0 0 14.667 8z" opacity=".2"/><path data-name="Back Plate" d="M1.333 8h13.334A1.333 1.333 0 0 1 16 9.333v13.334A1.333 1.333 0 0 1 14.667 24H1.333A1.333 1.333 0 0 1 0 22.667V9.333A1.333 1.333 0 0 1 1.333 8z" fill="#107c41"/><path d="M3.533 21l3.236-5.014L3.805 11H6.19l1.618 3.187q.223.453.307.676h.021q.16-.362.335-.704L10.2 11h2.189l-3.04 4.958L12.466 21h-2.33l-1.869-3.5a2.922 2.922 0 0 1-.223-.468h-.028a2.207 2.207 0 0 1-.216.453L5.877 21z" fill="#fff"/><path fill="none" d="M0 0h32v32H0z"/></g></svg>`;

var txt = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M1353 5101 c-67 -23 -118 -62 -154 -119 -41 -65 -49 -101 -49 -223
l0 -107 -122 -3 c-110 -4 -129 -7 -180 -32 -61 -30 -105 -74 -140 -140 l-23
-42 -3 -662 -3 -663 -67 0 c-81 0 -134 -22 -179 -73 -18 -20 -37 -53 -42 -74
-15 -52 -15 -1154 0 -1206 11 -40 66 -109 103 -130 12 -6 57 -14 101 -17 l80
-5 5 -695 5 -695 23 -42 c35 -66 79 -110 140 -140 l57 -28 300 -3 c324 -3 336
-2 354 49 l10 29 96 0 96 0 10 -29 c5 -15 20 -33 32 -40 16 -9 300 -11 1132
-9 l1110 3 49 24 c61 30 117 87 147 149 18 39 23 69 27 169 l4 121 122 4 c103
3 128 7 170 27 61 30 117 87 148 149 l23 47 3 1106 2 1106 -21 26 c-27 35 -76
37 -107 4 l-22 -23 -2 -1096 c-3 -1090 -3 -1097 -24 -1124 -11 -15 -33 -37
-48 -48 -27 -21 -30 -21 -1558 -24 -1516 -2 -1532 -2 -1573 18 -26 13 -49 34
-63 59 -22 38 -22 45 -22 475 l0 436 915 0 c824 0 919 2 948 16 45 23 76 53
100 99 22 40 22 45 22 635 l0 595 -25 45 c-14 24 -45 58 -68 75 l-44 30 -924
3 -924 2 0 873 c0 830 1 874 19 907 10 19 36 45 57 57 l39 23 1117 0 1117 0 3
-352 c3 -344 4 -354 26 -403 30 -65 92 -128 156 -157 50 -22 60 -23 404 -26
l352 -3 0 -410 0 -410 26 -26 c20 -20 31 -24 57 -19 69 13 67 -3 67 509 l0
462 -493 492 -492 493 -1175 0 c-1102 -1 -1178 -2 -1227 -19z m3117 -914 c0
-4 -125 -7 -277 -5 -319 3 -329 6 -370 88 -22 43 -23 54 -23 320 l0 275 335
-335 c184 -184 335 -339 335 -343z m-1358 -1244 c17 -15 18 -47 18 -584 0
-503 -2 -569 -16 -583 -14 -14 -144 -16 -1284 -16 l-1270 0 -15 24 c-14 20
-15 92 -13 585 3 544 4 563 22 577 17 12 208 14 1280 14 1158 0 1261 -1 1278
-17z"/>
<path d="M840 2720 c-12 -12 -20 -33 -20 -54 0 -51 36 -76 111 -76 l59 0 2
-291 3 -292 27 -20 c30 -23 67 -18 98 13 19 19 20 35 20 305 l0 285 60 0 c51
0 65 4 85 25 32 31 33 74 2 103 -22 21 -32 22 -225 22 -189 0 -203 -1 -222
-20z"/>
<path d="M1572 2717 c-39 -41 -29 -69 68 -202 50 -68 90 -128 90 -135 0 -6
-47 -77 -105 -156 -118 -161 -129 -194 -79 -233 55 -43 84 -23 194 130 92 127
93 128 110 106 9 -12 52 -71 95 -130 46 -64 88 -113 103 -118 31 -12 78 5 92
32 22 39 9 67 -101 217 l-110 152 95 131 c54 74 96 141 96 154 0 39 -37 75
-77 75 -41 0 -53 -11 -147 -142 l-63 -88 -58 82 c-91 127 -112 148 -149 148
-21 0 -40 -8 -54 -23z"/>
<path d="M2380 2720 c-28 -28 -26 -81 3 -108 18 -17 36 -22 80 -22 l57 0 1
-267 c1 -148 4 -279 8 -292 17 -60 87 -76 131 -29 19 21 20 34 20 305 l0 283
60 0 c51 0 65 4 85 25 32 31 33 74 2 103 -22 21 -32 22 -225 22 -189 0 -203
-1 -222 -20z"/>
<path d="M1844 3607 c-35 -31 -38 -82 -5 -109 21 -17 47 -18 337 -18 301 0
315 1 334 20 30 30 27 83 -6 109 -26 20 -38 21 -330 21 l-303 0 -27 -23z"/>
<path d="M2694 3607 c-35 -31 -38 -82 -5 -109 21 -17 47 -18 337 -18 301 0
315 1 334 20 30 30 27 83 -6 109 -26 20 -38 21 -330 21 l-303 0 -27 -23z"/>
<path d="M3544 3607 c-35 -31 -38 -82 -5 -109 21 -17 47 -18 337 -18 301 0
315 1 334 20 30 30 27 83 -6 109 -26 20 -38 21 -330 21 l-303 0 -27 -23z"/>
<path d="M3550 3040 c-27 -27 -26 -81 1 -106 20 -18 43 -19 328 -22 168 -2
316 0 329 3 60 15 81 83 39 123 -23 22 -28 22 -350 22 -314 0 -328 -1 -347
-20z"/>
<path d="M3556 2479 c-34 -27 -36 -77 -3 -107 23 -22 28 -22 346 -22 l322 0
24 25 c14 13 25 36 25 50 0 14 -11 37 -25 50 l-24 25 -319 0 c-308 0 -320 -1
-346 -21z"/>
<path d="M3546 1908 c-21 -30 -20 -71 3 -99 l19 -24 299 -3 c164 -2 313 0 331
3 67 12 94 78 52 123 -21 22 -24 22 -355 22 -334 0 -334 0 -349 -22z"/>
<path d="M1847 1358 c-40 -31 -36 -115 8 -132 9 -3 155 -6 324 -6 l308 0 21
23 c29 31 29 80 0 107 -21 19 -34 20 -333 20 -233 0 -315 -3 -328 -12z"/>
<path d="M2697 1358 c-40 -31 -36 -115 8 -132 9 -3 155 -6 324 -6 l308 0 21
23 c29 31 29 80 0 107 -21 19 -34 20 -333 20 -233 0 -315 -3 -328 -12z"/>
<path d="M3547 1358 c-40 -31 -36 -115 8 -132 9 -3 155 -6 324 -6 l308 0 21
23 c29 31 29 80 0 107 -21 19 -34 20 -333 20 -233 0 -315 -3 -328 -12z"/>
</g>
</svg>`;

var unknown = `<svg fill="#000000" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 2c-.276.004-.504.224-.5.5v4c0 .822.678 1.5 1.5 1.5h4c.668.01.646-1 0-1h-4c-.286 0-.5-.214-.5-.5v-4c.004-.282-.218-.504-.5-.5zm-15-2C3.678 0 3 .678 3 1.5v27c0 .822.678 1.5 1.5 1.5h21c.822 0 1.5-.678 1.5-1.5v-21c0-.133-.053-.26-.146-.354l-7-7C19.76.053 19.634 0 19.5 0zm0 1h14.793L26 7.707V28.5c0 .286-.214.5-.5.5h-21c-.286 0-.5-.214-.5-.5v-27c0-.286.214-.5.5-.5z"/></svg>`;

const icons = {
    doc: doc,
    docx: doc,
    pdf: pdf,
    xls: xls,
    xlsx: xls,
    csv: xls,
    txt: txt,
    unknown: unknown
};
/*
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ doc: string; docx: string; pdf: string; }'.
  No index signature with a parameter of type 'string' was found on type '{ doc: string; docx: string; pdf: string; }'.

 */
function renderExtension(file) {
    const imgExtensions = [
        "apng",
        "avif",
        "gif", "jpg", "jpeg", "jfif", "pjpeg", "pjp",
        "png",
        "svg",
        "webp",
        "ico",
        "cur",
        "tif",
        "tiff"
    ];
    const ext = file.name
        .split('.')
        .slice(-1)[0]
        .toLowerCase();
    if (icons[ext] !== undefined) {
        return strToDom(icons[ext]).firstChild;
    }
    if (!imgExtensions.includes(ext)) {
        return strToDom(unknown).firstChild;
    }
    const img = strToDom(`<img src=""/>`).firstChild;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        img.setAttribute('src', reader.result.toString());
    }, false);
    reader.readAsDataURL(file);
    return img;
}

function FileComponent({ file, onDelete }) {
    const icon = renderExtension(file);
    const dom = strToDom(`<div class="drop-files__file">
    <div class="drop-files__fileinfo">
      <span>${file.name}</span>
      <em>${humanSize(file.size, 0)}</em>
    </div>
    <svg width="24" height="24" viewBox="0 0 24 24" class="drop-files__delete">
      <path
        d="M4 5H7V4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V5H20C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5V5ZM7 7V20H17V7H7ZM9 5H15V4H9V5ZM9 9H11V18H9V9ZM13 9H15V18H13V9Z"
      fill="currentColor"/>
      </svg>
    </div>`).firstChild;
    dom.insertBefore(icon, dom.firstChild);
    dom.querySelector('.drop-files__delete').addEventListener('click', e => {
        e.preventDefault();
        onDelete(file);
    });
    return dom;
}

/**
 * Flip animation
 */
class Flip {
    constructor() {
        this.timingFunction = 'cubic-bezier(0.5, 0, 0, 0.5)';
        this.duration = 450;
        this.positions = new Map();
    }
    /**
     * Mémorise la position de nos éléments
     */
    read(elements) {
        elements.forEach(element => {
            this.positions.set(element, element.getBoundingClientRect());
        });
    }
    /**
     * Anime les éléments vers leur nouvelle position
     */
    play(elements) {
        elements.forEach((element, k) => {
            const newPosition = element.getBoundingClientRect();
            const oldPosition = this.positions.get(element);
            if (oldPosition === undefined) {
                element.animate([
                    {
                        transform: `translate(0, 10px)`,
                        opacity: 0,
                    },
                    {
                        transform: 'none',
                        opacity: 1,
                    },
                ], {
                    duration: this.duration,
                    easing: this.timingFunction,
                    fill: 'both',
                    delay: 50 * k,
                });
                return;
            }
            const deltaX = oldPosition.x - newPosition.x;
            const deltaY = oldPosition.y - newPosition.y;
            const deltaW = oldPosition.width / newPosition.width;
            const deltaH = oldPosition.height / newPosition.height;
            if (deltaX === 0 && deltaY === 0 && deltaH === 0 && deltaW === 0)
                return;
            element.animate([
                {
                    transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`,
                },
                {
                    transform: 'none',
                },
            ], {
                duration: this.duration,
                easing: this.timingFunction,
                fill: 'both',
            });
        });
    }
    /**
     * Supprime les éléments avec une animation
     *
     * @param {Element[]} elements
     */
    remove(elements) {
        // We move the elements to remove at the end
        elements.forEach(element => element.parentNode.appendChild(element));
        // We animate the removal of the element
        elements.forEach(element => {
            const newPosition = element.getBoundingClientRect();
            const oldPosition = this.positions.get(element);
            const deltaX = oldPosition.x - newPosition.x;
            const deltaY = oldPosition.y - newPosition.y;
            element.animate([
                {
                    transform: `translate(${deltaX}px, ${deltaY}px)`,
                    opacity: 1,
                },
                {
                    transform: `translate(${deltaX}px, ${deltaY - 10}px)`,
                    opacity: 0,
                },
            ], {
                duration: this.duration,
                easing: this.timingFunction,
                fill: 'both',
            });
            window.setTimeout(function () {
                element.parentNode.removeChild(element);
            }, this.duration);
        });
    }
}

/**
 * This component handle the view for the file listing
 */
class FileListComponent {
    constructor() {
        this.oldFiles = null;
    }
    render({ onDelete }) {
        this.flip = new Flip();
        this.onDelete = onDelete;
        this.fileElements = new Map();
        this.container = strToDom(`<div class="drop-files__files"></div>`).firstChild;
        return this.container;
    }
    /**
     * Update the DOM
     */
    update(fileList) {
        const [added, removed] = diffFiles(this.oldFiles, fileList);
        this.flip.read(Array.from(this.fileElements.values()));
        added.forEach(file => {
            const fileComponent = FileComponent({ file, onDelete: this.onDelete });
            this.fileElements.set(file, fileComponent);
            this.container.appendChild(fileComponent);
        });
        if (removed.length > 0) {
            const removeElements = removed.map(file => {
                const element = this.fileElements.get(file);
                this.fileElements.delete(file);
                return element;
            });
            this.flip.remove(removeElements);
        }
        this.flip.play(Array.from(this.fileElements.values()));
        this.oldFiles = arrayToFileList(Array.from(fileList)); // Creates a clone instead of a reference, fix #2
    }
}

/**
 * @element drop-files
 * @attr {String} label - The label used as a bold text for the drop area
 * @attr {String} help - Help text used as a secondary text for the drop area
 * @cssprop --drop-border-color
 * @cssprop --drop-border-color-hover
 */
class DropZoneElement extends HTMLInputElement {
    constructor() {
        super(...arguments);
        this.ignoreCallbacks = false;
        this.allowMultiple = false;
    }
    static get observedAttributes() {
        return ['label', 'help', 'multiple'];
    }
    connectedCallback() {
        if (this.ignoreCallbacks)
            return;
        this.ignoreCallbacks = true;
        const div = this.render();
        this.fileList = new FileListComponent();
        this.insertAdjacentElement('afterend', div);
        this.style.display = 'none';
        div.appendChild(this);
        div.appendChild(this.fileList.render({ onDelete: this.deleteFile.bind(this) }));
        // Listeners
        div.addEventListener('dragover', () => div.classList.add('is-hovered'));
        div.addEventListener('dragleave', () => div.classList.remove('is-hovered'));
        div.addEventListener('drop', () => div.classList.remove('is-hovered'));
        this.container = div;
        // Safari need this timer
        window.requestAnimationFrame(() => {
            this.ignoreCallbacks = false;
        });
        if (this.files.length > 0) {
            this.onFilesUpdate();
        }
    }
    disconnectedCallback() {
        if (this.ignoreCallbacks)
            return;
        this.container.remove();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'label' && this.container) {
            this.container.querySelector('.drop-files__explanations strong').innerHTML = newValue;
        }
        if (name === 'help' && this.container) {
            this.container.querySelector('.drop-files__explanations em').innerHTML = newValue;
        }
        if (name === 'multiple') {
            this.allowMultiple = newValue !== null;
            if (!this.allowMultiple && this.files.length > 1) {
                this.files = arrayToFileList([this.files[0]]);
                this.onFilesUpdate();
            }
        }
    }
    getAttributes() {
        return {
            label: this.getAttribute('label') || 'Drop here or click to upload.',
            help: this.getAttribute('help') || '',
        };
    }
    /**
     * Render the base structure for the component
     */
    render() {
        const { label, help } = this.getAttributes();
        const dom = strToDom(`<div class="drop-files">
      <div class="drop-files__explanations">
            <strong>${label}</strong>
            <em>${help}</em>
      </div>
      <input type="file" multiple class="drop-files__fake"/>
    </div>`).firstElementChild;
        dom.querySelector('.drop-files__fake').addEventListener('change', this.onNewFiles.bind(this));
        return dom;
    }
    /**
     * Remove a file from the FileList
     */
    deleteFile(file) {
        this.files = removeFile(this.files, file);
        this.onFilesUpdate();
    }
    /**
     * Event triggered when new files are selected
     */
    onNewFiles(e) {
        if (this.allowMultiple) {
            this.files = mergeFileLists(this.files, e.currentTarget.files);
        }
        else {
            this.files = arrayToFileList([e.currentTarget.files[0]]);
        }
        e.currentTarget.files = arrayToFileList([]);
        this.onFilesUpdate();
    }
    /**
     * Event triggered when files changes
     */
    onFilesUpdate() {
        this.dispatchEvent(new Event('change'));
        if (this.files.length > 0) {
            this.container.classList.add('has-files');
        }
        else {
            this.container.classList.remove('has-files');
        }
        this.fileList.update(this.files);
    }
}
try {
    customElements.define('drop-zone', DropZoneElement, { extends: 'input' });
}
catch (e) {
    if (e instanceof DOMException) {
        console.error('DOMException : ' + e.message);
    }
    else {
        throw e;
    }
}

export default DropZoneElement;
//# sourceMappingURL=drop-zone-element.js.map
