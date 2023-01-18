var n, data, t, total, p, m, T, m1, f, df;
n=Number(localStorage.getItem('n'))
m1=getstore('m1')
p=getstore('p')
data=getstore('data')
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
G[4]=((G[1]+G[2]+G[3])*100).toFixed(1)
document.getElementById('G'+4).textContent=G[4]+'%'
if (G[0]>0.75){
    document.getElementById('remarks').textContent='Your performance is very poor.'
} else if (G[0]<=0.75 && G[0]>0.5){
    document.getElementById('remarks').textContent='Your performance is poor.'
} else if (G[0]<=0.5 && G[0]>0.25){
    document.getElementById('remarks').textContent='Your performance is fair.'
} else {
    document.getElementById('remarks').textContent='Your performance is very good.'
}

document.querySelector('.exit2').addEventListener('click',exit);
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

var x1=new Array()
var y1=new Array()
for (let i = 0; i < 5; i++) {
    x1[i]= data['Round '+(i+1)][4];
    y1[i]= 'Round '+(i+1)
}

var data11=[{
    type: 'bar',
    marker: {
        color: "crimson",
    },
    x:x1,
    y:y1,
    orientation: 'h'
}];
var layout11={
    title: '<span style=""> Bar Chart showing points gained per round </span>',
    xaxis: {
        title: '<span style="">Points<span>',
        tickmode: 'linear',
        tick0: 0,
        dtick: 1.0,
        gridwidth: 0.4,
        griddash:'dash',
    },
    margin: {
        l: 100,
        r: 20,
        t: 200,
        b:70
    },
    yaxis: {
        title: '<span style="">Rounds<span>',
    
    },
    width: 600,
    height: 600,
    paper_bgcolor:'linear-gradient(to top left, rgb(19, 8, 8) 0%, rgb(24, 17, 17) 16.6%, rgb(61, 54, 54) 33.3%, rgb(102, 99, 99) 50%, rgb(61, 54, 54) 66.6%, rgb(24, 17, 17) 83.3%, rgb(19, 8, 8) 100%)',
    plot_bgcolor: 'linear-gradient(to top left, rgb(19, 8, 8) 0%, rgb(24, 17, 17) 16.6%, rgb(61, 54, 54) 33.3%, rgb(102, 99, 99) 50%, rgb(61, 54, 54) 66.6%, rgb(24, 17, 17) 83.3%, rgb(19, 8, 8) 100%)', 
    font:{
        family: 'Arial',
        color: 'white',
        size: 16,
        family: 'Courier New, monospace'
    },

}
let config={
    responsive: true,
    staticPlot: true,
    scale: 1
}

Plotly.newPlot('plot_div',data11,layout11,config)

var data12 = [{
    values: [G[4], 100-G[4]],
    labels: ['Accuracy', 'Failure'],
    name: 'Guessing accuracy',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie',
    marker: {
        color: 'orange',
    }
  }]
  var layout12 = {
    height: 400,
    width: 500,
  };
  
  Plotly.newPlot('donut', data12, layout12,config);

  var data13 = [{
    values: [G[3],G[2],G[1],G[0]],
    labels: ['Ist trial', '2nd trial', '3rd trial', 'total miss'],
    type: 'pie'
  }];
  var layout23 = {
    height: 400,
    width: 500,
    paper_bgcolor:'linear-gradient(to top left, rgb(19, 8, 8) 0%, rgb(24, 17, 17) 16.6%, rgb(61, 54, 54) 33.3%, rgb(102, 99, 99) 50%, rgb(61, 54, 54) 66.6%, rgb(24, 17, 17) 83.3%, rgb(19, 8, 8) 100%)',
    plot_bgcolor: 'linear-gradient(to top left, rgb(19, 8, 8) 0%, rgb(24, 17, 17) 16.6%, rgb(61, 54, 54) 33.3%, rgb(102, 99, 99) 50%, rgb(61, 54, 54) 66.6%, rgb(24, 17, 17) 83.3%, rgb(19, 8, 8) 100%)',
  };
  
  Plotly.newPlot('pie', data13, layout23,config);


var element=document.getElementById('pdf');
var opt={
    margin: 1,
    filename: 'Legendre Calculator.pdf',
    image: {type: 'jpeg', quality:0.98},
    html2canvas: {scale:3},
    jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'l'
    },
    pagebreak: {
        before: ['#pdiv', 'GG','#pie','#appraisal'],
        after: ['.table-wrapper','#pdiv','GG']
    }
};

function finish() {
    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
        var totalPages = pdf.internal.getNumberOfPages();
        for (i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(12);
            pdf.setTextColor(151);
            pdf.text(0.4, pdf.internal.pageSize.getHeight() - 0.5, "ROLL 'n' GUESS | Copyright 2023 | Designer: INNOCENT OBASI");
            pdf.addImage("pic.jpg", 'JPEG', pdf.internal.pageSize.getWidth() - 1.1, pdf.internal.pageSize.getHeight() - 1, 0.65, 0.8);
            pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 1.4, 0.5);
        } 
    }).save();
}
document.querySelector('.download').addEventListener('click',finish)
