import { Prisma, PrismaClient } from '@prisma/client'
import express, { response } from 'express'
import jwt from 'jsonwebtoken'; 
import { User, Barang, Perusahaan, Response, BarangWithPerusahaan } from './models/models';
const port = process.env.PORT || 5000; 

type LoginData = {
    user: User;
    token: string;
}

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
    var apiResponse : Response<Perusahaan>

    try {
        const detail_perusahaan = await prisma.perusahaan.findUnique({
            where : {id : req.params.id}
        })
        apiResponse = {
            status : "success", 
            message : "Berhasil GET detail perusahaan", 
            data : detail_perusahaan
        }
    } catch {
        apiResponse = {
            status : "error", 
            message : "gagal GET detail perusahaan",
            data : null
        }
    }
    res.send(apiResponse)
})


//FIX ME : Ini juga betulin ya
app.get('/perusahaan', async(req, res) =>{
    const list_Perusahaan = await prisma.perusahaan.findMany()
    res.json(list_Perusahaan)
})

app.post('/perusahaan', async(req, res) =>{
    const { nama, kode, alamat, no_telp} = req.body
    var apiResponse : Response<Perusahaan>
    try {
        const result = await prisma.perusahaan.create({
            data: {
                nama,
                kode, 
                alamat, 
                no_telp
            }, 
        })
        apiResponse = {
            status : "success", 
            message : "berhasil menambahkan barang",
            data : result
        }
    } catch {
        apiResponse = {
            status : "error",
            message : "gagal menambahkan barang", 
            data : null
        }
    }
    res.send(apiResponse)
})

app.put('/perusahaan/:id', async(req, res)=>{
    const { nama, kode, alamat, no_telp} = req.body
    var apiResponse : Response<Perusahaan>
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

        apiResponse = {
            status : "success",
            message : "berhasil update barang", 
            data : updatedPerusahaan
        }
    } catch (error) {
        apiResponse = {
            status : "error",
            message : "gagal update barang", 
            data : null
        }
    }
    res.send(apiResponse)
})

app.delete('/perusahaan/:id', async(req, res)=>{
    var apiResponse : Response<Perusahaan>

    try {
        const perusahaanData = await prisma.perusahaan.delete({
            where: {id : req.params.id}
        })
        apiResponse = {
            status : "success", 
            message : "perusahaan berhasil dihapus!", 
            data : perusahaanData
        }
    } catch {
        apiResponse = {
            status : "error", 
            message : "perusahaan gagal dihapus!",
            data : null
        }
    }
    res.send(apiResponse)
})

app.get('/barang/:id', async(req, res) =>{
    var apiResponse : Response<Barang>
    try{
        const detail_barang = await prisma.barang.findUniqueOrThrow({
            where: { kode : req.params.id}
        })
        const barangData : Barang = {
            id : detail_barang.id, 
            nama : detail_barang.nama,
            harga : detail_barang.harga, 
            stok : detail_barang.stok,
            kode : detail_barang.kode,
            perusahaan_id : detail_barang.perusahaan_id
        } 

        apiResponse = {
            status : "success", 
            message : "Get barang berhasil",
            data : barangData
        }

    } catch {
        apiResponse = {
            status : "error", 
            message : "Get barang gagal",
            data : null
        }
    }
    res.send(apiResponse)
})

//REMINDER : Tolong kerjain ini pls janlup 
app.get('/barang', async(req, res)=>{
    try {
        const list_barang = await prisma.barang.findMany()
        res.json(list_barang); 
    } catch {

    }
})

app.post('/barang', async(req, res) =>{
    const {kode, nama, harga, stok, perusahaan_id} = req.body
    var apiResponse : Response<Barang>
    try {
        const result = await prisma.barang.create({
            data: {
                kode,
                nama, 
                harga, 
                stok,
                perusahaan_id
            }
        })

        apiResponse  = {
            status : "success",
            message : "Berhasil menambahkan barang!",
            data : result
        }
    } catch {
        apiResponse = {
            status : "success",
            message : "Berhasil menambahkan barang!",
            data : null
        }
    }
    res.send(apiResponse)
})

app.put('/barang/:id', async (req,res)=>{
    const {kode, nama, harga, stok, perusahaan_id} = req.body
    var apiResponse : Response<Barang> 
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

        apiResponse = {
            status : "success", 
            message : "berhasil update barang", 
            data : updatedBarang
        }
    } catch (error) {
        apiResponse = {
            status : "error", 
            message : "gagal update barang", 
            data : null
        }
    }
    res.send(apiResponse)
})

app.delete('/barang/:id', async (req, res) =>  {
    var apiResponse : Response<Barang>
    
    try {
        const barangData = await prisma.barang.delete({
            where: {id : req.params.id}
        })

        apiResponse = {
            status : "success", 
            message : "berhasil menghapus barang", 
            data : barangData
        }
    } catch {
        apiResponse = {
            status : "error", 
            message : "gagal menghapus barang", 
            data : null
        }
    } 
    res.send(apiResponse)
})

app.post('/login', async (req, res) =>{
    const {username, password} = req.body
    try{
        const adminData = await prisma.user.findFirstOrThrow({
            where : {username : username}
        })

        if (adminData.password == password){
            const token = jwt.sign({ username }, 'secret-Key')
            const Admin : User = {
                username : adminData.username
            }

            const logData : LoginData = {
                user : Admin, 
                token : token
            }

            const apiResponse : Response<LoginData> = {
                status: "success",
                message : "login berhasil", 
                data : logData
            }
            res.send(apiResponse)
            console.log("oh shit it works!")
        }
    } catch {
        const apiResponse : Response<LoginData> = {
            status: "error",
            message : "login gagal", 
            data : null
        }

        res.send(apiResponse)
    }
})

// app.get('/self', async (req, res)=>{
//     try{
//         const token = jwt.sign({ username }, 'secret-Key')
//         const Admin : User = {
//             username : adminData.username
//         }

//         const logData : LoginData = {
//             user : Admin, 
//             token : token
//         }

//         const apiResponse : Response<LoginData> = {
//             status: "success",
//             message : "login berhasil", 
//             data : logData
//         }

//         res.send(apiResponse)
//     } catch {
//         const apiResponse : Response<LoginData> = {
//             status: "error",
//             message : "login gagal", 
//             data : null
//         }

//         res.send(apiResponse)
//     }
// })

app.listen(port, ()=> {
    
    console.log(`Server is running on port: ${port}`); 
});