  
const fs = require('fs');
const https = require('https');
const path = require('path');
const url = 'https://coderbyte.com/api/challenges/json/age-counting';
const crypto = require('crypto')

//fetching api... 
(() => {
    https.get(`${url}`, (res) => {
        const data = [];

        res.on('data', chunk => data.push(chunk));
        res.on('end', () => {
            const users = JSON.parse(Buffer.concat(data).toString());
            // console.log(users)
            let splittedData = users.data.split(",");
            // console.log(splittedData);
            // console.log(splittedData[1])

            let formatAge = splittedData.map((age) => {
                return age.replace(' age=', '')
            })

            // console.log(formatAge);

            let formatKey = formatAge.map((key) => {
                return key.replace(' key=', '') 
            })
            //  console.log(formatKey)

             let newArray = []

             for (let i = 0; i < formatKey.length; i = i + 2) {
                 newArray.push({key: formatKey[i], age: formatKey[i + 1]})
             }

             arr = newArray.filter(item => item.age == '32')
            // arr.forEach(element => JSON.stringify(element, 2))
            console.log(arr)
            const writeStream = fs.createWriteStream(path.join(__dirname, 'output.txt'))

            let finalResult = JSON.stringify(arr, 2, '\n')
            writeStream.write(finalResult)

            const hash = crypto.createHash('SHA1');
            hash.on('readable', () => {
                const data = hash.read();

                if(data) {
                    let hug = data.toString('hex')
                    console.log(hug)
                }
            })

            hash.write('this is the SHA1 hash of the response');
            hash.end();
        })


    }).on('error', err => console.log('Error: ', err));
    
})();