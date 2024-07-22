const express = require("express");

const app = express()


const URL = '127.0.0.1'

// safe mellan 8000 till 9000
const PORT = 8000
app.use(express.json())

const server = app.listen(PORT, URL, () => {


    let host = server.address().address
    let port = server.address().port

    console.log(`server running at http://${host}:${port}`)
})

// app.listen, skulle räka för vår exampel idag då vi inte kommer att ändra mycket på servern 







let employees = [

    {
        "name": "Ali", 
        "age": 33,
        "salary": 100,
        "id": 4
    },

    {
        "name": "Gheath", 
        "age": 23,
        "salary": 130,
        "id": 2
    },

    {
        "name": "Louice", 
        "age": 23,
        "salary": 300,
        "id": 3
    }


]


app.get('/', (req, res) => {

    let svar = "<h1> hellow node </h1>"
    res.send(svar)
})

app.get('/employees', (req, res)=> {

    res.json(employees)
})

app.get('/employees3/:id', (req, res)=> {

    for(let i = 0; i < employees.length; i++){

        if(employees[i].id == req.params.id){

            res.json(employees[i])
            return
        }

    }
    res.status(404).send("employee not found")
})

app.get('/employees1/:id', (req, res) =>{

    let employee = employees.find(emp => emp.id == req.params.id)

    if(employee){
        res.json(employee)
    
    }else{
        res.status(404).send("employee not found")

    }
})

app.get('/employees2', (req, res) => {

    let employee = employees.find(emp => emp.id == req.query.id)

    if(employee){
        res.json(employee)
    
    }else{
        res.status(404).send("employee not found")

    }

})


app.post('/employees', async (req, res) => {


    newId = await getNewId()

    let newEmployee = {

        "id": newId ,
        "name": req.body.name, 
        "salary": req.body.salary, 
        "age":  req.body.age
    } 

    employees.push(newEmployee)


    res.status(201).json(newEmployee)
})


app.delete('/employees', (req, res) => {

    let newArray = employees.filter(emp => emp.id != req.query.id)

    if(newArray.length == employees.length){
        res.status(404).send("employee not found to delete")
        return
    }

    employees = newArray
    res.send("deleted employee")
})

app.put('/employees', (req, res) => {
    let employee = employees.find(emp => emp.id == req.body.id)

    if(employee == null){
        res.status(404).send("employee not found to update")
        return
    } else{
        employee.name = req.body.name ? req.body.name: employee.name 
        employee.age = req.body.age ? req.body.age: employee.age 
        employee.salary = req.body.salary? req.body.salary: employee.salary

        res.json(employee)
    }
})


function getNewId(){

    let highestId = employees.reduce((maxId, employee) =>{

       return  Math.max(maxId, employee.id)
    }, 0)


    return highestId + 1

}