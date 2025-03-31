const UserFunctions = require("../core/UserFunctions")

const postUploadClassroomCSV = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){


            const csvData = req.body.csvData
            const processedData = csvData.map(row => {
                return row.map(cell => cell.replace(/\r/g, '').trim())
            })

            const headers = processedData[0]
            const rows = processedData.slice(1)

            let numOfStudents = 0

            for (const row of rows) {
                const rowData = {}

                headers.forEach((header, index) => {
                    rowData[header] = row[index]
                })

                if (
                    !rowData.LastName || 
                    !rowData.FirstName || 
                    !rowData.ID || 
                    !rowData.Email ||
                    !rowData.LastName.trim() || 
                    !rowData.FirstName.trim() || 
                    !rowData.ID.trim() ||
                    !rowData.Email.trim()
                ) {
                    continue
                }

                const result = await UserFunctions.createStudent(rowData.FirstName, rowData.LastName, rowData.ID, rowData.Email, req.body.classroomId)

                if (result) {
                    numOfStudents++
                } else {
                    console.error('Failed to insert row:', rowData)
                }
            }


            UserFunctions.updateStudentsCount(req.body.classroomId, numOfStudents)
            res.json({ status: true, students: numOfStudents })
        }
    }
}

module.exports = postUploadClassroomCSV