import { Prisma } from '@prisma/client'
import { PrismaSingleton } from './client'
import express, { response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'; 
import { User, Barang, Perusahaan, Response, BarangWithPerusahaan } from './models/models';
import { AdminUser } from './admin';
import { error } from 'console';
import { decode } from 'punycode';
const port = process.env.PORT || 5000; 

type LoginData = {
    user: User;
    token: string;
}

const prisma = PrismaSingleton.getInstance()
const app = express()

app.use(express.json())

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'https://ohl-fe.vercel.app');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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

app.get('/perusahaan', async(req, res) =>{
    const q = req.query.q as string
    var apiResponse : Response<Perusahaan[]>
    var list_Perusahaan
    try{
        if (q != undefined){
            list_Perusahaan = await prisma.perusahaan.findMany({
                where : {
                    OR : [
                        {
                            nama : {
                                contains : q
                            }
                        }, 
                        {
                            kode : {
                                contains : q
                            }
                        }
                    ]
                    }
            })
        } else{
            list_Perusahaan = await prisma.perusahaan.findMany({
                where : {
                    AND : [
                        {
                            nama : {
                                contains : q
                            }
                        }, 
                        {
                            kode : {
                                contains : q
                            }
                        }
                    ]
                    }
            })
        }
        apiResponse = {
            status : "success", 
            message : "berhasil GET list barang", 
            data : list_Perusahaan
        }
    } catch {
        apiResponse = {
            status : "error", 
            message : "gagal GET list barang", 
            data : null
        }
    }
    res.send(apiResponse)  
})

app.post('/perusahaan', async(req, res) =>{
    const { nama, kode, alamat, no_telp} = req.body
    var apiResponse : Response<Perusahaan>
    const header = req.headers.authorization as string
    let decoded: JwtPayload | undefined;
    try {
        decoded = jwt.verify(header, 'secret-Key') as JwtPayload;
        if (decoded.username != AdminUser.getInstance().username){
            throw new Error('Token tidak valid')
        } 
        if (!nama || !kode || !alamat || !no_telp){
            throw new Error('Data tidak lengkap')
        }
        if (kode.length !== 3 || kode !== kode.toUpperCase()) {
            throw new Error('Kode harus 3 huruf kapital');
        }
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
            message : "berhasil menambahkan perusahaan",
            data : result
        }
    } catch {
        apiResponse = {
            status : "error",
            message : "gagal menambahkan perusahaan", 
            data : null
        }
    }
    res.send(apiResponse)
})

app.put('/perusahaan/:id', async(req, res)=>{
    const { nama, kode, alamat, no_telp} = req.body
    var apiResponse : Response<Perusahaan>
    const header = req.headers.authorization as string
    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(header, 'secret-Key') as JwtPayload;
        if (decoded.username != AdminUser.getInstance().username){
            throw new Error('Token tidak valid')
        } 
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
    const header = req.headers.authorization as string
    let decoded: JwtPayload | undefined;
    try {
        decoded = jwt.verify(header, 'secret-Key') as JwtPayload;
        if (decoded.username != AdminUser.getInstance().username){
            throw new Error('Token tidak valid')
        } 
        const perusahaanData = await prisma.perusahaan.delete({
            where: {id : req.params.id}
        })

        const barangData = await prisma.barang.deleteMany({
            where: {
                perusahaan_id : req.params.id
            }
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
            where: { id : req.params.id}
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


app.get('/barang', async(req, res)=>{
    const query = req.query
    var list_barang : Barang[]
    const q = query.q as string
    var perusahaan = query.perusahaan as string
    var apiResponse : Response<Barang[]>
    try {
        if (q != undefined){
            list_barang = await prisma.barang.findMany({
                where : {
                    OR : [
                        {
                            nama : {
                                contains : q
                            }
                        }, 
                        {
                            kode : {
                                contains : q
                            }
                        }
                    ],
                    perusahaan_id:{
                        contains: perusahaan
                    }       
                }
            })
        } else {
            list_barang = await prisma.barang.findMany({
                where : {
                    AND : [
                        {
                            nama : {
                                contains : q
                            }
                        }, 
                        {
                            kode : {
                                contains : q
                            }
                        }
                    ],
                    perusahaan_id:{
                        contains: perusahaan
                    }       
                }
            })  
        }

        apiResponse = {
            status : "success", 
            message : "berhasil GET list barang", 
            data : list_barang
        }
    } catch {
        apiResponse = {
            status : "error", 
            message : "gagal GET list barang", 
            data : null
        }
    }
    res.send(apiResponse)
})

app.post('/barang', async(req, res) =>{
    const {kode, nama, harga, stok, perusahaan_id} = req.body
    var apiResponse : Response<Barang>
    const header = req.headers.authorization as string
    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(header, 'secret-Key') as JwtPayload;
        if (decoded.username != AdminUser.getInstance().username){
            throw new Error('Token tidak valid')
        } 
        if (!nama || !kode || !harga || !stok || !perusahaan_id){
            throw new Error('Data tidak lengkap')
        }
        
        const perusahaan = await prisma.perusahaan.findUnique({
            where: {
              id: perusahaan_id,
            },
        });

        const Barang = await prisma.barang.findUnique({
            where: {
              kode,
            },
        });

        if (harga <= 0 || stok < 0 || !perusahaan || Barang) {
            throw new Error('Data tidak valid')
        }

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
            message : "Berhasil menambahkan barang",
            data : result
        }
    } catch {
        apiResponse = {
            status : "error",
            message : "Gagal menambahkan barang",
            data : null
        }
    }
    res.send(apiResponse)
})

app.put('/barang/:id', async (req,res)=>{
    const {kode, nama, harga, stok, perusahaan_id} = req.body
    var apiResponse : Response<Barang> 
    const header = req.headers.authorization as string
    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(header, 'secret-Key') as JwtPayload;
        if (decoded.username != AdminUser.getInstance().username){
            throw new Error('Token tidak valid')
        } 
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
    const header = req.headers.authorization as string
    let decoded: JwtPayload;
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

            const adminUser = new AdminUser(username); 
            
            res.cookie("jwt", "token",{
                httpOnly: true
            })

            res.send(apiResponse)
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

app.get('/self', async (req, res)=>{
    var apiResponse : Response<User>
    const header = req.headers.authorization as string
    let decoded: JwtPayload | undefined;
    try {
        decoded = jwt.verify(header, 'secret-Key') as JwtPayload;
        if (decoded.username != AdminUser.getInstance().username){
            throw new Error('Invalid Token'); 
        } else {
            apiResponse = {
                status : "success", 
                message : "GET self berhasil", 
                data : AdminUser.getInstance()
            }
        }

    } catch (error) {
        console.error('Invalid token:', error);
        apiResponse = {
            status: "error",
            message : "login gagal", 
            data : null
        }
    }

    res.send(apiResponse)
})

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`); 
});