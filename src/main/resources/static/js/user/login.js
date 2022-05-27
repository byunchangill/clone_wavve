// email 형식 정규식
const idRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
//대소문자+숫자+특수문자 조합으로 8글자이상 20글자 이하
const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

const loginElem = document.querySelector('#myLoginFrm');

// 로그인 에러 태크 숨기기
document.getElementById('login-error').style.visibility = "hidden"; // hide
document.getElementById('login-error').style.display = 'none'; // hide

// 로그인 버튼 클릭하고 아이디, 비밀번호 오류시 나타나는 에러
loginElem.addEventListener('submit', (e) => {

    const idVal = loginElem.w_id.value;
    const pwVal = loginElem.w_pw.value;

    if (!idRegex.test(idVal) || !pwRegex.test(pwVal)) {
        // 로그인 에러 테그 보이기
        document.getElementById('login-error').style.visibility = "visible"; // show
        document.getElementById('login-error').style.display = ''; // show
        e.preventDefault();
    }

    // 아이디 저장을 체크 하였을때
    if (document.myLoginFrm.id_save.checked === true) {
        //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
        setCookie("id", document.myLoginFrm.w_id.value, 7);
      // 아이디 저장을 체크 하지 않았을때
    } else {
        //날짜를 0으로 저장하여 쿠키삭제
        setCookie("id", document.myLoginFrm.w_id.value, 0);
    }

    //유효성 검사가 통과되면 서버로 전송.
    document.myLoginFrm.submit();
});

window.onload = function () {
    // getCookie함수로 id라는 이름의 쿠키를 불러와서 있을경우
    if (getCookie("id")) {
        //input 이름이 id인곳에 getCookie("id")값을 넣어줌
        document.myLoginFrm.w_id.value = getCookie("id");
        // 체크는 체크됨으로
        document.myLoginFrm.id_save.checked = true;
    }

}

//쿠키 저장함수
function setCookie(name, value, expiredays)
{
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires="
        + todayDate.toGMTString() + ";"
}

// 쿠키 불러오는 함수
function getCookie(Name) {
    var search = Name + "=";
    // 쿠키가 있다면
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        // 쿠키가 존재한다면
        if (offset !== -1) {
            // 쿠키값의 인덱스 시작 설정
            offset += search.length;
            // 쿠키값의 인덱스 끝 설정
            end = document.cookie.indexOf(";", offset);
            if (end === -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
}

