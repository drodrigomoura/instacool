import * as express from 'express'
import * as admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

const db = admin.firestore()
const auth = admin.auth()

export default () => {
    const app = express()
    app.use(async (req, res, next) => {
        const token = (req.headers.authorization) ? req.headers.authorization : '' //tuve que agregar esto porque no me permitia asignar directamente algo undefined, entonces me aseguro de que se asigne el token o sino un string vacio
        console.log('sdadsa', token);

        try {
            const { uid, email } = await auth.verifyIdToken(token)
            const snap = await db.collection('users').doc(uid).get()
            const user = snap.data()
            Object.assign(req, {
                user: {
                    ...user,
                    uid,
                    email
                }
            })
            next()
        } catch (e) {
            res.status(403).send("Error al autorizar")
        }
    })

    app.get('/post', (req, res) => {

        res.send("Hola mundo desde express")
    })

    return app
}