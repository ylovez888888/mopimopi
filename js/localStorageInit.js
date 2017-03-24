var inputNumber=null;var custom=new Array();var healerCustom=new Array();var initACTElement=[0,1,1,0,0,0,1,0,0,0,0,1,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];var initHealerElement=[1,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0];var graphColorId=['tank1','tank2','tank3','heal1','heal2','heal3','shield','overheal','dps1','dps2','dps3','dps4','dps5','dps6','dps7','life1','life2','ava','chocobo','LB','me','other','YOU'];var graphColorInit=['7B9AA2','A91A16','682531','BDBDBD','32307B','B1561C','0F9D58','FF3F80','B38915','3752D8','EE2E48','674598','32670B','ADC551','148AA9','353535','353535','000000','757575','FFBB00','FFFFFF','FFFFFF','ff5722'];if(!localStorage.getItem("accentColor")){localStorage.setItem("accentColor",'ff5722')}else var accentColor='#'+localStorage.getItem("accentColor");if(!localStorage.getItem("topbarBackgroundColor")){localStorage.setItem("topbarBackgroundColor",'212121')}else var topbarBackgroundColor='#'+localStorage.getItem("topbarBackgroundColor");if(!localStorage.getItem("bigTextColor")){localStorage.setItem("bigTextColor",'ffffff')}else var bigTextColor='#'+localStorage.getItem("bigTextColor");if(!localStorage.getItem("smallTextColor")){localStorage.setItem("smallTextColor",'bdbdbd')}else var smallTextColor='#'+localStorage.getItem("smallTextColor");if(!localStorage.getItem("borderColor")){localStorage.setItem("borderColor",'000000')}
$('body').find('[name=accentColor]').val(localStorage.getItem('accentColor'));$('body').find('[name=topbarBackgroundColor]').val(localStorage.getItem('topbarBackgroundColor'));$('body').find('[name=bigTextColor]').val(localStorage.getItem('bigTextColor'));$('body').find('[name=smallTextColor]').val(localStorage.getItem('smallTextColor'));$('body').find('[name=borderColor]').val(localStorage.getItem('borderColor'));$('.time').css('color',accentColor);for(var i in graphColorId){if(!localStorage.getItem(graphColorId[i]))
localStorage.setItem(graphColorId[i],graphColorInit[i])}
for(var i=0;i<graphColorId.length;i++){if(!localStorage.getItem(graphColorId[i])){$('body').find('[name="'+graphColorId[i]+'"]').val(graphColorInit[i]);$('body').find('#'+graphColorId[i]).css('background','#'+graphColorInit[i])}else{$('body').find('[name="'+graphColorId[i]+'"]').val(localStorage.getItem(graphColorId[i]));$('body').find('#'+graphColorId[i]).css('background','#'+localStorage.getItem(graphColorId[i]))}}
if(!localStorage.getItem('language')||isNaN(localStorage.getItem('language'))==!1){localStorage.setItem('language','kr');mpLang=mpKR;$('#result_Lang').text("한국어")}
if(!localStorage.getItem('nameType')){localStorage.setItem('nameType','AType');$('#result_nameType').html('Full Name<br>/Only Global Server')}
if(!localStorage.getItem('fontSize')){localStorage.setItem('fontSize','small');$('#result_font').text('9pt')}
if(!localStorage.getItem('bgOpacity')){localStorage.setItem('bgOpacity','bgOpacity75')}
if(!localStorage.getItem('graphOpacity')){localStorage.setItem('graphOpacity','graphOpacity100')}
if(!localStorage.getItem('topbarOpacity')){localStorage.setItem('topbarOpacity','topbarOpacity100')}
if(!localStorage.getItem('narrowCell1'))
localStorage.setItem('narrowCell1',40);if(!localStorage.getItem('narrowCell2'))
localStorage.setItem('narrowCell2',55);if(!localStorage.getItem('wideCell1'))
localStorage.setItem('wideCell1',70);if(!localStorage.getItem('wideCell2'))
localStorage.setItem('wideCell2',100);if(!localStorage.getItem('topbarHeight'))
localStorage.setItem('topbarHeight',56);$("[name=narrowCell1]").val(localStorage.getItem('narrowCell1'));$("[name=narrowCell2]").val(localStorage.getItem('narrowCell2'));$("[name=wideCell1]").val(localStorage.getItem('wideCell1'));$("[name=wideCell2]").val(localStorage.getItem('wideCell2'));$("[name=topbarHeight]").val(localStorage.getItem('topbarHeight'));if(!localStorage.getItem('timeFont'))
localStorage.setItem('timeFont','Montserrat');if(!localStorage.getItem('engFont'))
localStorage.setItem('engFont','Roboto');if(!localStorage.getItem('ourFont'))
localStorage.setItem('ourFont','Noto Sans KR');$("[name=timeFont]").val(localStorage.getItem('timeFont'));$("[name=ourFont]").val(localStorage.getItem('ourFont'));$("[name=engFont]").val(localStorage.getItem('engFont'));if(!localStorage.getItem('meBold'))
localStorage.setItem('meBold',0);if(!localStorage.getItem('otherBold'))
localStorage.setItem('otherBold',0);if(!localStorage.getItem('border'))
localStorage.setItem('border',0);if(!localStorage.getItem('edge'))
localStorage.setItem('edge',0);if(!localStorage.getItem('HPS'))
localStorage.setItem('HPS',1);if(localStorage.getItem("HPS")==1){$('#healerTable').removeClass('hidden')}else{$('#healerTable').addClass('hidden')}
if(!localStorage.getItem('youColor'))
localStorage.setItem('youColor',0);if(!localStorage.getItem('petAction'))
localStorage.setItem('petAction',1);if(!localStorage.getItem('line'))
localStorage.setItem('line',1);if(!localStorage.getItem('hideName'))
localStorage.setItem('hideName',0);if(!localStorage.getItem('pets'))
localStorage.setItem('pets',1);if(!localStorage.getItem('comma'))
localStorage.setItem('comma',1);if(!localStorage.getItem('number')){localStorage.setItem('number',1);inputNumber=2}else{if(localStorage.getItem('number')==1)
inputNumber=2;else inputNumber=0}
if(!localStorage.getItem('gradation'))
localStorage.setItem('gradation',0);if(!localStorage.getItem('animation'))
localStorage.setItem('animation',1)
