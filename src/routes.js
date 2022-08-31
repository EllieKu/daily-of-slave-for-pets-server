const express = require('express')
const cors = require('cors')
const { db } = require('./firebase/firebase')
const { response } = require('express')

const router = express.Router()
router.use(express.json())

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  credentials: true
}

router.get('/:user', cors(corsOptions), async(req, res) => {
  const { user } = req.params
  const documentRef = await db.collection('slave').doc(user)
  documentRef.get().then(response => {
    const data = response.data()
    console.log(data)
    res.send(data.pets)
  })
  
})

router.get('/:user/:petName', cors(corsOptions), async(req, res) => {
  const { petName } = req.params
  const collectionRef = await db.collection('pet').doc(petName).collection('record')
  collectionRef.get().then(documents => {
    let data = []
    documents.forEach(document => {
      const result = Object.assign(document.data(), {id: document.id})
      data.push(result)
    })
    res.send(data)
  }).catch(error => {
    res.send(error)
  })
})

router.post('/:user/:petName', cors(corsOptions), async(req, res) => {
  const { petName } = req.params
  const collectionRef = await db.collection('pet').doc(petName).collection('record')
  collectionRef.add(req.body).then(doc => {
    res.send('新增成功')
  }).catch(error => {
    console.log(error)
    res.send('Add document fail')
  })
})

router.put('/:user/:petName/:id', cors(corsOptions), async(req, res) => {
  const { petName, id } = req.params
  const collectionRef = await db.collection('pet').doc(petName).collection('record')
  collectionRef.doc(id).update(req.body).then(() =>{
    res.send('更新成功')
  }).catch(error => {
    console.log(error)
    res.send('No document to update')
  })
})

router.delete('/:user/:petName/:id', cors(corsOptions), async(req, res) => {
  const { petName, id } = req.params
  const collectionRef = await db.collection('pet').doc(petName).collection('record')
  collectionRef.doc(id).delete().then(() => {
    res.send('刪除成功')
  }).catch(error => {
    console.log(error)
    res.send('delete the document fail')
  })
})

module.exports = router