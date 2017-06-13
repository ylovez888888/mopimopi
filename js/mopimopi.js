var lastCombatHPS = null;   //힐러데이터
var inputNumber = null;     //소수제어
var custom = new Array();   //기본커스텀
var healerCustom = new Array(); //힐러 커스텀
var scrollValue = 0;    //스크롤값
var preScrollVal = 0;   //이전 스크롤값
var pre2ScrollVal = 0;  //이전의 이전 스크롤값
var encounterArray = new Array();   //히스토리 
var encounterCount = 1;             //히스토리 최초 카운트
var saveLogFlag = !1;               //저장 유무 
var tableFlag = 0;                  //24인,8인 구분 
var viewSettingsFlag = !1;          //설정 들어갔는지 구분 
var customFlag = !0;                //커스텀 변경됐는지 구분
var initACTElement = [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
var initHealerElement = [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
var palette = {

    tank1: '7B9AA2',    //나이트
    tank2: 'A91A16',    //전사
    tank3: '682531',    //암기
    heal1: 'BDBDBD',    //백마
    heal2: '32307B',    //학자
    heal3: 'B1561C',    //점성
    shield: '0F9D58',   //쉴드
    overheal: 'FF3F80', //오버힐
    dps1: 'B38915',     //몽크
    dps2: '3752D8',     //용기사
    dps3: 'EE2E48',     //닌자
    dps4: '674598',     //소환사
    dps5: '32670B',     //흑마
    dps6: 'ADC551',     //음유
    dps7: '148AA9',     //기공
    life1: '353535',    //채집
    life2: '353535',    //제작
    ava: '000000',      //소환수
    chocobo: '757575',  //초코보
    LB: 'FFBB00',       //리밋
    me: 'FFFFFF',       //내캐릭터 글자색
    other: 'FFFFFF',    //타캐릭터 글자색
    YOU: 'FF5722',      //내캐릭터 전용 그래프색
    header: '000000',   //헤더색
    background: '000000',   //그래프배경색
    headerText: 'BDBDBD',   //헤더글자색
    accentColor: 'FF5722',  //강조색
    topbarBackgroundColor: '212121',    //상단바배경색
    bigTextColor: 'FFFFFF', //글자색1
    smallTextColor: 'BDBDBD',   //글자색2
    borderColor: '000000',  //테두리색
    lineColor: '000000'     //구분선색
};
var settings = {
    language: 'kr',         //언어
    nameType: 'AType',      //캐릭터이름유형
    hideName: 0,        //캐릭터이름숨기기
    pets: 1,        //펫합산/분리 여부
    comma: 1,       //콤마 여부
    number: 1,      //소수 정수 
    HPS: 1,         //힐러 그래프 보기 
    ranking: 0,     //순위 보기
    dot: 0,          //유럽 숫자 표기법 
    abb: 1,          //영문스킬명 단축하기 
    raidMode: 1,    //레이드 모드
    meBold: 0,      //내 캐릭터 굵게
    otherBold: 0,   //타 캐릭터 굵게
    border: 0,      //테두리 두르기
    edge: 0,        //모서리 둥글게       
    youColor: 0,    //내 그래프 색 사용
    petAction: 1,   //소환수 기여도 표시
    line: 1,        //구분선 표시
    gradation: 0,   //그라데이션
    animation: 1,   //애니메이션
    go: 100,        //그래프 불투명도
    bo: 75,         //배경 불투명도
    to: 100,        //상단바 불투명도
    ho: 100,        //헤더 불투명도
    lo: 100,        //구분선 불투명도
}
var inputSettings = {
    timeFont: 'Montserrat',     //시간폰트
    engFont: 'Roboto',          //영문폰트
    ourFont: 'malgun',          //국어폰트
    narrowCell1: 40,            //좁은셀1
    narrowCell2: 55,            //좁은셀2
    wideCell1: 70,              //넓은셀1
    wideCell2: 100,             //넓은셀2
    topbarHeight: 50,           //상단바높이 
    btnFontSize: 10,            //폰트크기
}
var height = parseFloat(localStorage.getItem('topbarHeight') / 10);
var accentColor = '#' + localStorage.getItem('accentColor');
for (var i in palette) {
    if (!localStorage.getItem(i)) {
        localStorage.setItem(i, palette[i]);
        $('body').find('[name="' + i + '"]').val(palette[i]);
        $('body').find('#' + i).css('background', '#' + palette[i])
    } else {
        $('body').find('[name="' + i + '"]').val(localStorage.getItem(i));
        $('body').find('#' + i).css('background', '#' + localStorage.getItem(i))
    }
}
for (var i in settings) {
    if (!localStorage.getItem(i)) {
        localStorage.setItem(i, settings[i]);
        if (settings[i] == 0 || settings[i] == 1)
            initCheck(i);
        else if (isNaN(settings[i]))
            radioButtonCotrol(settings[i])
    } else {
        if (localStorage.getItem(i) == 0 || localStorage.getItem(i) == 1)
            initCheck(i);
        else if (isNaN(localStorage.getItem(i)))
            radioButtonCotrol(localStorage.getItem(i))
    }
}
for (var i in inputSettings) {
    if (!localStorage.getItem(i))
        localStorage.setItem(i, inputSettings[i]);
    $("[name=" + i + "]").val(localStorage.getItem(i))
}
if (!localStorage.getItem('number')) {
    inputNumber = 2
} else {
    if (localStorage.getItem('number') == 1) inputNumber = 2;
    else inputNumber = 0
}
if (!localStorage.getItem('language') || !isNaN(localStorage.getItem('language'))) {
    localStorage.setItem('language', 'kr');
    mpLang = mpKR
}
if (localStorage.getItem('ourFont') == 'Noto Sans KR') {
    localStorage.setItem('ourFont', 'malgun');
    mpLang = mpKR
}
for (var i = 1; i < initACTElement.length; i++) {
    var name = 'custom' + i;
    if (!localStorage.getItem(name)) {
        if (initACTElement[i] == 1)
            localStorage.setItem(name, 1);
        else localStorage.setItem(name, 0)
    }
    custom[i] = localStorage.getItem(name);
    if (custom[i] == 1) {
        $('[name="' + name + '"]' + ' input').prop('checked', !0);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', accentColor)
    } else {
        $('[name="' + name + '"]' + ' input').prop('checked', !1);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star_border');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', 'rgba(255,255,255,0.38)')
    }
}
for (var i = 0; i < initHealerElement.length; i++) {
    var name = 'custom' + (i + 40);
    if (!localStorage.getItem(name)) {
        if (initHealerElement[i] == 1)
            localStorage.setItem(name, 1);
        else localStorage.setItem(name, 0)
    }
    healerCustom[i] = localStorage.getItem(name);
    if (healerCustom[i] == 1) {
        $('[name="' + name + '"]' + ' input').prop('checked', !0);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', accentColor)
    } else {
        $('[name="' + name + '"]' + ' input').prop('checked', !1);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star_border');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', 'rgba(255,255,255,0.38)')
    }
}

var now_go = parseFloat(localStorage.getItem('go') / 100);
var now_bo = parseFloat(localStorage.getItem('bo') / 100);
var now_to = parseFloat(localStorage.getItem('to') / 100);
var now_ho = parseFloat(localStorage.getItem('ho') / 100);
var now_lo = parseFloat(localStorage.getItem('lo') / 100);

$('#range_go>input').val(localStorage.getItem('go'));
$('#r_go').text(parseInt(localStorage.getItem('go')) + '%');
$('#range_bo>input').val(localStorage.getItem('bo'));
$('#r_bo').text(parseInt(localStorage.getItem('bo')) + '%');
$('#range_ho>input').val(localStorage.getItem('ho'));
$('#r_ho').text(parseInt(localStorage.getItem('ho')) + '%');
$('#range_to>input').val(localStorage.getItem('to'));
$('#r_to').text(parseInt(localStorage.getItem('to')) + '%');
$('#range_lo>input').val(localStorage.getItem('lo'));
$('#r_lo').text(parseInt(localStorage.getItem('lo')) + '%');

$('#range_go').on('input', function () {
    localStorage.setItem('go', parseInt($('#range_go .value').text()));
    now_go = parseFloat(localStorage.getItem('go') / 100);
    $('#r_go').text(parseInt($('#range_go .value').text()) + '%');
    onSettingsUpdate('go');
});

$('#range_bo').on('input', function () {
    localStorage.setItem('bo', parseInt($('#range_bo .value').text()));
    now_bo = parseFloat(localStorage.getItem('bo') / 100);
    $('#r_bo').text(parseInt($('#range_bo .value').text()) + '%');
    onSettingsUpdate('bo');
});

$('#range_to').on('input', function () {
    localStorage.setItem('to', parseInt($('#range_to .value').text()));
    now_to = parseFloat(localStorage.getItem('to') / 100);
    $('#r_to').text(parseInt($('#range_to .value').text()) + '%');
    onSettingsUpdate('to');
});

$('#range_ho').on('input', function () {
    localStorage.setItem('ho', parseInt($('#range_ho .value').text()));
    now_ho = parseFloat(localStorage.getItem('ho') / 100);
    $('#r_ho').text(parseInt($('#range_ho .value').text()) + '%');
    onSettingsUpdate('ho');
});

$('#range_lo').on('input', function () {
    localStorage.setItem('lo', parseInt($('#range_lo .value').text()));
    now_lo = parseFloat(localStorage.getItem('lo') / 100);
    $('#r_lo').text(parseInt($('#range_lo .value').text()) + '%');
    onSettingsUpdate('lo');
});
//터치 처리 
(function () {
    var isTouch = !1;
    var simulated_flag = 'handler_simulated';
    var touch_click_array = {};
    const clickMoveThreshold = 20;

    function mouseHandler(event) {
        if (isTouch) {
            if (!event.hasOwnProperty(simulated_flag)) {
                var fixed = new jQuery.Event(event);
                fixed.preventDefault();
                fixed.stopPropagation()
            }
        } else { }
    }

    function mouseFromTouch(type, touch) {
        var event = document.createEvent("MouseEvent");
        event.initMouseEvent(type, !0, !0, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, !1, !1, !1, !1, 0, null);
        event[simulated_flag] = !0;
        touch.target.dispatchEvent(event)
    };

    function touchHandler(event) {
        var touches = event.changedTouches,
            first = touches[0],
            type = ""
        if (!event.hasOwnProperty(simulated_flag)) {
            isTouch = !0;
            switch (event.type) {
                case "touchstart":
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        touch_click_array[touch.identifier] = {
                            x: touch.screenX,
                            y: touch.screenY
                        }
                    }
                    mouseFromTouch("mousedown", first);
                    break;
                case "touchmove":
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        var id = touch.identifier;
                        var data = touch_click_array[id];
                        if (data !== undefined) {
                            if (Math.abs(data.x - touch.screenX) + Math.abs(data.y - touch.screenY) > clickMoveThreshold) {
                                delete touch_click_array[id]
                            }
                        }
                    }
                    mouseFromTouch("mousemove", first);
                    break;
                case "touchcancel":
                    break;
                case "touchend":
                    mouseFromTouch("mouseup", first);
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        if (touch_click_array.hasOwnProperty(touch.identifier)) {
                            mouseFromTouch("click", touch);
                            delete touch_click_array[touch.identifier]
                        }
                    }
                    break
            }
        }
    }
    document.addEventListener("mousedown", mouseHandler, !0);
    document.addEventListener("mousemove", mouseHandler, !0);
    document.addEventListener("mouseup", mouseHandler, !0);
    document.addEventListener("click", mouseHandler, !0);
    document.addEventListener("touchstart", touchHandler, !0);
    document.addEventListener("touchmove", touchHandler, !0);
    document.addEventListener("touchcancel", touchHandler, !0);
    document.addEventListener("touchend", touchHandler, !0);
})();
//뒤로가기 금지
history.pushState(null, null, location.href);
window.onpopstate = function (event) {
    history.go(1)
}
//최초 초기화
$(document).ready(function () {
    jscolor.installByClassName("jscolor");  //팔레트 초기화 
    Materialize.updateTextFields(); //입력필드 초기화
    //헤더 생성 
    onCreateHeader("dpsTableHeader", 1, 0, custom);
    onCreateHeader("hpsTableHeader", 0, 40, healerCustom);
    setFontSize(parseInt(localStorage.getItem('btnFontSize')));
    update();
    onUpdateCSS()
});
//스크롤 시 상단바 배경색 채우기 
$(document).scroll(function () {
    scrollValue = $(document).scrollTop();
    var a = oHexColor(localStorage.getItem('header'));
    if (scrollValue != 0) {
        $('[name=main]').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + 1 + ')');
        $('#mainTopBar').css('background', topbarBackgroundColor)
    } else {
        $('[name=main]').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_ho + ')');
        var b = oHexColor(topbarBackgroundColor);
        $('#mainTopBar').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_to + ')')
    }
});
//인풋 클릭시 전체 선택 
$("input").on("click", function () {
    $(this).select()
});
//인풋 엔터시 포커스 상실 
$("input").keydown(function () {
    if (event.keyCode == 13 || event.keyCode == 27) {
        if ($(this).val() != "") {
            $(this).blur();
            settingsFont()
        } else $(this).focus()
    }
});
//플러스버튼 처리 
$(".plus").click(function (e) {
    e.preventDefault();
    var field = "input[name=" + $(this).attr("field") + "]";
    var currentVal = parseInt($(field).val());

    if (!isNaN(currentVal) && currentVal < 999) {
        var id = $(field).attr('name');
        if (id == "topbarHeight")
            $(field).val(currentVal + 2);
        else if (id == "btnFontSize") {
            var val = calFontSize(currentVal, 'plus');
            $(field).val(val);
        } else
            $(field).val(currentVal + 1);

        localStorage.setItem(id, parseInt($(field).val()));

        if (id == 'btnFontSize')
            setFontSize(val);
        else if (id == "topbarHeight") 
            adjustTopbarHeight();
        else{
            adjustCellWidth();
            $('#previewH td').css('background', 'rgba(0,0,0,1)');
            $('#previewH td').css('color', '#bdbdbd');
            $('#previewH .' + id).css('background', '#fff');
            $('#previewH .' + id).css('color', '#000')
        } 
    }
});
//마이너스 버튼 처리 
$(".minus").click(function (e) {
    e.preventDefault();
    var field = "input[name=" + $(this).attr("field") + "]";
    var currentVal = parseInt($(field).val());

    if (!isNaN(currentVal) && currentVal > 1) {
        var id = $(field).attr('name');

        if (id == "topbarHeight")
            $(field).val(currentVal - 2);
        else if (id == "btnFontSize") {
            var val = calFontSize(currentVal, 'minus');
            $(field).val(val);
        } else
            $(field).val(currentVal - 1);

        localStorage.setItem(id, parseInt($(field).val()));

        if (id == 'btnFontSize')
            setFontSize(val);
        else if (id == "topbarHeight") 
            adjustTopbarHeight();
        else{
            adjustCellWidth();
            $('#previewH td').css('background', 'rgba(0,0,0,1)');
            $('#previewH td').css('color', '#bdbdbd');
            $('#previewH .' + id).css('background', '#fff');
            $('#previewH .' + id).css('color', '#000')
        } 
    }
});

function calFontSize(val, btn) {
    switch (val) {
        case 8:
            if (btn == 'plus') return 10;
            else return 8;
        case 10:
            if (btn == 'plus') return 12;
            else return 8;
        case 12:
            if (btn == 'plus') return 14;
            else return 10;
        case 14:
            if (btn == 'plus') return 16;
            else return 12;
        case 16:
            if (btn == 'plus') return 20;
            else return 14;
        case 20:
            if (btn == 'plus') return 24;
            else return 16;
        case 24:
            if (btn == 'plus') return 28;
            else return 20;
        case 28:
            if (btn == 'plus') return 32;
            else return 24;
        case 32:
            if (btn == 'plus') return 32;
            else return 28;
    }
}
function setFontSize(val){
    switch (val) {
        case 8:
            $('html').css('font-size', '58%');
            break; 
        case 10:
            $('html').css('font-size', '62.5%');
            break; 
        case 12:
            $('html').css('font-size', '75%');
            break; 
        case 14:
            $('html').css('font-size', '87.5%');
            break; 
        case 16:
            $('html').css('font-size', '100%');
            break; 
        case 20:
            $('html').css('font-size', '125%');
            break; 
        case 24:
            $('html').css('font-size', '150%');
            break; 
        case 28:
            $('html').css('font-size', '175%');
            break; 
        case 32:
            $('html').css('font-size', '200%');
            break; 
    }    
}
//색상 업데이트 
function jscolorUpdate(jscolor) {
    var id = jscolor.styleElement.id;
    var newColor = jscolor.toHEXString().split('#')[1];
    localStorage.setItem(id, newColor)
}
//전체화면 보기 설정 
function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        }
    }
}
//전체화면 보기인지 체크, 버튼 처리 
function fullscreenCheck() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        $('#fullscreen input').prop('checked', !1);
        $('#fullscreen i').css('color', 'rgba(255,255,255,0.5)');
        localStorage.setItem('fullscreen', 0)
    }
}
//히스토리 닫기 
function closeHistory() {
    $('#history input').prop('checked', !1);
    $('#history i').css('color', 'rgba(255,255,255,0.38)');
    $('ul[name=main]').removeClass('hidden');
    $('ul[name=history]').addClass('hidden');
    localStorage.setItem('history', 0);
    $('#historyTableHeader, #historyTableBody').addClass('hidden');
    if (tableFlag == 2 || tableFlag == 0) {
        $('#graphTableBody, #graphTableHeader').removeClass('hidden')
    } else {
        $('[name=raid]').removeClass('hidden')
    }
    adjustTopbarHeight()
}
//상단바 조절 
function adjustTopbarHeight() {
    height = parseFloat(localStorage.getItem('topbarHeight') / 10);
    $('nav, nav i, .navbar_text').css('height', height + 'rem');
    $('nav, nav i, .navbar_text').css('line-height', height + 'rem');
    $('nav ul.dropdown-content div, nav ul.dropdown-content div i').css('height', 5 + 'rem');
    $('nav ul.dropdown-content div, nav ul.dropdown-content div i').css('line-height', 5 + 'rem');
    $('#previewTopbar').css('height', height + 'rem');
    if ($('[name=main]').hasClass('hidden') == !0 || tableFlag == 1)
        $('.navbar-fixed').css('height', height + 'rem');
    else {
        if (localStorage.getItem('border') == 1)
            $('.navbar-fixed').css('height', (height + 1.6) + 'rem');
        else $('.navbar-fixed').css('height', (height + 1.5) + 'rem')
    }
    $('.dropdown-content li>a>i').css('line-height', 'inherit');
    $('.dropdown-content li>a>i').css('height', 'inherit')
}
//셀너비 조절 
function adjustCellWidth() {
    $('body').find('.narrowCell1').css('width', parseFloat(localStorage.getItem('narrowCell1') / 10) + 'rem');
    $('body').find('.narrowCell2').css('width', parseFloat(localStorage.getItem('narrowCell2') / 10) + 'rem');
    $('body').find('.wideCell1').css('width', parseFloat(localStorage.getItem('wideCell1') / 10) + 'rem');
    $('body').find('.wideCell2').css('width', parseFloat(localStorage.getItem('wideCell2') / 10) + 'rem')
}
//페이지전환 시 css 조절 
function initViewPage(id) {
    $('#mainTopBar').css('background', '#303030');
    $('nav').addClass('z-depth-1');
    $('html').css('backgroundColor', '#303030');
    preScrollVal = scrollValue;
    $(document).scrollTop(0);
    $('body').find('[name="' + id + '"]').removeClass('hidden')
}
//페이지 전환 
function viewPage(obj) {
    switch (obj.id) {
        case 'settings'://설정
            viewSettingsFlag = !0;
            $('nav').css('background', '#303030');
            $('nav').removeClass('z-depth-0');
            $('nav').addClass('z-depth-1');
            $('.navbar-fixed').css('height', height + 'rem');
            $('#mainTopBar').css('background', '#303030');
            $('html').css('background-size', '0rem 0rem');
            $('body').find('[name="main"]').addClass('hidden');
            $('body').find('[name="raid"]').addClass('hidden');
            $('body').find('[name="settingsPage"]').removeClass('hidden');
            break;
        case 'generalACT'://기본ACT설정 
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'healerACT'://힐러ACT설정 
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'dataProgressing'://데이터처리
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'graphColor'://그래프색상설정 
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('html').css('backgroundColor', '#303030');
            pre2ScrollVal = scrollValue;
            $(document).scrollTop(0);
            $('body').find('[name="graphColor"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            $('body').find('[name="graph"]').addClass('hidden');
            break;
        case 'font'://폰트 설정 
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('html').css('backgroundColor', '#303030');
            pre2ScrollVal = scrollValue;
            $(document).scrollTop(0);
            $('body').find('[name="font"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').addClass('hidden');
            break;
        case 'cellWidth'://셀너비 설정 
            initViewPage(obj.id);
            previewValue();
            $('#previewH').find('td').css('background', 'rgba(0,0,0,1)');
            $('#previewH').find('td').css('color', 'rgba(255,255,255,0.7)');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'design'://상단바 디자인 설정 
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'developer'://개발자  
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'notice'://공지사항 
            initViewPage(obj.id);
            for (var i in notice)
                $('[name="' + i + '"]').html(notice[i]);
            preScrollVal = scrollValue;
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'graph'://그래프 설정 
            initViewPage(obj.id);
            previewValue();
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'fontSettings'://글자속성 설정 
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'backGraph'://그래프 뒤로가기 
            $('body').find('[name="graphColor"]').addClass('hidden');
            $('body').find('[name="graph"]').removeClass('hidden');
            $(document).scrollTop(parseInt(pre2ScrollVal));
            onSettingsUpdate('previewColor');
            break;
        case 'backfont'://폰트 뒤로가기 
            settingsFont();
            $('body').find('[name="font"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').removeClass('hidden');
            $(document).scrollTop(parseInt(pre2ScrollVal));
            break;
        case 'backSettings'://설정 뒤로가기 
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('html').css('backgroundColor', 'transparent');
            $('body').find('[name="dataProgressing"]').addClass('hidden');
            $('body').find('[name="notice"]').addClass('hidden');
            $('body').find('[name="developer"]').addClass('hidden');
            $('body').find('[name="cellWidth"]').addClass('hidden');
            $('body').find('[name="graph"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').addClass('hidden');
            $('body').find('[name="design"]').addClass('hidden');
            $('body').find('[name="healerACT"]').addClass('hidden');
            $('body').find('[name="generalACT"]').addClass('hidden');
            $('body').find('[name="settingsPage"]').removeClass('hidden');
            $('.navbar-fixed').css('height', height + 'rem');
            $(document).scrollTop(parseInt(preScrollVal));
            break;
        case 'back'://메인으로 뒤로가기 
            $('body').find('[name="main"]').removeClass('hidden');
            $('body').find('[name="raid"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            closeHistory();
            viewSettingsFlag = !1;
            update();
            $('nav').removeClass('z-depth-1');
            $('nav').addClass('z-depth-0');
            $('nav').css('background', 'transparent');
            $('html').css('background-size', '2rem 2rem');
            $(document).scrollTop(0);
            break
    }
}
//버튼 설정 
function buttonCotrol(obj) {
    var check = null;
    switch (obj.id) {
        case 'abb': //스킬단축
            changeCheckIcon(obj);
            break;
        case 'dot':
            changeCheckIcon(obj);
            break;
        case 'raidMode':
            changeCheckIcon(obj);
            break;
        case 'ranking':
            changeCheckIcon(obj);
            initCheck(obj.id);
            break;
        case 'youColor':
            changeCheckIcon(obj);
            initCheck(obj.id);
            break;
        case 'capture':
            $('#capture i').toggleClass('animated flash');
            $('.tooltipped').tooltip('remove');
            setTimeout(function () {
                webs.overlayAPI("Capture");
                $('#capture i').removeClass('animated flash')
            }, 1000);
            setTimeout(function () {
                var $toastContent = $('<div class="row col s12 white-text center">< Image Path ><br>C:\\Advanced Combat Tracker or ACTv3\\ScreenShot</div>');
                Materialize.toast($toastContent, 5000)
            }, 2000);
            $('.tooltipped').tooltip({
                delay: 25
            });
            break;
        case 'endEncounter':
            webs.overlayAPI("RequestEnd");
            break;
        case 'init':
            if (confirm(mpLang.m163) == !0) {
                localStorage.clear();
                location.reload()
            }
            break;
        case 'reload':
            location.reload();
            $(document).scrollTop(0);
            break;
        case 'history':
            check = toggleIcon(obj);
            if (check) {
                if (tableFlag == 2 || tableFlag == 0) {
                    $('#graphTableHeader,#graphTableBody').addClass('hidden')
                } else $('[name=raid]').addClass('hidden');
                $('ul[name=main]').addClass('hidden');
                $('ul[name=history]').removeClass('hidden');
                $('#historyTableHeader, #historyTableBody').removeClass('hidden')
            }
            if (localStorage.getItem('border') == 1)
                $('.navbar-fixed').css('height', (height + 1.6) + 'rem');
            else $('.navbar-fixed').css('height', (height + 1.5) + 'rem');
            break;
        case 'hideName':
            toggleIcon(obj);
            $(document).scrollTop(0);
            update();
            break;
        case 'border':
            changeCheckIcon(obj);
            break;
        case 'edge':
            changeCheckIcon(obj);
            break;
        case 'meBold':
            changeCheckIcon(obj);
            break;
        case 'otherBold':
            changeCheckIcon(obj);
            break;
        case 'HPS':
            $(document).scrollTop(0);
            check = toggleIcon(obj);
            if (check == true) {
                update();
                $('#hpsTable,#hpsRaidTable').fadeIn(150);
            } else
                $('#hpsTable,#hpsRaidTable').fadeOut(150);
            break;
        case 'fullscreen':
            toggleIcon(obj);
            toggleFullScreen();
            break;
        case 'pets':
            initCheck(obj.id);
            check = changeCheckIcon(obj);
            if (check == !0) {
                $('body').find('.ava').remove();
                $('#Merge').removeClass('hidden');
                $('#NoMerge').addClass('hidden');
            } else {
                $('#Merge').addClass('hidden');
                $('#NoMerge').removeClass('hidden');
            }
            break;
        case 'petAction':
            changeCheckIcon(obj);
            initCheck(obj.id);
            break;
        case 'number':
            check = changeCheckIcon(obj);
            if (check == !0)
                inputNumber = 2;
            else inputNumber = 0;
            break;
        case 'comma':
            changeCheckIcon(obj);
            break;
        case 'line':
            changeCheckIcon(obj);
            initCheck(obj.id);
            break;
        case 'gradation':
            changeCheckIcon(obj);
            initCheck(obj.id);
            break;
        case 'animation':
            check = changeCheckIcon(obj);
            $('#previewBar1,#previewBar2,#previewBar3,#previewBar4,#previewBar5,#previewBar6').css('width', '0%');
            if (check == !0) {
                $('#previewBar1,#previewBar4').animate({
                    width: '100%'
                });
                $('#previewBar2').animate({
                    width: '50%'
                });
                $('#previewBar3').animate({
                    width: '25%'
                });
                $('#previewBar5').animate({
                    width: '66%'
                });
                $('#previewBar6').animate({
                    width: '33%'
                })
            } else {
                $('#previewBar1,#previewBar4').css('width', '100%');
                $('#previewBar2').css('width', '50%');
                $('#previewBar3').css('width', '25%');
                $('#previewBar5').css('width', '66%');
                $('#previewBar6').css('width', '33%')
            }
            break
    }
}
function toggleIcon(obj) {
    var val = $('#' + obj.id + ' input').prop('checked');
    if (val == !0) {
        $('#' + obj.id + ' input').prop('checked', !1);
        $('#' + obj.id + ' i').css('color', 'rgba(255,255,255,0.38)');
        localStorage.setItem(obj.id, 0);
        return !1
    } else {
        $('#' + obj.id + ' input').prop('checked', !0);
        $('#' + obj.id + ' i').css('color', accentColor);
        localStorage.setItem(obj.id, 1);
        return !0
    }
}
function changeCheckIcon(obj) {
    var val = $('input#' + obj.id).prop('checked');
    if (val == !0) {
        $('input#' + obj.id).prop('checked', !1);
        localStorage.setItem(obj.id, 0);
        return !1
    } else {
        $('input#' + obj.id).prop('checked', !0);
        localStorage.setItem(obj.id, 1);
        return !0
    }
}
function starIcon(name) {
    var val = $('[name="' + name + '"]' + ' input').prop('checked');
    if (val == !0) {
        $('[name="' + name + '"]' + ' input').prop('checked', !1);
        $('[name="' + name + '"]' + ' div.iconText i').text('star_border');
        $('[name="' + name + '"]' + ' div.iconText i').css('color', 'rgba(255,255,255,0.38)');
        localStorage.setItem(name, 0);
        customFlag = !0
    } else {
        $('[name="' + name + '"]' + ' input').prop('checked', !0);
        $('[name="' + name + '"]' + ' div.iconText i').text('star');
        $('[name="' + name + '"]' + ' div.iconText i').css('color', accentColor);
        localStorage.setItem(name, 1);
        customFlag = !0
    }
}
//라디오버튼처리
function radioButtonCotrol(id) {
    var name = $('#' + id).find('input').attr('name');
    switch (name) {
        case 'radio_nameType':
            $('#lb-' + localStorage.getItem('nameType')).prop('checked', false);
            if (id == 'AType') {
                localStorage.setItem('nameType', 'AType');
                var temp = mpLang.m208
            } else if (id == 'BType') {
                localStorage.setItem('nameType', 'BType');
                var temp = mpLang.m209
            } else if (id == 'CType') {
                localStorage.setItem('nameType', 'CType');
                var temp = mpLang.m210
            } else {
                localStorage.setItem('nameType', 'DType');
                var temp = mpLang.m211
            }
            $('#r_nameType').html(temp);
            $('#lb-' + id).prop('checked', true);                      //해당영역만 체크 
            break;
        case 'radio_lang':
            $('#lb-' + localStorage.getItem('language')).prop('checked', false);
            if (id == 'kr') {
                localStorage.setItem('language', 'kr');
                mpLang = mpKR;
                $('#r_Lang').text('한국어');
                $('#capture a').attr('data-tooltip', '캡처 (Only PC)');
                $('#endEncounter a').attr('data-tooltip', '전투 집계 종료');
                $('#more a').attr('data-tooltip', '더보기')
            } else if (id == 'jp') {
                localStorage.setItem('language', 'jp');
                $('#capture a').attr('data-tooltip', 'キャプチャー (PCのみ可能)');
                $('#endEncounter a').attr('data-tooltip', 'エンカウント終了');
                $('#more a').attr('data-tooltip', 'もっと見る')
                mpLang = mpJP;
                $('#r_Lang').text('日本語');
            } else {
                localStorage.setItem('language', 'en');
                $('#capture a').attr('data-tooltip', 'Capture (Only PC)');
                $('#endEncounter a').attr('data-tooltip', 'End Encounter');
                $('#more a').attr('data-tooltip', 'More')
                mpLang = mpEN;
                $('#r_Lang').text('English');
            }
            for (var i in mpLang)
                $('[name="' + i + '"]').html(mpLang[i]);
            if (localStorage.getItem('ranking') == 1)
                $('body').find('[name=m215]').text(mpLang.m37);
            else
                $('body').find('[name=m215]').text(mpLang.m214);
            radioButtonCotrol(localStorage.getItem('nameType'));
            //라디오버튼 재처리
            $('.rdColor').css('color', accentColor);
            $('#lb-' + id).prop('checked', true);
            //색깔 적용 
            initCheck('HPS');
            initCheck('hideName');
            initCheck('fullscreen');
            $('#capture i').removeClass('animated flash');//카메라 애니메이션 효과 
            $('.tooltipped').tooltip({
                delay: 25
            });
            break
    }
}
//폰트 설정
function settingsFont() {
    var change_timeFont = $("[name=timeFont]").val();
    var change_ourFont = $("[name=ourFont]").val();
    var change_engFont = $("[name=engFont]").val();
    if (change_timeFont == "")
        localStorage.setItem('timeFont', 'Montserrat');
    else localStorage.setItem('timeFont', change_timeFont);
    if (change_ourFont == "")
        localStorage.setItem('ourFont', 'malgun');
    else localStorage.setItem('ourFont', change_ourFont);
    if (change_engFont == "")
        localStorage.setItem('engFont', 'Roboto');
    else localStorage.setItem('engFont', change_engFont);
    $('body').find("#previewTopbar,nav [name=main]").find(".time").css('font-family', "'" + change_timeFont + "'" + ", 'Montserrat'");
    $('body').find("nav [name=main],#preview").find(".info").find(".smallText").css('font-family', "'Roboto Condensed', 'Meiryo','" + change_ourFont + "'" + ", 'Meiryo', 'malgun'");
    $('html').css('font-family', "'" + change_engFont + "'," + "'Meiryo','" + change_ourFont + "'" + ", Roboto, 'Meiryo', 'malgun'");
    $("[name=timeFont]").val(localStorage.getItem('timeFont'));
    $("[name=ourFont]").val(localStorage.getItem('ourFont'));
    $("[name=engFont]").val(localStorage.getItem('engFont'))
}
//설정값 실시간 업데이트
function onSettingsUpdate(id) {
    switch (id) {
        case 'accentColor':
            accentColor = '#' + localStorage.getItem('accentColor');
            $('[type="range"],[type="checkbox"]+label').css('background-color', accentColor);
            $('.time,#clear,.rdColor').css('color', accentColor);
            $('body').find('.mainIcon').css('color', accentColor);
            $('body').find(":contains('star')").css('color', accentColor);
            $('body').find(":contains('star_border')").css('color', 'rgba(255,255,255,0.38)');
            if (localStorage.getItem('hideName') == 1)
                $('#hideName i').css('color', accentColor);
            if (localStorage.getItem('HPS') == 1)
                $('#HPS i').css('color', accentColor);
            break;
        case 'borderColor':
            borderColor = '#' + localStorage.getItem('borderColor');
            if (localStorage.getItem('border') == 1) {
                var c = oHexColor(borderColor);
                $('#mainTopBar,#previewTopbar').css('border', 'solid .1rem' + ' rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_to + ')')
            } else $('#mainTopBar,#previewTopbar').css('border', '0');
            break;
        case 'to':
        case 'topbarBackgroundColor':
            topbarBackgroundColor = '#' + localStorage.getItem('topbarBackgroundColor');
            var b = oHexColor(topbarBackgroundColor);
            $('#mainTopBar,#previewTopbar').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_to + ')');
            break;
        case 'headerColor':
            headerColor = '#' + localStorage.getItem('header');
            var a = oHexColor(headerColor);
            $('.previewImage').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_ho + ')');
            break;
        case 'edge':
            if (localStorage.getItem('edge') == 1)
                $('#mainTopBar,#previewTopbar').css('border-radius', '.6rem .6rem 0 0');
            else $('#mainTopBar,#previewTopbar').css('border-radius', '0');
            break;
        case 'border':
            if (localStorage.getItem('border') == 1) {
                var c = oHexColor(borderColor);
                $('#mainTopBar,#previewTopbar').css('border', 'solid .1rem' + ' rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_to + ')')
            } else $('#mainTopBar,#previewTopbar').css('border', '0');
            break;
        case 'bigTextColor':
            $('.bigText').css('color', '#' + localStorage.getItem('bigTextColor'));
            break;
        case 'smallTextColor':
            $('.smallText').css('color', '#' + localStorage.getItem('smallTextColor'));
            break;
        case 'headerText':
            $('body').find(".tableHeader td").css('color', '#' + localStorage.getItem('headerText'));
            break;
        case 'ho':
            var a = oHexColor(localStorage.getItem('header'));
            $('body').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_ho + ')');
            break;
        case 'bo':
            var b = oHexColor(localStorage.getItem('background'));
            $('body').find('.barBg').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_bo + ')');
            $('.raid .collapsible-header').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_bo + ')');
            $('.raid .collapsible-body').css('background', 'rgba(0,0,0,' + (now_bo + 0.25) + ')');
            break;
        case 'go':
            $('body').find('.bar').css('opacity', now_go);
            $('body').find('.bar.pet').css('opacity', 0.5);
            var c = oHexColor(accentColor);
            $('body').find('[name=RaidYOU]').css('background', 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_go + ')');
            break;
        case 'lo':
            var d = oHexColor(localStorage.getItem('lineColor'));
            $('body').find('[name=previewLine],#graphTableBody .divider').css('backgroundColor', "rgba(" + d.r + ',' + d.g + ',' + d.b + ',' + now_lo + ")");
            break
        case 'textColor':
            $('#graphTableBody, [name=raid]').find('td').css('color', "#" + localStorage.getItem("other"));
            $('#graphTableBody, [name=raid]').find("[name=RaidYOU], #dpsYOU, #hpsYOU").find('td').css('color', "#" + localStorage.getItem("me"));
            $('.dataYOU').find('td').css('color', "#" + localStorage.getItem("me"));
            $('.raid .collapsible-body').find('td.left').css('color', '#bdbdbd');
            $('.raid .collapsible-body').find('td.right.value').css('color', accentColor);
            break;
        case 'bold':
            if (localStorage.getItem('otherBold') == 1){
                $('#graphTableBody, [name=raid], #Merge, #NoMerge').find('td').css('font-weight', 'bold');
            }else {
                $('#graphTableBody, [name=raid], #Merge, #NoMerge').find('td').css('font-weight', 'normal');
            }
            if (localStorage.getItem('meBold') == 1){
                $('#graphTableBody, [name=raid]').find("[name=RaidYOU], #dpsYOU, #hpsYOU").find('td').css('font-weight', 'bold');
                $('.dataYOU').find('td').css('font-weight', 'bold');
            }else {
                $('#graphTableBody, [name=raid]').find("[name=RaidYOU], #dpsYOU, #hpsYOU").find('td').css('font-weight', 'normal');
                $('.dataYOU').find('td').css('font-weight', 'normal');
            }
            break;
        case 'previewColor':
            var d = oHexColor(localStorage.getItem('lineColor'));
            $('body').find('[name=previewLine]').css('backgroundColor', "rgba(" + d.r + ',' + d.g + ',' + d.b + ',' + now_lo + ")");
            document.getElementById("previewBar3").style.background = '#' + localStorage.getItem('ava');
            $('#previewBar3').css('opacity', 0.5);
            if (localStorage.getItem('youColor') == 1)
                previewGraph(localStorage.getItem("YOU"));
            else
                previewGraph(localStorage.getItem("dps5"));
            $('body').find('#previewBar2,#previewBar5').css('background', '#' + localStorage.getItem('chocobo'));
            var a = oHexColor('#' + localStorage.getItem('background'));
            $('[name=graph] .previewImage .barBg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_bo + ')');
            break
    }
}
//프리뷰 그래프값
function previewGraph(color) {
    if (localStorage.getItem("gradation") == 1) {
        document.getElementById("previewBar1").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + color + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar2").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + localStorage.getItem("chocobo") + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar3").style.background = '#' + localStorage.getItem('ava');
        document.getElementById("previewBar4").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + color + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar5").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + localStorage.getItem("chocobo") + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar6").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + color + "), to(rgba(24,24,24,0.0)))"
    } else {
        document.getElementById("previewBar1").style.background = '#' + color;
        document.getElementById("previewBar2").style.background = '#' + localStorage.getItem('chocobo');
        document.getElementById("previewBar3").style.background = '#' + localStorage.getItem('ava');
        document.getElementById("previewBar4").style.background = '#' + color;
        document.getElementById("previewBar5").style.background = '#' + localStorage.getItem('chocobo');
        document.getElementById("previewBar6").style.background = '#' + color;
    }
}
//프리뷰테이블값 
function previewValue() {
    for (var i = 1; i <= 24; i++) {
        var value = parseFloat(delComma($('#c' + i).attr('value')));
        if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23) {
            var fixed = addComma(value);
            $('#c' + i).text(fixed)
        } else if (i == 2 || i == 6 || i == 10 || i == 14 || i == 18 || i == 22) {
            var fixed = addComma(value.toFixed(inputNumber / 2));
            $('#c' + i).text(fixed + '%')
        } else if (i == 4 || i == 8 || i == 12 || i == 16 || i == 20 || i == 24) {
            var fixed = addComma(value);
            $('#c' + i).text("Action - " + fixed)
        } else {
            var fixed = addComma(value.toFixed(inputNumber));
            $('#c' + i).text(fixed)
        }
    }
}
//초기화체크 
function initCheck(name) {
    var value = localStorage.getItem(name);
    if (value == 1) {
        switch (name) {
            case 'HPS':
                $('#' + name + ' input').attr('checked', !0);
                $('li#' + name + ' i').css('color', accentColor);
                $('#hpsTable,#hpsRaidTable').fadeIn(150);
                break;
            case 'hideName':
                $('#' + name + ' input').attr('checked', 'checked');
                $('li#' + name + ' i').css('color', accentColor);
                break;
            case 'ranking':
                $('input#' + name).attr('checked', 'checked');
                $('body').find('[name=rankingName]').text('R. Name');
                $('body').find('[name=rankingName2]').text('1. YOU');
                $('body').find('[name=rankingName3]').text('2. Chocobo');
                $('body').find('[name=rankingName4]').text('3. Egi');
                $('body').find('[name=m215]').text(mpLang.m37);
                break;
            case 'youColor':
                $('input#' + name).attr('checked', 'checked');
                $('[name=youColor]').fadeIn(150);
                previewGraph(localStorage.getItem("YOU"));
                break;
            case 'line':
                $('input#' + name).attr('checked', 'checked');
                $('body').find('[name=previewLine]').removeClass('hidden');
                break;
            case 'gradation':
                $('input#' + name).attr('checked', 'checked');
                $('body').find('.barHeal, .barDeal').css('float', 'left');
                if (localStorage.getItem('youColor') == 1)
                    previewGraph(localStorage.getItem("YOU"));
                else
                    previewGraph(localStorage.getItem("dps5"));
                break;
            case 'petAction':
                $('input#' + name).attr('checked', 'checked');
                $('#previewBar3').removeClass('hidden');
                break;
            case 'pets':
                $('input#' + name).attr('checked', 'checked');
                $('#Merge').removeClass('hidden');
                $('#NoMerge').addClass('hidden');
                break;
            default:
                $('input#' + name).attr('checked', 'checked');
                break
        }
    } else {
        switch (name) {
            case 'HPS':
                $('#' + name + ' input').attr('checked', !1);
                $('li#' + name + ' i').css('color', 'rgba(255,255,255,0.38)');
                break;
            case 'hideName':
                $('#' + name + ' input').attr('checked', !1);
                $('li#' + name + ' i').css('color', 'rgba(255,255,255,0.38)');
                break;
            case 'ranking':
                $('input#' + name).attr('checked', !1);
                $('body').find('[name=rankingName]').text('Name');
                $('body').find('[name=rankingName2]').text('YOU');
                $('body').find('[name=rankingName3]').text('Chocobo');
                $('body').find('[name=rankingName4]').text('Egi');
                $('body').find('[name=m215]').text(mpLang.m214);
                break;
            case 'youColor':
                $('input#' + name).attr('checked', !1);
                $('[name=youColor]').fadeOut(150);
                previewGraph(localStorage.getItem("dps5"));
                break;
            case 'line':
                $('input#' + name).attr('checked', !1);
                $('body').find('[name=previewLine]').addClass('hidden');
                break;
            case 'gradation':
                $('input#' + name).attr('checked', !1);
                $('body').find('.barHeal, .barDeal').css('float', 'right');
                if (localStorage.getItem('youColor') == 1)
                    previewGraph(localStorage.getItem("YOU"));
                else
                    previewGraph(localStorage.getItem("dps5"));
                break;
            case 'petAction':
                $('input#' + name).attr('checked', !1);
                $('#previewBar3').addClass('hidden');
                break;
            case 'pets':
                $('input#' + name).attr('checked', !1);
                $('#Merge').addClass('hidden');
                $('#NoMerge').removeClass('hidden');
                break;
            default:
                $('input#' + name).attr('checked', !1);
                break
        }
    }
}
//CSS 업데이트 
function onUpdateCSS() {
    var index = ['accentColor', 'borderColor', 'topbarBackgroundColor', 'edge', 'border', 'bigTextColor', 'smallTextColor', 'previewColor', 'headerText', 'headerColor', 'textColor', 'ho', 'bo', 'go', 'bold']
    for (var i in index)
        onSettingsUpdate(index[i]);
    settingsFont();
    adjustTopbarHeight();
    adjustCellWidth();
    previewValue()
}
//-----------------------------------------------------------------------------------------------------------------------------
function onOverlayDataUpdate(e) {
    if (localStorage.getItem('history') == 1)
        closeHistory();
    lastCombat = new Combatant(e, 'encdps');
    lastCombatHPS = new Combatant(e, 'enchps');
    setTimeout(function () {
        saveLog();
        update()
    }, 1)
}
function update() {
    if (lastCombat === null) {
        return
    } else onUpdateUserData()
}
function onUpdateUserData() {
    //상단바 적용 
    $("nav [name=main]").find(".time").text(lastCombat.duration);
    $("nav [name=main]").find(".info .bigText").text(lastCombat.title);
    $("nav [name=main]").find(".info .smallText").text("RD " + addComma(parseFloat(lastCombat.Encounter.encdps).toFixed(0)) + "　RH " + addComma(parseFloat(lastCombat.Encounter.enchps).toFixed(0)));
    //소환수 합산/분리 적용 
    if (localStorage.getItem("pets") == 0) {
        lastCombat.summonerMerge = !1;
        lastCombat.DetachPets();
        lastCombat.resort("damage", 1);
        lastCombatHPS.summonerMerge = !1;
        lastCombatHPS.DetachPets();
        lastCombatHPS.resort("healed", 1)
    } else {
        lastCombat.summonerMerge = !0;
        lastCombat.AttachPets();
        lastCombat.resort("mergedDamage", 1);
        lastCombatHPS.summonerMerge = !0;
        lastCombatHPS.AttachPets();
        lastCombatHPS.resort("mergedHealed", 1)
    }
    //초기화 설정 
    if (lastCombat.title == 'Encounter' && saveLogFlag == !0) {
        $('#dpsTableBody, #dpsTableHeader tr, #hpsTableBody, #hpsTableHeader tr, #dpsTempTable, #hpsTempTable, #dpsRaidTable, #hpsRaidTable').html('');
        saveLogFlag = !1
    }
    //길이 계산 
    var dpsPet = 0, hpsPet = 0, hpsUser = 0, dpsUser = 0;
    for (var d in lastCombat.persons) {
        var a = lastCombat.persons[d];
        if (lastCombat.summonerMerge == !0 && a.get("Job") == 'AVA') { } else {
            if (a.get("petOwner") == "") {
                if (a.get("role") != 'Healer')
                    dpsUser++;
                else hpsUser++
            } else {
                if (a.get("role") != 'Healer')
                    dpsPet++;
                else hpsPet++
            }
        }
    }
    dpsUsers = dpsUser + hpsUser + dpsPet + hpsPet;
    hpsUsers = hpsUser + hpsPet;
    OnlyUsers = dpsUser + hpsUser; 
    //레이드모드 
    if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1) {
        tableFlag = 1;
        adjustTopbarHeight();
        onCreateTable(lastCombat, 'dps', 'dpsTempTable');
        if (localStorage.getItem('HPS') == 1)
            onCreateTable(lastCombatHPS, 'hps', 'hpsTempTable');
        $('#dpsRaidTable,#hpsRaidTable').attr("data-collapsible", "accordion");
        $('.collapsible').collapsible();
        if (viewSettingsFlag == !1) {
            $('#graphTableHeader, #graphTableBody').addClass('hidden');
            $('[name=raid]').removeClass('hidden')
        } else {
            $('[name=main],[name=raid]').addClass('hidden')
        }
    } else {//일반모드 
        tableFlag = 2;
        adjustTopbarHeight();
        onCreateTable(lastCombat, 'dps', 'dpsTableBody');
        if (localStorage.getItem('HPS') == 1)
            onCreateTable(lastCombatHPS, 'hps', 'hpsTableBody');
        $('#graphTableHeader, #graphTableBody').removeClass('hidden');
        $('[name=raid]').addClass('hidden')
    }
    customFlag = !1
}

function onCreateTable(lastData, flag, container) {
    for (var d in lastData.persons) {
        var a = lastData.persons[d];
        if (lastData.summonerMerge == !0 && a.get("Job") == 'AVA') { } else {
            if ( (lastData == lastCombat || (lastData == lastCombatHPS && a.get("role") == "Healer")) ) {
                //유저아이디 
                var userName = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace(/'/g, "_");
                var exist = $('#' + container).find('#' + flag + userName).length;
                //테이블 생성여부 확인
                if (exist == 0) {
                    //테이블 생성 
                    var tableBody = document.getElementById(container);
                    if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1)
                        var newBody = onCreateRaidBody(a, flag, userName);
                    else var newBody = onCreateBody(a, flag, userName);
                    tableBody.appendChild(newBody);
                    if (flag == 'dps') inputColData(userName, 1, 0, custom, flag, a, tableFlag, container);
                    else inputColData(userName, 0, 40, healerCustom, flag, a, tableFlag, container)
                } else {
                    //커스텀 변경 시 적용할 값 처리 
                    if (customFlag == !0) {
                        if (flag == 'dps') inputColData(userName, 1, 0, custom, flag, a, tableFlag, container);
                        else inputColData(userName, 0, 40, healerCustom, flag, a, tableFlag, container)
                    } else {//커스텀 변경 없이 새로 값 업데이트 
                        if (flag == 'dps') onChangeData(a, flag, userName, tableFlag, custom, 1, 0, container);
                        else onChangeData(a, flag, userName, tableFlag, healerCustom, 0, 40, container)
                    }
                }
                //컬러 처리 
                if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1) {
                    $('#' + container).find('#' + flag + userName).find('.index').css('background', inputColor(a))
                } else {
                    inputBarWidth(a, flag, container, userName);
                    inputBarStyle(a, flag, container, userName)
                }
            }
        }
    }
    //재정렬 
    var sorted = onSortData($('#' + container + '>div'), 'data-value');
    $('#' + container).html(sorted);
    //여기에 랭킹 입력 data-order     
    for (var i = 0; i < sorted.length; i++)
        $('#' + container).find('#' + sorted[i].id).attr('data-order', parseInt(i))
    //24인 모드 변환
    if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1)
        inputList(lastData, container, flag);
    //CSS 초기화 
    adjustCellWidth();
    onSettingsUpdate('ho');
    onSettingsUpdate('lo');
    onSettingsUpdate('go');
    onSettingsUpdate('bo');
    onSettingsUpdate('textColor');
    onSettingsUpdate('headerText');
    onSettingsUpdate('bold');
}

function onChangeData(a, flag, userName, tableFlag, arr, st1, st2, container) {
    if (flag == 'dps') var val = parseInt(a.get("mergedDamage"));
    else var val = parseInt(a.get("mergedHealed"));
    for (var i = st1; i < arr.length; i++)
        $('#' + container).find('#' + flag + userName).find('.custom' + (i + st2)).html(inputData('custom' + (i + st2), a, localStorage.getItem('pets')));
    if (tableFlag == 2) {
        $('#' + container).find('#' + flag + userName).attr('data-value', val)
    } else {
        var preRank = $('#' + container).find('#' + flag + userName).attr('data-order');    
        $('#' + container).find('#' + flag + userName).attr('data-value', val);
        $('#' + container).find('#' + flag + userName).find('.raidName').html(inputName(a.get("name"), a.get("Class"), a.get("rank") + 1, a.get("petOwner")));
        $('#' + container).find('#' + flag + userName).find('.raidName.value').html(addComma(a.get("enc" + flag).toFixed(inputNumber)));
        $('#' + container).find('#' + flag + userName).find('.center').html('<img src="images/glow/' + inputRanking(a, flag, preRank) + '.png" style="width:1.5rem;">')
    }
}

function onSortData(selector, attrName) {
    return $($(selector).toArray().sort(function (a, b) {
        var aVal = parseInt(a.getAttribute(attrName)),
            bVal = parseInt(b.getAttribute(attrName));
        return bVal - aVal
    }))
}

function onCreateHeader(table, st1, st2, arr) {
    var tableHeader = document.getElementById(table);
    var newHeader = document.createElement("tbody");
    var tr = newHeader.insertRow();
    tableHeader.appendChild(newHeader)
}

function inputColData(userName, st1, st2, arr, flag, a, tableFlag, container) {
    if (tableFlag == 2) {
        var header = "";
        var body = "";
        for (i = st1; i < arr.length; i++) {
            var name = 'custom' + (i + st2);
            if (localStorage.getItem(name) == 1) {
                header += "<td class='" + addClassName(name) + "'>" + $('[name="' + name + '"]').find('.PrimaryText').text() + "</td>";
                body += "<td class='" + addClassName(name) + "'>" + inputData(name, a, localStorage.getItem("pets")) + "</td>"
            }
        }
        $('#' + flag + 'TableHeader tr').html(header);
        $('#' + container).find('#' + flag + userName).find('table tr').html(body)
    } else {
        var body = "";
        for (var i = 2 + st1; i < arr.length; i++) {
            var name = 'custom' + (i + st2);
            if (localStorage.getItem(name) == 1) {
                var temp = '<tr><td class="left">' + $('[name="' + name + '"]').find('.PrimaryText').text() + '</td></tr><tr><td class="right value ' + name + '" style="color:' + accentColor + '";>' + inputData(name, a, localStorage.getItem("pets")) + '</td></tr>';
                body += temp
            }
        }
        $('#' + container).find('#' + flag + userName).find('table.body').html(body)
    }
}

function onCreateBody(a, flag, userName) {
    var newCombatant = document.createElement("div");
    newCombatant.id = flag + userName;
    if (flag == 'dps') var val = parseInt(a.get("mergedDamage"));
    else var val = parseInt(a.get("mergedHealed"));
    newCombatant.setAttribute('data-value', val);
    if(a.get("petOwner") == "YOU")        
        newCombatant.className = 'ava dataYOU';
    else if (a.get("petOwner") != "" && a.get("petOwner") != undefined)
        newCombatant.className = 'ava';
    var c = oHexColor('#' + localStorage.getItem('lineColor'));
    if (flag == 'dps') {
        var table = "<table class='tableBody'><tr></tr></table>" + "<div class='bar' id='dps" + userName + "' style='width:0%;'>" + "<span class='bar barDeal pet' id='dpsPet" + userName + "' style='width:0%;'></span>" + "</div>" + "<div class='barBg'></div>" + "<li class='divider' style='rgba(" + c.r + ',' + c.g + ',' + c.b + ',' + now_lo + ")'></li>"
    } else {
        var table = "<table class='tableBody'><tr></tr></table>" + "<div class='bar' id='hps" + userName + "' style='width:0%;'>" + "<span class='bar barHeal' id='overheal" + userName + "' style='width:0%;'></span>" + "<span class='bar barHeal' id='shield" + userName + "' style='width:0%;'></span>" + "<span class='bar barHeal pet' id='hpsPet" + userName + "' style='width:0%;'></span>" + "</div>" + "<div class='barBg'></div>" + "<li class='divider' style='rgba(" + c.r + ',' + c.g + ',' + c.b + ',' + now_lo + ")'></li>"
    }
    newCombatant.innerHTML = table;
    return newCombatant
}

function onCreateRaidBody(a, flag, userName) {
    var newCombatant = document.createElement("div");
    newCombatant.id = flag + userName;
    if (flag == 'dps') var val = parseInt(a.get("mergedDamage"));
    else var val = parseInt(a.get("mergedHealed"));
    newCombatant.setAttribute('data-value', val);
    if(a.get("petOwner") == "YOU")        
        newCombatant.className = 'ava dataYOU';
    else if (a.get("petOwner") != "" && a.get("petOwner") != undefined)
        newCombatant.className = 'ava';
    var you = '<div class="header"><table class="divBody" name="RaidYOU" style="background:' + accentColor + ';"><tr>';
    var other = '<div class="header"><table class="divBody header"><tr>';
    var header = '<td class="index" style="width: .3rem; background:' + inputColor(a) + ';" ></td>' + '<td style="width: 1.9rem"><img src="images/glow/' + a.get("Job").toLowerCase() + '.png" class="pngIcon"></td>' + '<td class="raidName">' + inputName(a.get("name"), a.get("Class"), a.get("rank") + 1, a.get("petOwner")) + '</td></tr><tr>' + '<td class="index" style="width: .3rem; background:' + inputColor(a) + ';" ></td>' + '<td style="width: 1.9rem" class="center"><img src="images/glow/' + inputRanking(a, flag) + '.png" style="width:1.5rem;"></td>' + '<td class="raidName value">' + addComma(a.get("enc" + flag).toFixed(inputNumber)) + '</td></tr></table></div>';
    if (flag == 'dps') {
        var body = '<div class="body"><table class="divBody">';
        for (var i = 3; i < custom.length; i++) {
            var name = 'custom' + i;
            if (localStorage.getItem(name) == 1) {
                var temp = '<tr><td class="left">' + $('[name="' + name + '"]').find('.PrimaryText').text() + '</td></tr><tr><td class="right value ' + name + '" style="color:' + accentColor + '";>' + inputData(name, a, localStorage.getItem("pets")) + '</td></tr>';
                body += temp
            }
        }
        body += '</table></div>'
    } else {
        var body = '<div class="body"><table class="divBody">';
        for (var i = 2; i < healerCustom.length; i++) {
            var name = 'custom' + (i + 40);
            if (localStorage.getItem(name) == 1) {
                var temp = '<tr><td class="left">' + $('[name="' + name + '"]').find('.PrimaryText').text() + '</td></tr><tr><td class="right value ' + name + '" style="color:' + accentColor + '";>' + inputData(name, a, localStorage.getItem("pets")) + '</td></tr>';
                body += temp
            }
        }
        body += '</table></div>'
    }
    if (a.get("name") == "YOU" || a.get("petOwner") == "YOU")
        newCombatant.innerHTML = you + header + body;
    else newCombatant.innerHTML = other + header + body;
    return newCombatant
}

function inputList(lastData, container, flag) {
    var header = [];
    var body = [];
    var html = '';
    if (flag == 'dps') {
        var length = dpsUsers;
        var box = 5;
        var s = 13
    } else {
        var length = hpsUsers;
        var box = 6;
        var s = 2
    }
    for (var i = 1, cnt = 1; i <= length; i++) {
        if (header[cnt] == undefined) {
            header[cnt] = '';
            body[cnt] = ''
        }
        var hC = $('#' + container + '>div[data-order=' + (i - 1) + '] .header').html();
        var bC = $('#' + container + '>div[data-order=' + (i - 1) + '] .body').html();
        if (hC != undefined) {
            header[cnt] += '<div class="col s' + s + ' userbox">' + hC + '</div>';
            body[cnt] += '<div class="col s' + s + ' userbox">' + bC + '</div>'
        }
        if (i % box == 0)
            cnt++
    }
    for (var i = 1; i < header.length; i++) {
        var group = "<li><div class='collapsible-header row'>" + header[i] + "</div><div class='collapsible-body row'>" + body[i] + "</div></li>"
        html += group
    }
    $('#' + flag + 'RaidTable').html(html)
}

function addClassName(name) {
    if (name == 'custom2' || name == 'custom41')
        return 'nameCell' + ' ' + name;
    else if (name == 'custom6' || name == 'custom25' || name == 'custom4' || name == 'custom7' || name == 'custom8' || name == 'custom9' || name == 'custom10' || name == 'custom42')
        return 'narrowCell2' + ' ' + name;
    else if (name == 'custom12' || name == 'custom21' || name == 'custom22' || name == 'custom27' || name == 'custom28' || name == 'custom29' || name == 'custom30' || name == 'custom37' || name == 'custom38' || name == 'custom44' || name == 'custom45' || name == 'custom46' || name == 'custom47' || name == 'custom54' || name == 'custom55')
        return 'wideCell1' + ' ' + name;
    else if (name == 'custom20' || name == 'custom35' || name == 'custom52')
        return 'wideCell2' + ' ' + name;
    else if (name == 'custom1' || name == 'custom40')
        return 'iconCell' + ' ' + name;
    else return 'narrowCell1' + ' ' + name
}

function addComma(num) {
    if (localStorage.getItem('comma') == 1) {
        if (localStorage.getItem('dot') == 1)
            return num.toString().replace('.', ',').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        else
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else
        if (localStorage.getItem('dot') == 1)
            return num.toString().replace('.', ',');
        else
            return num
}
function delComma(num) {
    var number = num + "";
    return number.replace(",", "")
}
function inputName(name, job, rank, pet) {
    if (localStorage.getItem('hideName') == 0) {
        if (name == "YOU") {
            var i = cutName(myName);
            return cutRank(i, rank)
        } else {
            if (pet != "")
                var i = name;
            else var i = cutName(name);
            return cutRank(i, rank)
        }
    } else {
        if (job == "LMB") 
            return cutRank(name, rank);
        else if(name == "YOU")
                return cutRank('YOU', rank);
        else if(pet == "YOU"){
                var temp = name.split('(');
                var i = temp[0] + ' (YOU)';
                return cutRank(i, rank);
        } else 
           return cutRank(' ',   rank)
    }
}

function cutName(name) {
    var temp = name.split(' ');
    if (temp.length == 1) {
        return name
    } else {
        if (localStorage.getItem('nameType') == 'AType') {
            return name
        } else if (localStorage.getItem('nameType') == 'BType') {
            return temp[0] + ' ' + temp[1].substr(0, 1) + '.'
        } else if (localStorage.getItem('nameType') == 'CType') {
            return temp[0].substr(0, 1) + '. ' + temp[1]
        } else {
            return temp[0].substr(0, 1) + '. ' + temp[1].substr(0, 1) + '.'
        }
    }
}

function cutRank(name, rank) {
    if (localStorage.getItem('ranking') == 1) {
        return rank + '. ' + name
    } else {
        return name
    }
}

function inputRanking(a, flag, preRank) {
    if (a.get("rank") == 0) {
        return img = "rank_1"
    } else if (a.get("rank") == 1) {
        return img = "rank_2"
    } else if (a.get("rank") == 2) {
        return img = "rank_3"
    } else if (preRank == "NaN" || preRank == undefined) {
        return img = "arrow_flat"
    } else if (a.get("rank") < parseInt(preRank)) {
        return img = "arrow_up"
    } else if (a.get("rank") > parseInt(preRank)) {
        return img = "arrow_down"
    } else if (a.get("rank") == parseInt(preRank)) {
        return img = "arrow_flat"
    }
}

function inputData(name, a, petFlag) {
    var rank = a.get("rank") + 1;
    switch (name) {
        case 'custom1':
        case 'custom40':
            return '<img src="./images/glow/' + a.get("Job").toLowerCase() + '.png" class="pngIcon"/>';
        case 'custom2':
        case 'custom41':
            return inputName(a.get("name"), a.get("Class"), parseInt(a.get("rank")) + 1, a.get("petOwner"));
        case 'custom3':
            return a.get("duration");
        case 'custom4':
            return addComma(parseFloat(a.get("dps")).toFixed(inputNumber));
        case 'custom5':
            return lastCombat.duration;
        case 'custom6':
            return addComma(parseFloat(a.get("encdps")).toFixed(inputNumber));
        case 'custom7':
            return addComma(parseFloat(a.get("Last10DPS")).toFixed(inputNumber));
        case 'custom8':
            return addComma(parseFloat(a.get("Last30DPS")).toFixed(inputNumber));
        case 'custom9':
            return addComma(parseFloat(a.get("Last60DPS")).toFixed(inputNumber));
        case 'custom10':
            return addComma(parseFloat(a.get("Last180DPS")).toFixed(inputNumber));
        case 'custom11':
            return addComma(parseFloat(a.get("damage%")).toFixed(inputNumber / 2)) + '%';
        case 'custom12':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedDamage")));
            else return addComma(parseInt(a.get("damage")));
        case 'custom13':
            return addComma(parseFloat(a.get("TOHIT")).toFixed(inputNumber / 2)) + '%';
        case 'custom14':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedSwings")));
            else return addComma(parseInt(a.get("swings")));
        case 'custom15':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedHits")));
            else return addComma(parseInt(a.get("hits")));
        case 'custom16':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedMisses")));
            else return addComma(parseInt(a.get("misses")));
        case 'custom17':
            return addComma(parseInt(a.get("hitfailed")));
        case 'custom18':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedCrithits")));
            else return addComma(parseInt(a.get("crithits")));
        case 'custom19':
            return addComma(parseFloat(a.get("crithit%")).toFixed(inputNumber / 2)) + '%';
        case 'custom20':
            //영문스킬명 단축 2가지 
            if (localStorage.getItem('abb') == 1) {
                if (a.get("maxhitstr") == "The Forbidden Chakra") {
                    var s = 'Forb..Chakra';
                } else if (a.get("maxhitstr") == "Spineshatter Dive") {
                    var s = 'Spine..Dive';
                } else
                    var s = a.get("maxhitstr");
            } else {
                var s = a.get("maxhitstr");
            }
            if (tableFlag == 2)
                return s + ' - ' + addComma(parseInt(a.get("maxhitval")));
            else return s + '<br>' + addComma(parseInt(a.get("maxhitval")));
        case 'custom21':
            return addComma(parseInt(a.get("damagetaken")));
        case 'custom22':
            return addComma(parseInt(a.get("healstaken")));
        case 'custom23':
            return addComma(parseFloat(a.get("ParryPct")).toFixed(inputNumber / 2)) + '%';
        case 'custom24':
            return addComma(parseFloat(a.get("BlockPct")).toFixed(inputNumber / 2)) + '%';
        case 'custom25':
        case 'custom42':
            return addComma(parseFloat(a.get("enchps")).toFixed(inputNumber));
        case 'custom26':
        case 'custom43':
            return addComma(parseFloat(a.get("healed%")).toFixed(inputNumber / 2)) + '%';
        case 'custom27':
        case 'custom44':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedHealed")));
            else return addComma(parseInt(a.get("healed")));
        case 'custom28':
        case 'custom45':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedHealed")) - parseInt(a.get("mergedOverHeal")) - parseInt(a.get("mergedDamageShield")));
            else return addComma(parseInt(a.get("healed")) - parseInt(a.get("overHeal")) - parseInt(a.get("damageShield")));
        case 'custom29':
        case 'custom46':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedDamageShield")));
            else return addComma(parseInt(a.get("damageShield")));
        case 'custom30':
        case 'custom47':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedOverHeal")));
            else return addComma(parseInt(a.get("overHeal")));
        case 'custom31':
        case 'custom48':
            var overhealPct = (parseInt(a.get("overHeal")) / parseInt((a.get("healed"))) * 100);
            if (isNaN(overhealPct) == !0) {
                overhealPct = 0;
                return addComma(overhealPct.toFixed(inputNumber / 2)) + '%'
            } else {
                if (petFlag == 1)
                    return addComma(parseFloat((parseInt(a.get("mergedOverHeal")) / parseInt(a.get("mergedHealed")) * 100)).toFixed(inputNumber / 2)) + '%';
                else return addComma(parseFloat((parseInt(a.get("overHeal")) / parseInt(a.get("healed"))) * 100).toFixed(inputNumber / 2)) + '%'
            }
        case 'custom32':
        case 'custom49':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedHeals")));
            else return addComma(parseInt(a.get("heals")));
        case 'custom33':
        case 'custom50':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedCritheals")));
            else return addComma(parseInt(a.get("critheals")));
        case 'custom34':
        case 'custom51':
            return addComma(parseFloat(a.get("critheal%")).toFixed(inputNumber / 2)) + '%';
        case 'custom35':
        case 'custom52':
            if (tableFlag == 2)
                return a.get("maxhealstr") + ' - ' + addComma(parseInt(a.get("maxhealval")));
            else return a.get("maxhealstr") + '<br>' + addComma(parseInt(a.get("maxhealval")));
        case 'custom36':
        case 'custom53':
            return addComma(parseInt(a.get("cures")));
        case 'custom37':
        case 'custom54':
            if (petFlag == 1) return addComma(parseInt(a.get("mergedAbsorbHeal")));
            else return addComma(parseInt(a.get("absorbHeal")));
        case 'custom38':
        case 'custom55':
            return addComma(parseInt(a.get("powerheal")));
        case 'custom39':
        case 'custom56':
            return addComma(parseInt(a.get("deaths")));
    }
}

function inputColor(a) {
    if (localStorage.getItem("youColor") == 1 && a.get("name") == "YOU") {
        return '#' + localStorage.getItem("YOU")
    } else {
        switch (a.get("Class")) {
            case 'PLD':
            case 'GLD':
                return '#' + localStorage.getItem("tank1");
            case 'WAR':
            case 'MRD':
                return '#' + localStorage.getItem("tank2");
            case 'DRK':
                return '#' + localStorage.getItem("tank3");
            case 'WHM':
            case 'CNJ':
                return '#' + localStorage.getItem("heal1");
            case 'SCH':
                return '#' + localStorage.getItem("heal2");
            case 'AST':
                return '#' + localStorage.getItem("heal3");
            case 'MNK':
            case 'PGL':
                return '#' + localStorage.getItem("dps1");
            case 'DRG':
            case 'LNC':
                return '#' + localStorage.getItem("dps2");
            case 'NIN':
            case 'ROG':
                return '#' + localStorage.getItem("dps3");
            case 'BLM':
            case 'THM':
                return '#' + localStorage.getItem("dps4");
            case 'SMN':
            case 'ACN':
                return '#' + localStorage.getItem("dps5");
            case 'BRD':
            case 'ARC':
                return '#' + localStorage.getItem("dps6");
            case 'MCH':
                return '#' + localStorage.getItem("dps7");
            case 'LMB':
                return '#' + localStorage.getItem("LB");
            case 'CBO':
                return '#' + localStorage.getItem("chocobo");
            case 'BTN':
            case 'FSH':
            case 'MIN':
                return '#' + localStorage.getItem("life1");
            default:
                return '#' + localStorage.getItem("life2");
        }
    }
}

function inputBarStyle(a, flag, container, name) {
    if (localStorage.getItem('gradation') == 1) {
        $('#' + container).find('#' + flag + name).find('.bar').css('background', "-webkit-gradient(linear, left top,right top, color-stop(0.6," + inputColor(a) + "), to(rgba(24,24,24,0.0)))");
        $('body').find('.barHeal, .barDeal').css('float', 'left')
    } else {
        $('#' + container).find('#' + flag + name).find('.bar').css('background', inputColor(a));
        $('body').find('.barHeal, .barDeal').css('float', 'right')
    }
    $('#' + container).find('#' + flag + name).find('.bar.pet').css('background', '#' + localStorage.getItem("ava"));
    $('#hpsTableBody').find('#overheal' + name).css('background', '#' + localStorage.getItem("overheal"));
    $('#hpsTableBody').find('#shield' + name).css('background', '#' + localStorage.getItem("shield"));
    if (a.get("petOwner") == "YOU" && localStorage.getItem('youColor') == 1) {
        $('#' + container).find('#' + flag + name).find('.bar').css('background', '#' + localStorage.getItem('YOU'))
    }
}

function inputBarWidth(a, flag, container, name) {
    if (flag == 'hps' && a.get('role') == 'Healer') {
        var width = Math.min(100, parseInt((a.get(lastCombatHPS.sortkey) / a.get("maxdamage")) * 100)) + '%';
        if (localStorage.getItem("pets") == 1) {
            var overheal = Math.min(100, parseInt((a.get("mergedOverHeal") / a.get("maxdamage")) * 100));
            var shield = Math.min(100, parseInt((a.get("mergedDamageShield") / a.get("maxdamage")) * 100));
            if (a.get("Class") == "SCH") {
                var allEffHeal = parseInt(a.get("mergedHealed") - a.get("mergedDamageShield") - a.get("mergedOverHeal"));
                var ownerEffHeal = parseInt(a.get("original").Healed - a.get("original").OverHeal - a.get("original").DamageShield);
                var fairyEffHeal = parseInt(allEffHeal - ownerEffHeal);
                var petHealed = Math.min(100, parseInt((100 - (overheal + shield)) * (fairyEffHeal / allEffHeal))) + '%';
                var overheal = overheal + '%';
                var shield = shield + '%'
            } else {
                var overheal = overheal + '%';
                var shield = shield + '%';
                var petHealed = 0 + '%'
            }
        } else {
            var overheal = Math.min(100, parseInt((a.get("overHeal") / a.get("maxdamage")) * 100)) + '%';
            var shield = Math.min(100, parseInt((a.get("damageShield") / a.get("maxdamage")) * 100)) + '%';
            var petHealed = 0 + '%'
        }
        if (localStorage.getItem('animation') == 1) {
            $('#' + container).find('#hps' + name + '.bar').animate({
                width: width
            });
            $('#' + container).find('#overheal' + name).animate({
                width: overheal
            });
            $('#' + container).find('#shield' + name).animate({
                width: shield
            });
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#hpsPet' + name).animate({
                    width: petHealed
                });
            else $('#' + container).find('#hpsPet' + name).animate({
                width: 0 + '%'
            })
        } else {
            $('#' + container).find('#hps' + name + '.bar').css('width', width);
            $('#' + container).find('#overheal' + name).css('width', overheal);
            $('#' + container).find('#shield' + name).css('width', shield);
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#hpsPet' + name).css('width', petHealed);
            else $('#' + container).find('#hpsPet' + name).css('width', 0 + '%')
        }
    } else {
        var width = Math.min(100, parseInt((a.get(lastCombat.sortkey) / a.get("maxdamage")) * 100)) + '%';
        if (localStorage.getItem("pets") == 1 && (a.get("Class") == "MCH" || a.get("Class") == "SMN"))
            var petDamage = Math.min(100, parseInt((a.get("mergedDamage") - a.get("original").Damage) / a.get("maxdamage") * 100)) + '%';
        else var petDamage = 0 + '%';
        if (localStorage.getItem('animation') == 1) {
            $('#' + container).find('#dps' + name + '.bar').animate({ width: width });
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#dpsPet' + name).animate({ width: petDamage });
            else $('#' + container).find('#dpsPet' + name).animate({ width: 0 + '%' })
        } else {
            $('#' + container).find('#dps' + name + '.bar').css('width', width);
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#dpsPet' + name).css('width', petDamage);
            else $('#' + container).find('#dpsPet' + name).css('width', 0 + '%')
        }
    }
}

function saveLog() {
    if (lastCombat == null)
        return;
    else {
        if (lastCombat.title != 'Encounter') {
            encounterArray.unshift({
                lastCombat: lastCombat,
                lastCombatHPS: lastCombatHPS
            });
            if (encounterArray.length >= 2) {
                if (encounterArray[1].combatKey == lastCombat.combatKey) {
                    encounterArray.shift()
                } else {
                    historyAddRow()
                }
            } else {
                historyAddRow()
            }
            saveLogFlag = !0
        }
    }
}

function historyAddRow() {
    var wrap = document.getElementById('historyListBody');
    var newHistory = document.createElement("div");
    var oldHistory = document.getElementById('oldHistoryBody');
    $('#historyBody').find('#viewIcon.viewCell').html('');
    var table = document.createElement("TABLE");
    table.id = lastCombat.combatKey;
    table.className = "tableBody";
    var tr = table.insertRow();
    var td = tr.insertCell();
    td.innerHTML = '<img class="pngIcon" src="./images/menu/eye.svg" style="width:1.9rem;"/>';
    td.className = "viewCell";
    td.id = "viewIcon";
    var td = tr.insertCell();
    td.innerHTML = lastCombat.title + '<span style="color:rgba(255,255,255,0.7);"> / ' + lastCombat.zone + '</span>';
    td.className = "nameCell";
    var td = tr.insertCell();
    td.innerHTML = lastCombat.duration;
    td.className = "narrowCell1";
    var td = tr.insertCell();
    td.innerText = addComma(parseFloat(lastCombat.Encounter.encdps).toFixed(0));
    td.className = "narrowCell2";
    td.id = "RDPS";
    var td = tr.insertCell();
    td.innerText = addComma(parseFloat(lastCombat.Encounter.enchps).toFixed(0));
    td.className = "narrowCell2";
    td.id = "RHPS";
    var td = tr.insertCell();
    td.className = "narrowCell1";
    td.id = "CNT";
    var line = document.createElement("li");
    line.className = "divider";
    var lineColor = '#' + localStorage.getItem('lineColor');
    var c = oHexColor(lineColor);
    line.style.backgroundColor = "rgba(" + c.r + ',' + c.g + ',' + c.b + ',' + now_lo + ")";
    if (encounterArray.length == 1)
        td.innerText = 1;
    else {
        if (encounterArray[0].lastCombat.zone == encounterArray[1].lastCombat.zone) {
            encounterCount++;
            td.innerText = addComma(parseInt(encounterCount))
        } else {
            encounterCount = 1;
            td.innerText = encounterCount
        }
    }
    var barBg = document.createElement("div");
    barBg.className = "barBg";
    newHistory.appendChild(table);
    newHistory.appendChild(barBg);
    if (localStorage.getItem('line') == 1)
        newHistory.appendChild(line);
    if (oldHistory == null)
        wrap.appendChild(newHistory);
    else wrap.insertBefore(newHistory, oldHistory);
    newHistory.id = 'oldHistoryBody';
    $('#oldHistoryBody').on({
        mouseover: function () {
            $(this).find('.barBg').css('background', accentColor)
        },
        mouseleave: function () {
            var bgColor = localStorage.getItem("background");
            var c = oHexColor(bgColor);
            $(this).find('.barBg').css('background', 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_bo + ')')
        },
        click: function () {
            var listName = $(this).find('table').attr("id");
            for (var i in encounterArray) {
                if (listName == encounterArray[i].lastCombat.combatKey) {
                    lastCombat = encounterArray[i].lastCombat;
                    lastCombatHPS = encounterArray[i].lastCombatHPS;
                    previewData = encounterArray[i].combatKey;
                    $('#historyBody').find('#viewIcon.viewCell').html('');
                    $(this).find('#viewIcon').html('<img class="pngIcon" src="./images/menu/eye.svg" style="width:1.9rem;"/>');
                    $('#dpsTableBody').html('');
                    $('#hpsTableBody').html('');
                    closeHistory();
                    update()
                }
            }
        }
    })
}
