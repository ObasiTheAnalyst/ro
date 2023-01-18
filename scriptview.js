var n, data, t, total, p, m, T, m1, f, df;
n=localStorage.getItem('n')
data=getstore('data')

if (n!==1){
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

document.querySelector('.exit1').addEventListener('click',function(){
    var u=confirm('Are you sure you want to exit?')
    if (u){
        open("index.html","_self");
    } 
});

document.querySelector('.return').addEventListener('click', function(){
    open("play.html","_self")
})
function getstore(r){
    return JSON.parse(localStorage.getItem(r))
}