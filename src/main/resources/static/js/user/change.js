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

    // 팝업창
    const popupPassword = document.querySelector('#popup-user-password');
    const popup = document.querySelector('.password-show');
    popup.addEventListener('click', e => {
        const newPasswordVal = document.getElementById('w_pw');
        const rePasswordVal = document.getElementById('w_pwChk');

        newPasswordVal.value = '';
        rePasswordVal.value = '';

        popupPassword.style.display = 'block';
    });

    const popupOut = document.querySelector('#fadeOut');
    popupOut.addEventListener('click', e => {
        popupPassword.style.display = 'none';
    });

    // 팝업창 아이디
    const joinWrap02 = document.querySelector('.join-wrap02 > li > b:last-child');
    if (joinWrap02) {
        joinWrap02.innerText = `${wid}`;
    }

    const myPwFrm = document.getElementById('myPwFrm');
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
                {w_pw : newPasswordVal}
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