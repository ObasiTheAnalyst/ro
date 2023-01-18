
var n, data, t, total, p, m, T, m1, f, df;
initialize()

function initialize(){
    localStorage.clear();
    p= new Array();
    p[0]=0;
    storechange("p",p);
    n=1;
    localStorage.setItem("n",n);
    data=new Object();
    storechange("data",data);
};

function storechange(r,q){
    localStorage.setItem(r,JSON.stringify(q));
}

