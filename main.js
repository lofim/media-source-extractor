console.log('Source extractor bootstrapped ...waiting for page to load');

document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Getting video source ...');
    const mediaSrc = extractSource(document);
    const nextLink = extractLink(document, 'a.novae');
    const prevLink = extractLink(document, 'a.stare');

    const newRoot = document.createElement('html');
    
    newRoot.appendChild(createIFrame(mediaSrc));
    newRoot.appendChild(createControls(prevLink, nextLink));
    
    document.replaceChild(newRoot, document.children[0]);

    // TODO: validate if process completed successfully.
    console.log('Source extraction done');
});

function extractSource(doc) {
    const encodedMediaSrc = doc.getElementById('iframe_1').dataset.src;
    const mediaSrc = atob(encodedMediaSrc);

    return mediaSrc;
}

function createIFrame(videoSrc) {
    const iFrame = document.createElement('iframe');
    iFrame.setAttribute('src', videoSrc);
    iFrame.setAttribute('allowfullscreen', true);
    iFrame.setAttribute('webkitallowfullscreen', true);
    iFrame.setAttribute('mozallowfullscreen', true);
    iFrame.setAttribute('frameborder', 0);
    iFrame.setAttribute('scrolling', 'no');
    iFrame.setAttribute('width', 720);
    iFrame.setAttribute('height', 405);
    
    return iFrame;
}

function extractLink(document, query) {
    return document.querySelector(query);
}

function createAnchor(nextLink, label) {
    const anchor = document.createElement('a');
    
    anchor.setAttribute('href', nextLink);
    anchor.setAttribute('style', 'margin-right: 20px;');
    anchor.innerText = label;
    
    return anchor;
}

function createControls(prevLink, nextLink) {
    const anchorWrapper = document.createElement('div');
   
    if (prevLink) {
        anchorWrapper.appendChild(createAnchor(prevLink, 'Prev media source'));
    }

    if (nextLink) {
        anchorWrapper.appendChild(createAnchor(nextLink, 'Next media source'));
    } 

    if(!prevLink && !nextLink) {
        anchorWrapper.appendChild(document.createTextNode('No Old or New Sources'))
    }

    console.log('controls done');

    return anchorWrapper;
}
