const express = require ('express')
const port = 3000
const uuid = require('uuid')



const app = express()
app.use(express.json())


const users = []

app.get('/users', (request, response) => {
return response.json(users)
})


app.post('/users', (request, response) => {
    const {name, age} = request.body
    
    
    console.log(uuid.v4())
   const user = {id:uuid.v4(), name, age }

   users.push(user)
    return response.status(201).json(user)
})

    app.put('/users/:id', (request, response) => {
        const {id} = request.params
        const {name, age} = request.body
        const updateuser = {id, name, age}
        const index = users.findIndex (user => user.id ===id)
        if (index <0){
            return response.status(404).json({message: "user not found"})
        }

        users [index] = updateuser

return response.json(updateuser)
    })


    app.delete('/users/:id', (request, response) => {
        const {id} = request.params
        const index = users.findIndex (user => user.id ===id)

        if (index <0){
            return response.status(404).json({message: "user not found"})
        }

        users.splice(index,1)

        return response.status(202).json()
    })

app.listen(port , () => {
    console.log(`🚀Servidor iniciado porta ${port}`)
})