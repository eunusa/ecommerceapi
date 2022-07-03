const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register

router.post("/register", async (req,res) => {

    //new 연산자 변수 초기화
    const newUser = new User({ 
        //req.body는 json등의 데이터를 담을때 사용한다.
        username : req.body.username,
        email : req.body.email,
        //보완적용, env(서버개발자와 공유할 키값) 사용, tostring 숫자를 문자열로 변환
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(), 
    });
    try{ 

    //save 메소드는 데이터 베이스에 저장
    const savedUser = await newUser.save(); 
    res.status(201).json(savedUser); //json 배열과 같은 포맷
    }catch(err){
     res.status(500).json(err);
    };
});

//login

router.post("/login", async (req,res)=>{
    try{

    const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong Credentials!");

    const hashePassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC); //암호 복호화 과정 https://daehopark.tistory.com/entry/NodeJS-CryptoJS-AES-%EC%95%94%EB%B3%B5%ED%98%B8%ED%99%94-%EC%98%88%EC%A0%9C
    const OriginalPassword = hashePassword.toString(CryptoJS.enc.Utf8);

    //jwt 사용 id와 isAdmin에 적용
    OriginalPassword !==req.body.password && 
        res.status(401).json("Wrong Credentials!");

        //jwt.sign 토큰 발급
        const accessToken = jwt.sign({ 
            id:user._id, 
            isAdmin:user._isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn:"3d"} // 시간 범위를 나타내는 문자열
        );

        const { password, ...others} = user._doc;
        //password를 user 전체 값을 others에 넣음 (결과값중 _doc 만 블러옴)
        res.status(200).json({...others, accessToken}); // 결과값 출력 ...array 해제
    }catch(err){
        res.status(500).json(err)
    };
});


module.exports = router;

//async 가 성공했을때 try 동작 실패했을때 catch 영역 동작
//https://velog.io/@vraimentres/async-%ED%95%A8%EC%88%98%EC%99%80-try-catch
//https://ko.javascript.info/async-await

//https://ko.javascript.info/try-catch
//try 영역 코드 실행 에러가 없다면 catch 영역은 건너 뛴다.
