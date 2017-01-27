var cheerio = require('cheerio');
var fs = require('fs')
var inputFile = process.argv[2]
var outputFile = process.argv[3]

fs.readFile(inputFile, 'utf8', function(err, html) {
    if (!err) {
        var $ = cheerio.load(html);
        var outputData = ""
        $('tr').each(function() {
            var repoName = $(this).find('.left .list').text()
            var age = $($(this).find('td')[4]).find('span').text()
            var ageInDays = ""
            switch (true) {
                case (age.indexOf("4 weeks") != -1):
                    //do nothing
                    break
                case (age.indexOf("weeks") != -1):
                    ageInDays = parseInt(age.substring(0, age.indexOf(" ")) * 7)
                    outputData += repoName + " " + ageInDays + " days\n"

                    break
                case (age.indexOf("months") != -1):
                    ageInDays = " >" + parseInt(age.substring(0, age.indexOf(" ")) * 28)
                    outputData += repoName + " " + ageInDays + " days\n"

                    break
                case (age.indexOf("years") != -1):
                    ageInDays = " >" + parseInt(age.substring(0, age.indexOf(" ")) * 365)
                    outputData += repoName + " " + ageInDays + " days\n"

                    break
                default:
                    break
            }
        })
        fs.writeFile(outputFile, outputData, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }
})