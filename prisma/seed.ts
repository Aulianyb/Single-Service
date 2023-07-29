import { PrismaSingleton } from '../src/client'

const prisma = PrismaSingleton.getInstance()

async function main(){
    const adminData = await prisma.user.create({
        data : {
            username : 'AdminAccount', 
            password : 'password123'
        }
    })

    const BondowosoCorp = await prisma.perusahaan.create({
        data : {
            nama : 'Bondowoso Corp', 
            alamat : 'Jl Kelapa Gading Boulevard PA 19/10, Dki Jakarta', 
            no_telp : '+62 833-3556-68716', 
            kode : 'BOO'        
            },
    })

    const BondowosoCorpData = await prisma.perusahaan.findFirstOrThrow({
        where: {
            nama: 'Bondowoso Corp',
        }
    });
    
    const DaunJanur = await prisma.barang.create({
        data : {
            nama : 'Daun Janur', 
            harga : 12000, 
            stok : 20,
            kode : 'DJ1010', 
            perusahaan_id : BondowosoCorpData.id
        }, 
    })

    const Pinang = await prisma.barang.create({
        data : {
            nama : 'Pinang', 
            harga : 10000, 
            stok : 30,
            kode : 'PI6826', 
            perusahaan_id : BondowosoCorpData.id
        }, 
    })

    const Mawar = await prisma.barang.create({
        data : {
            nama : 'Mawar Merah', 
            harga : 5000, 
            stok : 15,
            kode : 'MW0933', 
            perusahaan_id : BondowosoCorpData.id
        }, 
    })

    const Cempaka = await prisma.barang.create({
        data : {
            nama : 'Cempaka', 
            harga : 9000, 
            stok : 48,
            kode : 'CE5443', 
            perusahaan_id : BondowosoCorpData.id
        }, 
    })

    const SedapMalam = await prisma.barang.create({
        data : {
            nama : 'Sedap Malam', 
            harga : 6500, 
            stok : 15,
            kode : 'SM7987', 
            perusahaan_id : BondowosoCorpData.id
        }, 
    })

    const Kenanga = await prisma.barang.create({
        data : {
            nama : 'Kenanga', 
            harga : 4000, 
            stok : 10,
            kode : 'KN1809', 
            perusahaan_id : BondowosoCorpData.id
        }, 
    })

    const RoroCorp = await prisma.perusahaan.create({
        data : {
            nama : 'Roro Corp', 
            alamat : 'Jl Mampang Prapatan 108, Dki Jakarta', 
            no_telp : '+62 890-8419-07601', 
            kode : 'ILY'        
            },
    })

    const RoroCorpData = await prisma.perusahaan.findFirstOrThrow({
        where: {
            nama: 'Roro Corp',
        }
    });

    const Melati = await prisma.barang.create({
        data : {
            nama : 'Melati', 
            harga : 8000, 
            stok : 30,
            kode : 'ML9907', 
            perusahaan_id : RoroCorpData.id
        }, 
    })

    const Beras = await prisma.barang.create({
        data : {
            nama : 'Beras', 
            harga : 15000, 
            stok : 24,
            kode : 'BR7459', 
            perusahaan_id : RoroCorpData.id
        }, 
    })

    const Pisang = await prisma.barang.create({
        data : {
            nama : 'Pisang', 
            harga : 9500, 
            stok : 45,
            kode : 'PI8008', 
            perusahaan_id : RoroCorpData.id
        }, 
    })

    const DaunAren = await prisma.barang.create({
        data : {
            nama : 'Daun Aren', 
            harga : 1500, 
            stok : 36,
            kode : 'DA1145', 
            perusahaan_id : RoroCorpData.id
        }, 
    })

    const Kapur = await prisma.barang.create({
        data : {
            nama : 'Kapur', 
            harga : 10000, 
            stok : 10,
            kode : 'KA1256', 
            perusahaan_id : RoroCorpData.id
        }, 
    })

    const Xexajen = await prisma.perusahaan.create({
        data : {
            nama : 'Xexajen', 
            alamat : 'Jl Durian Slt I 6, Jawa Tengah', 
            no_telp : '+62 898-6094-32454', 
            kode : 'XXI'        
            },
    })

    const XexajenData = await prisma.perusahaan.findFirstOrThrow({
        where: {
            nama: 'Xexajen',
        }
    });

    const Telur = await prisma.barang.create({
        data : {
            nama : 'Telur', 
            harga : 3500, 
            stok : 64,
            kode : 'TL8181', 
            perusahaan_id : XexajenData.id
        }, 
    })

    const MinyakKelapa = await prisma.barang.create({
        data : {
            nama : 'Minyak Kelapa', 
            harga : 12000, 
            stok : 29,
            kode : 'MK9999', 
            perusahaan_id : XexajenData.id
        }, 
    })

    const BerasKetan = await prisma.barang.create({
        data : {
            nama : 'Beras Ketan', 
            harga : 6999, 
            stok : 29,
            kode : 'BK9371', 
            perusahaan_id : XexajenData.id
        }, 
    })

    const Sagu = await prisma.barang.create({
        data : {
            nama : 'Sagu', 
            harga : 4999, 
            stok : 39,
            kode : 'SG3733', 
            perusahaan_id : XexajenData.id
        }, 
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })