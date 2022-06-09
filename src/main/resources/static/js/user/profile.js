{
    const profileFormElem = document.querySelector('#profile-form');
    const profileImgChangeButton = document.querySelector('#img-edit');
    const mainProfileImgChange = document.querySelector('#main-profile-img');
    const profileStyle = document.querySelectorAll(".profile-style");

    let dataElem = document.querySelector('#localConst');
    let iuser = dataElem.dataset.iuser;
    let wid = dataElem.dataset.w_id;
    let nickname = dataElem.dataset.w_nickname;
    let profileImg = dataElem.dataset.profileimg;

    console.log(iuser);
    console.log(wid);
    console.log(nickname);
    console.log(profileImg);

    document.getElementById('profile-wrap01').style.visibility = "hidden"; // hide
    document.getElementById('profile-wrap01').style.display = 'none'; // hide

    // 이미지 변경
    profileImgChangeButton.addEventListener('click', e => {
        document.getElementById('img-edit').style.visibility = "hidden"; // hide
        document.getElementById('img-edit').style.display = 'none'; // hide
        document.getElementById('profile-wrap01').style.visibility = "visible"; // show
        document.getElementById('profile-wrap01').style.display = ''; // show

        profileStyle.forEach(function (item) {
            item.addEventListener('click', e => {
                mainProfileImgChange.src = item.querySelector("img").src;
            });
        });
    });

    if (profileImg != null) {
        mainProfileImgChange.src = `${profileImg}`;
    } else {
        mainProfileImgChange.src = '/imgs/profile-imgs/00.png';
    }

    // 닉네임 변경
    const changeNickname = document.querySelector('#w_nickname');

    if (nickname == null) {
        changeNickname.value = "프로필1";
    } else {
        changeNickname.value = `${nickname}`;
    }

    if (profileFormElem) {
        profileFormElem.addEventListener('submit', e => {
            e.preventDefault();
            const nickname = profileFormElem.w_nickname.value;
            const profile = profileFormElem.profileImg.src;
            const src = profile.substring(21);

            fetch(`/user/profile`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({w_nickname: nickname, profileImg:src})
            }).then(res => res.json())
                .then(data => {
                    if (data === 1) {
                        location.href = "/";
                    }
                }).catch(e => {
                console.log(e);
            });
        });
    }
}