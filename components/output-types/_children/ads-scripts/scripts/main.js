export const lgFloorPrices = `
'use strict'
window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];
//variables de configuración

var ayosCtrl = true; //en true el script se autoejecuta, en false para ejecución por parte del publisher

var exec = true; //en false no ejecuta el script

var safe = false; //en true se ejecuta en modo seguro con el parámetro ayos_safe

var refCtrl = true; //en true toma el control de la función refresh() de GPT

var ayosReady = false; //se pone en true cuando el script ha terminado de ejecutarse

var deb = false; //en true se ejecuta en modo debug con el parámetro ayos_deb

var PublisherTimeZone = 2; //zona horaria del publisher

var logLevel = 1; //establece el nivel de loging

//urls

var rp = "https://srv1-bd-floor-prices.com/rp"; //servicio de recomendación de floors

var rs = "https://srv1-bd-floor-prices.com/rs"; //envío de request a datastore

var ss = "https://srv1-bd-floor-prices.com/rs"; //envio de response a datastore

var fb = "https://srv1-bd-floor-prices.com/rs"; //servicio de feedback

//varibles globales

var set = false;
var time1 = 0;
var time2 = 0;
var URL = window.location.href;
var date = new Date();
var startTime = date.getTime();
var refAyosDelay;
var reqID = '';
var char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var req = {};
var res;
var slots = [];
var userID = '';
var done = false;
//lista de exclusiones

var exclusions = [
    " ",
    " ",
    " "
];
exclusions.forEach(function exclude(section){
    if (URL.search(section) != -1) {
        console.log("AYOS exclusion");
        exec = false;
    }
});
//generación del request ID

for (let a = 0; a <= 30; a++) {
    reqID += char.charAt(Math.floor(Math.random() * char.length));
}
//modo safe

if(safe){
    if (URL.search("ayos_safe") == -1){
        exec = false;
    }else{
        console.log("AYOS safe mode");
        if (logLevel >= 3) {
            log(9)
        }
    }
}
//modo debug

if (URL.search("ayos_deb") != -1){
    deb = true;
    if (logLevel >= 3) {
        log(10)
    }
}
//control de refresh y delay

if(refCtrl){
    googletag.cmd.push(function() {
        var refresh = new Function();
        refresh = googletag.pubads().refresh;
        googletag.pubads().refresh = function() {
            comprobar();
            if (!set) {
                let time = new Date();
                time1 = time.getMilliseconds();
                time1Delay(time1);
                set = true;
            }
            function comprobar() {
                if (ayosReady) {
                    refresh();
                    let time = new Date();
                    time2 = time.getMilliseconds();
                    time2Delay(time2);
                    
                } else {
                    setTimeout(comprobar, 1);
                }
            }
        }
    });
    function time1Delay(time){time1 = time;}
    function time2Delay(time){time2 = time;}
    var delay = setInterval(delaySet, 10);
    function delaySet(){
        if(time1 != 0 && time2 !=0){
            refAyosDelay = time2 - time1;
            clearInterval(delay);
        }
    }
}
//lectura de slots

googletag.cmd.push(function() {
    slots = window.googletag.pubads().getSlots();
    if(slots.length == 0){
        googletag.pubads().addEventListener('slotAdded', function(ev) {
            let size = ev.slot.getSizes()[0]['l'] + ", " + ev.slot.getSizes()[0]['j'];
            if (size != "1, 1") {
                slots.push(ev.slot);
            }
        });
    }
});
log(1);
//llamada a la función principal si ayosCtlr = true

if(ayosCtrl){
    main();
}
//función principal, puede recibir como parámetro una función de callback

function main(callback){
    if(exec){
        var count = setInterval(slotsCount, 10);
        function slotsCount(){
            if(slots.length != 0){
                clearInterval(count);
                ayos();
            }
        }
    }else{
        ayosReady = true;
    }
    if(callback){
        var cb = setInterval(_a, 20);
        function _a(){
            if(ayosReady){
                clearInterval(cb);
                callback();
            }
        }
    }
}
//lectura de información y peticion de floors

function ayos(){
    var adUnits = slots[0].getAdUnitPath().split("/");
    req["reqID"] = reqID;
    if (userID != '') {
        req['userID'] = userID;
    }
    req["date"] = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    req["userTime"] = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var publisherHour = PublisherTimeZone - userContext_timezone() + date.getHours();
    req["publisherTime"] = publisherHour + ":" + date.getMinutes() + ":" + date.getSeconds();
    req["day"] = date.getDay();
    req["url"] = URL;
    req["browser"] = userContext_browser();
    req["lang"] = userContext_language();
    req["OS"] = userContext_os();
    req["timeZone"] = userContext_timezone();
    req["userAgent"] = userContext_useragent();
    req["IP"] = "";
    req["country"] = "";
    req["device"] = "";
    req["adUnitNetwork"] = adUnits[1];
    req["adUnit_1"] = adUnits[2];
    req["adUnit_2"] = adUnits[3];
    let request = new XMLHttpRequest;
    var inter = setInterval(sendReq, 10);
    var count = 0;
    function sendReq() {
        count = count + 10;
        if (request.readyState == 4 && request.status == 200) {
            clearInterval(inter);
            res = request.responseText;
            done = true;
            if (deb == true) {
                let time = new Date().getTime();
                let timeStamp = Math.round(((time - startTime)));
                console.log("AYOS: Floors Response Received - " + timeStamp + "ms");
                if (logLevel >= 2) {
                    log(5)
                }
            }
            var interv = setInterval(fpp, 10);
            function fpp() {
                if (window.googletag && googletag.pubadsReady) {
                    clearInterval(interv);
                    load();
                }
            }
        }
        if (request.readyState == 4 && request.status != 200) {
            clearInterval(inter);
            if (deb == true) {
                let time = new Date().getTime();
                let timeStamp = Math.round(((time - startTime)));
                console.log("AYOS: ERROR " + request.status + " - " + timeStamp + "ms");
            }
            unload();
            log(2, "Err: " + request.status);
        }
        if (count >= 1000) {
            clearInterval(inter);
            if (deb == true) {
                let time = new Date().getTime();
                let timeStamp = Math.round(((time - startTime)));
                console.log("AYOS: ERROR - Time expired - "  + timeStamp + "ms");
            }
            unload();
            log(2, "Err: time expired");
        }
    }
    request.open("POST", rp, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(JSON.stringify(req));
    if (deb == true) {
        let time = new Date().getTime();
        let timeStamp = Math.round(((time - startTime)));
        console.log("AYOS: Request sended - " + timeStamp + "ms");
    }
    if (logLevel >= 4) {
        log(13)
    }
    var requestds = new XMLHttpRequest;
    requestds.onreadystatechange = function() {
        if (requestds.readyState == 4 && requestds.status == 200) {
            var response = requestds.responseText;
        }
    }
    requestds.open("POST", rs, true);
    requestds.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    requestds.send(JSON.stringify(req));
}
//asignación de pares key-value a cada slot

function load(){
    if (deb == true) {
        let time = new Date().getTime();
        let timeStamp = Math.round(((time - startTime)));
        console.log("AYOS: Loading Rules in Slots - " + timeStamp + "ms");
    } 
    googletag.cmd.push(function() {
        slots = window.googletag.pubads().getSlots();
        for(let i in slots){
            var size;
            if(isNaN(slots[i].getSizes()[0]['l'])){
                size = slots[i].getSizes()[1]['l'] + ", " + slots[i].getSizes()[1]['j'];
            }else{
                size = slots[i].getSizes()[0]['l'] + ", " + slots[i].getSizes()[0]['j'];
            }
            let regla = bidUp(JSON.parse(res)[size]);
            slots[i].setTargeting("ACNFPR", [regla]);
        }  
    });
    ayosReady = true;
    log(2, "load end Ok");
    lazyLoad();
}
//asignción del par ACNFPR = -1 en caso de error en la request a todos los slots

function unload(){
    googletag.cmd.push(function() {
        for(let i in slots){
            slots[i].setTargeting("ACNFPR", ["-1"]);
        }  
    });
    ayosReady = true;
}
//control de lazy load

function lazyLoad(){
    if(done){
        googletag.cmd.push(function() {
            googletag.pubads().addEventListener('slotAdded', function(ev) {
                var size;
                if(isNaN(ev.slot.getSizes()[0]['l'])){
                    size = ev.slot.getSizes()[1]['l'] + ", " + ev.slot.getSizes()[1]['j'];
                }else{
                    size = ev.slot.getSizes()[0]['l'] + ", " + ev.slot.getSizes()[0]['j'];
                }
                if (size != "1, 1") {
                    let regla = bidUp(JSON.parse(res)[size]);
                    ev.slot.setTargeting("ACNFPR", [regla]);
                    if (logLevel >= 3) {
                        log(8, slots[a].getSlotId())
                    }
                }
            });
        });
    }else{
        googletag.cmd.push(function() {
            googletag.pubads().addEventListener('slotAdded', function(ev) {
                ev.slot.setTargeting("ACNFPR", ["-1"]);
            });
        });
    }
}
//asignación de reglas a los floors sugeridos

function bidUp(bid) {
    if (bid < 0.15) {
        return "1"
    };
    if (bid < 0.20) {
        return "2"
    };
    if (bid < 0.25) {
        return "3"
    };
    if (bid < 0.30) {
        return "4"
    };
    if (bid < 0.35) {
        return "5"
    };
    if (bid < 0.40) {
        return "6"
    };
    if (bid < 0.45) {
        return "7"
    };
    if (bid < 0.50) {
        return "8"
    };
    if (bid < 0.55) {
        return "9"
    };
    if (bid < 0.60) {
        return "10"
    };
    if (bid < 0.65) {
        return "11"
    };
    if (bid < 0.70) {
        return "12"
    }
    if (bid < 0.75) {
        return "13"
    };
    if (bid < 0.80) {
        return "14"
    };
    if (bid < 0.85) {
        return "15"
    };
    if (bid < 0.90) {
        return "16"
    };
    if (bid < 0.95) {
        return "17"
    };
    if (bid < 1.00) {
        return "18"
    };
    if (bid >= 1.00) {
        return "19"
    };
    return "1";
}
//manejo de eventos de GPT

googletag.cmd.push(function() {
    if (logLevel >= 5) {
        log(16)
    }
    //envío de datos a servicio de feedback y datastore cuando se renderiza cada slot

    var req2 = {};
    googletag.pubads().addEventListener('slotRenderEnded', function(ev) {
        var size;
            if(isNaN(ev.slot.getSizes()[0]['l'])){
                size = ev.slot.getSizes()[1]['l'] + ", " + ev.slot.getSizes()[1]['j'];
            }else{
                size = ev.slot.getSizes()[0]['l'] + ", " + ev.slot.getSizes()[0]['j'];
            }
        if (size != "1, 1") {
            if (deb == true) {
                let time = new Date().getTime();
                let timeStamp = Math.round(((time - startTime)));
                console.log("AYOS: Sending Result - " + req2["adID"] + " - " + timeStamp + "ms");
            }
            var adUnits = ev.slot.getAdUnitPath().split("/");
            req2["reqID"] = reqID;
            req2["publisherTime"] = req["publisherTime"];
            req2["OS"] = req["OS"];
            req2["browser"] = req["browser"];
            req2["adID"] = ev.slot.getSlotElementId();
            let endTime = new Date().getTime();
            req2["loadTime"] = Math.round(((endTime - startTime)));
            req2["viewableTime"] = '';
            try {
                req2["infoGPT"] = ev.slot.getResponseInformation();
            } catch (err) {
                req2["infoGPT"] = "NO";
            }
            req2["ACNR"] = '1';
            try {
                req2["ACNFPR"] = ev.slot.getTargeting('ACNFPR').toString();
            } catch (err) {
                req2["ACNFPR"] = "null";
            }
            var bids = JSON.parse(res);
            try {
                req2["suggestedBid"] = bids[size];
            } catch (err) {
                req2["suggestedBid"] = "null";
            }
            try {
                req2["slotId"] = ev.slot.getSlotId().toString();
            } catch (err) {
                req2["slotId"] = "null";
            }
            try {
                let prebidRes = pbjs.getBidResponses();
                req2["infoPB"] = prebidRes[ev.slot.getSlotElementId()];
            } catch (err) {
                req2["infoPB"] = "NO";
            }
            req2["adUnitNetwork"] = adUnits[1];
            req2["adUnit_1"] = adUnits[2];
            req2["adUnit_2"] = adUnits[3];
            req2["size"] = size;
            req2["recommendation_data"] = JSON.parse(res)["recommendation_data"];
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var response = request.responseText;
                    if (deb == true) {
                        let time = new Date().getTime();
                        let timeStamp = Math.round(((time - startTime)));
                        console.log("AYOS: Result Sent - " + req2["adID"] + " - " + timeStamp + "ms");
                    }
                }
            }
            request.open("POST", ss, true);
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            request.send(JSON.stringify(req2));
            if (deb == true) {
                let time = new Date().getTime();
                let timeStamp = Math.round(((time - startTime)));
                console.log("AYOS: " + req2["adID"] + " - Rendered time: " + timeStamp + "ms");
            }
            if (logLevel >= 2) {
                log(4);
            }
            let requestfb = new XMLHttpRequest();
            requestfb.onreadystatechange = function() {
                if (requestfb.readyState == 4 && requestfb.status == 200) {
                    var response = request.responseText;
                }
            }
            requestfb.open("POST", fb, true);
            requestfb.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            requestfb.send(JSON.stringify(req2));         
        }
    });
    //resto de eventos

    googletag.pubads().addEventListener('slotOnload', function(ev) {
        let adID = ev.slot.getSlotElementId();
        if (logLevel >= 2) {
            log(6)
        }
        if (logLevel >= 5) {
            log(18)
        }
    });
    googletag.pubads().addEventListener('impressionViewable', function(ev) {
        let adID = ev.slot.getSlotElementId();
        if (logLevel >= 5) {
            log(17)
        }
    });
    googletag.pubads().addEventListener('slotRequested', function(ev) {
        let adID = ev.slot.getSlotElementId();
        if (logLevel >= 5) {
            log(15)
        }
    });
    googletag.pubads().addEventListener('impressionViewable', function(ev) {
        let adID = ev.slot.getSlotElementId();
    });
});
//lectura de contexto de usuario

(function(name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define(definition);
    } else {
        context[name] = definition();
    }
})('userContext', this, function() {
    'use strict';
    var userContext = function(options) {
        var nativeForEach, nativeMap;
        nativeForEach = Array.prototype.forEach;
        nativeMap = Array.prototype.map;
        this.each = function(obj, iterator, context) {
            if (obj === null) {
                return;
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === {}) return;
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (iterator.call(context, obj[key], key, obj) === {}) return;
                    }
                }
            }
        };
        this.map = function(obj, iterator, context) {
            var results = [];
            if (obj == null) return results;
            if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
            this.each(obj, function(value, index, list) {
                results[results.length] = iterator.call(context, value, index, list);
            });
            return results;
        };
        if (typeof options == 'object') {
            this.hasher = options.hasher;
            this.screen_resolution = options.screen_resolution;
            this.screen_orientation = options.screen_orientation;
            this.canvas = options.canvas;
            this.ie_activex = options.ie_activex;
        } else if (typeof options == 'function') {
            this.hasher = options;
        }
    };
    userContext.prototype = {
        get: function() {
            var keys = [];
            keys.push(navigator.userAgent);
            keys.push(navigator.language);
            keys.push(screen.colorDepth);
            if (this.screen_resolution) {
                var resolution = this.getScreenResolution();
                if (typeof resolution !== 'undefined') {
                    keys.push(this.getScreenResolution().join('x'));
                }
            }
            keys.push(new Date().getTimezoneOffset());
            keys.push(this.hasSessionStorage());
            keys.push(this.hasLocalStorage());
            keys.push(!!window.indexedDB);
            if (document.body) {
                keys.push(typeof(document.body.addBehavior));
            } else {
                keys.push(typeof undefined);
            }
            keys.push(typeof(window.openDatabase));
            keys.push(navigator.cpuClass);
            keys.push(navigator.platform);
            keys.push(navigator.doNotTrack);
            keys.push(this.getPluginsString());
            if (this.canvas && this.isCanvasSupported()) {
                keys.push(this.getCanvasuserContext());
            }
            if (this.hasher) {
                return this.hasher(keys.join('###'), 31);
            } else {
                return this.murmurhash3_32_gc(keys.join('###'), 31);
            }
        },
        murmurhash3_32_gc: function(key, seed) {
            var remainder, bytes, h1, h1b, c1, c2, k1, i;
            remainder = key.length & 3;
            bytes = key.length - remainder;
            h1 = seed;
            c1 = 0xcc9e2d51;
            c2 = 0x1b873593;
            i = 0;
            while (i < bytes) {
                k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) | ((key.charCodeAt(++i) & 0xff) << 24);
                ++i;
                k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
                h1 ^= k1;
                h1 = (h1 << 13) | (h1 >>> 19);
                h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
                h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
            }
            k1 = 0;
            switch (remainder) {
                case 3:
                    k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
                case 2:
                    k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
                case 1:
                    k1 ^= (key.charCodeAt(i) & 0xff);
                    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
                    k1 = (k1 << 15) | (k1 >>> 17);
                    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
                    h1 ^= k1;
            }
            h1 ^= key.length;
            h1 ^= h1 >>> 16;
            h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= h1 >>> 13;
            h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
            h1 ^= h1 >>> 16;
            return h1 >>> 0;
        },
        hasLocalStorage: function() {
            try {
                return !!window.localStorage;
            } catch (e) {
                return true;
            }
        },
        hasSessionStorage: function() {
            try {
                return !!window.sessionStorage;
            } catch (e) {
                return true;
            }
        },
        isCanvasSupported: function() {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        },
        isIE: function() {
            if (navigator.appName === 'Microsoft Internet Explorer') {
                return true;
            } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) {
                return true;
            }
            return false;
        },
        getPluginsString: function() {
            if (this.isIE() && this.ie_activex) {
                return this.getIEPluginsString();
            } else {
                return this.getRegularPluginsString();
            }
        },
        getRegularPluginsString: function() {
            return this.map(navigator.plugins, function(p) {
                var mimeTypes = this.map(p, function(mt) {
                    return [mt.type, mt.suffixes].join('~');
                }).join(',');
                return [p.name, p.description, mimeTypes].join('::');
            }, this).join(';');
        },
        getIEPluginsString: function() {
            if (window.ActiveXObject) {
                var names = ['ShockwaveFlash.ShockwaveFlash', 'AcroPDF.PDF', 'PDF.PdfCtrl', 'QuickTime.QuickTime', 'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'RealPlayer', 'SWCtl.SWCtl', 'WMPlayer.OCX', 'AgControl.AgControl', 'Skype.Detection'];
                return this.map(names, function(name) {
                    try {
                        new ActiveXObject(name);
                        return name;
                    } catch (e) {
                        return null;
                    }
                }).join(';');
            } else {
                return "";
            }
        },
        getScreenResolution: function() {
            var resolution;
            if (this.screen_orientation) {
                resolution = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height];
            } else {
                resolution = [screen.height, screen.width];
            }
            return resolution;
        },
        getCanvasuserContext: function() {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}|[]\\:"<>?;,.';
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
            return canvas.toDataURL();
        }
    };
    return userContext;
});
function userContext_browser() {
    if (logLevel >= 5) {
        log(21, 'user context browser')
    }
    var strOnError, strUserAgent, numVersion, strBrowser, strOut;
    strOnError = "Error";
    strUserAgent = null;
    numVersion = null;
    strBrowser = null;
    strOut = null;
    try {
        strUserAgent = navigator.userAgent.toLowerCase();
        if (/msie (\\d+\\.\\d+);/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            if (strUserAgent.indexOf("trident/6") > -1) {
                numVersion = 10;
            }
            if (strUserAgent.indexOf("trident/5") > -1) {
                numVersion = 9;
            }
            if (strUserAgent.indexOf("trident/4") > -1) {
                numVersion = 8;
            }
            strBrowser = "Internet Explorer " + numVersion;
        } else if (strUserAgent.indexOf("trident/7") > -1) {
            numVersion = 11;
            strBrowser = "Internet Explorer " + numVersion;
        } else if (/firefox[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Firefox " + numVersion;
        } else if (/opera[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Opera " + numVersion;
        } else if (/chrome[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Chrome " + numVersion;
        } else if (/version[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Safari " + numVersion;
        } else if (/rv[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Mozilla " + numVersion;
        } else if (/mozilla[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Mozilla " + numVersion;
        } else if (/binget[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (BinGet) " + numVersion;
        } else if (/curl[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (cURL) " + numVersion;
        } else if (/java[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (Java) " + numVersion;
        } else if (/libwww-perl[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (libwww-perl) " + numVersion;
        } else if (/microsoft url control -[\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (Microsoft URL Control) " + numVersion;
        } else if (/peach[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (Peach) " + numVersion;
        } else if (/php[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (PHP) " + numVersion;
        } else if (/pxyscand[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (pxyscand) " + numVersion;
        } else if (/pycurl[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (PycURL) " + numVersion;
        } else if (/python-urllib[\\/\\s](\\d+\\.\\d+)/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Library (Python URLlib) " + numVersion;
        } else if (/appengine-google/.test(strUserAgent)) {
            numVersion = Number(RegExp.$1);
            strBrowser = "Cloud (Google AppEngine) " + numVersion;
        } else {
            strBrowser = "Unknown";
        }
        strOut = strBrowser;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}
function userContext_language() {
    if (logLevel >= 5) {
        log(21, 'user context language')
    }
    var strSep, strPair, strOnError, strLang, strTypeLng, strTypeBrLng, strTypeSysLng, strTypeUsrLng, strOut;
    strSep = "|";
    strPair = "=";
    strOnError = "Error";
    strLang = null;
    strTypeLng = null;
    strTypeBrLng = null;
    strTypeSysLng = null;
    strTypeUsrLng = null;
    strOut = null;
    try {
        strTypeLng = typeof(navigator.language);
        strTypeBrLng = typeof(navigator.browserLanguage);
        strTypeSysLng = typeof(navigator.systemLanguage);
        strTypeUsrLng = typeof(navigator.userLanguage);
        if (strTypeLng !== "undefined") {
            strLang = "lang" + strPair + navigator.language + strSep;
        } else if (strTypeBrLng !== "undefined") {
            strLang = "lang" + strPair + navigator.browserLanguage + strSep;
        } else {
            strLang = "lang" + strPair + strSep;
        }
        if (strTypeSysLng !== "undefined") {
            strLang += "syslang" + strPair + navigator.systemLanguage + strSep;
        } else {
            strLang += "syslang" + strPair + strSep;
        }
        if (strTypeUsrLng !== "undefined") {
            strLang += "userlang" + strPair + navigator.userLanguage;
        } else {
            strLang += "userlang" + strPair;
        }
        strOut = strLang;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}
function userContext_timezone() {
    if (logLevel >= 5) {
        log(21, 'user context timezone')
    }
    var strOnError, dtDate, numOffset, numGMTHours, numOut;
    strOnError = "Error";
    dtDate = null;
    numOffset = null;
    numGMTHours = null;
    numOut = null;
    try {
        dtDate = new Date();
        numOffset = dtDate.getTimezoneOffset();
        numGMTHours = (numOffset / 60) * (-1);
        numOut = numGMTHours;
        return numOut;
    } catch (err) {
        return strOnError;
    }
}
function userContext_os() {
    if (logLevel >= 5) {
        log(21, 'user context OS')
    }
    var strSep, strOnError, strUserAgent, strPlatform, strOS, strOSBits, strOut;
    strSep = "|";
    strOnError = "Error";
    strUserAgent = null;
    strPlatform = null;
    strOS = null;
    strOSBits = null;
    strOut = null;
    try {
        strUserAgent = navigator.userAgent.toLowerCase();
        strPlatform = navigator.platform.toLowerCase();
        if (strUserAgent.indexOf("windows nt 6.3") !== -1) {
            strOS = "Windows 8.1";
        } else if (strUserAgent.indexOf("windows nt 6.2") !== -1) {
            strOS = "Windows 8";
        } else if (strUserAgent.indexOf("windows nt 6.1") !== -1) {
            strOS = "Windows 7";
        } else if (strUserAgent.indexOf("windows nt 6.0") !== -1) {
            strOS = "Windows Vista/Windows Server 2008";
        } else if (strUserAgent.indexOf("windows nt 5.2") !== -1) {
            strOS = "Windows XP x64/Windows Server 2003";
        } else if (strUserAgent.indexOf("windows nt 5.1") !== -1) {
            strOS = "Windows XP";
        } else if (strUserAgent.indexOf("windows nt 5.01") !== -1) {
            strOS = "Windows 2000, Service Pack 1 (SP1)";
        } else if (strUserAgent.indexOf("windows xp") !== -1) {
            strOS = "Windows XP";
        } else if (strUserAgent.indexOf("windows 2000") !== -1) {
            strOS = "Windows 2000";
        } else if (strUserAgent.indexOf("windows nt 5.0") !== -1) {
            strOS = "Windows 2000";
        } else if (strUserAgent.indexOf("windows nt 4.0") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("windows nt") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("winnt4.0") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("winnt") !== -1) {
            strOS = "Windows NT 4.0";
        } else if (strUserAgent.indexOf("windows me") !== -1) {
            strOS = "Windows ME";
        } else if (strUserAgent.indexOf("win 9x 4.90") !== -1) {
            strOS = "Windows ME";
        } else if (strUserAgent.indexOf("windows 98") !== -1) {
            strOS = "Windows 98";
        } else if (strUserAgent.indexOf("win98") !== -1) {
            strOS = "Windows 98";
        } else if (strUserAgent.indexOf("windows 95") !== -1) {
            strOS = "Windows 95";
        } else if (strUserAgent.indexOf("windows_95") !== -1) {
            strOS = "Windows 95";
        } else if (strUserAgent.indexOf("win95") !== -1) {
            strOS = "Windows 95";
        } else if (strUserAgent.indexOf("ce") !== -1) {
            strOS = "Windows CE";
        } else if (strUserAgent.indexOf("win16") !== -1) {
            strOS = "Windows 3.11";
        } else if (strUserAgent.indexOf("iemobile") !== -1) {
            strOS = "Windows Mobile";
        } else if (strUserAgent.indexOf("wm5 pie") !== -1) {
            strOS = "Windows Mobile";
        } else if (strUserAgent.indexOf("windows") !== -1) {
            strOS = "Windows (Unknown Version)";
        } else if (strUserAgent.indexOf("openbsd") !== -1) {
            strOS = "Open BSD";
        } else if (strUserAgent.indexOf("sunos") !== -1) {
            strOS = "Sun OS";
        } else if (strUserAgent.indexOf("ubuntu") !== -1) {
            strOS = "Ubuntu";
        } else if (strUserAgent.indexOf("ipad") !== -1) {
            strOS = "iOS (iPad)";
        } else if (strUserAgent.indexOf("ipod") !== -1) {
            strOS = "iOS (iTouch)";
        } else if (strUserAgent.indexOf("iphone") !== -1) {
            strOS = "iOS (iPhone)";
        } else if (strUserAgent.indexOf("mac os x beta") !== -1) {
            strOS = "Mac OSX Beta (Kodiak)";
        } else if (strUserAgent.indexOf("mac os x 10.0") !== -1) {
            strOS = "Mac OSX Cheetah";
        } else if (strUserAgent.indexOf("mac os x 10.1") !== -1) {
            strOS = "Mac OSX Puma";
        } else if (strUserAgent.indexOf("mac os x 10.2") !== -1) {
            strOS = "Mac OSX Jaguar";
        } else if (strUserAgent.indexOf("mac os x 10.3") !== -1) {
            strOS = "Mac OSX Panther";
        } else if (strUserAgent.indexOf("mac os x 10.4") !== -1) {
            strOS = "Mac OSX Tiger";
        } else if (strUserAgent.indexOf("mac os x 10.5") !== -1) {
            strOS = "Mac OSX Leopard";
        } else if (strUserAgent.indexOf("mac os x 10.6") !== -1) {
            strOS = "Mac OSX Snow Leopard";
        } else if (strUserAgent.indexOf("mac os x 10.7") !== -1) {
            strOS = "Mac OSX Lion";
        } else if (strUserAgent.indexOf("mac os x") !== -1) {
            strOS = "Mac OSX (Version Unknown)";
        } else if (strUserAgent.indexOf("mac_68000") !== -1) {
            strOS = "Mac OS Classic (68000)";
        } else if (strUserAgent.indexOf("68K") !== -1) {
            strOS = "Mac OS Classic (68000)";
        } else if (strUserAgent.indexOf("mac_powerpc") !== -1) {
            strOS = "Mac OS Classic (PowerPC)";
        } else if (strUserAgent.indexOf("ppc mac") !== -1) {
            strOS = "Mac OS Classic (PowerPC)";
        } else if (strUserAgent.indexOf("macintosh") !== -1) {
            strOS = "Mac OS Classic";
        } else if (strUserAgent.indexOf("googletv") !== -1) {
            strOS = "Android (GoogleTV)";
        } else if (strUserAgent.indexOf("xoom") !== -1) {
            strOS = "Android (Xoom)";
        } else if (strUserAgent.indexOf("htc_flyer") !== -1) {
            strOS = "Android (HTC Flyer)";
        } else if (strUserAgent.indexOf("android") !== -1) {
            strOS = "Android";
        } else if (strUserAgent.indexOf("symbian") !== -1) {
            strOS = "Symbian";
        } else if (strUserAgent.indexOf("series60") !== -1) {
            strOS = "Symbian (Series 60)";
        } else if (strUserAgent.indexOf("series70") !== -1) {
            strOS = "Symbian (Series 70)";
        } else if (strUserAgent.indexOf("series80") !== -1) {
            strOS = "Symbian (Series 80)";
        } else if (strUserAgent.indexOf("series90") !== -1) {
            strOS = "Symbian (Series 90)";
        } else if (strUserAgent.indexOf("x11") !== -1) {
            strOS = "UNIX";
        } else if (strUserAgent.indexOf("nix") !== -1) {
            strOS = "UNIX";
        } else if (strUserAgent.indexOf("linux") !== -1) {
            strOS = "Linux";
        } else if (strUserAgent.indexOf("qnx") !== -1) {
            strOS = "QNX";
        } else if (strUserAgent.indexOf("os/2") !== -1) {
            strOS = "IBM OS/2";
        } else if (strUserAgent.indexOf("beos") !== -1) {
            strOS = "BeOS";
        } else if (strUserAgent.indexOf("blackberry95") !== -1) {
            strOS = "Blackberry (Storm 1/2)";
        } else if (strUserAgent.indexOf("blackberry97") !== -1) {
            strOS = "Blackberry (Bold)";
        } else if (strUserAgent.indexOf("blackberry96") !== -1) {
            strOS = "Blackberry (Tour)";
        } else if (strUserAgent.indexOf("blackberry89") !== -1) {
            strOS = "Blackberry (Curve 2)";
        } else if (strUserAgent.indexOf("blackberry98") !== -1) {
            strOS = "Blackberry (Torch)";
        } else if (strUserAgent.indexOf("playbook") !== -1) {
            strOS = "Blackberry (Playbook)";
        } else if (strUserAgent.indexOf("wnd.rim") !== -1) {
            strOS = "Blackberry (IE/FF Emulator)";
        } else if (strUserAgent.indexOf("blackberry") !== -1) {
            strOS = "Blackberry";
        } else if (strUserAgent.indexOf("palm") !== -1) {
            strOS = "Palm OS";
        } else if (strUserAgent.indexOf("webos") !== -1) {
            strOS = "WebOS";
        } else if (strUserAgent.indexOf("hpwos") !== -1) {
            strOS = "WebOS (HP)";
        } else if (strUserAgent.indexOf("blazer") !== -1) {
            strOS = "Palm OS (Blazer)";
        } else if (strUserAgent.indexOf("xiino") !== -1) {
            strOS = "Palm OS (Xiino)";
        } else if (strUserAgent.indexOf("kindle") !== -1) {
            strOS = "Kindle";
        } else if (strUserAgent.indexOf("wii") !== -1) {
            strOS = "Nintendo (Wii)";
        } else if (strUserAgent.indexOf("nintendo ds") !== -1) {
            strOS = "Nintendo (DS)";
        } else if (strUserAgent.indexOf("playstation 3") !== -1) {
            strOS = "Sony (Playstation Console)";
        } else if (strUserAgent.indexOf("playstation portable") !== -1) {
            strOS = "Sony (Playstation Portable)";
        } else if (strUserAgent.indexOf("webtv") !== -1) {
            strOS = "MSN TV (WebTV)";
        } else if (strUserAgent.indexOf("inferno") !== -1) {
            strOS = "Inferno";
        } else {
            strOS = "Unknown";
        }
        if (strPlatform.indexOf("x64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("wow64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("win64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("win32") !== -1) {
            strOSBits = "32 bits";
        } else if (strPlatform.indexOf("x64") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("x32") !== -1) {
            strOSBits = "32 bits";
        } else if (strPlatform.indexOf("x86") !== -1) {
            strOSBits = "32 bits*";
        } else if (strPlatform.indexOf("ppc") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("alpha") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("68k") !== -1) {
            strOSBits = "64 bits";
        } else if (strPlatform.indexOf("iphone") !== -1) {
            strOSBits = "32 bits";
        } else if (strPlatform.indexOf("android") !== -1) {
            strOSBits = "32 bits";
        } else {
            strOSBits = "Unknown";
        }
        strOut = strOS + strSep + strOSBits;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}
function userContext_useragent() {
    if (logLevel >= 5) {
        log(21, 'user context useragent')
    }
    var strSep, strTmp, strUserAgent, strOut;
    strSep = "|";
    strTmp = null;
    strUserAgent = null;
    strOut = null;
    strUserAgent = navigator.userAgent.toLowerCase();
    strTmp = strUserAgent + strSep + navigator.platform;
    if (navigator.cpuClass) {
        strTmp += strSep + navigator.cpuClass;
    }
    if (navigator.browserLanguage) {
        strTmp += strSep + navigator.browserLanguage;
    } else {
        strTmp += strSep + navigator.language;
    }
    strOut = strTmp;
    return strOut;
}
//fin de lectura de contexto de usuario

//loging

function log(event, status) {
    var iniTime = date.getMilliseconds();
    let endTime = new Date();
    let time = endTime.getMilliseconds() - iniTime;
    let data;
    let timeStamp = endTime.getDate() + "/" + endTime.getMonth() + "/" + endTime.getFullYear() + "  ";
    timeStamp += endTime.getHours() + ":" + endTime.getMinutes() + ":" + endTime.getSeconds() + ":" + endTime.getMilliseconds();
    switch (event) {
        case 1:
            data = {
                "reqID": reqID,
                "log level": 1,
                "event": "start loading scrtipt",
                "time stamp": timeStamp
            }
            break;
        case 2:
            data = {
                "reqID": reqID,
                "log level": 1,
                "event": "process end",
                "time stamp": timeStamp,
                "process time": time + " ms",
                "status": status
            }
            break;
        case 3:
            data = {
                "reqID": reqID,
                "log level": 1,
                "event": "publisher refresh",
                "time stamp": timeStamp,
                "delay": refAyosDelay + " ms"
            }
            break;
        case 4:
            data = {
                "reqID": reqID,
                "log level": 2,
                "event": "request sent",
                "time stamp": timeStamp,
                "date": req["date"],
                "user time": req["userTime"],
                "publisher time": req["publisherTime"],
                "day": req["day"],
                "url": req["url"]
            }
            break;
        case 5:
            let timeS = new Date();
            let delay1 = 0;
            data = {
                "reqID": reqID,
                "log level": 2,
                "event": "request received",
                "time stamp": timeStamp,
                "delay": delay1
            }
            break;
        case 6:
            data = {
                "reqID": reqID,
                "log level": 2,
                "event": "slot loaded",
                "time stamp": timeStamp,
                "adID": status
            }
            break;
        case 7:
            data = {
                "reqID": reqID,
                "log level": 3,
                "event": "ACNR=0",
                "time stamp": timeStamp
            }
            break;
        case 8:
            data = {
                "reqID": reqID,
                "log level": 3,
                "event": "ACNR=1",
                "slot": status,
                "time stamp": timeStamp
            }
            break;
        case 9:
            data = {
                "reqID": reqID,
                "log level": 3,
                "event": "safe",
                "time stamp": timeStamp
            }
            break;
        case 10:
            data = {
                "reqID": reqID,
                "log level": 3,
                "event": "debug",
                "time stamp": timeStamp
            }
            break;
        case 11:
            data = {
                "reqID": reqID,
                "log level": 3,
                "event": "franc",
                "time stamp": timeStamp
            }
            break;
        case 12:
            data = {
                "reqID": reqID,
                "log level": 3,
                "event": "unfranc",
                "time stamp": timeStamp
            }
            break;
        case 13:
            data = {
                "reqID": reqID,
                "log level": 4,
                "event": "request sending",
                "data": req,
                "time stamp": timeStamp
            }
            break;
        case 14:
            data = {
                "reqID": reqID,
                "log level": 4,
                "event": "GPT loaded",
                "data": req,
                "time stamp": timeStamp
            }
            break;
        case 15:
            data = {
                "reqID": reqID,
                "log level": 5,
                "event": "slot requested",
                "time stamp": timeStamp
            }
            break;
        case 16:
            data = {
                "reqID": reqID,
                "log level": 5,
                "event": "slot render ended",
                "time stamp": timeStamp
            }
            break;
        case 17:
            data = {
                "reqID": reqID,
                "log level": 5,
                "event": "slot impression viewable",
                "time stamp": timeStamp
            }
            break;
        case 18:
            data = {
                "reqID": reqID,
                "log level": 5,
                "event": "slot onload",
                "time stamp": timeStamp
            }
            break;
        case 19:
            data = {
                "reqID": reqID,
                "log level": 5,
                "event": "slot visibility",
                "time stamp": timeStamp
            }
            break;
        case 21:
            data = {
                "reqID": reqID,
                "log level": 5,
                "event": status,
                "time stamp": timeStamp
            }
            break;
        default:
            if (deb == true) {
                console.log("AYOS: log error - CODE: " + event);
            }
    }
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {}
    }
    request.open("POST", "https://srv1-bd-floor-prices.com/log", true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(JSON.stringify(data));
}
`

export const smFloorPrices = `
'use strict'
window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];
var AB = 50;
var auct = 50;
var ACNRule;
var startHour = 5;
var endHour = 11;
var hour = new Date().getHours();
if(hour >= startHour && hour <= endHour){
    main();
}
function main(){
    if(Math.round(Math.random()*100) < AB){
        ACNRule = "0";
    }else{
        if(Math.round(Math.random()*100) < auct){
            ACNRule = "1";
        }else{
            ACNRule = "2";
        }
    }
    setRule();
}
function setRule(){
    googletag.cmd.push(function() {
        googletag.pubads().setTargeting("ACNYM", ACNRule);
    });
}
`
