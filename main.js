console.log('Source extractor bootstrapped ...waiting for page to load');

document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Getting video source ...');
    const mediaSrc = extractSource(document);
    const nextLink = extractNextLink(document);

    console.log('Creating iframe ...');
    const newRoot = document.createElement('html');
    
    newRoot.appendChild(createIFrame(mediaSrc));
    newRoot.appendChild(createControls(nextLink));
    
    document.replaceChild(newRoot, document.children[0]);

    // TODO: validate if process completed successfully.
    console.log('Source extraction done');
});

function extractSource(doc) {
    const encodedMediaSrc = doc.getElementById('iframe_1').dataset.src;
    console.log('Encoded video src: ', encodedMediaSrc);

    const mediaSrc = atob(encodedMediaSrc);
    console.log('Decoded video src: ', mediaSrc);

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

function extractNextLink(document) {
    return document.querySelector("a.novae");
}

function createNextAnchor(nextLink) {
    const anchor = document.createElement('a');
    
    anchor.setAttribute('href', nextLink);
    anchor.innerText = 'Next Media Source';
    
    return anchor;
}

function createControls(nextLink) {
    const anchorWrapper = document.createElement('div');

    if (nextLink) {
        anchorWrapper.appendChild(createNextAnchor(nextLink));
    } else {
        anchorWrapper.appendChild(document.createTextNode('No New Source'))
    }

    return anchorWrapper;
}
