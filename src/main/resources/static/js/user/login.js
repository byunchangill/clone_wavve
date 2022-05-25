{
    // email 형식 정규식
    const idRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    //대소문자+숫자+특수문자 조합으로 8글자이상 20글자 이하
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    const loginElem = document.querySelector('#myLoginFrm');

    // 로그인 에러 태크 숨기기
    document.getElementById('login-error').style.visibility = "hidden"; // hide
    document.getElementById('login-error').style.display = 'none'; // hide

    loginElem.addEventListener('submit', (e) => {
        const idVal = loginElem.w_id.value;
        const pwVal = loginElem.w_pw.value;

        if(!idRegex.test(idVal) || !pwRegex.test(pwVal)) {
            // 로그인 에러 테그 보이기
            document.getElementById('login-error').style.visibility = "visible"; // show
            document.getElementById('login-error').style.display = ''; // show
            e.preventDefault();
        }
    });
}
