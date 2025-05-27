const SocketIO = require("socket.io");
axios = require("axios");

module.exports = (server) => {
    const io = SocketIO(server, { 
        path: "/socket.io",
        cors:{                              //socket 사용시에 CORS 허용 설정
            origin: "http://localhost:5173",
            method:["GET","PUT","POST","DELETE"],
            credentials:true
        }
    });

    io.on("connection", (socket) => {       //io.sockets.on과 동일
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        console.log(
            `New Client : ${ip}, socket.id : ${socket.id}`
        );

        // 소켓 통신을 위한 소켓을 전역적으로 쓸 수 있도록 정의
        global.$socket = socket;

        socket.on('Check', function (data) { //강의코드를 DB에서 검색해서 중복여부 판별
            // 클라이언트가 전송한 데이터를 출력합니다.
            console.log('강의코드:', data.lectureId);
            console.log('제목:', data.title);
            console.log('대표교수:', data.professor);
            axios.post(`http://localhost:3000/check_lecture/${data.lectureId}`)
            .then(contacts => {
                //socket.emit('Alert', '해당 강의는 이미 신청했습니다.');
                if (contacts.data.duplicated) {
                    socket.emit('Alert', '해당 강의는 이미 신청했습니다.');
                } else {
                    socket.emit('Alert', '해당 강의를 신청합니다.');
                    socket.emit('sign', data); // 신청 진행
                }
            })
            .catch(err => { 
                console.error('에러:', err);
                socket.emit('Alert', '서버 오류 발생');
            })

        socket.on("disconnect", () => {
            console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
        });

        socket.on("error", (error) => { });

        socket.on("from client", (data) => { // 클라이언트가 넘긴 데이터
            console.log(data);
        });
    });

    socket.on('DeleteCheck', function (data) { //강의코드를 DB에서 검색해서 삭제
        // 클라이언트가 전송한 데이터를 출력합니다.
        console.log('강의코드:', data);
        axios.delete(`http://localhost:3000/lecture/${data}`)
        .then(contacts => {
            socket.emit('Alert', '해당 강의를 삭제했습니다.');
        })
        .catch(err => { 
            socket.emit('Alert', '해당 강의가 존재하지 않습니다.');
        })

    socket.on("disconnect", () => {
        console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
    });

    socket.on("error", (error) => { });

    socket.on("from client", (data) => { // 클라이언트가 넘긴 데이터
        console.log(data);
    });
});

    socket.on('Creat', function (data) { //강의코드를 DB에서 검색해서 중복여부 판별후 추가하는 소켓호출
    // 클라이언트가 전송한 데이터를 출력합니다.
    console.log('강의코드:', data.lectureId);
    axios.post(`http://localhost:3000/check_List/${data.lectureId}`)
    .then(contacts => {
        if (contacts.data.duplicated) {
            socket.emit('Alert', '해당 강의가 존재합니다.');
        } else {
            socket.emit('Alert', '해당 강의를 추가합니다.');
            socket.emit('sign', data); // 신청 진행
        }
    })
    .catch(err => { 
        console.error('에러:', err);
        socket.emit('Alert', '서버 오류 발생');
    })

socket.on("disconnect", () => {
    console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
});

socket.on("error", (error) => { });

socket.on("from client", (data) => { // 클라이언트가 넘긴 데이터
    console.log(data);
});
});


socket.on('Updata', function (data) { //강의코드를 DB에서 검색해서 해당강의 put 찾은후 소켓호출
    // 클라이언트가 전송한 데이터를 출력합니다.
    console.log('강의코드:', data.lectureId);
    axios.get(`http://localhost:3000/lectureList/${data.lectureId}`)
    .then(contacts => {
        socket.emit('Alert', '해당 강의를 수정합니다.');
        socket.emit('Updata', data);
    })
    .catch(err => { 
        socket.emit('Alert', '해당 강의가 존재하지 않습니다.');
    })

socket.on("disconnect", () => {
    console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
});

socket.on("error", (error) => { });

socket.on("from client", (data) => { // 클라이언트가 넘긴 데이터
    console.log(data);
});
});

socket.on('Delete', function (data) { //강의코드를 DB에서 검색해서 해당강의 put 찾은후 소켓호출
    // 클라이언트가 전송한 데이터를 출력합니다.
    console.log('강의코드:', data);
    axios.get(`http://localhost:3000/lectureList/${data}`)
    .then(contacts => {
        socket.emit('Alert', '해당 강의를 삭제합니다..');
        socket.emit('Delete', data);
    })
    .catch(err => { 
        socket.emit('Alert', '해당 강의가 존재하지 않습니다.');
    })

socket.on("disconnect", () => {
    console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
});

socket.on("error", (error) => { });

socket.on("from client", (data) => { // 클라이언트가 넘긴 데이터
    console.log(data);
});
});



  })
};
