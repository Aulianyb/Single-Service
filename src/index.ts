import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import { User, Barang, Perusahaan, Response, BarangWithPerusahaan } from './models/models';
const port = process.env.PORT || 5000; 
import jwt from 'jsonwebtoken'; 

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'https://ohl-fe.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next(); 
})

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
    res.json(`Berhasil menambahkan ${result.nama}!`)
})

app.put('/perusahaan/:id', async(req, res)=>{
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
        res.json(`Berhasil update ${updatedPerusahaan.nama}!`); 
    } catch (error) {
        res.json({error : `Tidak ada perusahaan dengan ID ${req.params.id}`})
    }
})

app.delete('/perusahaan/:id', async(req, res)=>{
    try {
        const perusahaanData = await prisma.perusahaan.delete({
            where: {id : req.params.id}
        })
        res.json(`Berhasil menghapus ${perusahaanData.nama}!`); 
    } catch {
        res.json({error : `Tidak ada perusahaan dengan ID ${req.params.id}`})
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
    res.json(`Berhasil menambahkan ${result.nama}!`)
})

app.put('/barang/:id', async (req,res)=>{
    const {kode, nama, harga, stok, perusahaan_id} = req.body
    try {
        const barangData = await prisma.barang.findUnique({
            where: {id : req.params.id}
        })

        const updatedBarang = await prisma.barang.update({
            where: { id : req.params.id || undefined },
            data : {
                kode,
                nama, 
                harga,
                stok, 
                perusahaan_id
            }
        })
        res.json(`Berhasil update ${updatedBarang.nama}!`);  
    } catch (error) {
        res.json({error : `Tidak ada barang dengan ID ${req.params.id}`})
    }
})

app.delete('/barang/:id', async (req, res) =>  {
   try {
        const barangData = await prisma.barang.delete({
            where: {id : req.params.id}
        })
        res.json(`Berhasil menghapus ${barangData.nama}!`);  
   } catch {
        res.json({error : `Tidak ada barang dengan ID ${req.params.id}`})
   } 
})

app.post('/login', async (req, res) =>{
    const {username, password} = req.body
    try{
        const adminData = await prisma.user.findFirst({
            where : {username : username}
        })

        if (adminData?.password == password){

        }
    } catch {

    }
    console.log("Testing lmao"); 
})

app.listen(port, ()=> {
    
    console.log(`Server is running on port: ${port}`); 
});