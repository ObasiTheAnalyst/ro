var n, data, t, total, p, m, T, m1, f, df;
n=Number(localStorage.getItem('n'))
m1=getstore('m1')
p=getstore('p')
data=getstore('data')
for (let k=1; k<7; k++){
    document.getElementById('dice-0'+k).style.background='transparent';
}
for (let i =0;i<3;i++){
    if (m1[i]!==0) {
        document.getElementById('dice-0'+m1[i]).style.background='brown';
    }
}
if (m1[0]===0){
    f= new Array();
    t=1;
    T=Math.floor(Math.random()*6)+1;
    document.getElementById('trial-no').textContent=1;
    document.getElementById('trial-rem').textContent=2;
    document.querySelector('.statement').textContent='Guess the rolled face?';
} else {
    f=getstore('f');
    t=Number(localStorage.getItem('t'));
    T=Number(localStorage.getItem('T'));
    document.getElementById('trial-no').textContent=t;
    document.getElementById('trial-rem').textContent=3-t; 
    document.querySelector('.statement').textContent='Missed! Try again, guess the rolled face?';
}
if (n===1) {
    document.querySelector('.view').style.display='none';
    document.getElementById('round-new').textContent='round 1';
} else {
    document.querySelector('.view').style.display='flex'
    document.getElementById('round-new').textContent='round '+n;
}
for (let m=1; m<7; m++){
    document.getElementById('dice-0'+m).addEventListener('click',function(){
        if (m!==m1[0] && m!==m1[1]){
            trial(m);
            storechange('f',f);
            localStorage.setItem('t',t);
            localStorage.setItem('T',T);
        }
    })
};

function trial(m){
   pre_trial(m,t)
}

function pre_trial(m,i){
    f[i-1]=m;
    f[3]=T;
    data['Round '+n]=f;
    if (m===T){
        f[4]=4-i;
        data['Round '+n]=f;
        p[n]=p[n-1]+(4-i);             
        storechange('data',data)
        storechange('p',p);
        n++
        localStorage.setItem('n',n);
        alert('You got it after '+i+' trial(s), I rolled a '+T+'.')
        endgame();
    } else {
        document.querySelector('.statement').textContent='Missed! Try again, guess the rolled face?'
        m1[i-1]=m;
        storechange('m1',m1);
        condition(i);
    }
    document.getElementById('trial-no').textContent=t;
    document.getElementById('trial-rem').textContent=3-t; 
}

function condition(i){
    document.getElementById('dice-0'+m1[i-1]).style.background='brown';
    if (t===3){
        p[n]=p[n-1]+0;
        f[4]=0;
        data['Round '+n]=f;
        storechange('data',data)
        storechange('p',p)
        n++
        localStorage.setItem('n',n)
        alert('You missed it after 3 trials, I rolled a '+T+'.')
        endgame();
    } else {
        t++
    }
}
    
function endgame(){
    if(n>5){
        open("lastpage.html","_self");
    } else {
        open("game.html","_self");
    }
}

function exit(){
    var u=confirm('Are you sure you want to exit?')
    if (u){
        open("index.html","_self");
    } 
}

document.querySelector('.exit').addEventListener('click',exit)

function storechange(r,q){
    localStorage.setItem(r,JSON.stringify(q));
}
function getstore(r){
    return JSON.parse(localStorage.getItem(r))
}