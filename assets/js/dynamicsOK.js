/* **********************************************
     Begin Work.js
********************************************** */
function init(e) {
    (Utils.isChrome() || Utils.isFF()) && $("html").css("height", "100%");
    b = $("body");
    w = $(window);
    d = $(document);
    preloadContent = $(".preloader");
    preloadLogo = $(".preloader").find("#logo");
    preloadCircle = $(".preloader").find("#preloadCircle");
    preloadCircleBkg = $(".preloader").find("#preloadCircleBkg");
    preloadEaser = $(".preloader").find("#preloadEaser");
    siteBkg = $("#siteBkg");
    container = $(".container");
    content = $(".content");
    $.address.change(sortPage);
    $(document).bind('contextmenu', showContextMenu);
    Nav.construct();
    resizer();
    w.resize(resizer);
    Work.construct();
    WorkDetail.construct();
    About.construct();
    Contact.construct();
    TweenMax.set(content, {
        y: w.height()
    
    })
}
function showContextMenu(e)
{
    e.preventDefault();
    
    $('#context').html('<a href="http://www.flash-gallery.net" target="_blank">Design by Flash-gallery.net</a></br>2014 @ Flash-Gallery.Net');
    $('#context').css('left', e.pageX + 'px');
    $('#context').css('top', e.pageY + 'px');
    $('#context').css('display', 'block');
    $('#context').css('opacity', '1');
    
    $(document).bind('click', hideContextMenu);
}

// =================== 
// ! Hide context menu   
// ===================
$(document).bind('contextmenu', showContextMenu);
function hideContextMenu(e)
{
    $('#context').css('display', 'none');
    $('#context').html('');
    $(document).unbind('click', hideContextMenu);
}
function loadLogo() {
    TweenMax.set(preloadLogo, {
        scale: 0
    });
    TweenMax.set(preloadCircleBkg, {
        scale: 2,
        opacity: 0
    });
    preloader = new PreloadJS;
    preloader.useXHR = !1;
    preloader.onComplete = onLogoComplete;
    var e = [];
    e.push(Utils.extractUrl(preloadLogo.css("background-image")));
    preloader.loadManifest(e)
}

function loadAssets() {
    preloader = new PreloadJS;
    preloader.useXHR = !1;
    preloader.onComplete = onComplete;
    preloader.onProgress = onProgress;
    var e = [];
    e.push(Utils.extractUrl(siteBkg.css("background-image")));
    WorkDetail.getPreloadManifest(e);
    preloader.loadManifest(e)
}

function onProgress(e) {
    LoadingCircle.animate(document.getElementById("preloadCircle"), "#666666", 5, $("#preloadEaser"), 100 + preloader.progress * .5)
}

function onComplete(e) {
    TweenMax.set(siteBkg, {
        css: {
            opacity: "0",
            visibility: "visible"
        }
    });
    TweenMax.to(siteBkg, 3.5, {
        css: {
            opacity: "1"
        },
        ease: Expo.easeInOut
    });
    startLoadingJSON()
}

function onLogoComplete(e) {
    preloadLogo.css({
        display: "block"
    });
    TweenMax.to(preloadLogo, .4, {
        css: {
            scale: 1
        },
        ease: Back.easeOut
    });
    LoadingCircle.draw(document.getElementById("preloadCircleBkg"), "#bababa", 3);
    preloadCircle.css({
        display: "block"
    });
    preloadCircleBkg.css({
        display: "block"
    });
    TweenMax.set(preloadCircle, {
        css: {
            rotation: -90,
            opacity: 1
        }
    });
    TweenMax.set(preloadCircleBkg, {
        css: {
            rotation: -90
        }
    });
    TweenMax.to(preloadCircleBkg, .65, {
        css: {
            scale: 1,
            opacity: .75
        },
        delay: .15,
        ease: Back.easeOut,
        onComplete: animateLoader
    })
}

function animateLoader() {
    LoadingCircle.animate(document.getElementById("preloadCircle"), "#666666", 6, $("#preloadEaser"), 100);
    loadAssets()
}

function startLoadingJSON() {
    console.log("startLoadingJSON");
    $.ajax({
        type: "GET",
        url: "http://design18.flash-gallery.net/projects/index.json",//_siteroot + 
      
        dataType: "json",
        success: workLoaded
    })
}

function workLoaded(e) {
    console.log("workLoaded");
    workJSON = e;
    LoadingCircle.animate(document.getElementById("preloadCircle"), "#666666", 6, $("#preloadEaser"), 200);
    TweenMax.delayedCall(.5, build)
}

function build() {
    TweenMax.to(preloadContent, .5, {
        css: {
            y: 0,
            display: "none"
        },
        ease: Expo.easeIn
    });
    TweenMax.to(preloadCircle, .35, {
        css: {
            scale: 2,
            opacity: 0,
            display: "none"
        },
        ease: Back.easeIn
    });
    TweenMax.to(preloadCircleBkg, .35, {
        css: {
            scale: 2,
            opacity: 0,
            display: "none"
        },
        ease: Back.easeIn
    });
    TweenMax.to(preloadLogo, .25, {
        css: {
            scale: 0,
            display: "none"
        },
        delay: .05,
        ease: Back.easeIn
    });
    Nav.init();
    slideContainer()
}

function sortPage(e) {
    console.log("hi");
    var t = e.value.split("/"),
        n = t[1],
        r = t[2],
        i = t[3];
    oldPage = page;
    oldSub = sub;
    oldLoc = loc;
    n == null || n == "" ? page = "home" : page = n;
    r == null || r == "" ? sub = "" : sub = r;
    i == null || i == "" ? loc = "" : loc = i;
    console.log("");
    console.log("VALUE CHANGE:");
    console.log("$PAGE:", n, "PAGE:", page, "OLDPAGE:", oldPage);
    console.log("$SUB:", r, "SUB:", sub, "OLDSUB:", oldSub);
    console.log("$LOC:", i, "LOC:", loc, "OLDLOC:", oldLoc);
    _gaq.push(["_setAccount", "UA-46093592-1"]);
    sub != "" ? _gaq.push(["_trackPageview", page + "/" + sub]) : _gaq.push(["_trackPageview", page]);
    workJSON ? oldPage != page && sub == "" ? slideContainer() : oldPage == page && sub != "" ? obj.inside() : oldPage == page && sub == "" && obj.restore() : loadLogo()
}

function slideContainer() {
    setPageVars();
    var e = $("#" + page);
    if (oldPageNum != -1) {
        var t = $("#" + oldPage);
        if (oldPageNum > pageNum) {
            TweenMax.fromTo(t, .75, {
                y: 0
            }, {
                y: w.height(),
                ease: Expo.easeIn,
                onComplete: function () {
                    t.css({
                        visibility: "hidden"
                    })
                }
            });
            TweenMax.fromTo(e, 1.5, {
                y: -w.height(),
                visibility: "visible"
            }, {
                y: 0,
                ease: Quint.easeOut,
                delay: .5
            })
        } else {
            TweenMax.fromTo(t, .75, {
                y: 0
            }, {
                y: -w.height(),
                ease: Expo.easeIn,
                onComplete: function () {
                    t.css({
                        visibility: "hidden"
                    })
                }
            });
            TweenMax.fromTo(e, 1.5, {
                y: w.height(),
                visibility: "visible"
            }, {
                y: 0,
                ease: Quint.easeOut,
                delay: .5
            })
        }
    } else TweenMax.fromTo(e, 1.5, {
        y: w.height(),
        visibility: "visible"
    }, {
        y: 0,
        ease: Quint.easeOut,
        delay: .25
    })
}

function setPageVars() {
    oldPageNum = pageNum;
    for (var e = 0; e < router.length; e++) {
        if (page == router[e].route) {
            pageNum = e;
            obj = router[e].obj
        }
        if (oldPage == router[e].route) var t = router[e].obj
    }
    console.log(pageNum);
    t && t.remove();
    oldPageNum == -1 ? TweenMax.delayedCall(1.25, Nav.set) : Nav.set();
    if (first) {
        sub == "" ? obj.init() : obj.inside();
        first = !1
    } else obj.init()
}

function resizer() {
    content.css({
        height: w.height(),
        top: 0
    });
    container.css({
        height: w.height() * router.length
    });
    if (Utils.getDevice() == "none")
        if (w.width() < minWidth) {
            $("html, body").css({
                "overflow-x": "auto",
                width: minWidth
            });
            container.css({
                width: minWidth
            })
        } else {
            $("html, body").css({
                overflow: "hidden",
                width: "100%"
            });
            container.css({
                width: "100%"
            })
        }
    Utils.getDevice() == "iphone" && $("html, body").height(w.height());
    Nav.resizer();
    obj && obj.resizer()
}
var Work = {
        view: "carousel",
        container: "",
        total: 0,
        data: "",
        el: "",
        x: 0,
        y: 0,
        locY: 0,
        gridAmount: 6,
        gridMin: 0,
        gridMax: 6,
        gridPage: 0,
        enterFrame: "",
        navContainer: "",
        viewNav: "",
        viewBTN: "",
        leftArrow: "",
        rightArrow: "",
        construct: function () {
            this.el = $("#work");
            this.navContainer = this.el.find(".navContainer");
            this.viewNav = $(".viewNav");
            window.addEventListener("deviceorientation", Work.updateOrientation, !0)
        },
        init: function () {
            if (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") this.view = "list";
            else if (Modernizr.csstransforms3d)
                if (Utils.isFF() || Utils.isIE()) {
                    this.viewNav.html('<a data-view="grid" class="view-btn" id="view-btn-grid"></a><div class="view-rule"></div><a data-view="list" class="view-btn" id="view-btn-list"></a>');
                    this.view = "grid"
                } else this.viewNav.html('<a data-view="carousel" class="view-btn" id="view-btn-carousel"></a><div class="view-rule"></div><a class="view-btn" data-view="grid" id="view-btn-grid"></a><div class="view-rule"></div><a class="view-btn" data-view="list" id="view-btn-list"></a>');
            else {
                this.viewNav.html('<a data-view="grid" class="view-btn" id="view-btn-grid"></a><div class="view-rule"></div><a data-view="list" class="view-btn" id="view-btn-list"></a>');
                this.view = "grid"
            }
            this.viewBTN = $(".view-btn");
            this.viewBTN.hover(this.viewOver, this.viewOut).tappable(this.viewClick);
            this.setViewNav();
            this.data = workJSON.projectList;
            this.total = this.data.length;
            this.view == "carousel" ? this.buildCarousel() : this.view == "grid" ? this.buildGrid() : this.view == "list" && this.buildList();
            this.resizer()
        },
        itemOver: function () {
            var e = $(this).find(".itemInfo");
            TweenMax.to(e, .75, {
                autoAlpha: 1,
                ease: Expo.easeOut
            });
            TweenMax.set(e.find(".title"), {
                scale: .5,
                y: 20
            });
            TweenMax.set(e.find("hr"), {
                scale: 0,
                opacity: 1
            });
            TweenMax.set(e.find(".visit"), {
                scale: 0,
                y: -20
            });
            TweenMax.to(e.find(".title"), .35, {
                scale: 1,
                y: 0,
                ease: Back.easeOut
            });
            TweenMax.to(e.find("hr"), .75, {
                scale: 1,
                ease: Quint.easeInOut,
                opacity: .25
            });
            TweenMax.to(e.find(".visit"), .5, {
                scale: 1,
                y: 0,
                delay: .1,
                ease: Back.easeOut
            })
        },
        itemOut: function () {
            var e = $(this).find(".itemInfo");
            TweenMax.to(e, .5, {
                autoAlpha: 0,
                ease: Expo.easeInOut
            })
        },
        listOver: function () {
            var e = $(this).find(".bkg");
            TweenMax.set(e, {
                y: -57,
                overwrite: !0
            });
            TweenMax.to(e, 1, {
                y: 0,
                autoAlpha: 1,
                ease: Expo.easeInOut
            });
            var t = $(this).find(".title");
            TweenMax.to(t, .5, {
                ease: Expo.easeIn,
                y: 57,
                overwrite: !0
            });
            TweenMax.set(t, {
                delay: .5,
                y: -57,
                "font-style": "italic",
                color: "#454545"
            });
            TweenMax.to(t, .5, {
                ease: Expo.easeOut,
                y: 0,
                delay: .5
            });
            var n = $(this).find(".visit");
            TweenMax.set(n, {
                y: -57,
                autoAlpha: 0,
                overwrite: !0,
                display: "block"
            });
            TweenMax.to(n, 1, {
                y: 0,
                autoAlpha: 1,
                ease: Expo.easeInOut
            })
        },
        listOut: function () {
            var e = $(this).find(".bkg");
            TweenMax.set(e, {
                y: 0
            });
            TweenMax.to(e, .5, {
                y: 57,
                autoAlpha: 0,
                ease: Expo.easeInOut,
                overwrite: !0
            });
            var t = $(this).find(".title");
            TweenMax.to(t, .25, {
                ease: Expo.easeIn,
                y: 57,
                overwrite: !0
            });
            TweenMax.set(t, {
                delay: .25,
                y: -57,
                "font-style": "normal",
                color: "#FFF"
            });
            TweenMax.to(t, .25, {
                ease: Expo.easeOut,
                y: 0,
                delay: .25
            });
            var n = $(this).find(".visit");
            TweenMax.to(n, .5, {
                y: 57,
                autoAlpha: 0,
                ease: Expo.easeInOut
            })
        },
        itemClick: function () {
            $.address.value("work/" + $(this).attr("data-href"));
            var e = $(this).find(".title");
            TweenMax.set(e, {
                color: "#333"
            })
        },
        itemTargetClick: function (e, t) {
            $.address.value("work/" + $(t).parent().attr("data-href"))
        },
        viewOver: function () {
            if (!$(this).hasClass("selected")) {
                TweenMax.to($(this), 1, {
                    boxShadow: "inset 1px 1px 3px 2px rgba(0, 0, 0, .1)",
                    backgroundColor: "rgba(187,187,187,.1)",
                    ease: Expo.easeOut
                });
                TweenMax.set($(this), {
                    backgroundPosition: "0px -48px"
                })
            }
        },
        viewOut: function () {
            if (!$(this).hasClass("selected")) {
                TweenMax.to($(this), 1, {
                    boxShadow: "inset 1px 1px 3px 2px rgba(0, 0, 0, 0)",
                    backgroundColor: "rgba(187,187,187,0)",
                    ease: Expo.easeOut
                });
                TweenMax.set($(this), {
                    backgroundPosition: "0px 0px"
                })
            }
        },
        viewClick: function () {
            if (!$(this).hasClass("selected")) {
                Work.view == "carousel" ? Work.removeCarousel() : Work.view == "grid" ? Work.removeGrid() : Work.view == "list" && Work.removeList();
                Work.view = $(this).attr("data-view");
                Work.view == "carousel" && TweenMax.delayedCall(1, function () {
                    Work.buildCarousel()
                });
                Work.view == "grid" && TweenMax.delayedCall(1, function () {
                    Work.buildGrid()
                });
                Work.view == "list" && TweenMax.delayedCall(1, function () {
                    Work.buildList()
                });
                Work.setViewNav()
            }
        },
        setViewNav: function () {
            console.log(Work.viewBTN.length);
            for (i = 0; i < Work.viewBTN.length; i++) {
                Work.viewBTN.eq(i).removeClass("selected");
                Work.viewBTN.eq(i).css({
                    "background-position": "0px 0px"
                });
                if (Work.viewBTN.eq(i).attr("data-view") == Work.view) {
                    Work.viewBTN.eq(i).addClass("selected");
                    Work.viewBTN.eq(i).css({
                        "background-position": "0px -96px"
                    });
                    TweenMax.to(Work.viewBTN.eq(i), 1, {
                        boxShadow: "inset 1px 1px 3px 2px rgba(0, 0, 0, 0)",
                        backgroundColor: "rgba(187,187,187,0)",
                        ease: Expo.easeOut
                    })
                }
            }
        },
        buildCarousel: function () {
            this.navContainer.html('<div id="carousel"></div>');
            this.x = 0;
            this.y = 0;
            this.locY = 0;
            var e = this.total * 75;
            this.container = $("#carousel");
            TweenMax.set(this.container, {
                z: -e
            });
            var t = 360 / this.total,
                n = Math.PI * 2 / this.total;
            for (var r = 0; r < this.total; r++) {
                var i = "";
                this.data[r].media_attachments.length == 0 ? i = "" : this.data[r].media_attachments.length == undefined ? i = this.data[r].media_attachments.images.medium.url : i = this.data[r].media_attachments[0].images.medium.url;
                this.container.append('<figure class="caroItem" data-href="' + this.data[r].post_name + '"><div class="block"><div class="itemInfo"><div class="title">' + this.data[r].post_title + '</div><hr><div class="visit">View Project</div></div><img src="' + i + '" class="blockImg"></div></figure>');
                var s = $(".caroItem").eq(r),
                    o = s.find(".block"),
                    u = o.find(".itemInfo");
                TweenMax.set(u, {
                    autoAlpha: 0
                });
                TweenMax.set(s, {
                    autoAlpha: 0
                });
                s.css({
                    "-webkit-transform": "rotateY( " + t * r + "deg ) translateZ( " + e * 1 + "px )"
                });
                s.css({
                    "-moz-transform": "rotateY( " + t * r + "deg ) translateZ( " + e * 1 + "px )"
                });
                s.css({
                    "-ms-transform": "rotateY( " + t * r + "deg ) translateZ( " + e * 1 + "px )"
                });
                s.css({
                    transform: "rotateY( " + t * r + "deg ) translateZ( " + e * 1 + "px )"
                });
                s.hover(this.itemOver, this.itemOut).tappable(this.itemClick);
                this.loadItem(s, o)
            }
            this.startLoop()
        },
        buildGrid: function () {
            this.navContainer.html('<div id="grid"></div><div id="gridPag"><div class="leftArrow"><div class="arrow"></div><div class="arrowBkg"></div></div><div class="rightArrow"><div class="arrow"></div><div class="arrowBkg"></div></div></div>');
            this.leftArrow = $("#gridPag").find(".leftArrow");
            this.rightArrow = $("#gridPag").find(".rightArrow");
            this.leftArrow.hover(WorkDetail.arrowOver, WorkDetail.arrowOut).tappable(this.getGridClick);
            this.rightArrow.hover(WorkDetail.arrowOver, WorkDetail.arrowOut).tappable(this.getGridClick);
            TweenMax.set(this.leftArrow, {
                autoAlpha: 1,
                scale: 1
            });
            TweenMax.set(this.rightArrow, {
                autoAlpha: 1,
                scale: 1
            });
            TweenMax.set(this.leftArrow.find(".arrowBkg"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.set(this.rightArrow.find(".arrowBkg"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.to(this.leftArrow.find(".arrowBkg"), .35, {
                autoAlpha: .5,
                scale: 1,
                ease: Back.easeOut,
                delay: 2
            });
            TweenMax.to(this.rightArrow.find(".arrowBkg"), .35, {
                autoAlpha: .5,
                scale: 1,
                ease: Back.easeOut,
                delay: 2.25
            });
            TweenMax.set(this.leftArrow.find(".arrow"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.set(this.rightArrow.find(".arrow"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.to(this.leftArrow.find(".arrow"), .35, {
                autoAlpha: 1,
                scale: 1,
                ease: Back.easeOut,
                delay: 2.25
            });
            TweenMax.to(this.rightArrow.find(".arrow"), .35, {
                autoAlpha: 1,
                scale: 1,
                ease: Back.easeOut,
                delay: 2.5
            });
            this.container = $("#grid");
            TweenMax.set(this.container, {
                z: 0
            });
            this.setGrid();
            Work.setGridNav()
        },
        buildList: function () {
            this.navContainer.html('<div id="list"><div id="listContainer"></div></div>');
            this.container = $("#listContainer");
            this.x = 0;
            this.y = 0;
            this.locY = 0;
            for (var e = 0; e < this.total; e++) {
                this.container.append('<figure class="listItem" data-href="' + this.data[e].post_name + '"><div class="itemInfo" data-href="' + this.data[e].post_name + '"><div class="bkg" data-href="' + this.data[e].post_name + '"></div><div class="title" data-href="' + this.data[e].post_name + '">' + this.data[e].post_title + '</div><div class="visit" data-href="' + this.data[e].post_name + '">View Project</div></div></figure>');
                var t = $(".listItem").eq(e),
                    n = t.find(".bkg"),
                    r = t.find(".itemInfo");
                TweenMax.set(t, {
                    rotationX: 90,
                    autoAlpha: 0,
                    color: "#000"
                });
                TweenMax.to(t, 1.5, {
                    rotationX: 0,
                    autoAlpha: 1,
                    color: "#FFF",
                    delay: e * .15 + .25,
                    ease: Elastic.easeOut
                });
                TweenMax.set(n, {
                    autoAlpha: 1
                });
                TweenMax.to(n, 1.5, {
                    autoAlpha: 0,
                    delay: e * .15 + .25,
                    ease: Elastic.easeOut
                });
                Utils.getDevice() == "none" ? t.hover(this.listOver, this.listOut).tappable(this.itemClick) : t.tappable(this.itemClick)
            }
            this.startLoop()
        },
        getGridClick: function () {
            if (!$(this).hasClass("selected")) {
                $(this).hasClass("leftArrow") ? Work.gridPage-- : $(this).hasClass("rightArrow") && Work.gridPage++;
                Work.removeGridPage();
                TweenMax.delayedCall(1, Work.setGrid);
                Work.setGridNav()
            }
        },
        setGridNav: function () {
            if (Work.gridPage == 0) {
                TweenMax.to(Work.leftArrow, 1, {
                    autoAlpha: 0,
                    ease: Expo.easeOut
                });
                Work.leftArrow.addClass("selected").css({
                    cursor: "default"
                });
                TweenMax.to(Work.rightArrow, 1, {
                    autoAlpha: 1,
                    ease: Expo.easeOut
                });
                Work.rightArrow.removeClass("selected").css({
                    cursor: "pointer"
                })
            } else if (Work.gridPage == Work.numPages - 1) {
                TweenMax.to(Work.rightArrow, 1, {
                    autoAlpha: 0,
                    ease: Expo.easeOut
                });
                Work.rightArrow.addClass("selected").css({
                    cursor: "default"
                });
                TweenMax.to(Work.leftArrow, 1, {
                    autoAlpha: 1,
                    ease: Expo.easeOut
                });
                Work.leftArrow.removeClass("selected").css({
                    cursor: "pointer"
                })
            } else {
                TweenMax.to(Work.rightArrow, 1, {
                    autoAlpha: 1,
                    ease: Expo.easeOut
                });
                Work.rightArrow.hasClass("selected") && Work.rightArrow.removeClass("selected").css({
                    cursor: "pointer"
                });
                TweenMax.to(Work.leftArrow, 1, {
                    autoAlpha: 1,
                    ease: Expo.easeOut
                });
                Work.leftArrow.hasClass("selected") && Work.leftArrow.removeClass("selected").css({
                    cursor: "pointer"
                })
            }
        },
        setGrid: function () {
            Work.gridAmount = 6;
            Work.numPages = Math.ceil(Work.total / Work.gridAmount);
            Work.gridMin = Work.gridPage * Work.gridAmount;
            Work.gridMax = Work.gridPage * Work.gridAmount + Work.gridAmount;
            Work.gridMax > Work.total && (Work.gridMax = Work.total);
            Work.createGridPage()
        },
        createGridPage: function () {
            this.container.html("");
            var e = 0;
            for (var t = this.gridMin; t < this.gridMax; t++) {
                console.log(this.data[t], t);
                var n = "";
                this.data[t].media_attachments.length == 0 ? n = "" : this.data[t].media_attachments.length == undefined ? n = this.data[t].media_attachments.images.thumbnail.url : n = this.data[t].media_attachments[0].images.medium.url;
                this.container.append('<figure class="gridItem" data-href="' + this.data[t].post_name + '"><div class="block"><div class="itemInfo"><div class="title">' + this.data[t].post_title + '</div><hr><div class="visit">View Project</div></div><img src="' + n + '" class="blockImg"></div></figure>');
                var r = $(".gridItem").eq(e),
                    i = r.find(".block"),
                    s = i.find(".itemInfo");
                TweenMax.set(s, {
                    autoAlpha: 0
                });
                TweenMax.set(r, {
                    autoAlpha: 0
                });
                r.hover(this.itemOver, this.itemOut).tappable(this.itemClick);
                this.loadItem(r, i);
                e++
            }
        },
        removeGrid: function () {
            Work.gridPage = 0;
            Work.removeGridPage();
            TweenMax.to(Work.rightArrow, .5, {
                autoAlpha: 0,
                ease: Expo.easeOut
            });
            TweenMax.to(Work.leftArrow, .5, {
                autoAlpha: 0,
                ease: Expo.easeOut
            })
        },
        removeGridPage: function () {
            var e = 0;
            for (var t = this.gridMin; t < this.gridMax; t++) {
                var n = $(".gridItem").eq(e),
                    r = n.find(".block"),
                    i = 360 * Utils.getRandomInt(2),
                    s = 360 * Utils.getRandomInt(2),
                    o = -2e3 + Utils.getRandomInt(4e3),
                    u = -2e3 + Utils.getRandomInt(4e3),
                    a = -2e3 + Utils.getRandomInt(4e3),
                    f = .25 + Utils.getRandomInt(5) * .1,
                    l = .4 - Utils.getRandomInt(4) * .05;
                TweenMax.to(r, f, {
                    delay: l,
                    rotationY: s,
                    rotationX: i,
                    z: a,
                    ease: Expo.easeInOut
                });
                TweenMax.to(r, f - .25, {
                    delay: l,
                    x: o,
                    y: u,
                    autoAlpha: 0,
                    ease: Expo.easeInOut
                });
                e++
            }
        },
        removeList: function () {
            clearInterval(this.enterFrame);
            this.enterFrame = null;
            for (var e = 0; e < this.total; e++) {
                var t = $(".listItem").eq(e),
                    n = t.find(".bkg"),
                    r = t.find(".itemInfo");
                TweenMax.to(t, .25, {
                    rotationX: 180,
                    autoAlpha: 0,
                    y: 57,
                    color: "#000",
                    delay: e * .05,
                    ease: Expo.easeIn
                });
                TweenMax.to(n, .25, {
                    autoAlpha: 1,
                    delay: e * .05,
                    ease: Expo.easeIn
                })
            }
        },
        loadItem: function (e, t) {
            t.find(".blockImg").load(function (n) {
                Work.animateItemIn(e, t)
            })
        },
        animateItemIn: function (e, t) {
            var n = 360 * Utils.getRandomInt(2),
                r = 360 * Utils.getRandomInt(2),
                i = -2e3 + Utils.getRandomInt(4e3),
                s = -2e3 + Utils.getRandomInt(4e3),
                o = -2e3 + Utils.getRandomInt(4e3),
                u = 1.5 + Utils.getRandomInt(10) * .1,
                a = 1 - Utils.getRandomInt(8) * .1;
            TweenMax.set(e, {
                autoAlpha: 1,
                delay: a
            });
            TweenMax.set(t, {
                z: o,
                rotationY: r,
                rotationX: n,
                x: i,
                y: s,
                autoAlpha: 0
            });
            TweenMax.to(t, u, {
                delay: a,
                rotationY: 0,
                rotationX: 0,
                z: 0,
                ease: Expo.easeInOut
            });
            TweenMax.to(t, u - .5, {
                delay: a,
                x: 0,
                y: 0,
                autoAlpha: 1,
                ease: Expo.easeInOut
            })
        },
        removeCarousel: function () {
            clearInterval(this.enterFrame);
            this.enterFrame = null;
            Work.navContainer.swipe("destroy");
            Work.navContainer.unbind("swipe");
            for (var e = 0; e < this.total; e++) {
                var t = $(".caroItem").eq(e),
                    n = t.find(".block"),
                    r = 360 * Utils.getRandomInt(2),
                    i = 360 * Utils.getRandomInt(2),
                    s = -2e3 + Utils.getRandomInt(4e3),
                    o = -2e3 + Utils.getRandomInt(4e3),
                    u = -2e3 + Utils.getRandomInt(4e3),
                    a = .25 + Utils.getRandomInt(5) * .1,
                    f = .4 - Utils.getRandomInt(4) * .05;
                TweenMax.to(n, a, {
                    delay: f,
                    rotationY: i,
                    rotationX: r,
                    z: u,
                    ease: Expo.easeInOut
                });
                TweenMax.to(n, a - .25, {
                    delay: f,
                    x: s,
                    y: o,
                    autoAlpha: 0,
                    ease: Expo.easeInOut
                })
            }
        },
        remove: function () {
            oldSub == "" ? Work.view == "carousel" ? Work.removeCarousel() : Work.view == "grid" ? Work.removeGrid() : Work.view == "list" && Work.removeList() : WorkDetail.remove()
        },
        startLoop: function () {
            if (Utils.getDevice() != "none") {
                if (Work.view == "carousel") {
                    window.addEventListener("devicemotion", Work.onDeviceMotion, !1);
                    Work.enterFrame = setInterval(Work.loopTablet, 100);
                    Work.navContainer.swipe("destroy");
                    Work.navContainer.swipe({
                        swipe: Work.caroSwipeDetect,
                        threshold: 10
                    })
                } else if (Work.view == "list") {
                    Work.navContainer.swipe("destroy");
                    Work.navContainer.swipe({
                        click: Work.itemTargetClick,
                        swipe: Work.listSwipeDetect,
                        threshold: 10
                    })
                }
            } else {
                window.addEventListener("mousemove", Work.onMouseMove, !1);
                Work.enterFrame = setInterval(Work.loopDesktop, 1e3 / 60)
            }
        },
        caroSwipeDetect: function (e, t, n) {
            t == "left" ? Work.locY -= n * .33 : t == "right" && (Work.locY += n * .33);
            Work.y += Work.locY;
            TweenMax.to(Work.container, 1.5, {
                rotationY: Work.locY,
                ease: Quint.easeOut
            })
        },
        listSwipeDetect: function (e, t, n) {
            t == "up" ? Work.y -= n : t == "down" && (Work.y += n);
            Work.y > 0 ? Work.y = 0 : Work.y < $("#list").height() - Work.container.height() && (Work.y = $("#list").height() - Work.container.height());
            TweenMax.to(Work.container, .75, {
                y: Work.y,
                ease: Quint.easeOut
            })
        },
        swipeStatus: function (e, t, n, r) {
            console.log("Work.swipeStatus", n);
            var i = 0;
            n == "left" && (Work.locY -= r);
            n == "right" && (Work.locY += r);
            TweenMax.to(Work.container, 0, {
                rotationY: Work.locY,
                ease: Quint.easeOut
            })
        },
        onDeviceMotion: function (e) {
            var t = e.accelerationIncludingGravity;
            if (Work.ort == 0) {
                Work.y = Math.round(t.x) * 5;
                Work.x = Math.round(t.y) * -3 - 30
            } else if (Work.ort == 90) {
                Work.x = Math.round(t.x) * -3 - 30;
                Work.y = Math.round(t.y) * 5
            } else if (Work.ort == 180) {
                Work.y = Math.round(t.x) * -5;
                Work.x = Math.round(t.y) * -3
            } else if (Work.ort == -90) {
                Work.x = Math.round(t.x) * -3;
                Work.y = Math.round(t.y) * 5
            }
        },
        onMouseMove: function (e) {
            if (Work.view == "carousel") {
                Work.locY = -(-(window.innerWidth * .5) + e.pageX) * .0015;
                Work.x = -(-(window.innerHeight * .5) + e.pageY) * .01
            } else Work.view == "list" && (Work.locY = -(-(window.innerHeight * .5) + e.pageY) * .025)
        },
        loopDesktop: function () {
            if (Work.view == "carousel") {
                Work.y += Work.locY;
                TweenMax.to(Work.container, .75, {
                    rotationX: Work.x,
                    rotationY: Work.y,
                    ease: Quad.easeOut
                })
            } else {
                Work.y += Work.locY;
                Work.y > 0 ? Work.y = 0 : Work.y < $("#list").height() - Work.container.height() && (Work.y = $("#list").height() - Work.container.height());
                TweenMax.to(Work.container, 1, {
                    y: Work.y,
                    ease: Quint.easeOut
                })
            }
        },
        loopTablet: function () {
            TweenMax.to(Work.container, .75, {
                rotationX: Work.x + 10,
                ease: Cubic.easeOut
            })
        },
        inside: function () {
            if (this.enterFrame) {
                clearInterval(this.enterFrame);
                this.enterFrame = null
            }
            this.getID();
            oldPage != "" && (this.view == "carousel" ? this.removeCarousel() : this.view == "grid" ? this.removeGrid() : this.view == "list" && this.removeList());
            !oldSub || oldSub == "" ? WorkDetail.init() : WorkDetail.inside()
        },
        getID: function () {
            this.data = workJSON.projectList;
            this.total = this.data.length;
            oldSubNum = subNum;
            for (var e = 0; e < this.total; e++)
                if (this.data[e].post_name == sub) {
                    subNum = e;
                    break
                }
        },
        restore: function () {
            WorkDetail.hide();
            Work.init()
        },
        resizer: function () {
            WorkDetail.resizer();
            this.viewNav.css("top", w.height() - 100);
            if (w.width() > 1100) {
                this.leftArrow && this.leftArrow.css({
                    left: "20px"
                });
                this.rightArrow && this.rightArrow.css({
                    right: "20px"
                })
            }
        },
        updateOrientation: function (e) {
            var t, n = Work.ort;
            Work.ort = window.orientation;
            if (n != Work.ort)
                if (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") {
                    var r = $("#orientation");
                    Work.ort == 0 || Work.ort == 180 ? r.css("display", "none") : r.css("display", "block")
                }
        }
    },
    About = {
        el: "",
        title: "",
        bio: "",
        awardTitle: "",
        awardContent: "",
        skillsTitle: "",
        skillsContent: "",
        aboutScroll: "",
        construct: function () {
            this.el = $("#about");
            this.title = $("#about-title");
            this.bio = $("#about-bio");
            this.awardTitle = $("#about-awards").find("header");
            this.awardContent = $("#about-awards");
            this.skillsTitle = $("#skills-awards").find("header");
            this.skillsContent = $("#about-skills");
            TweenMax.set(this.el.find("hr"), {
                autoAlpha: 0
            })
        },
        init: function () {
            TweenMax.to(this.el.find("hr"), 1, {
                autoAlpha: .25,
                width: "100%",
                ease: Expo.easeOut,
                delay: .5
            });
            if (Utils.getDevice() == "iphone" || Utils.getDevice == "android") {
                $("#about-content").height(this.skillsContent.position().top + this.skillsContent.height());
                this.aboutScroll = new iScroll("about-container", {
                    vScrollbar: !0
                })
            } else {
                TweenMax.set(this.title, {
                    rotationX: 90,
                    color: "#000",
                    autoAlpha: 0
                });
                TweenMax.to(this.title, 1.5, {
                    ease: Elastic.easeOut,
                    rotationX: 0,
                    color: "#eee",
                    delay: .5,
                    autoAlpha: 1
                });
                TweenMax.set(this.bio, {
                    autoAlpha: 0
                });
                TweenMax.to(this.bio, 1.5, {
                    ease: Expo.easeOut,
                    delay: .65,
                    autoAlpha: 1
                });
                TweenMax.set(this.awardContent, {
                    autoAlpha: 0,
                    y: -100
                });
                TweenMax.to(this.awardContent, 1.5, {
                    ease: Expo.easeOut,
                    delay: 1,
                    autoAlpha: 1,
                    y: 0
                });
                TweenMax.set(this.skillsContent, {
                    autoAlpha: 0,
                    y: -100
                });
                TweenMax.to(this.skillsContent, 1.5, {
                    ease: Expo.easeOut,
                    delay: 1.15,
                    autoAlpha: 1,
                    y: 0
                })
            }
        },
        remove: function () {}
    },
    WorkDetail = {
        el: "",
        bkg: "",
        leftArrow: "",
        rightArrow: "",
        close: "",
        leftContent: "",
        title: "",
        createdAt: "",
        textContent: "",
        rightContent: "",
        numImages: "",
        awardsList: "",
        data: "",
        preloader: "",
        contentBox: "",
        contentContainer: "",
        hr: "",
        thr: "",
        bhr: "",
        caroImgItem: "",
        caroCount: 0,
        caroActive: !0,
        caroTotal: 0,
        construct: function () {
            this.el = $("#work").find(".detail");
            this.bkg = this.el.find("#bkg");
            this.leftArrow = this.el.find(".leftArrow");
            this.rightArrow = this.el.find(".rightArrow");
            this.close = this.el.find("#close");
            this.leftContent = $("#leftContent");
            this.title = this.leftContent.find(".title");
            this.contentBox = $("#contentBox");
            this.contentContainer = $("#contentContainer");
            console.log(this.title);
            this.createdAt = this.leftContent.find(".created-at");
            this.textContent = this.leftContent.find(".text");
            this.awardsList = this.leftContent.find(".awards-list");
            this.contentBox.css({
                visibility: "hidden"
            });
            this.rightContent = $("#rightContent");
            this.numImages = $("#numImages");
            this.hr = $("hr");
            this.thr = $("#tophr");
            this.bhr = $("#bottomhr");
            TweenMax.set(this.leftArrow, {
                autoAlpha: 0
            });
            TweenMax.set(this.rightArrow, {
                autoAlpha: 0
            });
            TweenMax.set(this.close, {
                scale: 0,
                autoAlpha: 0
            });
            Utils.getDevice() == "none" ? this.rightArrow.hover(this.arrowOver, this.arrowOut).tappable(this.getPrevItem) : this.rightArrow.tappable(this.getPrevItem);
            Utils.getDevice() == "none" ? this.leftArrow.hover(this.arrowOver, this.arrowOut).tappable(this.getNextItem) : this.leftArrow.tappable(this.getNextItem);
            Utils.getDevice() == "none" ? this.close.hover(this.closeOver, this.closeOut).tappable(this.closeClick) : this.close.tappable(this.closeClick);
            $(".launch").hover(function () {
                TweenMax.to($(this), 1, {
                    color: "#999",
                    ease: Expo.easeOut
                })
            }, function () {
                TweenMax.to($(this), .5, {
                    color: "#444",
                    ease: Expo.easeOut
                })
            }).click(WorkDetail.launchIt)
        },
        init: function () {
            this.el.css({
                visibility: "visible",
                display: "block"
            });
            TweenMax.set(this.leftArrow, {
                autoAlpha: 1,
                scale: 1
            });
            TweenMax.set(this.rightArrow, {
                autoAlpha: 1,
                scale: 1
            });
            TweenMax.set(this.leftArrow.find(".arrowBkg"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.set(this.rightArrow.find(".arrowBkg"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.to(this.leftArrow.find(".arrowBkg"), .35, {
                autoAlpha: .5,
                scale: 1,
                ease: Back.easeOut,
                delay: 2
            });
            TweenMax.to(this.rightArrow.find(".arrowBkg"), .35, {
                autoAlpha: .5,
                scale: 1,
                ease: Back.easeOut,
                delay: 2.25
            });
            TweenMax.set(this.leftArrow.find(".arrow"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.set(this.rightArrow.find(".arrow"), {
                autoAlpha: 0,
                scale: .5
            });
            TweenMax.to(this.leftArrow.find(".arrow"), .35, {
                autoAlpha: 1,
                scale: 1,
                ease: Back.easeOut,
                delay: 2.25
            });
            TweenMax.to(this.rightArrow.find(".arrow"), .35, {
                autoAlpha: 1,
                scale: 1,
                ease: Back.easeOut,
                delay: 2.5
            });
            TweenMax.to(this.close, .35, {
                autoAlpha: 1,
                scale: 1,
                ease: Back.easeOut,
                delay: 2.25
            });
            this.bkg.css("height", w.height());
            TweenMax.set(this.bkg, {
                y: -w.height(),
                visibility: "visible"
            });
            TweenMax.to(this.bkg, 1.5, {
                y: "0%",
                ease: Expo.easeInOut,
                delay: .5
            });
            this.contentBox.css({
                display: "block"
            });
            TweenMax.delayedCall(1, this.createContent);
            Nav.darkenNav()
        },
        inside: function () {
            TweenMax.delayedCall(1, this.createContent);
            this.removeContent()
        },
        createContent: function () {
            WorkDetail.data = Work.data[subNum];
            WorkDetail.title.html(WorkDetail.data.post_title);
            WorkDetail.createdAt.html("Created at " + WorkDetail.data.custom_fields.created_at + " for " + WorkDetail.data.custom_fields.client);
            WorkDetail.textContent.html('<div class="contentScroll">' + WorkDetail.data.post_html + "<br><i>ROLES:</i> " + WorkDetail.data.custom_fields.roles + "</div>");
            WorkDetail.resizer();
            console.log(WorkDetail.data.custom_fields);
            if (Utils.getDevice() == "ipad" || Utils.getDevice() == "androidTablet") {
                if (w.width() < 1024) {
                    WorkDetail.textContent.find(".contentScroll").css({
                        width: "330px"
                    });
                    WorkDetail.textContent.css({
                        height: 300,
                        top: "0px"
                    })
                } else {
                    WorkDetail.textContent.find(".contentScroll").css({
                        width: "270px"
                    });
                    WorkDetail.textContent.css({
                        height: 380 - WorkDetail.thr.position().top,
                        top: WorkDetail.thr.position().top - 20
                    })
                }
                myScroll = new iScroll("contentText", {
                    vScrollbar: !0
                })
            } else if (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") {
                myScroll && myScroll.destroy(!0);
                WorkDetail.contentBox.css({
                    height: w.height() - 110
                });
                WorkDetail.contentContainer.css({
                    height: WorkDetail.leftContent.height() + WorkDetail.leftContent.position().top + 40
                });
                myScroll = new iScroll("contentBox", {
                    vScrollbar: !0
                })
            } else {
                WorkDetail.textContent.find(".contentScroll").css({
                    width: "270px"
                });
                Utils.isIE() ? WorkDetail.textContent.css({
                    height: 380 - WorkDetail.thr.position().top,
                    top: WorkDetail.thr.position().top + 20
                }) : WorkDetail.textContent.css({
                    height: 380 - WorkDetail.thr.position().top,
                    top: WorkDetail.thr.position().top - 20
                });
                myScroll = new iScroll("contentText", {
                    vScrollbar: !0,
                    draggableScrollbars: !0
                })
            }
            TweenMax.set(WorkDetail.textContent, {
                autoAlpha: 0
            });
            WorkDetail.hr.css({
                width: 0
            });
            Utils.getDevice() == "iphone" || Utils.getDevice() == "android" ? WorkDetail.bhr.css({
                top: "0px"
            }) : Utils.isIE() ? WorkDetail.bhr.css({
                top: "410px"
            }) : WorkDetail.bhr.css({
                top: "380px"
            });
            Utils.getDevice() == "ipad" || Utils.getDevice() == "androidTablet" ? w.width() < 1024 ? WorkDetail.awardsList.css({
                top: WorkDetail.createdAt.position().top + WorkDetail.createdAt.height() + 15
            }) : WorkDetail.awardsList.css({
                top: WorkDetail.bhr.position().top - 20
            }) : Utils.getDevice() == "iphone" || Utils.getDevice() == "android" ? WorkDetail.awardsList.css({
                top: WorkDetail.bhr.position().top + 20
            }) : Utils.isIE() ? WorkDetail.awardsList.css({
                top: WorkDetail.bhr.position().top + 20
            }) : WorkDetail.awardsList.css({
                top: WorkDetail.bhr.position().top - 20
            });
            TweenMax.set(WorkDetail.awardsList, {
                scale: .5,
                autoAlpha: 0
            });
            TweenMax.set(WorkDetail.title, {
                rotationX: -130
            });
            WorkDetail.title.css({
                color: "#FFF",
                visibility: "hidden"
            });
            TweenMax.set(WorkDetail.createdAt, {
                rotationX: -130
            });
            WorkDetail.createdAt.css({
                color: "#FFF",
                visibility: "hidden"
            });
            TweenMax.to(preloadContent, 0, {
                y: 0,
                display: "block",
                overwrite: !0
            });
            TweenMax.set(preloadEaser, {
                top: 0
            });
            TweenMax.set(preloadCircle, {
                scale: .75,
                rotation: -90,
                opacity: 0,
                display: "block"
            });
            TweenMax.set(preloadCircleBkg, {
                scale: 2,
                opacity: 0,
                rotation: -90,
                display: "block"
            });
            TweenMax.set(WorkDetail.rightContent, {
                z: -840,
                y: 0,
                autoAlpha: 0,
                rotationX: 90,
                rotationY: 45
            });
            TweenMax.to(preloadCircleBkg, .65, {
                css: {
                    scale: .75,
                    opacity: .75
                },
                ease: Back.easeOut,
                overwrite: !0,
                onComplete: WorkDetail.preload
            });
            LoadingCircle.animate(document.getElementById("preloadCircle"), "#666666", 6, $("#preloadEaser"), 0)
        },
        preload: function () {
            WorkDetail.preloader = new PreloadJS;
            WorkDetail.preloader.onProgress = WorkDetail.onPreloadProgress;
            WorkDetail.preloader.onComplete = WorkDetail.onPreloadComplete;
            var e = [],
                t = WorkDetail.data.media_attachments;
            for (var n = 0; n < t.length; n++) e.push(t[n].images.medium.url);
            WorkDetail.preloader.loadManifest(e);
            TweenMax.set(preloadCircle, {
                scale: .75,
                opacity: 1,
                display: "block"
            })
        },
        onPreloadProgress: function (e) {
            LoadingCircle.animate(document.getElementById("preloadCircle"), "#999999", 5, $("#preloadEaser"), preloader.progress * 200)
        },
        onPreloadComplete: function (e) {
            TweenMax.to(WorkDetail.title, 1.5, {
                autoAlpha: 1,
                rotationX: 0,
                color: "#444",
                ease: Elastic.easeOut,
                delay: 1
            });
            TweenMax.to(WorkDetail.createdAt, 1.5, {
                autoAlpha: 1,
                rotationX: 0,
                color: "#444",
                ease: Elastic.easeOut,
                delay: 1.15
            });
            TweenMax.to(WorkDetail.textContent, 2, {
                autoAlpha: 1,
                ease: Expo.easeOut,
                delay: 1.75
            });
            TweenMax.to(preloadContent, .5, {
                css: {
                    y: 0,
                    display: "none"
                },
                ease: Expo.easeIn,
                delay: .5
            });
            TweenMax.to(preloadCircle, .35, {
                css: {
                    scale: 2,
                    opacity: 0,
                    display: "none"
                },
                ease: Back.easeIn,
                delay: .5
            });
            TweenMax.to(preloadCircleBkg, .35, {
                css: {
                    scale: 2,
                    opacity: 0,
                    display: "none"
                },
                ease: Back.easeIn,
                delay: .5
            });
            if (Utils.isIE()) {
                TweenMax.to(WorkDetail.thr, 1.5, {
                    width: 275,
                    ease: Expo.easeOut,
                    delay: 1.75
                });
                TweenMax.to(WorkDetail.bhr, 1.5, {
                    width: 275,
                    ease: Expo.easeOut,
                    delay: 2
                })
            } else {
                TweenMax.to(WorkDetail.thr, 1.5, {
                    width: "100%",
                    ease: Expo.easeOut,
                    delay: 1.75
                });
                TweenMax.to(WorkDetail.bhr, 1.5, {
                    width: "100%",
                    ease: Expo.easeOut,
                    delay: 2
                })
            }
            TweenMax.set(WorkDetail.contentBox, {
                autoAlpha: 1
            });
            TweenMax.set(WorkDetail.contentBox, {
                y: 0
            });
            TweenMax.to(WorkDetail.rightContent, 1.25, {
                z: 0,
                ease: Expo.easeInOut,
                autoAlpha: 1,
                delay: 1
            });
            TweenMax.to(WorkDetail.rightContent, 1.25, {
                rotationX: 0,
                ease: Quint.easeInOut,
                delay: 1
            });
            TweenMax.to(WorkDetail.rightContent, 1.25, {
                rotationY: 0,
                ease: Quad.easeOut,
                delay: 1
            });
            WorkDetail.data.custom_fields.project_link != "" ? TweenMax.to(WorkDetail.awardsList, .5, {
                scale: 1,
                autoAlpha: 1,
                delay: 2.5,
                ease: Back.easeOut
            }) : TweenMax.set(WorkDetail.awardsList, {
                autoAlpha: 0
            });
            WorkDetail.setUpCarousel()
        },
        setUpCarousel: function () {
            var e = WorkDetail.data.media_attachments;
            WorkDetail.rightContent.html('<div id="rightImgHolder"><div id="imageContainer"></div></div>');
            WorkDetail.imageContainer = $("#imageContainer");
            var t = "",
                n = "";
            for (var r = 0; r < e.length; r++) {
                t += '<img src="' + e[r].images.medium.url + '" class="caroImg" id="caroImg' + r + '">';
                n += '<div class="caroImgItem" id="caroImgItem' + r + '"></div>'
            }
            WorkDetail.imageContainer.css({
                width: e.length * 600
            }).html(t);
            WorkDetail.numImages.css({
                width: e.length * 18,
                "margin-left": e.length * 18 * -0.5
            }).html(n);
            Utils.getDevice() != "none" && $(".caroImg").addClass("trans3d");
            for (var r = 0; r < e.length; r++) {
                var i = $(".caroImgItem").eq(r);
                TweenMax.set(i, {
                    autoAlpha: 0,
                    y: -25
                });
                if (r == 0) {
                    TweenMax.to(i, .5, {
                        autoAlpha: 1,
                        y: 0,
                        delay: r * .05 + 2,
                        ease: Back.easeOut
                    });
                    i.addClass("selected")
                } else {
                    TweenMax.to(i, .35, {
                        autoAlpha: .5,
                        y: 0,
                        delay: r * .05 + 2,
                        ease: Back.easeOut
                    });
                    i.hasClass("selected") && i.removeClass("selected")
                }
                i.hover(WorkDetail.caroOver, WorkDetail.caroOut).tappable(WorkDetail.caroClick)
            }
            WorkDetail.caroCount = 0;
            WorkDetail.caroActive = !0;
            WorkDetail.caroTotal = e.length;
            WorkDetail.imageContainer.swipe({
                swipe: WorkDetail.swipeCarousel,
                threshold: 10
            });
            TweenMax.to($("#contentBox"), 0, {
                delay: 7,
                onComplete: WorkDetail.loopCarousel,
                overwrite: !0
            })
        },
        caroOver: function () {
            $(this).hasClass("selected") || TweenMax.to($(this), .5, {
                autoAlpha: .75,
                ease: Expo.easeOut
            })
        },
        caroOut: function () {
            $(this).hasClass("selected") || TweenMax.to($(this), .25, {
                autoAlpha: .5,
                ease: Expo.easeOut
            })
        },
        caroClick: function () {
            if (!$(this).hasClass("selected")) {
                WorkDetail.caroActive = !1;
                WorkDetail.caroCount = $(this).attr("id").substr(11, 2);
                WorkDetail.shiftCarousel()
            }
        },
        loopCarousel: function () {
            if (WorkDetail.caroActive) {
                WorkDetail.caroCount++;
                WorkDetail.caroCount == WorkDetail.caroTotal && (WorkDetail.caroCount = 0);
                console.log(WorkDetail.caroCount);
                WorkDetail.shiftCarousel();
                TweenMax.to($("#contentBox"), 0, {
                    delay: 5,
                    onComplete: WorkDetail.loopCarousel
                })
            }
        },
        swipeCarousel: function (e, t, n) {
            if (t == "left") {
                WorkDetail.caroCount++;
                WorkDetail.caroCount == WorkDetail.caroTotal && (WorkDetail.caroCount = 0)
            } else if (t == "right") {
                WorkDetail.caroCount--;
                WorkDetail.caroCount == -1 && (WorkDetail.caroCount = WorkDetail.caroTotal - 1)
            }
            WorkDetail.caroActive = !1;
            WorkDetail.shiftCarousel()
        },
        shiftCarousel: function () {
            for (var e = 0; e < WorkDetail.caroTotal; e++) {
                var t = $(".caroImgItem").eq(e);
                if (e == WorkDetail.caroCount) {
                    TweenMax.to(t, .5, {
                        autoAlpha: 1,
                        ease: Expo.easeOut
                    });
                    t.addClass("selected")
                } else {
                    TweenMax.to(t, .5, {
                        autoAlpha: .5,
                        ease: Expo.easeOut
                    });
                    t.hasClass("selected") && t.removeClass("selected")
                }
            }
            TweenMax.to(WorkDetail.imageContainer, 1.5, {
                ease: Expo.easeInOut,
                x: -WorkDetail.caroCount * $(".caroImg").width()
            })
        },
        removeContent: function () {
            WorkDetail.caroActive = !1;
            TweenMax.to(WorkDetail.title, .25, {
                autoAlpha: 0,
                rotationX: -130,
                color: "#FFF",
                ease: Expo.easeIn
            });
            TweenMax.to(WorkDetail.createdAt, .25, {
                autoAlpha: 0,
                rotationX: -130,
                color: "#FFF",
                ease: Expo.easeIn,
                delay: .05
            });
            TweenMax.to(WorkDetail.textContent, .75, {
                autoAlpha: 0,
                ease: Expo.easeInOut
            });
            TweenMax.to(WorkDetail.awardsList, .35, {
                scale: .5,
                autoAlpha: 0,
                ease: Back.easeIn
            });
            TweenMax.to(WorkDetail.thr, .25, {
                width: 0,
                ease: Expo.easeIn,
                delay: .1
            });
            TweenMax.to(WorkDetail.bhr, .25, {
                width: 0,
                ease: Expo.easeIn,
                delay: 0
            });
            TweenMax.to(WorkDetail.rightContent, .5, {
                ease: Expo.easeIn,
                autoAlpha: 0,
                y: 420
            });
            TweenMax.to(WorkDetail.rightContent, .5, {
                rotationX: -90,
                ease: Quint.easeIn
            });
            TweenMax.to(WorkDetail.rightContent, .5, {
                rotationY: 45,
                ease: Quad.easeIn
            });
            for (var e = 0; e < $(".caroImgItem").length; e++) {
                var t = $(".caroImgItem").eq(e);
                TweenMax.to(t, .2, {
                    autoAlpha: 0,
                    y: -25,
                    delay: e * .03,
                    ease: Expo.easeIn
                })
            }
        },
        getPreloadManifest: function (e) {
            e.push(Utils.extractUrl(this.bkg.css("background-image")));
            e.push(Utils.extractUrl(this.leftArrow.find(".arrowBkg").css("background-image")));
            e.push(Utils.extractUrl(this.leftArrow.find(".arrow").css("background-image")));
            e.push(Utils.extractUrl(this.rightArrow.find(".arrow").css("background-image")));
            e.push(Utils.extractUrl(this.close.css("background-image")))
        },
        resizer: function () {
            this.el.css("height", w.height());
            this.bkg.css("height", w.height());
            if (Utils.getDevice() == "ipad" || Utils.getDevice() == "androidTablet")
                if (w.width() < 1024) {
                    WorkDetail.textContent.find(".contentScroll").css({
                        width: "330px"
                    });
                    WorkDetail.textContent.css({
                        height: 300,
                        top: "0px"
                    })
                } else {
                    WorkDetail.textContent.find(".contentScroll").css({
                        width: "270px"
                    });
                    WorkDetail.textContent.css({
                        height: 380 - WorkDetail.thr.position().top,
                        top: WorkDetail.thr.position().top - 20
                    })
                }
            if (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") {
                WorkDetail.contentBox.css({
                    height: w.height() - 110
                });
                WorkDetail.close.css("top", w.height() - 40);
                WorkDetail.leftArrow.css("top", w.height() - 17);
                WorkDetail.rightArrow.css("top", w.height() - 17)
            }
            Utils.getDevice() == "ipad" || Utils.getDevice() == "androidTablet" ? w.width() < 1024 ? WorkDetail.awardsList.css({
                top: WorkDetail.createdAt.position().top + WorkDetail.createdAt.height() + 15
            }) : WorkDetail.awardsList.css({
                top: WorkDetail.bhr.position().top - 20
            }) : Utils.getDevice() == "iphone" || Utils.getDevice() == "android" ? WorkDetail.awardsList.css({
                top: WorkDetail.bhr.position().top + 20
            }) : WorkDetail.awardsList.css({
                top: WorkDetail.bhr.position().top - 20
            })
        },
        hide: function () {
            WorkDetail.caroActive = !1;
            TweenMax.to(this.bkg, .75, {
                y: w.height(),
                ease: Expo.easeIn,
                onComplete: WorkDetail.remove
            });
            TweenMax.to(this.leftArrow, .35, {
                autoAlpha: 0,
                scale: .5,
                ease: Back.easeOut
            });
            TweenMax.to(this.rightArrow, .35, {
                autoAlpha: 0,
                scale: .5,
                ease: Back.easeOut,
                delay: .1
            });
            TweenMax.to(WorkDetail.contentBox, .65, {
                y: w.height(),
                ease: Expo.easeIn
            });
            TweenMax.to(WorkDetail.close, .35, {
                scale: 0,
                rotation: 360,
                ease: Back.easeIn
            });
            Nav.lightenNav()
        },
        remove: function () {
            TweenMax.set(WorkDetail.el, {
                display: "none",
                delay: 1
            });
            TweenMax.set(WorkDetail.bkg, {
                visibility: "hidden",
                delay: 1
            });
            TweenMax.set(WorkDetail.leftArrow, {
                autoAlpha: 0,
                delay: 1
            });
            TweenMax.set(WorkDetail.rightArrow, {
                autoAlpha: 0,
                delay: 1
            });
            TweenMax.set(WorkDetail.contentBox, {
                autoAlpha: 0,
                display: "none",
                delay: 1
            });
            TweenMax.set(WorkDetail.close, {
                autoAlpha: 0,
                delay: 1
            });
            Nav.lightenNav()
        },
        arrowOver: function () {
            if (!$(this).hasClass("selected")) {
                TweenMax.to($(this).find(".arrowBkg"), 1, {
                    autoAlpha: 1,
                    ease: Expo.easeOut
                });
                $(this).hasClass("leftArrow") && TweenMax.to($(this).find(".arrow"), .5, {
                    x: -5,
                    ease: Expo.easeOut
                });
                $(this).hasClass("rightArrow") && TweenMax.to($(this).find(".arrow"), .5, {
                    x: 5,
                    ease: Expo.easeOut
                })
            }
        },
        arrowOut: function () {
            TweenMax.to($(this).find(".arrowBkg"), .5, {
                autoAlpha: .5,
                ease: Expo.easeOut
            });
            TweenMax.to($(this).find(".arrow"), .25, {
                x: 0,
                ease: Expo.easeOut
            })
        },
        getNextItem: function () {
            var e = subNum + 1;
            e >= Work.total && (e = 0);
            var t = Work.data[e].post_name;
            $.address.value("work/" + t);
            TweenMax.fromTo($(this).find(".arrowBkg"), .5, {
                autoAlpha: 1
            }, {
                autoAlpha: .5,
                ease: Expo.easeOut
            });
            TweenMax.to($(this).find(".arrow"), .25, {
                x: 0,
                ease: Expo.easeOut
            })
        },
        getPrevItem: function () {
            var e = subNum - 1;
            e < 0 && (e = Work.total - 1);
            var t = Work.data[e].post_name;
            $.address.value("work/" + t);
            TweenMax.fromTo($(this).find(".arrowBkg"), .5, {
                autoAlpha: 1
            }, {
                autoAlpha: .5,
                ease: Expo.easeOut
            });
            TweenMax.to($(this).find(".arrow"), .25, {
                x: 0,
                ease: Expo.easeOut
            })
        },
        closeOver: function () {
            TweenMax.to($(this), 1, {
                rotation: 360,
                scale: 1.1,
                ease: Quint.easeInOut
            })
        },
        closeOut: function () {
            TweenMax.to($(this), 0, {
                rotation: 0,
                ease: Expo.easeOut
            });
            TweenMax.to($(this), .5, {
                scale: 1,
                ease: Expo.easeOut
            })
        },
        closeClick: function () {
            $.address.value("work")
        },
        launchIt: function () {
            window.open(WorkDetail.data.custom_fields.project_link)
        }
    },
    Contact = {
        el: "",
        button: "",
        form: "",
        title: "",
        info: "",
        error: "",
        construct: function () {
            this.el = $("#contact");
            this.button = $(".button");
            this.form = $("#contact-form");
            this.title = $("#contact-title");
            this.info = $("#contact-info");
            this.error = $(".error");
            this.error.hide();
            TweenMax.set(this.el.find("hr"), {
                autoAlpha: 0
            });
            this.form.html('<a href="mailto:contact@flash-gallery.net?subject=Inquiry sent from flash-gallery.net" id="email" class="link"><span>EMAIL ME</span></a>');
            this.form.append('<a href="http://www.twitter.com/flashgallerynet" id="twitter" target="blank" class="link"><span>TWITTER</span></a>');
            this.form.append('<a href="http://www.linkedin.com/" target="blank" id="linkedin" class="link"><span>LINKEDIN</span></a>');
            this.form.append('<a href="http://www.facebook.com/" target="blank" id="codepen" class="link"><span>FACEBOOK</span></a>');
            this.form.find(".link").css("opacity", .75).hover(this.over, this.out)
        },
        over: function () {
            TweenMax.to($(this), 1, {
                color: "#333",
                opacity: 1,
                ease: Expo.easeOut
            })
        },
        out: function () {
            TweenMax.to($(this), .5, {
                color: "#FFF",
                opacity: .75,
                ease: Expo.easeOut
            })
        },
        init: function () {
            TweenMax.to(this.el.find("hr"), 1, {
                autoAlpha: .25,
                width: "100%",
                ease: Expo.easeOut,
                delay: .5
            });
            if (Utils.getDevice() == "iphone" || Utils.getDevice == "android") {
                $("#contact-content").height(this.form.position().top + this.form.height());
                this.contactScroll = new iScroll("contact-container", {
                    vScrollbar: !0,
                    onBeforeScrollStart: function (e) {
                        var t = e.target;
                        while (t.nodeType != 1) t = t.parentNode;
                        t.tagName != "SELECT" && t.tagName != "INPUT" && t.tagName != "TEXTAREA" && e.preventDefault()
                    }
                })
            } else {
                TweenMax.set(this.title, {
                    rotationX: 90,
                    color: "#000",
                    autoAlpha: 0
                });
                TweenMax.to(this.title, 1.5, {
                    ease: Elastic.easeOut,
                    rotationX: 0,
                    color: "#eee",
                    delay: .5,
                    autoAlpha: 1
                });
                TweenMax.set(this.info, {
                    autoAlpha: 0
                });
                TweenMax.to(this.info, 1.5, {
                    ease: Expo.easeOut,
                    delay: .65,
                    autoAlpha: 1
                });
                TweenMax.set(this.form, {
                    autoAlpha: 0,
                    y: 100
                });
                TweenMax.to(this.form, 1.5, {
                    ease: Expo.easeOut,
                    delay: 1,
                    autoAlpha: 1,
                    y: 0
                })
            }
        },
        remove: function () {}
    },
    Home = {
        el: "",
        obj: "",
        init: function () {
            this.el = $("#home");
            this.obj = this.el.find(".obj");
            this.resizer()
        },
        remove: function () {},
        resizer: function () {
            this.obj.css({
                "margin-top": this.obj.height() * -0.4
            });
            console.log(this.obj.height() * -0.4)
        }
    },
    Nav = {
        el: "",
        logo: "",
        header: "",
        bottom: "",
        navitem: "",
        navHolder: "",
        indicator: "",
        mobileBTN: "",
        scheme: "light",
        mobileVis: !1,
        construct: function () {
            this.el = $("#elements");
            this.logo = this.el.find("#logo");
            this.header = this.el.find("#header");
            this.navHolder = this.el.find("#navHolder");
            this.bottom = $("#bottom");
            this.navitem = this.el.find(".navitem");
            this.indicator = this.el.find("#indicator");
            this.mobileBTN = this.el.find("#mobileBTN");
            TweenMax.set(this.bottom, {
                y: 30
            })
        },
        init: function () {
            this.el.css("display", "block");
            if (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") {
                TweenMax.set(this.logo, {
                    rotationX: -130,
                    visibility: "hidden",
                    "background-color": "#333"
                });
                TweenMax.to(this.logo, .5, {
                    rotationX: 0,
                    autoAlpha: 1,
                    delay: 1,
                    ease: Back.easeOut
                });
                TweenMax.set(this.header, {
                    rotationX: -180,
                    visibility: "hidden",
                    "background-color": "#333"
                });
                TweenMax.to(this.header, 1.5, {
                    rotationX: 0,
                    autoAlpha: 1,
                    delay: 1.15,
                    ease: Elastic.easeOut
                });
                TweenMax.set(this.mobileBTN, {
                    rotationX: -180,
                    visibility: "hidden",
                    "background-color": "#333"
                });
                TweenMax.to(this.mobileBTN, 1.5, {
                    rotationX: 0,
                    autoAlpha: 1,
                    delay: 1.3,
                    ease: Elastic.easeOut
                });
                TweenMax.to(this.mobileBTN, .75, {
                    "background-color": "#fcfcfc",
                    delay: 1.3,
                    ease: Back.easeOut
                });
                this.mobileBTN.tappable(this.showMobileNav)
            } else {
                TweenMax.set(this.logo, {
                    rotationY: -130,
                    visibility: "hidden",
                    "background-color": "#333"
                });
                TweenMax.to(this.logo, .5, {
                    rotationY: 0,
                    autoAlpha: 1,
                    delay: 1,
                    ease: Back.easeOut
                });
                TweenMax.set(this.header, {
                    rotationY: -180,
                    visibility: "hidden",
                    "background-color": "#333"
                });
                TweenMax.to(this.header, 1.5, {
                    rotationY: 0,
                    autoAlpha: 1,
                    delay: 1.15,
                    ease: Elastic.easeOut
                })
            }
            TweenMax.to(this.logo, .75, {
                "background-color": "#fcfcfc",
                delay: 1,
                ease: Back.easeOut
            });
            TweenMax.to(this.header, 3, {
                "background-color": "#fcfcfc",
                delay: 1.15,
                ease: Elastic.easeOut
            });
            TweenMax.to(this.bottom, 1, {
                y: 0,
                ease: Expo.easeOut,
                delay: 1
            });
            Utils.getDevice() == "iphone" || Utils.getDevice() == "android" ? this.navHolder.css({
                display: "none"
            }) : this.build(1);
            this.navitem.hover(this.navOver, this.navOut).tappable(this.navClick);
            this.resizer()
        },
        build: function (e) {
            for (var t = 0; t < router.length; t++) {
                var n = this.navitem.eq(t);
                TweenMax.set(n, {
                    rotationX: -90,
                    visibility: "hidden"
                });
                TweenMax.to(n, 1.5, {
                    rotationX: 0,
                    autoAlpha: 1,
                    ease: Elastic.easeOut,
                    delay: t * .1 + e
                })
            }
        },
        darkenNav: function () {
            for (var e = 0; e < router.length; e++)
                if (e != pageNum) {
                    var t = Nav.navitem.eq(e);
                    TweenMax.to(t, 1, {
                        color: "#787878",
                        ease: Expo.easeOut,
                        delay: 1
                    })
                }
            this.scheme = "dark"
        },
        lightenNav: function () {
            for (var e = 0; e < router.length; e++)
                if (e != pageNum) {
                    var t = Nav.navitem.eq(e);
                    TweenMax.to(t, 1, {
                        color: "#eee",
                        ease: Expo.easeOut,
                        delay: .5
                    })
                }
            this.scheme = "light"
        },
        set: function () {
            for (var e = 0; e < router.length; e++) {
                if (e == pageNum) {
                    var t = Nav.navitem.eq(e);
                    t.addClass("selected");
                    if (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") TweenMax.to(t, 1, {
                        color: "#ccc",
                        backgroundColor: "#555",
                        scale: 1,
                        ease: Expo.easeOut,
                        delay: .25
                    });
                    else {
                        TweenMax.to(t, 1, {
                            color: "#666",
                            scale: 1.1,
                            ease: Expo.easeOut,
                            delay: .25
                        });
                        TweenMax.to(Nav.indicator, 1, {
                            left: t.position().left + 3,
                            width: t.width() + 10,
                            ease: Expo.easeInOut
                        })
                    }
                }
                if (e == oldPageNum) {
                    var n = Nav.navitem.eq(e);
                    n.removeClass("selected");
                    Utils.getDevice() == "iphone" || Utils.getDevice() == "android" ? TweenMax.to(n, 1, {
                        color: "#eee",
                        backgroundColor: "#333",
                        scale: 1,
                        ease: Expo.easeOut,
                        delay: .25
                    }) : TweenMax.to(n, 1, {
                        color: "#eee",
                        scale: 1,
                        ease: Expo.easeOut,
                        delay: .25
                    })
                }
            }
        },
        navOver: function (e) {
            $(this).hasClass("selected") || (Utils.getDevice() == "iphone" || Utils.getDevice() == "android" ? TweenMax.to($(this), 1, {
                ease: Expo.easeOut,
                color: "#46433f",
                scale: 1
            }) : TweenMax.to($(this), 1, {
                ease: Expo.easeOut,
                color: "#46433f",
                scale: 1.1
            }))
        },
        navOut: function (e) {
            $(this).hasClass("selected") || (Utils.getDevice() == "iphone" || Utils.getDevice() == "android" ? TweenMax.to($(this), 1, {
                ease: Expo.easeOut,
                color: "#eee",
                scale: 1
            }) : Nav.scheme == "dark" ? TweenMax.to($(this), 1, {
                ease: Expo.easeOut,
                color: "#787878",
                scale: 1
            }) : TweenMax.to($(this), 1, {
                ease: Expo.easeOut,
                color: "#eee",
                scale: 1
            }))
        },
        navClick: function (e) {
            $(this).hasClass("selected") || $.address.value($(this).attr("data-href"));
            (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") && Nav.showMobileNav(null)
        },
        showMobileNav: function (e) {
            if (!Nav.mobileVis) {
                Nav.navHolder.css({
                    display: "block"
                });
                TweenMax.set(Nav.navHolder, {
                    y: -Nav.navHolder.height()
                });
                TweenMax.to(Nav.navHolder, 1, {
                    y: 0,
                    ease: Expo.easeOut
                });
                Nav.mobileVis = !0;
                TweenMax.to(Nav.mobileBTN.find("img"), 1, {
                    rotation: 180,
                    ease: Expo.easeOut
                })
            } else {
                Nav.navHolder.css({
                    display: "none"
                });
                Nav.mobileVis = !1;
                TweenMax.to(Nav.mobileBTN.find("img"), 1, {
                    rotation: 0,
                    ease: Expo.easeOut
                })
            }
        },
        resizer: function () {
            (Utils.getDevice() == "iphone" || Utils.getDevice() == "android") && Nav.header && Nav.header.css({
                width: w.width() - 122
            });
            Utils.getDevice() == "none" && (w.width() < minWidth ? Nav.el.css({
                width: minWidth
            }) : Nav.el.css({
                width: "100%"
            }))
        }
    },
    Utils = {
        getRandomInt: function (e) {
            return Math.floor(Math.random() * e + 1)
        },
        appendJSONPath: function (e) {},
        appendAssetPath: function (e) {},
        isIE8: function () {},
        isFF: function () {
            return navigator.userAgent.toLowerCase().indexOf("firefox") != -1 ? !0 : !1
        },
        isChrome: function () {
            return navigator.userAgent.toLowerCase().indexOf("chrome") != -1 ? !0 : !1
        },
        isIE: function () {
            return navigator.userAgent.toLowerCase().indexOf("msie") != -1 ? !0 : !1
        },
        getDevice: function () {
            var e = navigator.userAgent.toLowerCase(),
                t = "";
            e.indexOf("iphone") != -1 || e.indexOf("itouch") != -1 ? t = "iphone" : e.indexOf("ipad") != -1 ? t = "ipad" : e.indexOf("blackberry") != -1 ? t = "blackberry" : e.indexOf("android") != -1 ? e.indexOf("mobile") == -1 ? t = "androidTablet" : t = "android" : t = "none";
            return t
        },
        extractUrl: function (e) {
            return e.replace(/"/g, "").replace(/url\(|\)$/ig, "")
        }
    },
    LoadingCircle = {
        canvas: "",
        context: "",
        centerX: "",
        centerY: "",
        radius: "",
        draw: function (e, t, n, r) {
            r == null && (r = 2);
            this.canvas = e;
            this.context = this.canvas.getContext("2d");
            this.centerX = this.canvas.width / 2;
            this.centerY = this.canvas.height / 2;
            this.radius = 70;
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.beginPath();
            this.context.arc(this.centerX, this.centerY, this.radius, 0, r * Math.PI, !1);
            this.context.lineWidth = n;
            this.context.strokeStyle = t;
            this.context.stroke()
        },
        clear: function (e) {
            this.canvas = e
        },
        animate: function (e, t, n, r, i) {
            TweenMax.to(r, .5, {
                css: {
                    top: i
                },
                onUpdate: function () {
                    LoadingCircle.draw(e, t, n, r.position().top * .01)
                }
            })
        }
    },
    pushStatePath = "",
    w, b, d, preloader, preloadContent, preloadLogo, preloadCircle, preloadCircleBkg, preloadEaser, siteBkg, container, content, page, oldPage, sub, oldSub, loc, oldLoc, subNum, oldSubNum, obj, pageNum = -1,
    oldPageNum = -1,
    router = [{
        route: "home",
        obj: Home
    }, {
        route: "work",
        obj: Work
    }, {
        route: "about",
        obj: About
    }, {
        route: "contact",
        obj: Contact
    }],
    minWidth = 1050,
    workJSON, first = !0,
    state = window.history.pushState !== undefined;
typeof console == "undefined" && (this.console = {
    log: function () {}
});
document.ontouchmove = function (e) {
    e.preventDefault()
};
$(document).ready(init);