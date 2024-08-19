const serverless = require("serverless-http")
const express = require("express")
const AWS = require("aws-sdk")

const app = express();

const USERS_TABLE = process.env.USERS_TABLE
const HELPINHO_TABLE = process.env.HELPINHO_TABLE

const DynamoDB = new AWS.DynamoDB.DocumentClient()

app.use(express.json())


app.get("/users", async (req, res, next) => {
  const params = {
    TableName: USERS_TABLE,
  }
  try {
    const result = await DynamoDB.get(params).promise()
    const item = result.Item 

    return {
      statusCode: res.status(200),
      body: res.json(item),    
    }
  } catch (err) {
    return {
      statusCode: res.status(404),
      message: res.json(err.message),
    }
  }
})

app.get("users/:userId", async (req, res) => {
  const { userId } = req.params.userId
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId : userId,
    },
  }
  try {
    const result = await DynamoDB.get(params).promise()
    const item = result.Item 
    if(item) {
      return {
        statusCode: res.status(200),
        body: res.json(item),
      }
    }
    else {
      return {
        statusCode: res.status(404),
        message: res.json("Usuário não encontrado!"),
      }
     }
  } catch (err) {
    return {
      statusCode: res.status(500),
      message: res.json(err.message),
    }
  }
})

app.put("/users/:userId", async (req, res) => {
  const { userId } = req.params.userId
  const { name, email, password } = req.body
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId,
    },
    UpdateExpression: "SET name = :n, email = :e, password = :p",
    ExpressionAttributeValues: {
      ":n": name,
      ":e": email,
      ":p": password,
    },
    ReturnValues: "UPDATED_NEW",
  }
  try {
    await DynamoDB.update(params).promise()
    return {
      statusCode: res.status(200),
      body: res.json("Usuário atualizado com sucesso!"),
    }
  } catch (err) {
    return {
      statusCode: res.status(500),
      message: res.json(err.message),
    }
  }
})

app.delete("users/:userId", async (req, res) => {
  const { userId } = req.params.userId
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId : userId,
    },
  }
  try {
    const result = await DynamoDB.delete(params).promise()
    const item = result.Item 
    return {
      statusCode: res.status(200),
      body: res.json(item),
    }
  } catch (err) {
    return {
      statusCode: res.status(500),
      message: res.json(err.message),
    }
  }
})

app.post("/users", async (req, res) => {
  const { userId, name, email, password } = req.body
  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      name,
      email,
      password,
    },
  }
  try {
    await DynamoDB.put(params).promise()
    return {
      statusCode: res.status(200),
      body: res.json({ userId , name}),
    }
  } catch (err) {
    return {
      statusCode: res.status(500),
      message: res.json(err.message),
    }
  }
})

app.get("/helpinho", async (req, res) => {
  const params = {
    TableName: HELPINHO_TABLE,
  }
  try {
    const result = await DynamoDB.get(params).promise()
    const items = result.Item

    return {
      statusCode: res.status(200),
      body: res.json(items),
    }
  } 
  catch (err) {
    return {
      statusCode: res.status(404),
      message: res.json(err.message),
    }
  }

})

app.get("/helpinho/:helpinhoId", async (req, res) => {
  const { helpinhoId } = req.params.helpinhoId
  const params = {
    TableName: HELPINHO_TABLE,
    Key: {
      helpinhoId: helpinhoId,
    },
  }
  try {
    const result = await DynamoDB.get(params).promise()
    const item = result.Item 
    if(item) {
      return {
        statusCode: res.status(200),
        body: res.json(item),
      }
    }
    else {
      return {
        statusCode: res.status(404),
        message: res.json("Helpinho não encontrado!"),
      }
     }
  } catch (err) {
    return {
      statusCode: res.status(500),
      message: res.json(err.message),
    }
  }
})

app.delete("/helpinho/:helpinhoId", async (req, res) => {
  const { helpinhoId } = req.params.helpinhoId
  const params = {
    TableName: HELPINHO_TABLE,
    Key: {
      helpinhoId: helpinhoId,
    },
  }
  try {
    const result = await DynamoDB.delete(params).promise()
    const item = result.Item 
    return {
      statusCode: res.status(200),
      body: res.json(item),
    }
  } catch (err) {
    return {
      statusCode: res.status(500),
      message: res.json(err.message),
    }
  }
})

app.post("/helpinho", async (req, res) => {
  const { helpinhoId, userId, photo, title, description, goal, owner, category, time, bankInfo } = req.body
  const params = {
    TableName: HELPINHO_TABLE,
    Item: {
      helpinhoId,
      userId,
      photo,
      title,
      description,
      goal,
      owner,
      category,
      time,
      bankInfo,
    },
  }
  try {
    await DynamoDB.put(params).promise()
    return {
      statusCode: res.status(200),
      body: res.json({ helpinhoId, userId, title }),
    }
  } catch (err) {
    return {
      statusCode: res.status(500),
      message: res.json(err.message),
    }
  }
})

app.post("/login", async () => {
  // Implementar login usando AWS Cognito
  // Retornar JWT com dados do usuário
})


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  })
})

const handler = serverless(app)

module.exports =  {
  handler
}