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
    const txtmodifyname = document.querySelector('.txt-modify-name');
    if (emailElem !== null && txtmodifyname !== null) {
        emailElem.innerHTML = `${wid}`;
        txtmodifyname.innerHTML = `${wid}`;
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
        if (gender === 'M'){
            tdElem.innerHTML = '남';
            joinGender.style.display = 'none';
            txtExclamation.style.display = 'none';
            document.getElementById('user-male').checked = true;
        } else if (gender === 'F'){
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
                    {w_nm: nm, w_birthday: birthday, w_gender:gender, w_phone: phone}
                )
            }).then(res => res.json())
                .then(data => {
                    if (data === 1) {
                        // location.href = "/";
                        location.href = "/user/change";
                    }

                }).catch(event => {
                console.log(event);
            });
        });
    }
}