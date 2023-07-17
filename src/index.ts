import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
const port = process.env.PORT || 5000; 

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/perusahaan/:id', async(req, res) =>{
    const detail_perusahaan = await prisma.perusahaan.findUnique({
        where : {id : req.params.id}
    })
    res.json(detail_perusahaan)
})

app.post('/perusahaan', async(req, res) =>{
    const { nama, kode, alamat, no_telp} = req.body
    const result = await prisma.perusahaan.create({
        data: {
            nama,
            kode, 
            alamat, 
            no_telp
        }, 
    })
    res.json(result)
})

app.get('/barang/:id', async(req, res) =>{

    const detail_barang = await prisma.barang.findUnique({
        where: { kode : req.params.id}
    })
    res.json(detail_barang)
})

app.post('/barang', async(req, res) =>{
    const {kode, nama, harga, stok, perusahaan_id} = req.body
    const result = await prisma.barang.create({
        data: {
            kode,
            nama, 
            harga, 
            stok,
            perusahaan_id
        }
    })
    res.json(result)
})

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`); 
});