const GAME_TITLE = document.getElementById('GAME_TITLE');
const TEAM_COUNT = document.getElementById('TEAM_COUNT');
const ALLOWS_ITEM = document.getElementById('ALLOWS_ITEM');
const ITEM_NAME_LIST = document.getElementById('ITEM_NAME_LIST');
const ITEM_PROB_LIST = document.getElementById('ITEM_PROB_LIST');
const POINT_LIST = document.getElementById('POINT_LIST');
const POINT = document.getElementById('POINT');
const HAS_ORDER1 = document.getElementById('HAS_ORDER1');
const HAS_ORDER2 = document.getElementById('HAS_ORDER2');

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
    // ITEM_NAME_LIST.innerHTML = ITEM_LIST;
    genItemList();
    // ITEM_PROB_LIST.innerHTML = setting.ITEM_PROB_LIST;
    genItemProbList();
    // POINT_LIST.innerHTML = setting.POINT_LIST;
    genPointList();
    POINT.value = "";
    setting.HAS_ORDER ? HAS_ORDER2.checked = true : HAS_ORDER1.checked = true;

    saveSetting();
    checkAllowsItem();
}

function startGame(){

}

function appendPoint(){
    var p = Number(POINT.value);
    p = p<-99 ? -99 : p;
    p = p>99 ? 99 : p;
    if(setting.POINT_LIST.indexOf(p) == -1){
        // console.log('append');
        setting.POINT_LIST.push(p);
        genPointList();
        POINT.value = "";
    }
}

function saveSetting(){
    var children = ITEM_PROB_LIST.children;
    var sum = 0;
    var tmp = [];
    for(var i = 0; i<children.length; i++){
        tmp.push(Number(children[i].value));
        sum += tmp[i];
        // console.log(tmp[i], sum);
    }
    if(sum != 1){
        alert(`각 아이템의 확률의 합이 1이어야 합니다.\n현재 합계 : ${sum}`);
        return false
    }
    else{
        setting.GAME_TITLE = GAME_TITLE.value;
        setting.TEAM_COUNT = Number(TEAM_COUNT.value);
        setting.ALLOWS_ITEM = Boolean(ALLOWS_ITEM.checked);
        setting.HAS_ORDER = Boolean(HAS_ORDER2.checked);
        setting.ITEM_PROB_LIST = tmp;
        sessionStorage.setItem(SETTING_KEY, JSON.stringify(setting));
        return true;
    }
}

function resetSetting(){
    sessionStorage.setItem(SETTING_KEY, null);
    setDefaltSetting();
}

function genItemList(){
    var div;
    ITEM_NAME_LIST.innerHTML = "";
    ITEM_LIST.forEach(item => {
        div = document.createElement('div');
        div.innerHTML = item;
        div.classList.add("itemCard");
        ITEM_NAME_LIST.appendChild(div);
    })
}

function genItemProbList(){
    var input;
    ITEM_PROB_LIST.innerHTML = "";
    setting.ITEM_PROB_LIST.forEach(prob => {
        input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        input.value = prob;
        input.classList.add("itemCard");
        ITEM_PROB_LIST.appendChild(input);
    });
}

function genPointList(){
    // POINT_LIST.innerHTML = setting.POINT_LIST;
    var div;
    POINT_LIST.innerHTML = "";
    setting.POINT_LIST.forEach(point => {
        div = document.createElement('div');
        div.innerHTML = point;
        div.classList.add("pointCard");
        POINT_LIST.appendChild(div);
    });
}

function checkAllowsItem(){
    var children = ITEM_PROB_LIST.children;
    if(ALLOWS_ITEM.checked){
        for(var i = 0; i<children.length; i++)
            children[i].disabled = false;
    }
    else{
        for(var i = 0; i<children.length; i++)
            children[i].disabled = true;
    }
}