const router = require("express").Router();

router.get("/usertest", (req, res) => {
    res.send("user test is successfull");

});

router.post("/userposttest",(req,res)=>{
    const username = req.body.username;
    res.send("your name is :" + username)
    
})
//클라이언트에서 서버로 request body 에 담아서 보낸 후 req.body로 처리https://kasterra.github.io/handle-POST-data-in-express/

module.exports = router


/* https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-%EB%9D%BC%EC%9A%B0%ED%84%B0-Router

라우터로 파일을 만들어서 연결 할 수 있다.*/