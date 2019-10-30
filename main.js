console.log('Source extractor bootstrapped ...waiting for page to load');

document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Getting video source ...');

    const originalDocument = document.children[0];
    const mediaSources = extractSources(document);

    // Nav bar at the bottom
    const nextLink = extractLink(document, 'a.novae');
    const prevLink = extractLink(document, 'a.stare');

    const newRoot = document.createElement('html');

    const frameWrapper = document.createElement('div');
    frameWrapper.className = 'frame-wrapper';

    const loadOriginal = createAnchor('', 'Original');
    loadOriginal.addEventListener('click', e => {
        e.preventDefault();
        document.replaceChild(originalDocument, newRoot);
    });

    mediaSources.forEach(source => frameWrapper.appendChild(createIFrame(source)));
    newRoot.appendChild(createControls(prevLink, nextLink, loadOriginal));
    newRoot.appendChild(frameWrapper);
    
    document.replaceChild(newRoot, originalDocument);
    console.log('Source extraction done');
});

function extractSources(doc) {
    const iframes = doc.querySelectorAll('iframe');
    const sources = Array
        .from(iframes)
        .filter(node => node.id.startsWith('iframe') && node.dataset.src)
        .map(node => atob(node.dataset.src));

    return sources;
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

function createAnchor(link, label) {
    const anchor = document.createElement('a');
    
    anchor.className = 'media-link';
    anchor.setAttribute('href', link);
    anchor.innerText = label;
    
    return anchor;
}

function createControls(prevLink, nextLink, loadOriginal) {
    const anchorWrapper = document.createElement('div');
    anchorWrapper.className = 'anchor-wrapper';

    if (prevLink) {
        anchorWrapper.appendChild(createAnchor(prevLink, '<'));
    }

    if (loadOriginal) {
        anchorWrapper.appendChild(loadOriginal);
    }

    if (nextLink) {
        anchorWrapper.appendChild(createAnchor(nextLink, '>'));
    } 

    if(!prevLink && !nextLink) {
        anchorWrapper.appendChild(document.createTextNode('No Old or New Sources'))
    }

    console.log('controls done');

    return anchorWrapper;
}
