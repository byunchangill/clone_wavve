{
    let userElem = document.querySelector('#localConst');
    let iuser = userElem.dataset.iuser;
    let wid = userElem.dataset.w_id;
    let nm = userElem.dataset.w_nm;
    let birthday = userElem.dataset.w_birthday;
    let gender = userElem.dataset.w_gender;
    let phone = userElem.dataset.w_phone;

    console.log(iuser);
    console.log(wid);
    console.log(nm);
    console.log(birthday);
    console.log(gender);
    console.log(phone);

    // 이메일 , 아이디 값 넣기
    const emailElem = document.querySelector('#email');
    const txtModifyName = document.querySelector('.txt-modify-name');
    if (emailElem !== null && txtModifyName !== null) {
        emailElem.innerHTML = `${wid}`;
        txtModifyName.innerHTML = `${wid}`;
    }

    //위로 올라가기
    const upElem = document.querySelector('.go-top');
    upElem.addEventListener('click', e => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 스크롤 Y축 0 이상이면 아이콘 표시하기
    window.addEventListener('scroll', e => {
        if (window.scrollY > 0) {
            upElem.style.display = "block";
        } else {
            upElem.style.display = "none";
        }
    });

    // 이름, 성별, 생일, 폰번호 변경
    const userName1 = document.querySelector('#w_nm');
    const nameVal = wid.split("@");

    if (birthday == null) {
        userName1.value = `${nameVal[0]}`;
    } else {
        userName1.value = `${nm}`;
    }
    const userBirth = document.querySelector('#w_birthday');
    if (birthday == null) {
        userBirth.value = "19800101";
    } else {
        userBirth.value = `${birthday}`;
    }

    const userPhone = document.querySelector('#w_phone');
    if (phone == null) {
        userPhone.value = "";
    } else {
        userPhone.value = `${phone}`;

    }

    const genderManElem = document.querySelector('.gender-man');
    genderManElem.addEventListener('click', (e) => {
        genderManElem.className = 'gender-man on';
        genderWomanElem.className = 'gender-woman';
        document.getElementById('user-male').checked = true;
    });

    const genderWomanElem = document.querySelector('.gender-woman');
    genderWomanElem.addEventListener('click', (e) => {
        genderWomanElem.className = 'gender-woman on';
        genderManElem.className = 'gender-man';
        document.getElementById('user-female').checked = true;
    });

    const selection = document.querySelector('.selection');
    const joinGender = document.querySelector('.join-gender');
    const txtExclamation = document.querySelector('.txt-exclamation');

    const tdElem = document.createElement('td');
    selection.appendChild(tdElem);
    if (gender) {
        if (gender === 'M') {
            tdElem.innerHTML = '남';
            joinGender.style.display = 'none';
            txtExclamation.style.display = 'none';
            document.getElementById('user-male').checked = true;
        } else if (gender === 'F') {
            tdElem.innerHTML = '여';
            joinGender.style.display = 'none';
            txtExclamation.style.display = 'none';
            document.getElementById('user-female').checked = true;
        }
    }

    const myFrmElem = document.querySelector('#myMainFrm');

    if (myFrmElem) {
        myFrmElem.addEventListener('submit', event => {
            event.preventDefault();
            const nm = myFrmElem.w_nm.value;
            const birthday = myFrmElem.w_birthday.value;
            const gender = myFrmElem.w_gender.value;
            const phone = myFrmElem.w_phone.value;

            fetch(`/user/change`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {w_nm: nm, w_birthday: birthday, w_gender: gender, w_phone: phone}
                )
            }).then(res => res.json())
                .then(data => {
                    if (data === 1) {
                        alert("회원정보 수정이 완료되었습니다.");
                        location.href = "/";
                    }
                }).catch(event => {
                console.log(event);
            });
        });
    }

    // e-mail 변경 팝업창
    const myEmailFrm = document.querySelector('#myEmailFrm');
    const popupEmail = document.querySelector('#popup-user-email');

    function onUserEmail() {
        popupEmail.style.display = 'block';
    }

    const emailPopupClose = document.querySelector('.email-popup-close');
    emailPopupClose.addEventListener('click', e => {
        popupEmail.style.display = 'none';
    });

    // Random Code 생성
    function createCode(objArr, iLength) {
        let arr = objArr;
        let randomStr = "";

        for (let j = 0; j < iLength; j++) {
            randomStr += arr[Math.floor(Math.random() * arr.length)];
        }
        return randomStr
    }

    // 숫자
    function getRandomCode(iLength) {
        let arr = "0,1,2,3,4,5,6,7,8,9".split(",");

        let rnd = createCode(arr, iLength);
        return rnd;
    }

    const emailButton = document.querySelector('#btn-authcode');
    const randomCode = getRandomCode(6);
    emailButton.addEventListener('click', e => {
        const emailVal = myEmailFrm.querySelector('#w_id');
        if (wid === emailVal.value) {
            const idErrorAlert = document.querySelector('#id-error-alert');
            const inputStyle01 = document.querySelector('.input-style01');
            idErrorAlert.className = "login-error-pink";
            idErrorAlert.innerHTML = "사용중인 이메일(아이디)입니다.";
            inputStyle01.className = "input-style01 input-with-code error-msg";
            return false;
        } else {
            const emailVal = myEmailFrm.querySelector('#w_id').value;
            fetch('/user/change/email', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {
                    address: emailVal,
                    title: "이메일 인증",
                    message: "인증번호 : " + randomCode
                })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                }).catch(e => {
                console.log(e);
            });
            alert('인증코드가 전송되었습니다. \n\n'  +
                '인증코드 전송까지 일정시간이 소요되거나 지연될 수 있습니다. \n\n' +
                '계속해서 인증코드가 전송되지 않을 경우 이메일 주소를 확인하시고 재전송해주세요. 이메일 전송시 스팸 메일로 분류될 수 있으니 스팸 메일함을 확인해 주세요.');
            const idErrorAlert = document.querySelector('#id-error-alert');
            const btnAuthcode = document.querySelector('#btn-authcode');
            idErrorAlert.className = "login-error-purple";
            idErrorAlert.innerHTML = "입력하신 이메일로 인증 코드가 전송되었습니다. 아래에 인증 코드를 입력하신 후 확인 버튼을 누르시면 이메일(아이디) 변경이 완료됩니다.";
            btnAuthcode.innerHTML = '재전송';
        }
        // 인증코드, 타임 리밋
        const chAuthCode = document.querySelector('#ch-AuthCode');
        const timeLimit = document.querySelector('#time-limit');
        const emailSubmit = document.querySelector('#emailSubmit');
        if (emailSubmit) {
            emailSubmit.addEventListener('click', e => {
                const chAuthCodeVal = myEmailFrm.querySelector('#w_id').value;
                if (randomCode === chAuthCode.value) {
                    alert('이메일(아이디) 변경이 완려되었습니다.');
                } else if (randomCode !== chAuthCode.value){
                    const codeErrorAlert = document.querySelector('#code-error-alert');
                    const chAuthCode = document.querySelector('#ch-AuthCode');
                    codeErrorAlert.className = 'login-error-pink';
                    codeErrorAlert.innerHTML = '인증코드가 일치하지 않습니다. 다시 입력해 주세요.';
                    chAuthCode.className = 'input-style01 input-style02 error-msg';
                    return false;
                }

                fetch('/user/change/email/confirm', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify( {w_id:chAuthCodeVal})
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data === 1) {
                            location.href = '/user/change';
                        }
                    }).catch(e => {
                    console.log(e);
                });
            });
        }
    });



    // 비밀번호 변경 팝업창
    const popupPassword = document.querySelector('#popup-user-password');
    const popup = document.querySelector('.password-show');
    popup.addEventListener('click', e => {
        const newPasswordVal = document.getElementById('w_pw');
        const rePasswordVal = document.getElementById('w_pwChk');

        newPasswordVal.value = '';
        rePasswordVal.value = '';

        popupPassword.style.display = 'block';
    });

    const popupOut = document.querySelector('.fadeOut');
    popupOut.addEventListener('click', e => {
        popupPassword.style.display = 'none';
    });

    // 팝업창 아이디
    const joinWrap02 = document.querySelector('.join-wrap02 > li > b:last-child');
    if (joinWrap02) {
        joinWrap02.innerText = `${wid}`;
    }

    // 팝업창 비밀번호 정규화
    function onSubmitUserPassword() {
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
        const newPasswordVal = document.getElementById('w_pw').value;
        const rePasswordVal = document.getElementById('w_pwChk').value;

        if (newPasswordVal?.length === 0) {
            alert('새 비밀번호를 입력해 주세요.');
            return false;
        } else if (rePasswordVal?.length === 0) {
            alert('새 비밀번호 확인을 입력해 주세요.');
            return false;
        } else if (newPasswordVal !== rePasswordVal) {
            alert('새 비밀번호와 확인 번호가 맞지 않습니다. 다시 입력해 주세요.');
            return false;
        } else if (!pwRegex.test(newPasswordVal) || !pwRegex.test(rePasswordVal)) {
            alert('비밀번호는 8~20자 이내로 영문 대소문자, 숫자, 특수문자 중 3가지 이상 혼용하여 입력해 주세요.연속된 숫자 또는 4자 이상의 동일 문자는 비밀번호로 사용할 수 없습니다.');
            return false;
        }
        fetch(`/user/change/password`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {w_pw: newPasswordVal}
            )
        }).then(res => res.json())
            .then(data => {
                if (data === 1) {
                    alert('비밀번호가 변경되었습니다.');
                    location.href = '/user/change';
                }
            }).catch(e => {
            console.log(e);
        });
    }
}