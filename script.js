
var n, data, t, total, p, m, T, m1, f, df;
initialize();
document.querySelector('.btn--play').addEventListener('click',function(){
    document.getElementById('p1').style.display='none'
    document.getElementById('p2').style.display='flex'
    initround();
});
document.querySelector('.exit').addEventListener('click',exit);
document.querySelector('.exit2').addEventListener('click',exit);
document.querySelector('.exit1').addEventListener('click',exit);

document.querySelector('.btn--roll').addEventListener('click',function(){
    document.getElementById('p2').style.display='none'
    document.getElementById('p3').style.display='flex'
    for (let k=1; k<7; k++){
        document.getElementById('dice-0'+k).style.background='transparent';
    }
    document.getElementById('trial-no').textContent=1;
    document.getElementById('trial-rem').textContent=2;
    document.querySelector('.statement').textContent='Guess the rolled face?'
    t=1;
    T=Math.floor(Math.random()*6)+1;
    if (n===1){
        document.getElementById('round-new').textContent='round 1';
    } else {
        document.getElementById('round-new').textContent='round '+n;
    }
});

for (let m=1; m<7; m++){
    document.getElementById('dice-0'+m).addEventListener('click',function(){
        if (m!==m1[0] && m!==m1[1]){
            trial(m);
        }
    })
};

document.querySelector('.view').addEventListener('click',function(){
    if (n!==1){
        document.getElementById('p3').style.display='none'
        document.getElementById('p4').style.display='flex'
        for (let i=1;i<n;i++){
            document.getElementById('tb'+i).innerHTML= '\
            <td>Round '+i+'</td>\
            <td>'+data['Round '+i][0]+'</td>\
            <td>'+data['Round '+i][1]+'</td>\
            <td>'+data['Round '+i][2]+'</td>\
            <td>'+data['Round '+i][3]+'</td>\
            <td>'+data['Round '+i][4]+'</td>'
        }
    } 
})

document.querySelector('.return').addEventListener('click', function(){
    document.getElementById('p4').style.display='none'
    document.getElementById('p3').style.display='flex'
})

document.querySelector('.download').addEventListener('click', function(){
    document.getElementById('copyright').style.color='black'
    print(document.querySelector('.exitvie').style.display='none')
    document.querySelector('.exitvie').style.display='flex'
    document.getElementById('copyright').style.color='white'
})

function initialize(){
    document.querySelector('#p5').style.display='none'
    document.getElementById('p2').style.display='none'
    document.getElementById('p3').style.display='none'
    document.getElementById('p4').style.display='none'
    document.getElementById('p1').style.display='flex'
    data =new Object();
    p= new Array();
    p[0]=0;
    n=1; 
};

function initround(){
    m1=[0,0,0];
    f= new Array();
    if (n===1){
        document.getElementById('round').textContent='round 1';
        document.getElementById('round_no').textContent=1;
        document.getElementById('round_rem').textContent=4;
        document.getElementById('total_score').textContent=p[0];
        document.getElementById('possible_score').textContent=0;
        document.querySelector('.view').style.display='none'
    } else {
        document.getElementById('round').textContent='round '+n;
        document.getElementById('round_no').textContent=n;
        document.getElementById('round_rem').textContent=5-n;
        document.getElementById('total_score').textContent=p[n-1];
        document.getElementById('possible_score').textContent=3*(n-1);
        document.querySelector('.view').style.display='flex'
    }
}

function lastpage(){
    document.getElementById('p3').style.display='none'
    document.querySelector('#p5').style.display='flex'
    for (let k=1; k<6; k++){
        for (let i=1; i<6; i++){
            document.getElementById('R'+k+i).textContent=data['Round '+k][i-1]
        }
    }
    document.getElementById('total').textContent=p[4]+data['Round 5'][4];
    points = new Array();
    for (let i=1; i<6; i++){
        points[i-1]=data['Round '+i][4];
    }

    const occur=points.reduce(function(acc,curr){
        return acc[curr]?++acc[curr] : acc[curr]=1, acc
    },{});

    var G= new Array();
    for (let i=0; i<4;i++){
        if (occur[i]) {
            G[i]=occur[i]/5;
        } else {G[i]=0};
        document.getElementById('G'+i).textContent=G[i]
    }
    document.getElementById('G'+4).textContent=((G[1]+G[2]+G[3])*100)+'%'
    if (G[0]>0.75){
        document.getElementById('remarks').textContent='Your performance is very poor.'
    } else if (G[0]<=0.75 && G[0]>0.5){
        document.getElementById('remarks').textContent='Your performance is poor.'
    } else if (G[0]<=0.5 && G[0]>0.25){
        document.getElementById('remarks').textContent='Your performance is fair.'
    } else {
        document.getElementById('remarks').textContent='Your performance is very good.'
    }
   /* var datar = new Object ()
    datar['Round']=['Round 1','Round 2','Round 3','Round 4','Round 5'];
    for (let i=1;i<6;i++){
        var U=new Array()
        for (let k=1;k<6;k++){
            U[k-1]=data['Round '+k][i]
        }
        datar['data '+i]=U
    }

    const df = new dfd.DataFrame(datar)
    var layout = {
        title: 'Bar Chart showing the points per round',
        xaxis: {
            title: 'Round',
        },
        yaxis: {
            title: 'Points',
        }
    }
    console.log(df)
    new_df = df.set_index({key:"Round"})
    console.log(new_df)
    new_df.plot("plot_div").bar({columns:["data 5"],layout: layout })*/

}

function trial(m){
    if (t===1){
        pre_trial(m,1);
    } else if (t===2){
        pre_trial(m,2);
    } else {
        pre_trial(m,3);
    }
}

function pre_trial(m,i){
    f[i-1]=m;
    f[3]=T;
    data['Round '+n]=f;
    if (m===T){
        f[4]=4-i;
        data['Round '+n]=f;
        p[n]=p[n-1]+(4-i);             
        n++
        alert('You got it after '+i+' trial(s), I rolled a '+T+'.')
        endgame();
    } else {
        document.querySelector('.statement').textContent='Missed! Try again, guess the rolled face?'
        m1[i-1]=m;
        condition(i);
    }
    document.getElementById('trial-no').textContent=t;
    document.getElementById('trial-rem').textContent=3-t; 
}

function condition(i){
    document.getElementById('dice-0'+m1[i-1]).style.background='brown';
    if (t===3){
        p[n]=p[n-1]+0;
        n++
        f[4]=0;
        data['Round '+n]=f;
        alert('You missed it after 3 trials, I rolled a '+T+'.')
        endgame();
    } else {
        t++
    }
}
    
function endgame(){
    if(n>5){
        lastpage();
    } else {
        document.getElementById('p3').style.display='none'
        document.getElementById('p2').style.display='flex'
        initround();
    }
}
function exit(){
    var u=confirm('Are you sure you want to exit?')
    if (u){
        initialize();
    } 
};
