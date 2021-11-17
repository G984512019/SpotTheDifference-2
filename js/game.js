const APPLICATION_KEY = "69f808da4b0a1f5dfab13876585a17deb540a961b5655da835de3a4d8225cbbc";
const CLIENT_KEY = "d466410833797e9bcf40dc598864e3de8f9ba304a1d247d000e04786f3d1b5e9";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";

let TestClass = ncmb.DataStore(DBName);

let timer = null;
const MAX = 3;
let count = 0;

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
    let size = 5;
    let qNum = Math.floor(Math.random()*q.length);

    for(let i=0; i<size*size; i++){
      let s = document.createElement("span");
      s.textContent = q[qNum][0];
      s.setAttribute("id","num"+i);
      s.addEventListener("click", function(){
        if( this.textContent == q[qNum][1]){
          //alert("正解");
          correct.play();
          while (cells.firstChild) {
            cells.removeChild(cells.firstChild);
          }
          count++;
          if(count< MAX){
            gameStart();
          }else{
            clearTimeout(timer);
            alert("Game clear！");
            save();
            load();

          }

        }else{
          wrong.play();
        }
      });
      cells.appendChild(s);
      if(i%size == size - 1){
        const br = document.createElement("br");
        cells.appendChild(br);
      }
    }
    let p = Math.floor(Math.random()*size*size);
    let ans = document.getElementById("num"+p);
    ans.textContent = q[qNum][1];

}


function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime()) / 1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}

function save(){
  let test = new TestClass();
  let key = "message";
  //let value = "Hello, NCMB!";
  const text = document.getElementById('message');
  let value = timer;
  test.set(key, parseInt(value));
  test.save()
  .then(function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生:"+ err);
  });
}

function load(){
  TestClass
  .order("message")
  .fetchAll()
  .then(function(results){
    for(let i=0; i<results.length; i++){
      console.log(results[i].message);
      //console.log(timer<results[0].message);

      if(timer<results[0].message){
        alert("High score！"+timer);
      }
    }
  })
  .catch(function(err){
    console.log("エラー発生:"+ err);
  });
}
