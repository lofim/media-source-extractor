console.log('Source extractor bootstrapped ...waiting for page to load');

document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Getting video source ...');
    const mediaSrc = extractSource(document);
    
    console.log('Creating iframe ...');
    const newRoot = document.createElement('html');
    newRoot.appendChild(createIFrame(mediaSrc));
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