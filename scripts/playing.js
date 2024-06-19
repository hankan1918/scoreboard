function loadPlaying(){
    setting = JSON.parse(sessionStorage.getItem(SETTING_KEY));
    console.log(setting);
    loadTeamList();
}

function loadTeamList(){
    var div = document.querySelector("#teamList");
    var cdiv;
    const count = setting.TEAM_COUNT;

    for(var i = 1; i <= count; i++){
        cdiv = document.createElement('div');
        cdiv.innerHTML = i;
        div.appendChild(cdiv);
    }
}