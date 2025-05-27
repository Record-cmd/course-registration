const axios = require('axios');

exports.read = async (req, res) => {

        const serviceKey ="인증키";
        const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";
        const region = req.params.region;
        let parmas = encodeURI('serviceKey') + '=' + serviceKey;
        parmas += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
        parmas += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
        parmas += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
        parmas += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
        parmas += '&' + encodeURI('stationName') + '=' + encodeURI(region);
        parmas += '&' + encodeURI('returnType') + '=' + encodeURI('json')
    
        const url = airUrl + parmas;
        try {
            const result = await axios.get(url);
            const airItem = { //json형식으로 저장
                region: region,
                pm10: result.data.response.body.items[0]['pm10Value'], // pm10 수치
                pm25: result.data.response.body.items[0]['pm25Value'], // pm25 수치
            }
            res.send(airItem);//json형식으로 send
        } catch (error) {
            console.log(error);
        }
    };



