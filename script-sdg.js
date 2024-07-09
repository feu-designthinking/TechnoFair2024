
var ids = [];
var players = []; // the controls of the iFrames aren't accessible via DOM
var sections = [];
var institutions = [];
var awardees = [];
var options = [];
var frames;


var isFinalistsAnnounced = false;
var isAwardeesArranged = false;
var filterFinalists = 'Finalists';

const header = document.querySelector('#banner-header').children[0];
const container = body.querySelector('#video-container');
const filter = document.createElement('select');
const search = document.createElement('input');
const reload = document.createElement('div');

const banner = {
    mobile: "img/banner-header-mobile.png",
    tablet: "img/banner-header-large.png",
    desktop: "img/banner-header.png"
}

const medals = {
    champ: "./img/medal-champ.svg",
    first: "./img/medal-first.svg",
    second: "./img/medal-second.svg",
    presenter: "./img/medal-presenter.svg",
    poster: "./img/medal-poster.svg",
    info: "./img/medal-info.svg",
    elim: "./img/medal-elim.svg"
}

// This pauses the videos 
function preparePlayer(event) {
    setTimeout(function() {
        event.target.pauseVideo(); //pauseVideo() is a YT API function
    }, 16);
    event.target.unMute(); // unMute() is a YT API function
}

function newPoster(projTitle, groupName, src, section, institution) {
    // thumbnail
    var img = document.createElement('div');
    img.style.backgroundImage = 'url(' + gDrivePhoto(src) + ')';
    img.onclick = function() {
      window.open(src, '_blank');
    };
    img.classList.add('poster');

    // description
    var group = document.createElement('div');
    group.classList.add('project-details');
    group.appendChild(document.createElement('div'));
    group.appendChild(document.createElement('div'));
    group.children[0].innerHTML = projTitle;
    group.children[1].innerHTML = "by " + groupName;

    // medal frame
    var medals = document.createElement('div');
    medals.classList.add('medal-holder');
    
    // body
    var thumbnail = document.createElement('div');
    thumbnail.name = projTitle.toLowerCase();
    thumbnail.group = groupName.toLowerCase();
    thumbnail.setAttribute('title', section);
    thumbnail.setAttribute('name', thumbnail.name);
    thumbnail.setAttribute('group', thumbnail.group);
    thumbnail.style.backgroundImage = 'url(' + gDrivePhoto(src) + ')';
    thumbnail.classList.add('thumbnail');
    thumbnail.classList.add('entries');
    thumbnail.classList.add(institution);
    thumbnail.classList.add(section);
    thumbnail.appendChild(img);
    thumbnail.appendChild(group);
    thumbnail.appendChild(medals);
    container.appendChild(thumbnail);

    sections.push(section);
    institutions.push(institution);
    ids.push(src);
}

// Adds new video to the list
function newVideo(projTitle, groupName, src, section, institution) {
    src = src.substring(32);

    // description
    var group = document.createElement('div');
    group.classList.add('project-details');
    group.appendChild(document.createElement('div'));
    group.appendChild(document.createElement('div'));
    group.children[0].innerHTML = projTitle;
    group.children[1].innerHTML = "by " + groupName;

    // body
    var div = document.createElement('div');
    div.name = projTitle.toLowerCase();
    div.group = groupName.toLowerCase();
    div.setAttribute('name', div.name);
    div.setAttribute('group', projTitle.toLowerCase());
    div.classList.add(section);
    div.classList.add(institution);
    div.classList.add('entries');
    div.appendChild(document.createElement('div'));
    div.appendChild(document.createElement('div'));
    div.appendChild(group);
    div.children[0].setAttribute('id',src);
    div.children[1].classList.add('medal-holder');
    
    container.appendChild(div);

    // turns div into iFrame - YT API
    if (src != '') {
        var frame = new YT.Player(src, {
            videoId: src,
            id: src,
            title: projTitle,
            playerVars: {
                playersinline: 1,
                autoplay: 1,
                mute: 1, // Google restricts autoplay with sounds
                rel: 0
            },
            events: {
                onReady: preparePlayer
            }
        });
    } else {
        var frame = document.createElement('iframe');
        div.replaceChild(frame, div.children[0]);
    }

    players.push(frame);
    sections.push(section);
    institutions.push(institution);
    ids.push(src);
}

function hoverPlay(index) {
    players[index].playVideo(); // YT API
}

function hoverStop(index) {
    players[index].pauseVideo(); // YT API
}

function restyle() {
    if (window.innerWidth >= 992) {
        header.setAttribute('src', banner.desktop);
    } else if (window.innerWidth >= 768) {
        header.setAttribute('src', banner.tablet);
    } else {
        header.setAttribute('src', banner.mobile);
    }

    var medals = container.querySelectorAll('.medal');
    for (var i = 0; i < medals.length; i++) {
        var width = medals[i].offsetWidth;
        medals[i].style.height = width.toString() + "px";
    }
}

function addOption(value, selected = false) {
    var option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerHTML = value;
    option.selected = selected;
    filter.appendChild(option);
}

function lastTouch() {
    // adds the hover-in-out play-pause fx
    frames = document.querySelectorAll('iframe');
    for(var i = 0; i < frames.length; i++) {
      frames[i].setAttribute('onmouseover', 'hoverPlay(' + i.toString() + ')');
      frames[i].setAttribute('onmouseout', 'hoverStop(' + i.toString() + ')');
      frames[i].setAttribute('id', ids[i]);
    }
    
    //Adds Filter Options
    options.push.apply(options, Array.from(new Set(institutions))); // adds institutions
    options.push.apply(options, Array.from(new Set(sections))); // adds sections
    addOption('Filter', true);
    for (var i = 0; i < options.length; i++) {
        if (options[i] != undefined) {
            addOption(options[i]);
        }
    }

    reload.style.display = "none";
    body.setAttribute('onresize', 'restyle()');
    restyle();
}

function filterFrame(clear = true) {
    // General Filter
    if(clear){ search.value = ""; };
    frames = container.children;
    for (var i = 0; i < frames.length; i++) {
        frames[i].classList.remove('hide');
        if (filter.value != "Filter") {
            if (!frames[i].classList.contains(filter.value)) {
                frames[i].classList.add('hide');
            }
        }
    }

    if (filter.value == filterFinalists) {
        // Flex Order
        if (!isAwardeesArranged) {
            isAwardeesArranged = true;
            awardees.push(container.querySelector('.medals-champ'));
            awardees.push(container.querySelector('.medals-first'));
            awardees.push(container.querySelector('.medals-second'));
            awardees.push(container.querySelector('.medals-poster'));
            awardees.push(container.querySelector('.medals-info'));
            awardees.push(container.querySelector('.medals-presenter'));
            awardees = Array.from(new Set(awardees));
        }
        for (var i = 0; i < awardees.length; i++) {
            awardees[i].style.order = (i+1).toString();
        }
    } else {
        for (var i = 0; i < awardees.length; i++) {
            awardees[i].style.order = "10";
        }
    }
}

function award(groupName, medalType, title) {
    // adds class tags
    var frame = container.querySelector('[group="' + groupName.toLowerCase() + '"]');
    if (frame == null) return;
    frame.classList.add(filterFinalists);
    switch(medalType) {
        case medals.champ:
            frame.classList.add('medals-champ');
            break;
        case medals.first:
            frame.classList.add('medals-first');
            break;
        case medals.second:
            frame.classList.add('medals-second');
            break;
        case medals.poster:
            frame.classList.add('medals-poster');
            break;
        case medals.info:
            frame.classList.add('medals-info');
            break;
        default:
            frame.classList.add('medals-presenter');
            break;
    }

    // adds medal
    var medal = document.createElement('div');
    medal.title = "Techno Fair 2024 " + title;
    medal.classList.add('medal');
    medal.style.backgroundImage = 'url(' + medalType + ')';
    setTimeout(function () {
        var width = medal.offsetWidth;
        medal.style.height = width.toString() + "px";
    }, 17);
    frame.querySelector('.medal-holder').appendChild(medal);

    medal.onclick = function() {    
        var medal = document.createElement('div');
        medal.style.backgroundImage = "url('" + medalType + "')";
        medal.classList.add('medal');

        var trophy = document.createElement('div');
        trophy.style.backgroundImage = "url('./img/medal-frame.svg')";
        trophy.classList.add('trophy');
        trophy.appendChild(medal);

        var description =  document.createElement('div');
        description.classList.add('description');

        var text = document.createElement('div');
        text.innerHTML = "Techno Fair 2024";
        text.classList.add('title');
        description.appendChild(text);

        text = document.createElement('div');
        text.innerHTML = title;
        text.classList.add('award');
        description.appendChild(text);

        var container = document.createElement('div');
        container.classList.add('container');
        container.appendChild(trophy);
        container.appendChild(description);

        var radar = document.createElement('div');
        radar.classList.add('bi');
        radar.classList.add('bi-x-lg');
        radar.classList.add('radar');

        var close = document.createElement('div');
        close.classList.add('close');
        close.appendChild(radar);
        close.onclick = function() {
            viewer.remove();
        };

        var viewer = document.createElement('div');
        viewer.id = "viewer-medal";
        viewer.appendChild(container);
        viewer.appendChild(close);

        body.appendChild(viewer);
    }

    if (!isFinalistsAnnounced) {
        isFinalistsAnnounced = true;
        options.push(filterFinalists);
    }
}

function searchContent() {
    filterFrame(false);
    var searchFrames = document.querySelectorAll('#video-container > :not(.hide)');
    console.log(searchFrames);
    for (var i = 0; i < searchFrames.length; i++) {
        if (searchFrames[i].name.indexOf(search.value.toLowerCase()) == -1 && searchFrames[i].group.indexOf(search.value.toLowerCase()) == -1) {
            searchFrames[i].classList.add('hide');
        }
    }
}

filter.setAttribute('oninput', 'filterFrame()');
search.setAttribute('oninput', 'searchContent()');
search.placeholder = "Search by Product";

// Search Holder
var searchHolder = document.createElement('div');
searchHolder.id = "search-holder";
searchHolder.appendChild(search);

// Filter and Search
var div = document.createElement('div');
div.id = "toolbar";
div.appendChild(filter);
div.appendChild(searchHolder);
container.parentElement.insertBefore(div, container);

reload.setAttribute('id', 'reload');
reload.innerHTML = "<div></div><div></div>";
body.appendChild(reload);

console.log();