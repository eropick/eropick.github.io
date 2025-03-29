import {UniqueArray} from "https://eropick.github.io/solo_project/Util_js/data_util.js"
import {MathUtil} from "https://eropick.github.io/solo_project/Util_js/math_util.js"

// 중복을 제거하는 방법
// 1. Set 집합 자료구조 이용
// 2. 직접 중복 관리를 수행하는 자료구조 만들기
// 3. 반복문을 돌리면서 없어질 때까지 수행

var genCount = 0;
function generateLotto(){
    genCount++;
    let lottos = new UniqueArray();
    let nMaxCount = 6;
    while ( lottos.getLength() < nMaxCount ){
        let num = MathUtil.randomInt(1,45);
        let oldLength = lottos.getLength();
        if(lottos.push(num)==oldLength){
            console.log("중복수 :" + num);
        }
        lottos.sort((a,b)=>{ //오름차순 정렬
            return a-b; //a가 b보다 작으면 음수가 되므로 우선순위
        });
    }
    const p = document.createElement("p");
    p.innerText=genCount+"회 : "+lottos.toString();
    const output = document.querySelector('#output');
    if(output.firstChild!=null)
        output.insertBefore(p,output.firstChild);
    else
        output.append(p);
}

const btn = document.querySelector('button');
btn.addEventListener('click', generateLotto);
