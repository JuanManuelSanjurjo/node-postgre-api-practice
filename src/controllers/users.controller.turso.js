import { client } from "../tursoDB.js"


export const getUsersTurso = async (req, res) =>{
    try{
        const { rows } = await client.execute("SELECT * FROM myUsers")
        res.json(rows)
    }catch(err){
        console.log(err)
        res.status(400).json({msg: "Error getting users from TURSO"})
    }
}

export const getUserByIdTurso =  async (req, res) => {
    const {id} = req.params
    try{
        const { rows } = await client.execute(`SELECT * FROM myUsers where id =${id}`)
        if(rows.length === 0){
            return res.status(404).json({msg: "user not found"})
        }
    res.json(rows)
    }catch(err){
        console.log(err)
        res.status(400).json({msg: "Error getting user from TURSO"})
    }
}

export const createUserTurso =  async (req, res) => {
    const {name, email} = req.body
    try{
        const {rows, rowsAffected} = await client.execute({ sql: `INSERT INTO myUsers (name, email) VALUES ( ?, ?) RETURNING *`, args: [name, email]})
        
        if(rowsAffected){
            const response = {rows, rowsAffected, msg : "user created"}
            return res.json(response)
        }
        res.json({msg: "User was not created"})
    }catch(err){
        console.log(err)
        res.status(400).json({msg: "Error creating user"})
    }
}

export const deleteUserTurso =  async (req, res) => {
    const {id} = req.params
    try{
        const { rows,rowsAffected } = await client.execute(`DELETE FROM myUsers where id =${id} RETURNING *`)
        if(rowsAffected){
            const response = {rows, rowsAffected, msg : "user deleted"}
           return  res.json(response)
        }
        return res.status(404).json({msg: "user not found"})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg: "Error deleting user"})
    }
}

export const modifyUserTurso =  async (req, res) => {
    const {id} = req.params
    const {name, email} = req.body
    try{
        const { rows, rowsAffected } = await client.execute({sql: `UPDATE myUsers SET name= ?, email= ? where id= ? RETURNING *`, args: [name, email, id]})
        if(rowsAffected){
            const response = {rows, rowsAffected, msg : "user modified"}
           return  res.json(response)
        }
        return res.status(404).json({msg: "user not found"})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg: "Error updating user"})
    }

}