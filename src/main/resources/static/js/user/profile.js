const profileFormElem = document.querySelector('#profile-form');
const profileImgChangeButton = document.querySelector('#img-edit');
const mainProfileImgChange = document.querySelector('#main-profile-img');
const profileImgChange = document.querySelectorAll(".profile-style");

const dataElem = document.querySelector('#localConst');
const iuser = dataElem.dataset.iuser;
const wid = dataElem.dataset.w_id;
const nickname = dataElem.dataset.w_nickname;
const profileImg = dataElem.dataset.profileImg;

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

    profileImgChange.forEach(function (item) {
        item.addEventListener('click', e => {
            mainProfileImgChange.src = item.querySelector("img").src;
        });
    });
});

// 닉네임 변경
const nicknameElem = document.querySelector('.profile-wrap02');
const changeNickname = nicknameElem.querySelector('#name-change');
if (changeNickname) {
    if (nickname == null) {
        changeNickname.value += "프로필1";
    } else {
        changeNickname.value += `${nickname}`;
    }
}

if (profileFormElem) {
    profileFormElem.addEventListener('submit', e => {
        e.preventDefault();

        fetch(`/user/profile`,{
            method : 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({w_nickname: nickname})
        }).then(res=>res.json())
            .then(data=>{
                if(data === 1){
                    location.href = "/";
                }
            }).catch(e => {
            console.log(e);
        });
    });
}

console.log(nickname);