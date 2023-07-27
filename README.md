# Single Service
Nama : Aulia Nadhirah Yasmin Badrulkamal <br />
NIM : 18221066 <br />

## Cara Menjalankan 

## Design Pattern

## Technology Stack
1. Prisma ORM v5.0.0
2. TypeScript v5.1.6

## End Point
### GET single perusahaan (GET request)
- `http://localhost:5000/perusahaan/:id`
- Response : Satu buah perusahaan sesuai dengan id yang dimasukkan

### GET perusahaan (GET request)
- `http://localhost:5000/perusahaan`
- Query :
  `q : string`
- Response : Tanpa adanya query, mengembalikan seluruh perusahaan dan dengan adanya query mengembalikan perusahaan yang telah difilter sesuai dengan query yang dimasukkan

### POST create perusahaan (POST request)
- `http://localhost:5000/perusahaan`
- Request : `
  nama : string,
  kode : string, 
  alamat : string, 
  no_telp : string
  `
- Response : Menambahkan suatu perusahaan dengan dengan data yang dimasukkan

### PUT single perusahaan (PUT request)
- `http://localhost:5000/perusahaan/:id`
- Request : `
  nama : string,
  kode : string, 
  alamat : string, 
  no_telp : string
  `
- Response : Melakukan update kepada perusahaan dengan id yang sama berdasarkan data yang dimasukkan

### DELETE single perusahaan (DELETE request)
- `http://localhost:5000/perusahaan/:id`
- Response : Menghapus perusahaan dengan id yang sama

### GET single barang (GET request)
- `http://localhost:5000/barang/:id`
- Response : Satu buah perusahaan sesuai dengan id yang dimasukkan

### GET barang (GET request)
- `http://localhost:5000/barang`
- Query :
  `q : string, 
  perusahaan : string`
- Response : Tanpa adanya query, mengembalikan seluruh perusahaan dan dengan adanya query mengembalikan perusahaan yang telah difilter sesuai dengan query yang dimasukkan

### POST create barang (POST request)
- `http://localhost:5000/barang`
- Request : `
  kode : string,
  nama : string, 
  harga : string, 
  stok : string,
  perusahaan_id : string
  `
- Response : Menambahkan suatu barang dengan dengan data yang dimasukkan

### PUT single barang (PUT request)
- `http://localhost:5000/barang/:id`
- Request : `
  kode : string,
  nama : string, 
  harga : string, 
  stok : string,
  perusahaan_id : string
  `
- Response : Melakukan update kepada barang dengan id yang sama berdasarkan data yang dimasukkan

### DELETE single barang (DELETE request)
- `http://localhost:5000/barang/:id`
- Response : Menghapus barang dengan id yang sama

### POST login (POST request)
- `http://localhost:5000/login`
- Response : Memvalidasi user yang melakukan login berdasarkan data pada database

### GET self (GET request)
- `http://localhost:5000/login`
- Response : Mendapatkan username dari user yang saat ini logged in melalui token JWT yang tersimpan di header

## Bonus
