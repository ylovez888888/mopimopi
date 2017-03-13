var QueryString = function () 
{
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) 
	{
		var pair = vars[i].split("=");
			// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") 
		{
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} 
		else if (typeof query_string[pair[0]] === "string") 
		{
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} 
		else 
		{
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	} 
	return query_string;
}();

// check host (islocal)
if(wsUri.indexOf("@HOST_PORT@") > -1)
{
	console.log(QueryString);
	wsUri = wsUri.replace(/@HOST_PORT@/im, QueryString["HOST_PORT"]);
}
else
{
	
}

function dbg(v)
{
	this.debug = v;

	this.log = function(object)
	{
		if (this.debug)
			console.log(object);
	}
};

class ActWebsocketInterface
{
	constructor(uri, path = "MiniParse") {
		// url check
		var querySet = this.getQuerySet();
		if(querySet["HOST_PORT"] != undefined)
		{
		    uri = querySet["HOST_PORT"] + path;
		}
		this.uri = uri;
		this.id = null;
		this.activate = false;
		
		var This = this;
		document.addEventListener('onBroadcastMessage', function(evt) {
			This.onBroadcastMessage(evt);
		});
		document.addEventListener('onRecvMessage', function(evt) {
			This.onRecvMessage(evt);
		});
		window.addEventListener('message', function (e) 
		{
			if (e.data.type === 'onBroadcastMessage') 
			{
				This.onBroadcastMessage(e.data);
			}
			if (e.data.type === 'onRecvMessage') 
			{
				This.onRecvMessage(e.data);
			}
		});
	}
	connect() {
		if(this.websocket != undefined && this.websocket != null)
			this.close();
		this.activate = true;
		var This = this;
		this.websocket = new WebSocket(this.uri);
		this.websocket.onopen = function(evt) {This.onopen(evt);};
		this.websocket.onmessage = function(evt) {This.onmessage(evt);};
		this.websocket.onclose = function(evt) {This.onclose(evt);};
		this.websocket.onerror = function(evt) {This.onerror(evt);};
	}
	close() {
		this.activate = false;
		if(this.websocket != null && this.websocket != undefined)
		{
			this.websocket.close();
		}
	}
	onopen(evt) {
		// get id from useragent
		if(this.id != null && this.id != undefined)
		{
			this.set_id(this.id);
		}
		else
		{
			if(overlayWindowId != undefined)
			{
				this.set_id(overlayWindowId);
				self.id = overlayWindowId;
			}
			else
			{
				var r = new RegExp('[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}');
				var id = r.exec(navigator.userAgent);
				if(id != null && id.length == 1)
				{
					this.set_id(id[0]);
					self.id = id;
				}
			}
		}
	}
	onclose(evt) {
		this.websocket = null;
		if(this.activate)
		{
			var This = this;
			setTimeout(function() {This.connect();}, 5000);
		}
	}
	onmessage(evt) {
		if (evt.data == ".")
		{
			// ping pong
			this.websocket.send(".");
		}
		else
		{
			try{
				var obj = JSON.parse(evt.data);
				var type = obj["type"];
				if(type == "broadcast")
				{
					var from = obj["from"];
					var type = obj["msgtype"];
					var msg = obj["msg"];
					document.dispatchEvent(new CustomEvent('onBroadcastMessage', { detail: obj }));
				}
				if(type == "send")
				{
					var from = obj["from"];
					var type = obj["msgtype"];
					var msg = obj["msg"];
					document.dispatchEvent(new CustomEvent('onRecvMessage', { detail: obj }));
				}
				if(type == "set_id")
				{
					//document.dispatchEvent(new CustomEvent('onIdChanged', { detail: obj }));
				}
			}
			catch(e)
			{
			}
		}
	}
	onerror(evt) {
		this.websocket.close();
		console.log(evt);
	}
	getQuerySet() {
		var querySet = {};
		// get query 
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			try{
				var pair = vars[i].split('=');
				querieSet[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			}
			catch(e)
			{
			}
		}
		return querySet;
	}
	
	
	broadcast(type, msg){
		var obj = {};
		obj["type"] = "broadcast";
		obj["msgtype"] = type;
		obj["msg"] = msg;
		this.websocket.send(JSON.stringify(obj));
	}

	send(to, type, msg){
		var obj = {};
		obj["type"] = "send";
		obj["to"] = to;
		obj["msgtype"] = type;
		obj["msg"] = msg;
		this.websocket.send(JSON.stringify(obj));
	}
	
	overlayAPI(type, msg){
		var obj = {};
		obj["type"] = "overlayAPI";
		obj["msgtype"] = type;
		obj["msg"] = msg;
		this.websocket.send(JSON.stringify(obj));
	}
	
	set_id(id){
		var obj = {};
		obj["type"] = "set_id";
		obj["id"] = id;
		this.websocket.send(JSON.stringify(obj));
	}

	onRecvMessage(e)
	{
	}
	
	onBroadcastMessage(e)
	{
	}
};

// ACTWebSocket �쟻�슜
class WebSocketImpl extends ActWebsocketInterface
{
    constructor(uri, path = "MiniParse") 
    {
        super(uri, path);
    }
    //send(to, type, msg)
    //broadcast(type, msg)
    onRecvMessage(e)
    {
        onRecvMessage(e);
    }

    onBroadcastMessage(e)
    {
        onBroadcastMessage(e);
    }
};

// string : StringObject.format(ObjectArray a)
// �궗�슜�삁 : "{abc}{def}".format({abc:"wow", def:" awesome!"}); => return "wow awesome!";
String.prototype.format = function(a)
{
	var reg = /(\{([^}]+)\})/im;
	var matches = this.match(reg);
	var result = this;

	for(var i in a)
		result = result.replace("{"+i+"}", a[i]);

	return result;
};

String.prototype.contains = function(a)
{
	if(this.indexOf(a) > -1) return true;
	else return false;
};

String.prototype.replaceArray = function(a)
{
	var r = this;
	for(var i in a)
		while(r.contains(a[i].target))
			r = r.replace(a[i].target, a[i].replacement);

	return r;
};

Number.prototype.nanFix = function()
{
	return parseFloat(isNaN(this)?0:this);
};

Number.prototype.numFormat = new function()
{
    var str = "";
    var data = 0;

    try
    {
        if (data != Infinity && data != 0 && data != NaN)
        {
            var reg = /(^[+-]?\d+)(\d{3})/;
            var n = (this + "");
            while (reg.test(n)) n = n.replace(reg, "$1,$2");
            return n;
        }
        else
            return "0";
    }
    catch (ex)
    {
        return "0";
    }
};

// �씠踰ㅽ듃 由ъ뒪�꼫瑜� �옄�룞�쑝濡� 異붽?�븯�룄濡� 吏��젙�빀�땲�떎.
// �궗�슜�븷 �뒪�겕由쏀듃�쓽 留� �쐞�뿉 �꽑�뼵�빐�빞 �젙�긽�쟻�쑝濡� �옉�룞�쓣 蹂댁옣�빀�땲�떎.
if (document.addEventListener) 
{
	// Mozilla, Opera, Webkit 
	document.addEventListener("DOMContentLoaded", function () 
	{
		document.removeEventListener("DOMContentLoaded", arguments.callee, false);
		domReady();
	}, false);

    /* ACTWebSocket �쟻�슜 */
    window.onbeforeunload = function() 
    {
        webs.close();
    };
    
    window.addEventListener("unload", function() 
    {
        webs.close();
    }, false);
}
else if (document.attachEvent) 
{
	// Internet Explorer
	document.attachEvent("onreadystatechange", function () 
	{
		if (document.readyState === "complete") 
		{
			document.detachEvent("onreadystatechange", arguments.callee);
			domReady();
		}
	});
}

window.addEventListener('message', function (e) 
{
    if (e.data.type === 'onBroadcastMessage') 
    {
        onBroadcastMessage(e.data);
    }
    if (e.data.type === 'onRecvMessage') 
    {
        onRecvMessage(e.data);
    }
});

function domReady() 
{
    /* ACTWebSocket �쟻�슜 */
	try
	{
		webs = new WebSocketImpl(wsUri);
		webs.connect();
		console.log("Connecting...");
	}
	catch(ex)
	{
		console.log("[ERROR] : WebSocket has Error [] "+ex);
	}

	// Logline
	try { document.addEventListener('beforeLogLineRead', beforeLogLineRead); } catch (ex) { }
	try { document.addEventListener('onLogLineRead', onLogLineRead); } catch (ex) { }

	// On
	try { document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate); } catch (ex) { console.log("Core Error : onOverlayDataUpdate is not defined."); }
	try { document.addEventListener('onOverlayStateUpdate', onOverlayStateUpdate); } catch (ex) { }

    // ReadyEvent
    try { onDocumentLoad(); } catch(ex) { }
}

var webs = null;

function onRecvMessage(e)
{
    if(e.detail.msgtype == "Chat")
    {
        document.dispatchEvent(new CustomEvent("onChatting",{detail:e.detail.msg}));
    }
    else
    {
        console.log(e.detail.msgtype+":"+e.detail.msg);
    }
}

/* 硫붿꽭吏� 泥섎━遺� �뿬湲� �엳�쓬 留⑤궇 紐살갼�쓬 �늿源� �뀈�깋湲곗뼇 �뒪�겕濡� �븳李� 援대━吏� 留덈씪 */
function onBroadcastMessage(e)
{
    if(e.detail.msgtype == "CombatData")
    {
		lastCombatRaw = e.detail.msg;
		lastCombat = new Combatant({detail:lastCombatRaw}, sortKey);

		if (lastCombat != null && myName != "" && myName != undefined && myName != null)
		{
			lastCombat.Combatant["YOU"].displayName = myName;
		}

        document.dispatchEvent(new CustomEvent('onOverlayDataUpdate',{detail:lastCombatRaw}));
    }
    else
    {
        switch(e.detail.msgtype)
        {
            case "SendCharName":
                document.dispatchEvent(new CustomEvent("onCharacterNameRecive",{detail:e.detail.msg}));
				myName = e.detail.msg.charName;
                break;
            case "AddCombatant":
            
                break;
            case "RemoveCombatant":
            
                break;
            case "AbilityUse":
            
                break;
            case "Chat":
                document.dispatchEvent(new CustomEvent("onChatting",{detail:e.detail.msg}));
                break;
            default:
                console.log(e.detail.msgtype+":"+e.detail.msg);
                break;
        }
    }
}
// ACTWebSocket �쟻�슜 �걹

function Person(e, p)
{
    this.parent = p;
    this.Class = "";
    for(var i in e)
    {
        if (i.indexOf("NAME") > -1) continue;
        if (i == "t" || i == "n") continue;
        var onlyDec = e[i].replace(/[0-9.,%]+/ig, "");
        if (onlyDec != "")
        {
            if (onlyDec == "---" || onlyDec == "--")
                this[i] = 0;
            else
                this[i] = e[i];
        }
        else
        {
            var tmp = parseFloat(e[i].replace(/[,%]+/ig, "")).nanFix().toFixed(underDot);
            if (e[i].indexOf("%") > 0)
                this[i] = parseFloat(tmp);
            else if (Math.floor(tmp) != tmp || e[i].indexOf(".") > 0)
                this[i] = parseFloat(tmp);
            else
                this[i] = parseInt(tmp).nanFix();
        }
    }

    try
    {
        this.maxhitstr = this.maxhit.substring(0, this.maxhit.indexOf("-"));
        this.maxhitval = parseInt(this.maxhit.substring(this.maxhit.indexOf("-") + 1).replace(/,/, "")).nanFix();
    }
    catch (ex)
    {
        this.maxhit = "?-0";
        this.maxhitstr = "";
        this.maxhitval = 0;
    }

    try
    {
        this.maxhealstr = this.maxheal.substring(0, this.maxheal.indexOf("-"));
        this.maxhealval = parseInt(this.maxheal.substring(this.maxheal.indexOf("-") + 1).replace(/,/, "")).nanFix();
    }
    catch (ex)
    {
        this.maxheal = "?-0";
        this.maxhealstr = "";
        this.maxhealval = 0;
    }

    if (this.DURATION <= 0)
    {
        // 
        this.dps = parseFloat((this.damage / this.parent.DURATION).nanFix().toFixed(underDot));
        this.hps = parseFloat((this.healed / this.parent.DURATION).nanFix().toFixed(underDot));

        this.DPS = Math.floor(this.dps);
        this.HPS = Math.floor(this.hps);

        this["DPS-k"] = Math.floor(this.dps / 1000);
        this["HPS-k"] = Math.floor(this.hps / 1000);

        for(var i in this)
        {
            if (this[i] == "�닞")
                this[i] = 0;
        }
    }

    /* Jobname refactoring */
    if (this.Job != "")
        this.Class = this.Job.toUpperCase();

	this.petType = "Chocobo";
    this.isPet = false;
    this.role = "DPS";
    this.rank = 0;
    this.maxdamage = 0;
	this.displayName = this.name;
	this.isLower = false;

    // Give Job
	var vjob = this.Job;
	
	if (vjob != "") vjob = this.Job.toUpperCase();
    switch(vjob)
    {
        case "GLD" : this.Class = "PLD"; this.isLower = true; break;
        case "MRD" : this.Class = "WAR"; this.isLower = true; break;
        case "PUG" : this.Class = "MNK"; this.isLower = true; break;
        case "LNC" : this.Class = "DRG"; this.isLower = true; break;
        case "ROG" : this.Class = "NIN"; this.isLower = true; break;
        case "ARC" : this.Class = "BRD"; this.isLower = true; break;
        case "THM" : this.Class = "BLM"; this.isLower = true; break;
        case "ACN" : this.Class = "SMN"; this.isLower = true; break;
        case "CNJ" : this.Class = "WHM"; this.isLower = true; break;
    }

	if(this.Class != "")
	{
		switch(this.Class)
		{
			case "SCH": case "WHM": case "AST": this.role = "Healer"; break;
			case "PLD": case "WAR": case "DRK": this.role = "Tanker"; break;
		}
	}

	// globalization
	if(this.Class == "")
	{
		if(
			this.name.indexOf("�뿉湲�") > -1 || this.name.indexOf("移대쿃�겢") > -1|| // KOR
			this.name.toUpperCase().indexOf("EGI") > -1|| this.name.toUpperCase().indexOf("CARBUNCLE") > -1|| // ENG
			this.name.indexOf("�궓�궙") > -1|| this.name.indexOf("�궖�꺖�깘�꺍�궚�꺂")> -1 // JPN
		)
		{
			this.Job = "AVA";
			this.Class = "SMN";
			this.isPet = true;
			this.petType = "Egi";
		}
		
		if(this.name.indexOf("�슂�젙") > -1 || // KOR
			this.name.toUpperCase().indexOf("EOS") > -1|| this.name.toUpperCase("SELENE") > -1 || // ENG
			this.name.indexOf("�깢�궒�궋�꺁�꺖") > -1 // JPN
		)
		{
			this.Job = "AVA";
			this.Class = "SCH";
			this.isPet = true;
			this.role = "Healer";
			this.petType = "Fairy";
		}

		if(this.name.indexOf("�옄�룞�룷�깙") > -1 || // KOR 
			this.name.toUpperCase().indexOf("AUTOTURRET") > -1 || // ENG
			this.name.indexOf("�궕�꺖�깉�궭�꺃�긿�깉") > -1 // JPN
		)
		{
			this.Job = "AVA";
			this.Class = "MCH";
			this.isPet = true;
			this.petType = "AutoTurret";
		}

		if(this.name.toUpperCase().indexOf("LIMIT BREAK") > -1|| this.name.indexOf("�꺁�깱�긿�깉") > -1)
		{
			this.Job = "LMB";
			this.Class = "LMB";
		}
	}
	
	if(this.isPet)
	{
		var regex = /(?:.*?)\((.*?)\)/im;
		var matches = this.name.match(regex);
		if(regex.test(this.name)) // do not use Array.length 
		{
			this.petOwner = matches[1];
		}
    }

    /* DPS RECALCULATE */
    if(this.overHeal != undefined)
    {
        
    }

	this.color = {
		R:this.getColor().R,
		G:this.getColor().G,
		B:this.getColor().B
	}

	if(this.petType != "Chocobo")
	{
		this.color.R+= parseInt(this.color.R/3);
		this.color.G+= parseInt(this.color.G/3);
		this.color.B+= parseInt(this.color.B/3);
	}

    this.visible = true;
    this.original = {
        // 
        // dmg
        Damage:this.damage,
        Hits:this.hits,
        Misses:this.misses,
        Swings:this.swings,
        Crithits:this.crithits,
        Damagetaken:this.damagetaken,
        // heals
        Heals:this.heals,
        Healed:this.healed,
        Critheals:this.critheals,
        Healstaken:this.healstaken,
        DamageShield:this.damageShield,
        OverHeal:this.overHeal,
        AbsorbHeal:this.absorbHeal,
        // lastdps
        Last10DPS:this.Last10DPS,
        Last30DPS:this.Last30DPS,
        Last60DPS:this.Last60DPS,
        Last180DPS:this.Last180DPS,
    };

    // �렖�씤�뜲 �겢�옒�뒪�룄 �엳�뒗�뜲 �삤�꼫媛� �뾾�쑝硫� YOU
    if (this.isPet && this.Class != "" && this.parent.users[this.petOwner] == undefined)
    {
        this.petOwner = "YOU";
    }

    for(var i in this.original)
    {
        if (i.indexOf("Last") > -1)
            this["merged"+i] = this[i];
        else
            this["merged"+i] = this[i.substr(0,1).toLowerCase()+i.substr(1)];
    }

	this.pets = {};
}

Person.prototype.returnOrigin = function()
{
    for(var i in this.original)
    {
        if (i.indexOf("Last") > -1)
            this["merged"+i] = this[i];
        else
            this["merged"+i] = this[i.substr(0,1).toLowerCase()+i.substr(1)];
    }
};

Person.prototype.merge = function(person)
{
	this.returnOrigin();
	this.pets[person.name] = person;

	for(var k in this.pets)
	{
		for(var i in this.original)
		{
			if (i.indexOf("Last") > -1)
				this["merged"+i] += this.pets[k].original[i];
			else
				this["merged"+i] += this.pets[k].original[i];
		}
	}

	Debug.log("merge "+this.name+" << "+person.name);

    this.recalculate();
};

// old version
Person.prototype.recalc = function()
{
    this.recalculate();
};

Person.prototype.recalculate = function()
{
    var dur = this.DURATION;
    if (dur == 0) dur = 1;

    this.dps = pFloat(this.mergedDamage / dur);
    this.encdps = pFloat(this.mergedDamage / this.parent.DURATION);
    this.hps = pFloat(this.mergedHealed / dur);
    this.enchps = pFloat(this.mergedHealed / this.parent.DURATION);

    this["DAMAGE-k"] = Math.floor(this.mergedDamage / 1000);
    this["DAMAGE-m"] = Math.floor(this.mergedDamage / 1000000);

    this.DPS = Math.floor(this.dps);
    this["DPS-k"] = Math.floor(this.dps / 1000);
    this.ENCDPS = Math.floor(this.encdps);
    this.ENCHPS = Math.floor(this.enchps);
    this["ENCDPS-k"] = Math.floor(this.encdps / 1000);
    this["ENCHPS-k"] = Math.floor(this.enchps / 1000);

    this["damage%"] = pFloat(this.mergedDamage / this.parent.Encounter.damage * 100);
    this["healed%"] = pFloat(this.mergedHealed / this.parent.Encounter.healed * 100);

    this["crithit%"] = pFloat(this.mergedCrithits / this.hits * 100);
    this["critheal%"] = pFloat(this.mergedCritheals / this.heals * 100);

    this.tohit = pFloat(this.mergedHits / this.mergedSwings * 100);
};

// �빐�떦 �쑀�?�쓽 吏곸뾽�뿉 �뵲瑜� 湲곕낯 吏��젙 �냼�슱 �겕由ъ뒪�깉 �깋�쓣 媛��졇�샃�땲�떎. �옱�젙�쓽�븯�뿬 �궗�슜�븷 �닔�룄 �엳�뒿�땲�떎.
// object : PersonObject.getColor(int r, int g, int b)
Person.prototype.getColor = function(r, g, b)
{
	if(jobColors[this.Class] != undefined)
	{
		if(r==undefined) var r = 0;
		if(g==undefined) var g = 0;
		if(b==undefined) var b = 0;
		return {"R":(jobColors[this.Class][0]+r), "G":(jobColors[this.Class][1]+g), "B":(jobColors[this.Class][2]+b)};
	}
	else
	{
		return {"R":240, "G":220, "B":110};
	}
};

Person.prototype.get = function(key)
{
	if (this.parent.summonerMerge)
	{
		switch (key)
		{
			case "damage" : key = "mergedDamage"; break;
			case "hits" : key = "mergedHits"; break;
			case "misses" : key = "mergedMisses"; break;
			case "swings" : key = "mergedSwings"; break;
			case "crithits" : key = "mergedCrithits"; break;
			case "damagetaken" : key = "mergedDamagetaken"; break;
			// heals
			case "heals" : key = "mergedHeals"; break;
			case "healed" : key = "mergedHealed"; break;
			case "critheals" : key = "mergedCritheals"; break;
			case "healstaken" : key = "mergedHealstaken"; break;
			case "damageShield" : key = "mergedDamageShield"; break;
			case "overHeal" : key = "mergedOverHeal"; break;
			case "absorbHeal" : key = "mergedAbsorbHeal"; break;
			// lastdps
			case "Last10DPS" : key = "mergedLast10DPS"; break;
			case "Last30DPS" : key = "mergedLast30DPS"; break;
			case "Last60DPS" : key = "mergedLast60DPS"; break;
			case "Last180DPS" : key = "mergedLast180DPS"; break;
		}
	}

	return this[key];
}

function Combatant(e, sortkey)
{
    if (sortkey == undefined) var sortkey = "encdps";
    if (lang == undefined) var lang = "ko";

    this.Encounter = {};
    this.Combatant = {};
    this.users = {};

    for (var i in e.detail.Combatant)
    {
        this.users[i] = true;
    }
    
    // 紐⑤뱺 Encounter 媛믪쓣 媛�吏�怨� �엳寃뚮걫
    for(var i in e.detail.Encounter)
    {
        if (i == "t" || i == "n") continue;
        var onlyDec = e.detail.Encounter[i].replace(/[0-9.,%]+/ig, "");
        if (onlyDec != "")
        {
            if (onlyDec == "---" || onlyDec == "--")
                this.Encounter[i] = 0;
            else
                this.Encounter[i] = e.detail.Encounter[i];
        }
        else
        {
            var tmp = parseFloat(e.detail.Encounter[i].replace(/[,%]+/ig, "")).nanFix().toFixed(underDot);
            if (e.detail.Encounter[i].indexOf("%") > 0)
                this.Encounter[i] = parseFloat(tmp);
            else if (Math.floor(tmp) != tmp || e.detail.Encounter[i].indexOf(".") > 0)
                this.Encounter[i] = parseFloat(tmp);
            else
                this.Encounter[i] = parseInt(tmp).nanFix();
        }
    }

    for(var i in e.detail.Combatant)
    {
        this.Combatant[i] = new Person(e.detail.Combatant[i], this);
    }

    /* Refresh parent */

    for(var i in e.detail.Combatant)
    {
        this.Combatant[i].parent = this;
    }

    /* Remove Enemy */

    var tmp = {};
    for(var i in this.Combatant)
    {
        if (this.Combatant[i].Class != "")
        {
            tmp[i] = this.Combatant[i];
        }
    }

    this.Combatant = tmp;

    /* Extra Value settings */
	this.maxdamage = 0; // for old versions
	this.maxValue = 0; // please use this value
	this.zone = this.Encounter.CurrentZoneName;
	this.title = this.Encounter.title;
	this.sortvector = true;
	this.duration = this.Encounter.duration;
    this.DURATION = this.Encounter.DURATION;
	this.summonerMerge = true;
	this.sortkey = sortkey;
	this.langpack = new Language(lang);
    this.isActive = e.detail.isActive;
	this.combatKey = this.Encounter.title.concat(this.Encounter.damage).concat(this.Encounter.healed);
    this.persons = this.Combatant;

    this.resort();
}

// Rank瑜� �떎�떆 遺��뿬�븯怨� Combatant�쓽 sortkey�뿉 �뵲�씪 �떎�떆 �젙�젹�빀�땲�떎.
// �씠 怨쇱젙�뿉�꽌 maxValue (理쒕?媛�)�쓣 媛��졇�샃�땲�떎.
// �냼�솚�닔 媛� �빀�궛/�빐�젣 �떆 �떎�떆 �샇異쒗븷 �븣 �궗�슜�빀�땲�떎.
Combatant.prototype.rerank = function(vector)
{
    this.sort(vector);
};

Combatant.prototype.indexOf = function(person)
{
	var v = -1;
	for(var i in this.Combatant)
	{
		v++;
		if ( i == person)
			return v;
	}

	return v;
};

Combatant.prototype.sort = function(vector)
{
    if (vector != undefined) 
        this.sortvector = vector;

	if (this.summonerMerge)
	{
		switch (this.sortkey)
		{
			case "damage" : this.sortkey = "mergedDamage"; break;
			case "hits" : this.sortkey = "mergedHits"; break;
			case "misses" : this.sortkey = "mergedMisses"; break;
			case "swings" : this.sortkey = "mergedSwings"; break;
			case "crithits" : this.sortkey = "mergedCrithits"; break;
			case "damagetaken" : this.sortkey = "mergedDamagetaken"; break;
			// heals
			case "heals" : this.sortkey = "mergedHeals"; break;
			case "healed" : this.sortkey = "mergedHealed"; break;
			case "critheals" : this.sortkey = "mergedCritheals"; break;
			case "healstaken" : this.sortkey = "mergedHealstaken"; break;
			case "damageShield" : this.sortkey = "mergedDamageShield"; break;
			case "overHeal" : this.sortkey = "mergedOverHeal"; break;
			case "absorbHeal" : this.sortkey = "mergedAbsorbHeal"; break;
			// lastdps
			case "Last10DPS" : this.sortkey = "mergedLast10DPS"; break;
			case "Last30DPS" : this.sortkey = "mergedLast30DPS"; break;
			case "Last60DPS" : this.sortkey = "mergedLast60DPS"; break;
			case "Last180DPS" : this.sortkey = "mergedLast180DPS"; break;
		}
	}

    for (var i in this.Combatant)
    {
        if (this.Combatant[i].isPet && this.summonerMerge) 
        {
            this.Combatant[this.Combatant[i].petOwner].merge(this.Combatant[i]);
            this.Combatant[i].visible = false;
        }
		else
		{
            this.Combatant[i].visible = true;
		}
	}

    var tmp = [];
    var r = 0;

    for (var i in this.Combatant) tmp.push({key:this.Combatant[i][this.sortkey],val:this.Combatant[i]});

    this.Combatant = {};

    if (this.sortvector)
        tmp.sort(function(a, b){return b.key - a.key});
    else
        tmp.sort(function(a, b){return a.key - b.key});

    this.maxValue = tmp[0].key;
    this.maxdamage = tmp[0].key;

    for(var i in tmp)
    {
        this.Combatant[tmp[i].val.name] = tmp[i].val;
    }

	for (var i in this.Combatant)
	{
        if (!this.Combatant[i].visible) continue;

        this.Combatant[i].rank = r++;
        this.Combatant[i].maxdamage = this.maxdamage;
    }

    this.persons = this.Combatant;
};

// combatant 媛앹껜媛� �궗�슜�븷 Language 媛앹껜瑜� �옱�꽑�뼵�빀�땲�떎.
// void : Combatant.changeLang(string lang)
// onLanguageChange �씠踰ㅽ듃瑜� 諛쒖깮�떆�궢�땲�떎. 蹂�寃쎌떆 �빐�빞 �븷 �옉�뾽�쓣 �젙�빐二쇰㈃ �맗�땲�떎.
Combatant.prototype.changeLang = function(lang)
{
	this.langpack = new Language(lang);
	document.dispatchEvent(new CustomEvent('onLanguageChange', {detail:{language:lang, combatant:this}}));
};

Combatant.prototype.AttachPets = function()
{
	this.summonerMerge = true;

	for(var i in this.Combatant)
	{
		this.Combatant[i].returnOrigin();
		this.Combatant[i].recalculate();
		this.Combatant[i].parent = this;
	}
}

Combatant.prototype.DetachPets = function()
{
	this.summonerMerge = false;

	for(var i in this.Combatant)
	{
		this.Combatant[i].returnOrigin();
		this.Combatant[i].recalculate();
		this.Combatant[i].parent = this;
	}
}

// old version function
Combatant.prototype.sortkeyChange = function(key)
{
    this.resort(key, true);
};

// old version function
Combatant.prototype.sortkeyChangeDesc = function(key)
{
    this.resort(key, false);
};

// using this
Combatant.prototype.resort = function(key, vector)
{
    if (key == undefined) 
        this.sortkey = activeSort(this.sortkey);
    else
        this.sortkey = activeSort(key);

    if (vector == undefined)
        vector = this.sortvector;

    this.sort(vector);
};

// language 媛앹껜 �엯�땲�떎.
function Language(l)
{
	if(l == undefined) var l = "ko";
	this.lang = l;
	this.jp = {
		"PLD":"�깏�궎�깉",
		"GLD":"�돜烏볟＋",
		"WAR":"�닰",
		"MRD":"�뼤烏볟＋",
		"DRK":"�슅",
		"MNK":"�깴�꺍�궚",
		"PGL":"�졏�뿕鶯�",
		"DRG":"塋�",
		"LNC":"礪띹죹鶯�",
		"NIN":"恙�",
		"ROG":"�룎�돜鶯�",
		"BRD":"�맅",
		"ARC":"凉볢죹鶯�",
		"MCH":"艅�",
		"SMN":"�룷",
		"THM":"�뫇烏볟＋",
		"BLM":"容�",
		"WHM":"�쇋",
		"CNJ":"亮삭죹鶯�",
		"SCH":"耶�",
		"ACN":"藥닺죹鶯�",
		"AST":"�뜝",
		"LMB":"�꺁�깱�긿�깉",
		"FAIRY":"FAIRY",
		"AUTOTURRET":"AUTOTURRET",
		"EGI":"EGI",
		"CHOCOBO":"CHOCOBO",
	};
	this.en = {
		"PLD":"PLD",
		"GLD":"GLD",
		"WAR":"WAR",
		"MRD":"MRD",
		"DRK":"DRK",
		"MNK":"MNK",
		"PGL":"PGL",
		"DRG":"DRG",
		"LNC":"LNC",
		"NIN":"NIN",
		"ROG":"ROG",
		"BRD":"BRD",
		"ARC":"ARC",
		"MCH":"MCH",
		"SMN":"SMN",
		"THM":"THM",
		"BLM":"BLM",
		"WHM":"WHM",
		"CNJ":"CNJ",
		"SCH":"SCH",
		"ACN":"ACN",
		"AST":"AST",
		"LMB":"LMB",
		"FAIRY":"FAIRY",
		"AUTOTURRET":"AUTOTURRET",
		"EGI":"EGI",
		"CHOCOBO":"CHOCOBO",
	};
	this.ko = {
		"PLD":"�굹�씠�듃",
		"GLD":"寃��닠�궗",
		"WAR":"�쟾�궗",
		"MRD":"�룄�겮�닠�궗",
		"DRK":"�븫�쓳湲곗궗",
		"MNK":"紐쏀겕",
		"PGL":"寃⑺닾�궗",
		"DRG":"瑜섏긽",
		"LNC":"李쎌닠�궗",
		"NIN":"�땶�옄",
		"ROG":"�뙇寃��궗",
		"BRD":"�쓬�쑀�떆�씤",
		"ARC":"沅곸닠�궗",
		"MCH":"湲곌났�궗",
		"SMN":"�냼�솚�궗",
		"THM":"二쇱닠�궗",
		"BLM":"�쓳留덈룄�궗",
		"WHM":"諛깅쭏�룄�궗",
		"CNJ":"�솚�닠�궗",
		"SCH":"�븰�옄",
		"ACN":"鍮꾩닠�궗",
		"AST":"�젏�꽦�닠�궗",
		"LMB":"由щ?�듃",
		"FAIRY":"�슂�젙",
		"AUTOTURRET":"�룷�깙",
		"EGI":"�뿉湲�",
		"CHOCOBO":"珥덉퐫蹂�",
	};
}

// �빐�떦�븯�뒗 �뼵�뼱�쓽 媛믪쓣 媛��졇�샃�땲�떎.
// string : LanguageObject.get(string v)
Language.prototype.get = function(v)
{
	try
	{
		return this[this.lang][v];
	}
	catch(ex)
	{
		return v;
	}
};

var oStaticPersons = [];

function activeSort(key, merge)
{
    if (key.indexOf("merged") > -1)
    {
        if (key.indexOf("Last") > -1)
        {
            key = key.replace(/merged/ig, "");
        }
        else
        {
            key = key.replace(/merged/ig, "");
            key = key.substr(0, 1).toLowerCase() + key.substr(1);
        }
    }

    if (key == "dmgPct")
        key = "damage%";
    
    if (key.indexOf("Pct") > -1 && key.indexOf("overHealPct") == -1)
        key = key.replace(/Pct/ig, "%");

    if (key == "encdps" || key == "dps")
        key = "damage";
    
    if (key == "enchps" || key == "hps")
        key = "healed";
    
    if (key == "maxhit")
        key = "maxhitval";
    
    if (key == "maxheal")
        key = "maxhealval";

    return key;
}

function staticPerson(e)
{
	var d = new Date();
	this.createTime = d.getTime();
	this.person = e;
	this.last180ARR = [];
	this.last180Copy = [];
	this.polygonPoints = [];
}

// bool : getLog(string e)
// e : combatKey
function getLog(e)
{
	for(var i in CombatLog)
	{
		if(CombatLog[i].combatKey == e && lastCombat.encounter.title != "Encounter")
		{
			lastCombat = CombatLog[i];
			document.dispatchEvent(new CustomEvent('onSuccessGetLog', {detail:{ combatant:CombatLog[i] }}));
			return true;
		}
	}
	return false;
}

function safeAdd (x, y)
{
    var a = (x & 0xFFFF) + (y & 0xFFFF);
    var b = (x >> 16) + (y >> 16) + (a >> 16);
    return (b << 16) | (a & 0xFFFF);
}

function hexColor(str)
{
    var str = str.replace("#", "");

    if (str.length == 6 || str.length == 3)
    {
        if (str.length == 6)
            return [parseInt(str.substr(0,2), 16), parseInt(str.substr(2,2), 16), parseInt(str.substr(4,2), 16)];
        else
            return [parseInt(str.substr(0,1), 16), parseInt(str.substr(1,1), 16), parseInt(str.substr(2,1), 16)];
    }
    else
    {
        return [0, 0, 0];
    }
}

function oHexColor(str)
{
    var data = hexColor(str);
    return {r:data[0], g:data[1], b:data[2]};
}

function oHexArgb(str)
{
    if (str.length < 8) return {a:0, r:0, g:0, b:0};
    var data = oHexColor(str.replace("#", "").substr(2,6));
    var rgb = str.replace("#", "");
    return {a:parseFloat((parseInt(rgb.substr(0,2), 16)/255).toFixed(2)), r:data.r, g:data.g, b:data.b};
}

// void : saveLog(Combatant e)
function saveLog(e)
{
	var exists = false;
	for(var i in CombatLog)
	{
		if(CombatLog[i].combatKey == e.combatKey)
			exists = true;
	}

	if(!exists)
	{
		CombatLog.push(e);
		document.dispatchEvent(new CustomEvent('onSuccessSaveLog', {detail:{ combatant:e }}));
	}
}

function pFloat(num)
{
    return parseFloat(num.nanFix().toFixed(underDot));
}

function loadSetting(key)
{
	var json = "";

	try
	{	
		json = localStorage.getItem(key);
		json = JSON.parse(json);
	}
	catch(ex)
	{
		return json;
	}

	return json;
}

function saveSetting(key, val)
{
	localStorage.setItem(key, JSON.stringify(val));
}

var combatLog = [];
var combatants = [];
var curhp = 100;
var delayOK = true;
var jobColors = {
	"PLD":[200, 255, 255],
	"WAR":[200, 40, 30],
	"DRK":[130, 40, 50],
	
	"MNK":[180, 140, 20],
	"DRG":[50, 90, 240],
	"NIN":[80, 70, 90],
	"BRD":[180, 200, 80],
	"MCH":[130, 255, 240],
	"SMN":[40, 150, 0],
	"BLM":[100, 70, 150],
	
	"WHM":[200, 195, 170],
	"SCH":[60, 60, 160],
	"AST":[200, 130, 90],
	"LMB":[255, 204, 0]
};

var lastCombatRaw = null;
var lastCombat = null;
var maxhp = 100;
var myID = 0;
var myName = "";
var underDot = 2;
var sortKey = "encdps";