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

app.get('/perusahaan', async(req, res) =>{
    const list_Perusahaan = await prisma.perusahaan.findMany()
    res.json(list_Perusahaan)
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

//FIX ME : ini codenya untested, tolong debug dulu 
app.put('/perusahan/:id', async(req, res)=>{
    const { nama, kode, alamat, no_telp} = req.body

    try {
        const perusahaanData = await prisma.perusahaan.findUnique({
            where: {id : req.params.id}
        })

        const updatedPerusahaan = await prisma.perusahaan.update({
            where: { id : req.params.id || undefined },
            data : {
                nama,
                kode, 
                alamat, 
                no_telp
            }
        })
    } catch (error) {
        res.json({error : 'Tidak ada perusahaan dengan ID ${id}'})
    }
})

app.get('/barang/:id', async(req, res) =>{

    const detail_barang = await prisma.barang.findUnique({
        where: { kode : req.params.id}
    })
    res.json(detail_barang)
})

app.get('/barang', async(req, res)=>{
    const list_barang = await prisma.barang.findMany()
    res.json(list_barang); 
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