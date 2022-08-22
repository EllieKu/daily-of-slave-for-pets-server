const express = require('express')
const { db } = require('./firebase/firebase')

const router = express.Router()
router.use(express.json())

router.get('/:petName', async(req, res) => {
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

router.post('/:petName', async(req, res) => {
  const { petName } = req.params
  const collectionRef = await db.collection('pet').doc(petName).collection('record')
  collectionRef.add(req.body).then(doc => {
    res.send('新增成功')
  }).catch(error => {
    console.log(error)
    res.send('Add document fail')
  })
})

router.put('/:petName/:id', async(req, res) => {
  const { petName, id } = req.params
  const collectionRef = await db.collection('pet').doc(petName).collection('record')
  collectionRef.doc(id).update(req.body).then(() =>{
    res.send('更新成功')
  }).catch(error => {
    console.log(error)
    res.send('No document to update')
  })
})

router.delete('/:petName/:id', async(req, res) => {
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