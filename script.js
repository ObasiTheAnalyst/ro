var n, data, t, total, p, m, T, m1, f, df;
n=Number(localStorage.getItem('n'))
p=getstore('p')
data=getstore('data')
localStorage.removeItem('t')
localStorage.removeItem('f')
localStorage.removeItem('T')
initround() 
function initround(){
    m1=[0,0,0];
    storechange("m1",m1);
    if (n===1){
        document.getElementById('round').textContent='round 1';
        document.getElementById('round_no').textContent=1;
        document.getElementById('round_rem').textContent=4;
        document.getElementById('total_score').textContent=p[0];
        document.getElementById('possible_score').textContent=0;

    } else {
        document.getElementById('round').textContent='round '+n;
        document.getElementById('round_no').textContent=n;
        document.getElementById('round_rem').textContent=5-n;
        document.getElementById('total_score').textContent=p[n-1];
        document.getElementById('possible_score').textContent=3*(n-1);
    }
}



function exit(){
    var u=confirm('Are you sure you want to exit?')
    if (u){
        open("index.html","_self");
    } 
}

function storechange(r,q){
    localStorage.setItem(r,JSON.stringify(q));
}
function getstore(r){
    return JSON.parse(localStorage.getItem(r))
}


