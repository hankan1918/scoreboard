const SETTING_KEY = 'setting';
const ITEM_LIST = ['X1', 'X2', 'X3', '점수 교환', 'X(-1)'];

const GAME_TITLE = document.getElementById('GAME_TITLE');
const TEAM_COUNT = document.getElementById('TEAM_COUNT');
const ALLOWS_ITEM = document.getElementById('ALLOWS_ITEM');
const ITEM_NAME_LIST = document.getElementById('ITEM_NAME_LIST');
const ITEM_PROB_LIST = document.getElementById('ITEM_PROB_LIST');
const POINT_LIST = document.getElementById('POINT_LIST');
const POINT = document.getElementById('POINT');
const HAS_ORDER1 = document.getElementById('HAS_ORDER1');
const HAS_ORDER2 = document.getElementById('HAS_ORDER2');

var setting;

function checkSetting(){
    
    alert
}

function setDefaltSetting(){
    setting = JSON.parse(sessionStorage.getItem(SETTING_KEY))
    || {
        "GAME_TITLE" : "GAME",
        "TEAM_COUNT" : 2,
        "ALLOWS_ITEM" : true,
        "ITEM_PROB_LIST" : [0.75, 0.1, 0.03, 0.05, 0.07],
        "POINT_LIST" : [1, 2, 3, 5],
        "HAS_ORDER" : false
    };
    // console.log(setting);
    
    GAME_TITLE.value = setting.GAME_TITLE;
    TEAM_COUNT.value = setting.TEAM_COUNT;
    ALLOWS_ITEM.checked = setting.ALLOWS_ITEM;
    ITEM_NAME_LIST.innerHTML = ITEM_LIST;
    ITEM_PROB_LIST.innerHTML = setting.ITEM_PROB_LIST;
    POINT_LIST.innerHTML = setting.POINT_LIST;
    setting.HAS_ORDER ? HAS_ORDER2.checked = true : HAS_ORDER1.checked = true;

    saveSetting();
}

function appendPoint(event){
    var p = Number(POINT.value);
    if(setting.POINT_LIST.indexOf(p) == -1){
        console.log('append');
        setting.POINT_LIST.push(p);
        POINT_LIST.innerHTML = setting.POINT_LIST;
    }
}

function saveSetting(){
    sessionStorage.setItem(SETTING_KEY, JSON.stringify(setting));
}

function resetSetting(){
    sessionStorage.setItem(SETTING_KEY, null);
    setDefaltSetting();
}