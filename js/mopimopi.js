var inputNumber = null;         //소수값 제어 
var custom = new Array();
var healerCustom = new Array();

//초기화 데이터 
var initACTElement = [0, 1, 1, 0, 0, 0, 1, 0, 0, 0,
    0, 1, 1, 0, 1, 0, 1, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

var initHealerElement = [1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0];

var colorId = ['tank1', 'tank2', 'tank3', 'heal1', 'heal2', 'heal3', 'shield', 'overheal', 'dps1', 'dps2', 'dps3', 'dps4', 'dps5', 'dps6', 'dps7', 'life1', 'life2', 'ava', 'chocobo', 'LB', 'me', 'other', 'YOU', 'header', 'background', 'headerText', "accentColor", "topbarBackgroundColor", "bigTextColor", "smallTextColor", "borderColor"]
var colorVal = ['7B9AA2', 'A91A16', '682531', 'BDBDBD', '32307B', 'B1561C', '0F9D58', 'FF3F80', 'B38915', '3752D8', 'EE2E48', '674598', '32670B', 'ADC551', '148AA9', '353535', '353535', '000000', '757575', 'FFBB00', 'FFFFFF', 'FFFFFF', 'ff5722', '000000', '000000', 'BDBDBD', 'ff5722', '212121', 'ffffff', 'bdbdbd', '000000'];

//그래프 색상 초기화 
for (var i in colorId) {
    if (!localStorage.getItem(colorId[i]))
        localStorage.setItem(colorId[i], colorVal[i]);
}

for (var i = 0; i < colorId.length; i++) {
    if (!localStorage.getItem(colorId[i])) {
        $('body').find('[name="' + colorId[i] + '"]').val(colorVal[i]);
        $('body').find('#' + colorId[i]).css('background', '#' + colorVal[i]);
    } else {
        $('body').find('[name="' + colorId[i] + '"]').val(localStorage.getItem(colorId[i]));
        $('body').find('#' + colorId[i]).css('background', '#' + localStorage.getItem(colorId[i]));
    }
}
//라디오버튼 : 언어 초기화
if (!localStorage.getItem('language') || isNaN(localStorage.getItem('language')) == false) {
    localStorage.setItem('language', 'kr');
    mpLang = mpKR;
}
//라디오버튼 : 캐릭터 이름 유형
if (!localStorage.getItem('nameType')) {
    localStorage.setItem('nameType', 'AType');
}
//라디오버튼 : 글자크기
if (!localStorage.getItem('fontSize')) {
    localStorage.setItem('fontSize', 'small');
}
//라디오버튼 : 배경 불투명도 초기화 
if (!localStorage.getItem('bgOpacity')) {
    localStorage.setItem('bgOpacity', 'bgOpacity75');
}
//라디오버튼 : 그래프 불투명도 초기화 
if (!localStorage.getItem('graphOpacity')) {
    localStorage.setItem('graphOpacity', 'graphOpacity100');
}
//라디오버튼 : 상단바 불투명도 초기화 
if (!localStorage.getItem('topbarOpacity')) {
    localStorage.setItem('topbarOpacity', 'topbarOpacity100');
}
//라디오버튼 : 헤더 불투명도 초기화 
if (!localStorage.getItem('headerOpacity')) {
    localStorage.setItem('headerOpacity', 'headerOpacity100');
}
//셀너비 
if (!localStorage.getItem('narrowCell1'))
    localStorage.setItem('narrowCell1', 40);

if (!localStorage.getItem('narrowCell2'))
    localStorage.setItem('narrowCell2', 55);

if (!localStorage.getItem('wideCell1'))
    localStorage.setItem('wideCell1', 60);

if (!localStorage.getItem('wideCell2'))
    localStorage.setItem('wideCell2', 100);

if (!localStorage.getItem('topbarHeight'))
    localStorage.setItem('topbarHeight', 56);

//셀너비 초기화	
$("[name=narrowCell1]").val(localStorage.getItem('narrowCell1'));
$("[name=narrowCell2]").val(localStorage.getItem('narrowCell2'));
$("[name=wideCell1]").val(localStorage.getItem('wideCell1'));
$("[name=wideCell2]").val(localStorage.getItem('wideCell2'));
$("[name=topbarHeight]").val(localStorage.getItem('topbarHeight'));

//폰트
if (!localStorage.getItem('timeFont'))
    localStorage.setItem('timeFont', 'Montserrat');

if (!localStorage.getItem('engFont'))
    localStorage.setItem('engFont', 'Roboto');

if (!localStorage.getItem('ourFont'))
    localStorage.setItem('ourFont', 'Noto Sans KR');

//폰트 초기화 
$("[name=timeFont]").val(localStorage.getItem('timeFont'));
$("[name=ourFont]").val(localStorage.getItem('ourFont'));
$("[name=engFont]").val(localStorage.getItem('engFont'));

//체크박스 : 레이드 모드 
if (!localStorage.getItem('raidMode'))
    localStorage.setItem('raidMode', 1);

//체크박스 : 순위
if (!localStorage.getItem('ranking'))
    localStorage.setItem('ranking', 0);

//체크박스 : 내 캐릭터 글자 굵게 
if (!localStorage.getItem('meBold'))
    localStorage.setItem('meBold', 0);

//체크박스 : 타 캐릭터 글자 굵게
if (!localStorage.getItem('otherBold'))
    localStorage.setItem('otherBold', 0);

//체크박스 : 테두리
if (!localStorage.getItem('border'))
    localStorage.setItem('border', 0);

//체크박스 : 모서리
if (!localStorage.getItem('edge'))
    localStorage.setItem('edge', 0);

//체크박스 : 힐러 
if (!localStorage.getItem('HPS'))
    localStorage.setItem('HPS', 1);

//힐러 ACT 초기화
if (localStorage.getItem("HPS") == 1) {
    $('#healerTable').removeClass('hidden');
    $('#healerRaidOldBody').removeClass('hidden');
} else {
    $('#healerTable').addClass('hidden');
    $('#healerRaidOldBody').addClass('hidden');
}
//체크박스 : 내 그래프색 
if (!localStorage.getItem('youColor'))
    localStorage.setItem('youColor', 0);

//체크박스 : 소환수 그래프
if (!localStorage.getItem('petAction'))
    localStorage.setItem('petAction', 1);

//체크박스 : 라인 
if (!localStorage.getItem('line'))
    localStorage.setItem('line', 1);

//체크박스 : 캐릭터 이름 숨기기 
if (!localStorage.getItem('hideName'))
    localStorage.setItem('hideName', 0);

//체크박스 : 펫 합산 초기화
if (!localStorage.getItem('pets'))
    localStorage.setItem('pets', 1);

//체크박스 : 콤마 
if (!localStorage.getItem('comma'))
    localStorage.setItem('comma', 1);

//소수 초기화 
if (!localStorage.getItem('number')) {
    localStorage.setItem('number', 1);
    inputNumber = 2;
} else {
    if (localStorage.getItem('number') == 1)
        inputNumber = 2;
    else
        inputNumber = 0;
}
//체크박스 : 그래프 그라데이션 
if (!localStorage.getItem('gradation'))
    localStorage.setItem('gradation', 0);

//체크박스 : 그래프 좌우 
if (!localStorage.getItem('animation'))
    localStorage.setItem('animation', 1);

//--------------------------------------------------------------------------------------------------------------------------------

//마우스 터치 이벤트 
(function () {
    var isTouch = false;
    var simulated_flag = 'handler_simulated';
    var touch_click_array = {};
    const clickMoveThreshold = 20; //Pixels

    function mouseHandler(event) {
        if (isTouch) {
            if (!event.hasOwnProperty(simulated_flag)) {
                //Unreliable mouse commands - In my opinion
                var fixed = new jQuery.Event(event);
                fixed.preventDefault();
                fixed.stopPropagation();
            }
        } else {
            //Mouse commands are consistent
            //TODO: generate corresponding touches
        }
    }

    function mouseFromTouch(type, touch) {
        var event = document.createEvent("MouseEvent");
        event.initMouseEvent(type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY
            , false, false, false, false, 0, null);
        event[simulated_flag] = true;

        touch.target.dispatchEvent(event);
    };

    function touchHandler(event) {
        var touches = event.changedTouches
            , first = touches[0]
            , type = ""

        if (!event.hasOwnProperty(simulated_flag)) {
            isTouch = true;

            //Simulate mouse commands
            switch (event.type) {
                case "touchstart":
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        touch_click_array[touch.identifier] = { x: touch.screenX, y: touch.screenY };
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
                                delete touch_click_array[id];
                            }
                        }
                    }
                    mouseFromTouch("mousemove", first);
                    break;
                case "touchcancel":
                    //Not sure what should happen here . . .
                    break;
                case "touchend":
                    mouseFromTouch("mouseup", first);
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        if (touch_click_array.hasOwnProperty(touch.identifier)) {
                            mouseFromTouch("click", touch);
                            delete touch_click_array[touch.identifier];
                        }
                    }
                    break;
            }
        }
    }
    document.addEventListener("mousedown", mouseHandler, true);
    document.addEventListener("mousemove", mouseHandler, true);
    document.addEventListener("mouseup", mouseHandler, true);
    document.addEventListener("click", mouseHandler, true);

    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
})();
//뒤로가기 금지 처리 
history.pushState(null, null, location.href);
window.onpopstate = function (event) {
    history.go(1);
}
$(document).ready(function () {
    jscolor.installByClassName("jscolor");
    Materialize.updateTextFields();
    accentColor = '#' + localStorage.getItem('accentColor');
    //강조색 및 언어+그래프 초기화
    initFlagValue();
    //폰트 초기화    
    changeFont();
    update(1);
    $("body").fadeIn(500);
});
//스크롤바
$(document).scroll(function () {
    scrollValue = $(document).scrollTop();
    var a = oHexColor(localStorage.getItem('header'));
    if (scrollValue != 0) {
        $('[name=main]').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + 1 + ')');
        $('#mainTopBar').css('background', topbarBackgroundColor);
    } else {
        $('[name=main]').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + nowVal_header + ')');
        var b = oHexColor(topbarBackgroundColor);
        $('#mainTopBar').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + nowVal_top + ')');
    }
});
//폰트 이름 클릭시 전체 선택 
$("input").on("click", function () {
    $(this).select();
});
//엔터치면 포커스 삭제
$("input").keydown(function () {
    if (event.keyCode == 13 || event.keyCode == 27) {
        if ($(this).val() != "") {
            $(this).blur();
            changeFont();
        } else
            $(this).focus();
    }
});
//셀 너비 숫자 버튼 조절  
$(".plus").click(function (e) {
    e.preventDefault();
    field = "input[name=" + $(this).attr("field") + "]";
    var currentVal = parseFloat($(field).val());
    if (!isNaN(currentVal) && currentVal < 999) {		// 길이 제한 

        var id = $(field).attr('name');
        var value = $(field).val();

        if (id != "topbarHeight")
            $(field).val(currentVal + 1);
        else
            $(field).val(currentVal + 2);

        value = parseFloat($(field).val());

        localStorage.setItem(id, value);
        if (id != "topbarHeight")
            adjustCellWidth(id);
        else
            adjustTopbarHeight();
    }
});
$(".minus").click(function (e) {
    e.preventDefault();
    field = "input[name=" + $(this).attr("field") + "]";
    var currentVal = parseFloat($(field).val());
    if (!isNaN(currentVal) && currentVal > 1) {
        var id = $(field).attr('name');
        var value = $(field).val();

        if (id != "topbarHeight")
            $(field).val(currentVal - 1);
        else
            $(field).val(currentVal - 2);

        value = parseFloat($(field).val());

        localStorage.setItem(id, value);
        if (id != "topbarHeight")
            adjustCellWidth(id);
        else
            adjustTopbarHeight();
    }
});
function closeHistory() {
    $('#history input').attr('checked', false);
    $('#history i').css('color', 'rgba(255,255,255,0.5)');
    $('ul[name=main]').removeClass('hidden');
    $('ul[name=history]').addClass('hidden');
    localStorage.setItem('history', 0);
    $('#main_page_history').addClass('hidden');
    $('#main_page_history_header').addClass('hidden');

    if (tableFlag == 2 || tableFlag == 0) {
        $('#main_page_content').removeClass('hidden');
        $('#main_page_content_header').removeClass('hidden');
    } else {
        $('[name=raid]').removeClass('hidden');
    }
    adjustTopbarHeight();
}
function adjustTopbarHeight() {
    height = parseFloat(localStorage.getItem('topbarHeight') / 10);
    $('nav, nav i, .navbar_text').css('height', height + 'rem');
    $('nav, nav i, .navbar_text').css('line-height', height + 'rem');
    //상단바랑 드롭다운 제목 높이 맞추려면
    $('nav ul.dropdown-content div, nav ul.dropdown-content div i').css('height', 5 + 'rem');
    $('nav ul.dropdown-content div, nav ul.dropdown-content div i').css('line-height', 5 + 'rem');
    $('#previewTopbar').css('height', height + 'rem');

    if ($('[name=main]').hasClass('hidden') == true || tableFlag == 1)
        $('.navbar-fixed').css('height', height + 'rem');
    else {
        if (localStorage.getItem('border') == 1)
            $('.navbar-fixed').css('height', (height + 1.6) + 'rem');
        else
            $('.navbar-fixed').css('height', (height + 1.5) + 'rem');
    }
    $('.dropdown-content li>a>i').css('line-height', 'inherit');
    $('.dropdown-content li>a>i').css('height', 'inherit');
}
function adjustCellWidth(id) {
    var width1 = parseFloat(localStorage.getItem('narrowCell1') / 10);
    var width2 = parseFloat(localStorage.getItem('narrowCell2') / 10);
    var width3 = parseFloat(localStorage.getItem('wideCell1') / 10);
    var width4 = parseFloat(localStorage.getItem('wideCell2') / 10);

    $('#previewH').find('td').css('background', 'rgba(0,0,0,1)');
    $('#previewH').find('td').css('color', 'rgba(255,255,255,0.7)');
    $('#previewH').find('.' + id).css('background', '#fff');	//포인트 컬러 
    $('#previewH').find('.' + id).css('color', '#000');

    $('body').find('.narrowCell1').css('width', width1 + 'rem');
    $('body').find('.narrowCell2').css('width', width2 + 'rem');
    $('body').find('.wideCell1').css('width', width3 + 'rem');
    $('body').find('.wideCell2').css('width', width4 + 'rem');
}
function jscolorUpdate(jscolor) {
    var id = jscolor.styleElement.id;
    var newColor = jscolor.toHEXString().split('#')[1];
    localStorage.setItem(id, newColor);
}
function toggleFullScreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
function fullscreenCheck() {
    //물리키로 취소당해서 풀스크린 풀린 경우
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        $('#fullscreen input').attr('checked', false);
        $('#fullscreen i').css('color', 'rgba(255,255,255,0.5)');
        localStorage.setItem('fullscreen', 0);
    }
}
function initViewPage(id) {
    $('#mainTopBar').css('background', '#303030');
    $('nav').addClass('z-depth-1');
    $('html').css('backgroundColor', '#303030');
    preScrollVal = scrollValue;
    $(document).scrollTop(0);
    $('body').find('[name="' + id + '"]').removeClass('hidden');
}
function viewPage(obj) {
    switch (obj.id) {
        case 'settings':
            viewSettingsFlag = true;
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
        case 'generalACT':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'healerACT':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'graphColor':
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('html').css('backgroundColor', '#303030');
            pre2ScrollVal = scrollValue;
            $(document).scrollTop(0);
            $('body').find('[name="graphColor"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            $('body').find('[name="graph"]').addClass('hidden');
            break;
        case 'font':
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('html').css('backgroundColor', '#303030');
            pre2ScrollVal = scrollValue;
            $(document).scrollTop(0);
            $('body').find('[name="font"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').addClass('hidden');
            break;
        case 'cellWidth':
            initViewPage(obj.id);
            $('#previewH').find('td').css('background', 'rgba(0,0,0,1)');
            $('#previewH').find('td').css('color', 'rgba(255,255,255,0.7)');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'design':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'developer':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'notice':
            initViewPage(obj.id);
            for (var i in notice)
                $('[name="' + i + '"]').html(notice[i]);
            preScrollVal = scrollValue;
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'graph':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'fontSettings':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'backGraph':
            $('body').find('[name="graphColor"]').addClass('hidden');
            $('body').find('[name="graph"]').removeClass('hidden');
            $(document).scrollTop(parseInt(pre2ScrollVal));
            break;
        case 'backfont':
            changeFont();
            $('body').find('[name="font"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').removeClass('hidden');
            $(document).scrollTop(parseInt(pre2ScrollVal));
            break;
        case 'backSettings':
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('html').css('backgroundColor', 'transparent');
            initFlagValue();
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
        case 'back':
            $('body').find('[name="main"]').removeClass('hidden');
            $('body').find('[name="raid"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            closeHistory();
            arrayInitFlag = false;
            viewSettingsFlag = false;
            update(1);
            $('nav').removeClass('z-depth-1');
            $('nav').addClass('z-depth-0');
            $('nav').css('background', 'transparent');
            $('html').css('background-size', '2rem 2rem');
            $(document).scrollTop(0);
            break;
    }
}
function buttonCotrol(obj) {
    var check = null;
    switch (obj.id) {
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
            $('.tooltipped').tooltip('remove');
            $('#capture').find('i').toggleClass('animated flash');
            setTimeout(function () {
                webs.overlayAPI("Capture");
                $('#capture').find('i').removeClass('animated flash');
            }, 1000);
            setTimeout(function () {
                var $toastContent = $('<div class="row"><div class="col s12 white-text center">Only PC<br>C:\\Advanced Combat Tracker or ACTv3\\ScreenShot</div></div>');
                Materialize.toast($toastContent, 6000);
            }, 1000);
            break;
        case 'endEncounter':
            webs.overlayAPI("RequestEnd");
            break;
        //초기화 
        case 'init':
            if (confirm(mpLang.m163) == true) {
                localStorage.clear();
                location.reload();
            }
            break;
        case 'reload':
            location.reload();
            $(document).scrollTop(0);
            break;
        case 'history':
            check = toggleIcon(obj);
            if (check == true) {
                if (tableFlag == 2 || tableFlag == 0) {
                    $('#main_page_content').addClass('hidden');
                    $('#main_page_content_header').addClass('hidden');
                } else
                    $('[name=raid]').addClass('hidden');

                $('ul[name=main]').addClass('hidden');
                $('ul[name=history]').removeClass('hidden');
                $('#main_page_history').removeClass('hidden');
                $('#main_page_history_header').removeClass('hidden');
            }

            if (localStorage.getItem('border') == 1)
                $('.navbar-fixed').css('height', (height + 1.6) + 'rem');
            else
                $('.navbar-fixed').css('height', (height + 1.5) + 'rem');

            break;
        case 'hideName':
            toggleIcon(obj);
            $(document).scrollTop(0);
            arrayInitFlag = false;
            update(1);
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
            check = toggleIcon(obj);
            $(document).scrollTop(0);
            arrayInitFlag = false;
            update(1);
            if (check == true) {
                $('#healerTable').fadeIn(150);
                $('#healerRaidOldBody').fadeIn(150);
            } else {
                $('#healerTable').fadeOut(150);
                $('#healerRaidOldBody').fadeOut(150);
            }
            break;
        case 'fullscreen':
            toggleIcon(obj);
            toggleFullScreen();
            break;
        case 'pets':
            changeCheckIcon(obj);
            break;
        case 'petAction':
            changeCheckIcon(obj);
            break;
        case 'number':
            check = changeCheckIcon(obj);
            if (check == true) {
                inputNumber = 2;
            } else {
                inputNumber = 0;
            }
            break;
        case 'comma':
            changeCheckIcon(obj);
            break;
        case 'line':
            changeCheckIcon(obj);
            break;
        case 'gradation':
            check = changeCheckIcon(obj);
            break;
        case 'animation':
            changeCheckIcon(obj);
            break;
    }
}
function toggleIcon(obj) {
    var check = $('#' + obj.id + ' input').attr('checked');
    if (check == 'checked') {
        $('#' + obj.id + ' input').attr('checked', false);
        $('#' + obj.id + ' i').css('color', 'rgba(255,255,255,0.5)');
        localStorage.setItem(obj.id, 0);
        return false;
    } else {
        $('#' + obj.id + ' input').attr('checked', true);
        $('#' + obj.id + ' i').css('color', accentColor);
        localStorage.setItem(obj.id, 1);
        return true;
    }
}
function changeCheckIcon(obj) {
    var check = $('input#' + obj.id).attr('checked');
    if (check == 'checked') {
        $('input#' + obj.id).attr('checked', false);
        localStorage.setItem(obj.id, 0);
        return false;
    } else {
        $('input#' + obj.id).attr('checked', true);
        localStorage.setItem(obj.id, 1);
        return true;
    }
}
function starIcon(name) {
    var check = $('[name="' + name + '"]' + ' input').attr('checked');
    if (check == 'checked') {
        $('[name="' + name + '"]' + ' input').attr('checked', false);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star_border');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', 'rgba(255,255,255,0.5)');
        localStorage.setItem(name, 0);
    } else {
        $('[name="' + name + '"]' + ' input').attr('checked', true);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', accentColor);
        localStorage.setItem(name, 1);
    }
}
function radioButtonCotrol(id) {
    var name = $('#' + id).find('input').attr('name');
    var value = $('#' + id).find('input').attr('value');
    switch (name) {
        case 'radio_nameType':
            if (id == 'AType') {
                localStorage.setItem('nameType', 'AType');
                var temp = mpLang.m208.split('<');
                radioOption(7, 'AType', 'BType', 'CType', 'DType');

            } else if (id == 'BType') {
                localStorage.setItem('nameType', 'BType');
                var temp = mpLang.m209.split('<');
                radioOption(7, 'BType', 'AType', 'CType', 'DType');

            } else if (id == 'CType') {
                localStorage.setItem('nameType', 'CType');
                var temp = mpLang.m210.split('<');
                radioOption(7, 'CType', 'BType', 'AType', 'DType');
            } else {
                localStorage.setItem('nameType', 'DType');
                var temp = mpLang.m211.split('<');
                radioOption(7, 'DType', 'BType', 'CType', 'AType');
            }
            if (mpLang == mpKR)
                $('#result_nameType').html(temp[0] + '<br>/ 글로벌 서버만 설정 적용');
            else
                $('#result_nameType').html(temp[0]);
            break;
        case 'radio_font':
            if (id == 'smaller') {
                localStorage.setItem('fontSize', 'smaller');
                $('html').css('font-size', '58%');//11px

                radioOption(5, 'smaller', 'small', 'normal', 'big');
                $('#result_font').text('8pt');

            } else if (id == 'small') {
                localStorage.setItem('fontSize', 'small');
                $('html').css('font-size', '62.5%');//12px

                radioOption(5, 'small', 'smaller', 'normal', 'big');
                $('#result_font').text('9pt');

            } else if (id == 'normal') {
                localStorage.setItem('fontSize', 'normal');
                $('html').css('font-size', '75%');//14px

                radioOption(5, 'normal', 'big', 'small', 'smaller');
                $('#result_font').text('11pt');

            } else {
                localStorage.setItem('fontSize', 'big');
                $('html').css('font-size', '87.5%');//16px

                radioOption(5, 'big', 'normal', 'small', 'smaller');
                $('#result_font').text('12pt');

            }
            break;
        case 'radio_lang':
            if (id == 'kr') {
                localStorage.setItem('language', 'kr');
                mpLang = mpKR;
                for (var i in mpLang)
                    $('[name="' + i + '"]').html(mpLang[i]);
                radioOption(2, 'kr', 'jp', 'en')
                $('#result_Lang').text("한국어");
            } else if (id == 'jp') {
                localStorage.setItem('language', 'jp');
                mpLang = mpJP;
                for (var i in mpLang)
                    $('[name="' + i + '"]').html(mpLang[i]);
                radioOption(2, 'jp', 'kr', 'en')
                $('#result_Lang').text("日本語");
            } else {
                localStorage.setItem('language', 'en');
                mpLang = mpEN;
                for (var i in mpLang)
                    $('[name="' + i + '"]').html(mpLang[i]);
                radioOption(2, 'en', 'jp', 'kr')
                $('#result_Lang').text("English");
            }
            radioButtonCotrol(localStorage.getItem('fontSize'));
            radioButtonCotrol(localStorage.getItem('nameType'));
            radioButtonCotrol(localStorage.getItem('topbarOpacity'));
            radioButtonCotrol(localStorage.getItem('bgOpacity'));
            radioButtonCotrol(localStorage.getItem('graphOpacity'));
            radioButtonCotrol(localStorage.getItem('headerOpacity'));            
            initCheck('ranking');
            break;
        case 'radio_top': case 'radio_go': case 'radio_bo': case 'radio_header': 
            var dropdown = $('#' + id).parent().attr('id');
            var tempId = id.split('Opacity');
            var tempName = name.split('_');

            for (i = 0; i <= 100; i = i + 25) {
                if (id == tempId[0]+'Opacity' + i) {
                    $('#'+dropdown+' li#' + id + ' a i').text('radio_button_checked');
                    $('#'+dropdown+' li#' + id + ' a i').css('color', accentColor);
                    $('#result_'+tempName[1]).text(value * 100 + "%");
                    localStorage.setItem(tempId[0]+'Opacity', id);
                    if(name == 'radio_top'){
                        nowVal_top = parseFloat(value);
                    }else if(name == 'radio_go'){
                        nowVal_go = parseFloat(value);
                    }else if(name == 'radio_bo'){
                        nowVal_bo = parseFloat(value);
                    }else if(name == 'radio_header'){
                        nowVal_header = parseFloat(value);
                    }else {                        
                        nowVal_raid = parseFloat(value);
                    }
                } else {
                    $('#'+dropdown+' li#' + tempId[0]+'Opacity' + i + ' a i').text('radio_button_unchecked');
                    $('#'+dropdown+' li#' + tempId[0]+'Opacity' + i + ' a i').css('color', 'rgba(255,255,255,0.5)');
                }
            }
            break;
        }
}
function radioOption(num, id_1, id_2, id_3, id_4) {
    $('#dropdown' + num + ' li#' + id_1 + ' a i').text('radio_button_checked');
    $('#dropdown' + num + ' li#' + id_1 + ' a i').css('color', accentColor);
    $('#dropdown' + num + ' li#' + id_2 + ' a i').text('radio_button_unchecked');
    $('#dropdown' + num + ' li#' + id_2 + ' a i').css('color', 'rgba(255,255,255,0.5)');
    $('#dropdown' + num + ' li#' + id_3 + ' a i').text('radio_button_unchecked');
    $('#dropdown' + num + ' li#' + id_3 + ' a i').css('color', 'rgba(255,255,255,0.5)');
    $('#dropdown' + num + ' li#' + id_4 + ' a i').text('radio_button_unchecked');
    $('#dropdown' + num + ' li#' + id_4 + ' a i').css('color', 'rgba(255,255,255,0.5)');
}
function changeFont() {
    var change_timeFont = $("[name=timeFont]").val();
    var change_ourFont = $("[name=ourFont]").val();
    var change_engFont = $("[name=engFont]").val();

    if (change_timeFont == "")
        localStorage.setItem('timeFont', 'Montserrat');
    else
        localStorage.setItem('timeFont', change_timeFont);

    if (change_ourFont == "")
        localStorage.setItem('ourFont', 'Noto Sans KR');
    else
        localStorage.setItem('ourFont', change_ourFont);

    if (change_engFont == "")
        localStorage.setItem('engFont', 'Roboto');
    else
        localStorage.setItem('engFont', change_engFont);

    $('body').find("#previewTopbar").find(".time").css('font-family', "'" + change_timeFont + "'" + ", 'Montserrat'");
    $('body').find("nav [name=main]").find(".time").css('font-family', "'" + change_timeFont + "'" + ", 'Montserrat'");
    $('body').find("nav [name=main],#preview").find(".info").find(".smallText").css('font-family', "'Roboto Condensed', '" + change_ourFont + "'" + ", 'Noto Sans KR'");
    $('html').css('font-family', "'" + change_engFont + "'," + "'Noto Sans JP','" + change_ourFont + "'" + ", Roboto, 'Noto Sans JP', 'Noto Sans KR'");

    $("[name=timeFont]").val(localStorage.getItem('timeFont'));
    $("[name=ourFont]").val(localStorage.getItem('ourFont'));
    $("[name=engFont]").val(localStorage.getItem('engFont'));
}
function topbarSettings() {
    accentColor = '#' + localStorage.getItem('accentColor');
    borderColor = '#' + localStorage.getItem('borderColor');
    topbarBackgroundColor = '#' + localStorage.getItem('topbarBackgroundColor');
    headerColor = '#' + localStorage.getItem('header');
    var a = oHexColor(headerColor);
    //헤더 처리     
    $('.previewImage').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + nowVal_header + ')');
    $('.previewImage').find(".tableHeader td").css('color', '#' + localStorage.getItem('headerText'));

    //악센트 컬러 처리
    $('[type="checkbox"]+label').css('background-color', accentColor);

    //상단바 색상 + 불투명도
    var b = oHexColor(topbarBackgroundColor);
    $('#mainTopBar').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + nowVal_top + ')');
    $('#previewTopbar').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + nowVal_top + ')');

    $('.bigText').css('color', '#' + localStorage.getItem('bigTextColor'));
    $('.smallText').css('color', '#' + localStorage.getItem('smallTextColor'));
    $('.time').css('color', accentColor);
    $('#clear').css('color', accentColor);

    $('body').find('.mainIcon').css('color', accentColor);

    //모서리 처리
    if (localStorage.getItem('edge') == 1) {
        $('#mainTopBar').css('border-radius', '.6rem .6rem 0 0');
        $('#previewTopbar').css('border-radius', '.6rem .6rem 0 0');
    } else {
        $('#mainTopBar').css('border-radius', '0');
        $('#previewTopbar').css('border-radius', '0');
    }
    //테두리 처리
    if (localStorage.getItem('border') == 1) {
    var c = oHexColor(borderColor);
        $('#mainTopBar').css('border', 'solid .1rem' + ' rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + nowVal_top + ')');
        $('#previewTopbar').css('border', 'solid .1rem' + ' rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + nowVal_top + ')');
    } else {
        $('#mainTopBar').css('border', '0');
        $('#previewTopbar').css('border', '0');
    }
}
function opacity() {
    //헤더/배경 컬러 지정 
    var a = oHexColor(localStorage.getItem('header'));
    var b = oHexColor(localStorage.getItem('background'));
    //데이터 테이블 
    $('body').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + nowVal_header + ')');
    $('body').find('.barBg').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + nowVal_bo + ')');
    $('body').find('.bar').css('opacity', nowVal_go);
    //24인 테이블
    $('.raid .collapsible-header').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + nowVal_bo + ')');
    $('.raid .collapsible-body').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + (nowVal_bo+0.25) + ')');
    var c = oHexColor(accentColor);
    $('body').find('[name=RaidYOU]').css('background', 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + nowVal_go + ')');
    //서체 컬러 설정
    $('#main_page_content').find('.tableBody').css('color', "#" + localStorage.getItem("other"));
    $("#tableYOU, #tablehYOU").css('color', "#" + localStorage.getItem("me"));
    $(".tableHeader td").css('color', "#" + localStorage.getItem("headerText"));
    //서체 굵게 설정
    if (localStorage.getItem('otherBold') == 1) {
        $('#main_page_content').find('.tableBody').css('font-weight', 'bold');
    } else {
        $('#main_page_content').find('.tableBody').css('font-weight', 'normal');
    }
    if (localStorage.getItem('meBold') == 1) {
        $("#tableYOU, #tablehYOU").css('font-weight', 'bold');
    } else {
        $("#tableYOU, #tablehYOU").css('font-weight', 'normal');
    }
}
function initFlagValue() {
    //커스터마이징 항목 초기화
    for (var i = 1; i < initACTElement.length; i++) {
        var name = 'custom' + i;
        if (!localStorage.getItem(name)) {
            if (initACTElement[i] == 1)
                localStorage.setItem(name, 1);
            else
                localStorage.setItem(name, 0);
        } custom[i] = localStorage.getItem(name);

        if (custom[i] == 1) {
            $('[name="' + name + '"]' + ' input').attr('checked', true);
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star');
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', accentColor);
        } else {
            $('[name="' + name + '"]' + ' input').attr('checked', false);
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star_border');
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', 'rgba(255,255,255,0.5)');
        }
    }
    //커스터마이징 항목 초기화 (힐러)
    for (var i = 0; i < initHealerElement.length; i++) {
        var name = 'custom' + (i + 40);
        if (!localStorage.getItem(name)) {
            if (initHealerElement[i] == 1)
                localStorage.setItem(name, 1);
            else
                localStorage.setItem(name, 0);
        } healerCustom[i] = localStorage.getItem(name);

        if (healerCustom[i] == 1) {
            $('[name="' + name + '"]' + ' input').attr('checked', true);
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star');
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', accentColor);
        } else {
            $('[name="' + name + '"]' + ' input').attr('checked', false);
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star_border');
            $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', 'rgba(255,255,255,0.5)');
        }
    }

    radioButtonCotrol(localStorage.getItem('fontSize'));
    radioButtonCotrol(localStorage.getItem('language'));

    initCheck('raidMode');
    initCheck('ranking');
    initCheck('youColor');
    initCheck('border');
    initCheck('edge');
    initCheck('meBold');
    initCheck('otherBold');
    initCheck('HPS');
    initCheck('petAction');
    initCheck('line');
    initCheck('hideName');
    initCheck('pets');
    initCheck('comma');
    initCheck('number');
    initCheck('gradation');
    initCheck('animation');
}
function initCheck(name) {
    var value = localStorage.getItem(name);
    if (value == 1) {
        if (name == 'HPS' || name == 'hideName') {
            $('#' + name + ' input').attr('checked', true);
            $('#' + name + ' i').css('color', accentColor);
        }
        else {
            $('input#' + name).attr('checked', true);
            if (name == "ranking") {
                $('body').find('[name=rankingName]').text('R. Name');
                $('body').find('[name=rankingName2]').text('1. YOU');
                $('body').find('[name=m215]').text(mpLang.m37);
            } else if (name == "youColor")
                $('[name=youColor]').fadeIn(150);
        }
    } else {
        if (name == 'HPS' || name == 'hideName') {
            $('#' + name + ' input').attr('checked', false);
            $('#' + name + ' i').css('color', 'rgba(255,255,255,0.5)');
        }
        else {
            $('input#' + name).attr('checked', false);
            if (name == "ranking") {
                $('body').find('[name=rankingName]').text('Name');
                $('body').find('[name=rankingName2]').text('YOU');
                $('body').find('[name=m215]').text(mpLang.m214);
            } else if (name == "youColor")
                $('[name=youColor]').fadeOut(150);
        }
    }
}
function initCSS() {
    topbarSettings();
    adjustCellWidth();
    adjustTopbarHeight();
    opacity();
    //그라데이션 값에 따른 보조그래프 정렬 변경 
    if (localStorage.getItem('gradation') == 1) {
        $('body').find('.barHeal, .barDeal').css('float', 'left');
    } else {
        $('body').find('.barHeal, .barDeal').css('float', 'right');
    }
    //펫뎀 오파셔티
    $('#main_page_content').find('.barHeal.pet, .barDeal.pet').css('opacity', 0.5);
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------

function onOverlayDataUpdate(e) {
    if (localStorage.getItem('history') == 1)
        closeHistory();
    lastCombat = new Combatant(e, 'encdps');
    lastCombatHPS = new Combatant(e, 'enchps');
    setTimeout(function () {
        saveLog();
        update(2);
    }, 1);
}
function update(num) {
    if (lastCombat === null) {
        createTableHeader();
        initCSS();
        return;
    } else {
        if (arrayInitFlag == true) {
            graphWidth = new Array();
            rankVal = new Array();
        }
        onTopHeaderDataUpdate();
        onCombatDataUpdate(num);
        initCSS();

        if (arrayInitFlag == true) {
            if (lastCombat.title == 'Encounter')
                arrayInitFlag = false;
            else
                arrayInitFlag = true;
        }
    }
}
function onTopHeaderDataUpdate() {
    $("nav [name=main]").find(".time").text(lastCombat.Encounter.duration);
    $("nav [name=main]").find(".info .bigText").text(lastCombat.Encounter.title);
    $("nav [name=main]").find(".info .smallText").text("RD " + addComma(parseFloat(lastCombat.Encounter.encdps).toFixed(0)) + "　RH " + addComma(parseFloat(lastCombat.Encounter.enchps).toFixed(0)));
}
function onCombatDataUpdate(num) {
    //소환수 합산 여부 체킹 및 재정렬 
    if (localStorage.getItem("pets") == 0) {
        lastCombat.summonerMerge = false;
        lastCombat.DetachPets();
        lastCombat.resort("damage", 1);
        lastCombatHPS.summonerMerge = false;
        lastCombatHPS.DetachPets();
        lastCombatHPS.resort("healed", 1);
    } else {
        lastCombat.summonerMerge = true;
        lastCombat.AttachPets();
        lastCombat.resort("mergedDamage", 1);
        lastCombatHPS.summonerMerge = true;
        lastCombatHPS.AttachPets();
        lastCombatHPS.resort("mergedHealed", 1);
    }

    //길이 
    var dps_person = 0; var hps_person = 0; var dps_pet = 0; var hps_pet = 0; var dps_YOU = 0; var hps_YOU = 0; var dps_YOU_pet = 0; var hps_YOU_pet = 0;
    for (var d in lastCombat.persons) {
        var a = lastCombat.persons[d];
        dps_pet++;
        if (lastCombat.summonerMerge == true && a.get("Job") == 'AVA') { }
        else {
            if (a.get("petOwner") == "" || a.get("petOwner") == undefined)
                dps_person++;
            if (a.get("name") == "YOU") dps_YOU = d;
            if (a.get("petOwner") == "YOU") dps_YOU_pet = d;
        }
    }
    //힐러 부분 
    for (var d in lastCombatHPS.persons) {
        var a = lastCombatHPS.persons[d];
        if (lastCombatHPS.summonerMerge == true && a.get("Job") == 'AVA') { }
        else {
            if (a.get("role") == 'Healer') {
                if (a.get("petOwner") == "" || a.get("petOwner") == undefined) {
                    hps_person++;
                    if (a.get("name") == "YOU") hps_YOU = d;
                } else {
                    hps_pet++;
                    if (a.get("petOwner") == "YOU") hps_YOU_pet = d;
                }
            }
        }
    }

    // 테이블 로우 생성 갯수
    if (localStorage.getItem("pets") == 0) {
        var dpsTable = Math.ceil(dps_pet / 5);
        var hpsTable = Math.ceil((hps_pet + hps_person) / 6);
    } else {
        var dpsTable = Math.ceil(dps_person / 5);
        var hpsTable = Math.ceil(hps_person / 6);
    }

    //24인 간략 테이블
    if ( dps_person > 9 && localStorage.getItem('raidMode') == 1) {
        tableFlag = 1;
        //미리 만들어진 헤더 감추기         
        if (viewSettingsFlag == false) {
            $('#main_page_content_header').addClass('hidden');
            $('#main_page_content').addClass('hidden');
            $('[name=raid]').removeClass('hidden');
        } else {
            $('[name=main]').addClass('hidden');
            $('[name=raid]').addClass('hidden');
        }

        //일단 DPS부터 
        var tableBody = document.getElementById("raidTableBody");
        var oldBody = document.getElementById("raidOldBody");
        var newBody = document.createElement("ul");
        newBody.className = "collapsible raid";
        createRaidTableBody(lastCombat, newBody, 5, dpsTable, dps_YOU, dps_YOU_pet, 'DPS');
        tableBody.replaceChild(newBody, oldBody);
        newBody.id = "raidOldBody";

        //HPS 
        var oldBody = document.getElementById("healerRaidOldBody");
        var newBody = document.createElement("ul");
        newBody.className = "collapsible raid";
        createRaidTableBody(lastCombatHPS, newBody, 6, hpsTable, hps_YOU, hps_YOU_pet, 'HPS');
        tableBody.replaceChild(newBody, oldBody);
        newBody.id = "healerRaidOldBody";

        $('#healerRaidOldBody').attr("data-collapsible", "accordion");
        $('#raidOldBody').attr("data-collapsible", "accordion");
        $('.collapsible').collapsible();    //init

    } else {
        //8인 상세 테이블         
        tableFlag = 2;
        if (viewSettingsFlag == false) {
            $('#main_page_content_header').removeClass('hidden');
            $('#main_page_content').removeClass('hidden');
            $('[name=raid]').addClass('hidden');
        } else {
            $('[name=main]').addClass('hidden');
            $('[name=raid]').addClass('hidden');
        }

        //헤더 만들기
        createTableHeader();
        //바디 데이터
        var tableBody = document.getElementById("combatantTableBody");
        var oldBody = document.getElementById("oldBody");
        var newBody = document.createElement("div");

        for (var d in lastCombat.persons) {
            var a = lastCombat.persons[d];
            if (lastCombat.summonerMerge == true && a.get("Job") == 'AVA') { }
            else {
                createTableBody(newBody, a);
            }
        }
        tableBody.replaceChild(newBody, oldBody);
        newBody.id = 'oldBody';
        if (localStorage.getItem('HPS') == 1) {

            //헤더만들기 - 힐러 
            createHealerTableHeader();
            //바디 데이터 - 힐러 
            var healerTableBody = document.getElementById("healerTableBody");
            var healerOldBody = document.getElementById("healerOldBody");
            var healerNewBody = document.createElement("div");

            for (var d in lastCombatHPS.persons) {
                var a = lastCombatHPS.persons[d];
                if (lastCombatHPS.summonerMerge == true && a.get("Job") == 'AVA') { }
                else {
                    if (a.get("role") == 'Healer') {
                        createHealerTableBody(healerNewBody, a);
                    }
                }
            }
            healerTableBody.replaceChild(healerNewBody, healerOldBody);
            healerNewBody.id = 'healerOldBody';
        }

        //그래프 애니메이션 
        if (localStorage.getItem('animation') == 1) {
            //딜러
            for (var d in lastCombat.persons) {
                var a = lastCombat.persons[d];
                var name = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");

                if (num == 2) {
                    $('#main_page_content').find('#' + name).animate({ width: graphWidth[name] });
                    if (localStorage.getItem('petAction') == 1)
                        $('#main_page_content').find('#pet' + name).animate({ width: graphWidth['p' + name] });
                } else {
                    $('#main_page_content').find('#' + name).css('width', graphWidth[name]);
                    if (localStorage.getItem('petAction') == 1)
                        $('#main_page_content').find('#pet' + name).css('width', graphWidth['p' + name]);
                }
            }
            //힐러 
            if (localStorage.getItem('HPS') == 1) {

                for (var d in lastCombatHPS.persons) {
                    var a = lastCombatHPS.persons[d];
                    var name = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");

                    if (a.get("role") == 'Healer') {
                        if (num == 2) {
                            $('#main_page_content').find('#h' + name).animate({ width: graphWidth['h' + name] });
                            $('#main_page_content').find('#overhealh' + name).animate({ width: graphWidth['o' + name] });
                            $('#main_page_content').find('#shieldh' + name).animate({ width: graphWidth['s' + name] });
                            if (localStorage.getItem('petAction') == 1) {
                                $('#main_page_content').find('#peth' + name).animate({ width: graphWidth['hp' + name] });
                            }
                        } else {
                            $('#main_page_content').find('#h' + name).css('width', graphWidth['h' + name]);
                            $('#main_page_content').find('#overhealh' + name).css('width', graphWidth['o' + name]);
                            $('#main_page_content').find('#shieldh' + name).css('width', graphWidth['s' + name]);
                            if (localStorage.getItem('petAction') == 1)
                                $('#main_page_content').find('#peth' + name).css('width', graphWidth['hp' + name]);
                        }
                    }
                }
            }
        }
    }
}
function createRaidTableBody(lastData, newBody, personFlag, tableRoop, YOU, YOUR_PET, XPS) {
    var flag = 0;
    for (var d in lastData.persons) {
        var a = lastData.persons[d];
        if (lastData.summonerMerge == true && a.get("Job") == 'AVA') { }
        else {
            if (XPS == "HPS" && a.get("role") == 'Healer' || XPS == "DPS") {
                if (flag == 0) {
                    var li = document.createElement("li");
                    var header = document.createElement("div");
                    header.className = "collapsible-header row";
                    var body = document.createElement("div");
                    body.className = "collapsible-body row";
                }
                //추가 처리부분            
                var headerContents = document.createElement("div");
                var bodyContents = document.createElement("div");
                var name = inputName(a.get("name"), a.get("Class"), a.get("rank") + 1);
                if (XPS == 'DPS') {
                    headerContents.className = "col s13 userbox";
                    bodyContents.className = "col s13 userbox";
                    var xpsValue = addComma(a.get("encdps").toFixed(inputNumber));
                    var rankingName = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");
                } else {
                    headerContents.className = "col s2 userbox";
                    bodyContents.className = "col s2 userbox";
                    var xpsValue = addComma(a.get("enchps").toFixed(inputNumber));
                    var rankingName = 'h' + a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");
                }

                //랭킹 정보 갱신
                if (XPS == 'DPS') {
                    //랭킹 아이콘 처리
                    if (a.get("rank") == 0) {
                        var rankingImage = "rank_1";
                    } else if (a.get("rank") == 1) {
                        var rankingImage = "rank_2";
                    } else if (a.get("rank") == 2) {
                        var rankingImage = "rank_3";
                    } else if (parseInt(rankVal[rankingName]) == "NaN" || rankVal[rankingName] == undefined) {
                        var rankingImage = "arrow_flat";
                    } else if (a.get("rank") < parseInt(rankVal[rankingName])) {
                        var rankingImage = "arrow_up";
                    } else if (a.get("rank") > parseInt(rankVal[rankingName])) {
                        var rankingImage = "arrow_down";
                    } else if (a.get("rank") == parseInt(rankVal[rankingName])) {
                        var rankingImage = "arrow_flat";
                    }
                    rankVal[rankingName] = a.get("rank");
                }
                else {
                    //힐러 랭킹 아이콘 처리
                    if (a.get("rank") == 0) {
                        var rankingImage = "rank_1";
                    } else if (a.get("rank") == 1) {
                        var rankingImage = "rank_2";
                    } else if (a.get("rank") == 2) {
                        var rankingImage = "rank_3";
                    } else if (parseInt(rankVal['h' + rankingName]) == "NaN" || rankVal['h' + rankingName] == undefined) {
                        var rankingImage = "arrow_flat";
                    } else if (a.get("rank") < parseInt(rankVal['h' + rankingName])) {
                        var rankingImage = "arrow_up";
                    } else if (a.get("rank") > parseInt(rankVal['h' + rankingName])) {
                        var rankingImage = "arrow_down";
                    } else if (a.get("rank") == parseInt(rankVal['h' + rankingName])) {
                        var rankingImage = "arrow_flat";
                    }
                    rankVal['h' + rankingName] = a.get("rank");
                }
                //데이터 처리
                if (YOU == d || YOUR_PET == d)
                    headerContents.innerHTML = '<table class="divBody" name="RaidYOU" style="background:' + accentColor + ';"><tr><td style="width: .25rem; background:' + inputColor(a) + ';" ></td><td style="width: 1.9rem"><img src="images/glow/' + a.get("Job").toLowerCase() + '.png" class="pngIcon"></td><td class="raidName">' + name + '</td></tr><tr><td style="width: .25rem; background:' + inputColor(a) + ';" ></td><td style="width: 1.9rem" class="center"><img src="images/glow/' + rankingImage + '.png" style="width:1.5rem;"></td><td class="raidName value">' + xpsValue + '</td></tr></table>';
                else
                    headerContents.innerHTML = '<table class="divBody"><tr><td style="width: .25rem; background:' + inputColor(a) + ';" ></td><td style="width: 1.9rem"><img src="images/glow/' + a.get("Job").toLowerCase() + '.png" class="pngIcon"></td><td class="raidName">' + name + '</td></tr><tr><td style="width: .25rem; background:' + inputColor(a) + ';" ></td><td style="width: 1.9rem" class="center"><img src="images/glow/' + rankingImage + '.png" style="width:1.5rem;"></td><td class="raidName value">' + xpsValue + '</td></tr></table>';

                if (XPS == 'DPS') {
                    var html = '<table class="divBody">';
                    for (var i = 3; i < initACTElement.length; i++) {
                        var name = 'custom' + i;
                        if (localStorage.getItem(name) == 1) {
                            var temp = '<tr><td class="left">' + $('[name="' + name + '"]').find('.PrimaryText').text() + '</td></tr><tr><td class="right value" style="color:' + accentColor + '";>' + inputData(name, a, localStorage.getItem("pets")) + '</td></tr>';
                            html += temp;
                        }
                    }
                    html += '</table>';
                    bodyContents.innerHTML = html;
                } else {
                    var html = '<table class="divBody">';
                    for (var i = 2; i < initHealerElement.length; i++) {
                        var name = 'custom' + (i + 40);
                        if (localStorage.getItem(name) == 1) {
                            var temp = '<tr><td class="left">' + $('[name="' + name + '"]').find('.PrimaryText').text() + '</td></tr><tr><td class="right value" style="color:' + accentColor + '";>' + inputData(name, a, localStorage.getItem("pets")) + '</td></tr>';
                            html += temp;
                        }
                    }
                    html += '</table>';
                    bodyContents.innerHTML = html;

                }
                header.appendChild(headerContents);
                body.appendChild(bodyContents);

                flag++;

                if (flag == personFlag) {
                    li.appendChild(header);
                    li.appendChild(body);
                    newBody.appendChild(li);
                    flag = 0;
                    tableRoop--;
                } else if (flag != 5 && tableRoop == 1) {
                    li.appendChild(header);
                    li.appendChild(body);
                    newBody.appendChild(li);
                }
            }
        }
    }
}
function createTableHeader() {
    var tableHeader = document.getElementById("combatantTableHeader");
    var newHeader = document.createElement("tbody");
    var oldHeader = document.getElementById("oldHeader");
    var tr = newHeader.insertRow();

    for (i = 1; i < initACTElement.length; i++) {
        var name = 'custom' + i;
        if (localStorage.getItem(name) == 1) {
            var td = tr.insertCell();
            td.innerHTML = $('[name="' + name + '"]').find('.PrimaryText').text();
            addClassName(name, td);
        }
    }
    tableHeader.replaceChild(newHeader, oldHeader);
    newHeader.id = "oldHeader";
}
function createTableBody(newBody, a) {
    var table = document.createElement("TABLE");
    table.className = "tableBody";

    var userName = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");

    if (a.get("petOwner") == undefined || a.get("petOwner") == "")
        table.id = 'table' + a.get("name");
    else
        table.id = 'table' + a.get("petOwner");
    var tr = table.insertRow();
    var bar = document.createElement("div");
    bar.className = "bar";
    bar.id = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");
    var bar1 = document.createElement("span");
    bar1.className = "bar barDeal pet";
    bar1.id = 'pet' + userName;
    var barBg = document.createElement("div");
    barBg.className = "barBg";
    var line = document.createElement("li");
    line.className = "divider";
    line.style.backgroundColor = "rgba(0,0,0," + (nowVal_bo + 0.25) + ")";

    for (var i = 1; i < initACTElement.length; i++) {
        var name = 'custom' + i;
        if (localStorage.getItem(name) == 1) {
            var td = tr.insertCell();
            td.innerHTML = inputData(name, a, localStorage.getItem("pets"));
            addClassName(name, td);
        }
    }
    inputBarData(bar, 0, 0, bar1, a, 'dps');
    newBody.appendChild(table);

    if (localStorage.getItem('petAction') == 1)
        bar.appendChild(bar1);

    newBody.appendChild(bar);
    newBody.appendChild(barBg);
    if (localStorage.getItem('line') == 1)
        newBody.appendChild(line);
}
function createHealerTableHeader() {
    var tableHeader = document.getElementById("healerTableHeader");
    var newHeader = document.createElement("tbody");
    var oldHeader = document.getElementById("healerOldHeader");
    var tr = newHeader.insertRow();

    for (i = 0; i < initHealerElement.length; i++) {
        var name = 'custom' + (i + 40);
        if (localStorage.getItem(name) == 1) {
            var td = tr.insertCell();
            td.innerHTML = $('[name="' + name + '"]').find('.PrimaryText').text();
            addClassName(name, td);
        }
    }
    tableHeader.replaceChild(newHeader, oldHeader);
    newHeader.id = 'healerOldHeader';
}
function createHealerTableBody(newBody, a) {
    var table = document.createElement("TABLE");
    table.className = "tableBody";

    var userName = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");

    if (a.get("petOwner") == undefined || a.get("petOwner") == "")
        table.id = 'tableh' + a.get("name");
    else
        table.id = 'tableh' + a.get("petOwner");
    var tr = table.insertRow();
    var bar = document.createElement("div");
    bar.className = "bar";
    bar.id = 'h' + userName;
    var bar1 = document.createElement("span");
    bar1.className = "bar barHeal";
    bar1.id = 'overhealh' + userName;
    var bar2 = document.createElement("span");
    bar2.className = "bar barHeal";
    bar2.id = 'shieldh' + userName;
    var bar3 = document.createElement("span");
    bar3.className = "bar barHeal pet";
    bar3.id = 'peth' + userName;
    var barBg = document.createElement("div");
    barBg.className = "barBg";
    var line = document.createElement("li");
    line.className = "divider";
    line.style.backgroundColor = "rgba(0,0,0," + (nowVal_bo + 0.25) + ")";

    for (var i = 0; i < initHealerElement.length; i++) {
        var name = 'custom' + (i + 40);
        if (localStorage.getItem(name) == 1) {
            var td = tr.insertCell();
            td.innerHTML = inputData(name, a, localStorage.getItem("pets"));
            addClassName(name, td);
        }
    }
    inputBarData(bar, bar1, bar2, bar3, a, 'Healer');
    newBody.appendChild(table);
    bar.appendChild(bar1);
    bar.appendChild(bar2);
    if (localStorage.getItem('petAction') == 1)
        bar.appendChild(bar3);

    newBody.appendChild(bar);
    newBody.appendChild(barBg);
    if (localStorage.getItem('line') == 1)
        newBody.appendChild(line);
}
function addClassName(name, td) {
    if (name == 'custom2' || name == 'custom41')
        td.className = 'nameCell'
    else if (name == 'custom6' || name == 'custom25' || name == 'custom4' || name == 'custom7' || name == 'custom8' || name == 'custom9' || name == 'custom10' || name == 'custom42')    //좁은 셀 2 
        td.className = 'narrowCell2'
    else if (name == 'custom12' || name == 'custom21' || name == 'custom22' || name == 'custom27' || name == 'custom28' || name == 'custom29' || name == 'custom30' || name == 'custom37' || name == 'custom38' || name == 'custom44' || name == 'custom45' || name == 'custom46' || name == 'custom47' || name == 'custom54' || name == 'custom55')     //넓은 셀 1 
        td.className = 'wideCell1'
    else if (name == 'custom20' || name == 'custom35' || name == 'custom52')
        td.className = 'wideCell2'
    else if (name == 'custom1' || name == 'custom40')
        td.className = 'iconCell'
    else
        td.className = 'narrowCell1'
}
function addComma(num) {
    if (localStorage.getItem('comma') == 1) 		//콤마 찍기 
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return num;
}
function inputName(name, job, rank) {
    if (localStorage.getItem('hideName') == 0) {
        if (name == "YOU") {
            var i = cutName(myName);
            return cutRank(i, rank);
        } else {
            var i = cutName(name);
            return cutRank(i, rank);
        }
    } else {
        if (job == "LMB") {
            return cutRank(name, rank);
        } else {
            if (name == "YOU") return cutRank('YOU', rank);
            else return cutRank(' ', rank);
        }
    }
}
function cutName(name) {
    var temp = name.split(' ');
    if (temp.length == 1) {
        return name;
    } else {
        if (localStorage.getItem('nameType') == 'AType') {
            return name;
        } else if (localStorage.getItem('nameType') == 'BType') {
            return temp[0] + ' ' + temp[1].substr(0, 1) + '.';
        } else if (localStorage.getItem('nameType') == 'CType') {
            return temp[0].substr(0, 1) + '. ' + temp[1];
        } else {
            return temp[0].substr(0, 1) + '. ' + temp[1].substr(0, 1) + '.';
        }
    }
}
function cutRank(name, rank) {
    if (localStorage.getItem('ranking') == 1) {
        return rank + '. ' + name;
    } else {
        return name;
    }
}
function inputData(name, a, petFlag) {
    var rank = a.get("rank") + 1;
    switch (name) {
        case 'custom1': case 'custom40': return '<img src="./images/glow/' + a.get("Job").toLowerCase() + '.png" class="pngIcon"/>'; break;
        case 'custom2': case 'custom41':
            return inputName(a.get("name"), a.get("Class"), a.get("rank") + 1);
            break;
        case 'custom3': return a.get("duration"); break;
        case 'custom4': return addComma(a.get("dps").toFixed(inputNumber)); break;
        case 'custom5': return lastCombat.Encounter.duration; break;
        case 'custom6': return addComma(a.get("encdps").toFixed(inputNumber)); break;
        case 'custom7': return addComma(a.get("Last10DPS").toFixed(inputNumber)); break;
        case 'custom8': return addComma(a.get("Last30DPS").toFixed(inputNumber)); break;
        case 'custom9': return addComma(a.get("Last60DPS").toFixed(inputNumber)); break;
        case 'custom10': return addComma(a.get("Last180DPS").toFixed(inputNumber)); break;

        case 'custom11': return a.get("damage%").toFixed(inputNumber / 2) + '%'; break;
        case 'custom12':
            if (petFlag == 1) return addComma(a.get("mergedDamage"));
            else return addComma(a.get("damage")); break;
        case 'custom13': return a.get("TOHIT") + '%'; break;
        case 'custom14':
            if (petFlag == 1) return addComma(a.get("mergedSwings"));
            else return addComma(a.get("swings")); break;
        case 'custom15':
            if (petFlag == 1) return addComma(a.get("mergedHits"));
            else return addComma(a.get("hits")); break;
        case 'custom16':
            if (petFlag == 1) return addComma(a.get("mergedMisses"));
            else return addComma(a.get("misses")); break;
        case 'custom17': return addComma(a.get("hitfailed")); break;
        case 'custom18':
            if (petFlag == 1) return addComma(a.get("mergedCrithits"));
            else return addComma(a.get("crithits")); break;
        case 'custom19': return a.get("crithit%").toFixed(inputNumber / 2) + '%'; break;
        case 'custom20':
            if (tableFlag == 2)
                return a.get("maxhitstr") + ' - ' + addComma(a.get("maxhitval"));
            else
                return a.get("maxhitstr") + '<br>' + addComma(a.get("maxhitval"));
            break;
        case 'custom21': return addComma(a.get("damagetaken")); break;
        case 'custom22': return addComma(a.get("healstaken")); break;
        case 'custom23': return a.get("ParryPct").toFixed(inputNumber / 2) + '%'; break;
        case 'custom24': return a.get("BlockPct").toFixed(inputNumber / 2) + '%'; break;

        case 'custom25': case 'custom42': return addComma(a.get("enchps").toFixed(inputNumber)); break;
        case 'custom26': case 'custom43': return a.get("healed%").toFixed(inputNumber / 2) + '%'; break;
        case 'custom27': case 'custom44':
            if (petFlag == 1) return addComma(a.get("mergedHealed"));
            else return addComma(a.get("healed")); break;
        case 'custom28': case 'custom45':
            if (petFlag == 1) return addComma(a.get("mergedHealed") - a.get("mergedOverHeal") - a.get("mergedDamageShield"));
            else return addComma(a.get("healed") - a.get("overHeal") - a.get("damageShield")); break;
        case 'custom29': case 'custom46':
            if (petFlag == 1) return addComma(a.get("mergedDamageShield"));
            else return addComma(a.get("damageShield")); break;
        case 'custom30': case 'custom47':
            if (petFlag == 1) return addComma(a.get("mergedOverHeal"));
            else return addComma(a.get("overHeal")); break;
        case 'custom31': case 'custom48':
            var overhealPct = (a.get("overHeal") / (a.get("healed")) * 100);
            if (isNaN(overhealPct) == true) {
                overhealPct = 0;
                return overhealPct.toFixed(inputNumber / 2) + '%';
            } else {
                if (petFlag == 1)
                    return ((a.get("mergedOverHeal") / a.get("mergedHealed")) * 100).toFixed(inputNumber / 2) + '%';
                else
                    return ((a.get("overHeal") / a.get("healed")) * 100).toFixed(inputNumber / 2) + '%';
            }
            break;
        case 'custom32': case 'custom49':
            if (petFlag == 1) return addComma(a.get("mergedHeals"));
            else return addComma(a.get("heals")); break;
        case 'custom33': case 'custom50':
            if (petFlag == 1) return addComma(a.get("mergedCritheals"));
            else return addComma(a.get("critheals")); break;
        case 'custom34': case 'custom51': return a.get("critheal%").toFixed(inputNumber / 2) + '%'; break;
        case 'custom35': case 'custom52':
            if (tableFlag == 2)
                return a.get("maxhealstr") + ' - ' + addComma(a.get("maxhealval"));
            else
                return a.get("maxhealstr") + '<br>' + addComma(a.get("maxhealval"));
            break;
        case 'custom36': case 'custom53': return addComma(a.get("cures")); break;
        case 'custom37': case 'custom54':
            if (petFlag == 1) return addComma(a.get("mergedAbsorbHeal"));
            else return addComma(a.get("absorbHeal")); break;
        case 'custom38': case 'custom55': return addComma(a.get("powerheal")); break;
        case 'custom39': case 'custom56': return addComma(a.get("deaths")); break;
    }
}
function inputColor(a) {
    if (localStorage.getItem("youColor") == 1 && a.get("name") == "YOU") {
        return '#' + localStorage.getItem("YOU");
    }
    else {
        switch (a.get("Class")) {
            case 'PLD': case 'GLD': return '#' + localStorage.getItem("tank1"); break;
            case 'WAR': case 'MRD': return '#' + localStorage.getItem("tank2"); break;
            case 'DRK': return '#' + localStorage.getItem("tank3"); break;

            case 'WHM': case 'CNJ': return '#' + localStorage.getItem("heal1"); break;
            case 'SCH': return '#' + localStorage.getItem("heal2"); break;
            case 'AST': return '#' + localStorage.getItem("heal3"); break;

            case 'MNK': case 'PGL': return '#' + localStorage.getItem("dps1"); break;
            case 'DRG': case 'LNC': return '#' + localStorage.getItem("dps2"); break;
            case 'NIN': case 'ROG': return '#' + localStorage.getItem("dps3"); break;
            case 'BLM': case 'THM': return '#' + localStorage.getItem("dps4"); break;
            case 'SMN': case 'ACN': return '#' + localStorage.getItem("dps5"); break;
            case 'BRD': case 'ARC': return '#' + localStorage.getItem("dps6"); break;
            case 'MCH': return '#' + localStorage.getItem("dps7"); break;

            case 'LMB': return '#' + localStorage.getItem("LB"); break;
            case 'CBO': return '#' + localStorage.getItem("chocobo"); break;

            case 'btn': case 'fsh': case 'min': return '#' + localStorage.getItem("life1"); break;
            default: return '#' + localStorage.getItem("life2"); break;
        }
    }
}
function inputBarData(bar, barOverheal, barShield, barPet, a, flag) {
    var name = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace("'", "_");
    bar.style.backgroundColor = inputColor(a);

    if (flag == 'Healer')  //힐러 
    {
        var width = Math.min(100, parseInt((a.get(lastCombatHPS.sortkey) / a.get("maxdamage")) * 100)) + '%';

        if (localStorage.getItem("pets") == 1) {    //합산
            var overheal = Math.min(100, parseInt((a.get("mergedOverHeal") / a.get("maxdamage")) * 100)) + '%';
            var shield = Math.min(100, parseInt((a.get("mergedDamageShield") / a.get("maxdamage")) * 100)) + '%';
            if (a.get("Class") == "SCH") {
                var petHealed = Math.min(100, parseInt((a.get("mergedHealed") - a.get("original").Healed) / a.get("maxdamage") * 100)) + '%';
            } else {
                petHealed = 0 + '%';
            }
        } else {
            var overheal = Math.min(100, parseInt((a.get("overHeal") / a.get("maxdamage")) * 100)) + '%';
            var shield = Math.min(100, parseInt((a.get("damageShield") / a.get("maxdamage")) * 100)) + '%';
            var petHealed = 0 + '%';
        }
        //애니메이션 적용시 
        if (localStorage.getItem('animation') == 1) {
            if (graphWidth['h' + name] == undefined)
                graphWidth['h' + name] = 0 + '%';
            if (graphWidth['o' + name] == undefined)
                graphWidth['o' + name] = 0 + '%';
            if (graphWidth['s' + name] == undefined)
                graphWidth['s' + name] = 0 + '%';
            if (graphWidth['hp' + name] == undefined)
                graphWidth['hp' + name] = 0 + '%';

            bar.style.width = graphWidth['h' + name];
            barOverheal.style.width = graphWidth['o' + name];
            barShield.style.width = graphWidth['s' + name];
            barPet.style.width = graphWidth['hp' + name];

            graphWidth['h' + name] = width;
            graphWidth['o' + name] = overheal;
            graphWidth['s' + name] = shield;
            graphWidth['hp' + name] = petHealed;
        }
        else {  //애니메이션 미적용시 
            bar.style.width = width;
            barOverheal.style.width = overheal;
            barShield.style.width = shield;
            barPet.style.width = petHealed;
        }
        //배경색 
        barOverheal.style.backgroundColor = '#' + localStorage.getItem("overheal");
        barShield.style.backgroundColor = '#' + localStorage.getItem("shield");
        barPet.style.backgroundColor = '#' + localStorage.getItem("ava");
    }
    else    //딜러 
    {
        var width = Math.min(100, parseInt((a.get(lastCombat.sortkey) / a.get("maxdamage")) * 100)) + '%';

        if (localStorage.getItem("pets") == 1)  //합산
            var petDamage = Math.min(100, parseInt((a.get("mergedDamage") - a.get("original").Damage) / a.get("maxdamage") * 100)) + '%';
        else
            var petDamage = 0 + '%';

        if (localStorage.getItem('animation') == 1) {
            if (graphWidth[name] == undefined)
                graphWidth[name] = 0 + '%';
            if (graphWidth['p' + name] == undefined)
                graphWidth['p' + name] = 0 + '%';

            bar.style.width = graphWidth[name];
            barPet.style.width = graphWidth['p' + name];

            graphWidth[name] = width;
            graphWidth['p' + name] = petDamage;

        }
        else {
            bar.style.width = width;
            barPet.style.width = petDamage;
        }
        barPet.style.backgroundColor = '#' + localStorage.getItem("ava");
    }

    //그라데이션
    if (localStorage.getItem('gradation') == 1) {
        var color = bar.style.backgroundColor;
        bar.style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6," + color + "), to(rgba(24,24,24,0.0)))";
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
                    encounterArray.shift();
                } else {
                    historyAddRow();
                }
            } else {
                historyAddRow();
            }
        }
    }
}
function historyAddRow() {
    var wrap = document.getElementById('historyListBody');
    var newHistory = document.createElement("div");
    var oldHistory = document.getElementById('oldHistoryBody');

    $('#historyBody').find('#viewIcon.viewCell').html('');		//아이콘 초기화

    var table = document.createElement("TABLE");
    table.id = lastCombat.combatKey;
    table.className = "tableBody";
    var tr = table.insertRow();
    var td = tr.insertCell();
    td.innerHTML = '<img class="pngIcon" src="./images/menu/eye.svg" style="width:1.9rem;"/>';
    td.className = "viewCell";
    td.id = "viewIcon";
    var td = tr.insertCell(); td.innerHTML = lastCombat.title + '<span style="color:rgba(255,255,255,0.7);"> / ' + lastCombat.zone + '</span>';
    td.className = "nameCell";
    var td = tr.insertCell(); td.innerHTML = lastCombat.duration;
    td.className = "narrowCell1";
    var td = tr.insertCell(); td.innerText = addComma(parseFloat(lastCombat.Encounter.encdps).toFixed(0));
    td.className = "narrowCell2"; td.id = "RDPS";
    var td = tr.insertCell(); td.innerText = addComma(parseFloat(lastCombat.Encounter.enchps).toFixed(0));
    td.className = "narrowCell2"; td.id = "RHPS";
    var td = tr.insertCell();
    td.className = "narrowCell1"; td.id = "CNT";
    var line = document.createElement("li");
    line.className = "divider";
    line.style.backgroundColor = "rgba(0,0,0," + (nowVal_bo + 0.25) + ")";

    if (encounterArray.length == 1)
        td.innerText = 1;
    else {
        if (encounterArray[0].lastCombat.zone == encounterArray[1].lastCombat.zone) {
            encounterCount++;
            td.innerText = addComma(parseInt(encounterCount));
        } else {
            encounterCount = 1;
            td.innerText = encounterCount;
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
    else
        wrap.insertBefore(newHistory, oldHistory);
    newHistory.id = 'oldHistoryBody';

    $('#oldHistoryBody').on({
        mouseover: function () {
            $(this).find('.barBg').css('background', accentColor);
        },
        mouseleave: function () {
            $(this).find('.barBg').css('background', 'rgba(0,0,0,' + nowVal_bo + ')');
        },
        click: function () {
            var listName = $(this).find('table').attr("id");
            for (var i in encounterArray) {
                if (listName == encounterArray[i].lastCombat.combatKey) {
                    lastCombat = encounterArray[i].lastCombat;
                    lastCombatHPS = encounterArray[i].lastCombatHPS;
                    previewData = encounterArray[i].combatKey;

                    $('#historyBody').find('#viewIcon.viewCell').html('');		//아이콘 초기화
                    $(this).find('#viewIcon').html('<img class="pngIcon" src="./images/menu/eye.svg" style="width:1.9rem;"/>');

                    closeHistory();
                    update(1);
                }
            }
        }
    });
    arrayInitFlag = true;
}

var scrollValue = 0; 		//스크롤 위치
var preScrollVal = 0;		//돌아갈 곳 스크롤 위치 기억
var pre2ScrollVal = 0;      //이전의 이전

var encounterArray = new Array();
var encounterCount = 1;
var arrayInitFlag = true;

graphWidth = new Array();   //그래프 애니메이션 
rankVal = new Array();   //랭킹 값 

var lastCombatHPS = null;

var nowVal_bo = null;		//선택한 배경 불투명도
var nowVal_go = null;		//선택한 그래프 불투명도 
var nowVal_top = null;		//선택한 상단바 불투명도 
var nowVal_header = null;      //선택한 헤더 불투명도

var height = parseFloat(localStorage.getItem('topbarHeight') / 10);
var tableFlag = 0;          //8인 24인 구분 
var viewSettingsFlag = false; 
