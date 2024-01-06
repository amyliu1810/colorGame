
let mainBox = document.querySelector('.mainBox');
let score = 0;

createBox(1);

function boxSize(lv = 1) {
    return (500 - (lv * 10 + 20)) / (lv + 1)
};

function createBox(lv) {
    let blockNumber = (lv + 1) * (lv + 1);
    console.log(boxSize(lv));

    let randomNumber = Math.floor(Math.random() * blockNumber);
    // 顏色隨機100~256
    let r = (Math.floor(Math.random() * 156) + 100);
    let g = (Math.floor(Math.random() * 156) + 100);
    let b = (Math.floor(Math.random() * 156) + 100);

    mainBox.innerHTML = '';
    for (let i = 0; i < blockNumber; i++) {
        if (i == randomNumber) {
            mainBox.innerHTML += `<div class="box answer" style="opacity:${changeOpacity(lv)};height: ${boxSize(lv)}px; width: ${boxSize(lv)}px; 
            background-color: rgb(${r}, ${g}, ${b});"></div>`;
        } else {
            mainBox.innerHTML += `<div class="box" style="height: ${boxSize(lv)}px; width: ${boxSize(lv)}px; 
            background-color: rgb(${r}, ${g}, ${b});"></div>`;
        }
    };


    let boxes = document.querySelectorAll('.box');
    console.log(boxes);

    boxes.forEach(function (box) {
        box.addEventListener('click', function () {
            if (box.classList.contains('answer')) {
                console.log('方塊被點擊');
                let nextLevel = lv + 1;
                createBox(nextLevel);
                score++; // 得分增加
                document.querySelector('.score').textContent = 'SCORE:' + score; // 更新得分顯示
            } else {
                alert('oooh!! 答錯了! ( ´•̥̥̥ω•̥̥̥` ) 看來要多吃點葉黃素!');
            }
        });
    });
};


// 計時器+等級評分   (計時器跟點擊事件要放在外面)
let time = 59;
let storedTime;
let timeBox = document.querySelector('.time');
let btn = document.querySelector('button');
let getRating = document.querySelector('score');

let timerB = setInterval(() => {
    function getRating(score) {
        if (score <= 5) {
            return 'Lv.5 眼睛還好嗎?';
        } else if (score <= 10) {
            return 'Lv.10 算你厲害，下次檢查視力！';
        } else if (score <= 20) {
            return 'Lv.15 太膩害了！給你一個榮譽大拇指';
        }
    }
    timeBox.innerHTML = time;
    if (time <= 0) {
        clearInterval(timerB);
        btn.innerHTML = 'PLAY AGAIN';
        alert(`您的評分等級：${getRating(score)}`);
    }
    time--;
}, 1000);



// 點擊時
let flag = 1; //初始為1
btn.addEventListener('click', () => {
    if (flag == 1) {
        clearInterval(timerB);
        btn.innerHTML = 'CONTINUE';
        storedTime = time; //儲存剩餘時間
        flag = 0;
    } else {
        btn.innerHTML = 'PAUSE';
        time = storedTime; //恢復剩餘時間
        timerB = setInterval(() => {
            timeBox.innerHTML = time;
            if (time <= 0) {
                clearInterval(timeBox);
            }
            time--;
        }, 1000);
        flag = 1;
    }
});

//提升難度
function changeOpacity(lv) {
    return lv * 0.09;
};
