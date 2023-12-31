# Single Service
Nama : Aulia Nadhirah Yasmin Badrulkamal <br />
NIM : 18221066 <br />

## Cara Menjalankan 
⚠ Disclaimer : saya tidak bisa uji coba docker di mesin saya karena tidak cukup memory. Sudah di coba beberapa kali dan selalu menghabiskan memori yang ada di drive C saya sehingga mengakibatkan docker error dan harus di factory reset beberapa kali. Jadi alternatif yang bisa diberikan adalah menjalankannya secara lokal.

![image](https://github.com/Aulianyb/Monolith/assets/42485997/5a19cf1b-2e3b-439f-b88f-6ba850874422)

![image](https://github.com/Aulianyb/Monolith/assets/42485997/4cef6648-372a-4528-a2ed-b4e7e98d067a)

#### Requirements
1. mysql  Ver 8.0.30 for Win64 on x86_64 (MySQL Community Server - GPL)
2. TypeScript v5.1.6
3. Node v20.2.0
4. npm v9.6.6

#### How to run
1. Clone this repository
2. `npm install` on root directory
3. `npx prisma generate` to generate prisma client
4. Login into mysql and create database with `CREATE DATABASE single_service;`
5. Create `.env` file on root directory and paste `DATABASE_URL="mysql://[user]:[password]@localhost:3306/single_service"` into the file with [user] and [password] as the username and password for the database
6. `npx prisma migrate dev --name init` to migrate user, barang and perusahaan tables into the database
7. `npx prisma db seed` to seed the database
8. `npm run dev` to run
9. paste link `localhost:5000` ke dalam form API OHL-FE (if it has a different port, you can check for the correct port in the console)

To login, use the username `AdminAccount` with `password123` as password
## Design Pattern
### Singleton
Design pattern ini diterapkan kepada instance PrismaClient. Design pattern ini dipilih supaya tidak perlu membuat instansi PrismaClient yang baru setiap pemanggilan PrismaClient dan supaya seluruh aplikasi menggunakan PrismaClient yang sama. PrismaClient digunakan pada seeding script dan index.ts

### Observer
Design pattern ini diterapkan pada operasi yang akan berjalan ketika dilakukan penghapusan perusahaan. Design Pattern ini dipilih supaya barang yang memiliki id perusahaan yang sama akan terhapus bila perusahaan tersebut juga dihapus. Array observer dibentuk dalam rupa melakukan filtering data barang berdasarkan id perusahaan. Metode delete terhadap seluruh barang dalam array observer tersebut akan dilakukan apabila metode delete dipanggil pada perusahaan dengan id tersebut. 

### Proxy
Design pattern ini diterapkan kepada seluruh fungsi yang melakukan operasi pada endpoint. Design pattern proxy membantu agar user dapat berinteraksi dengan database tanpa harus berinteraksi secara langsung. Adanya proxy juga memungkinkan untuk dilakukan operasi seperti validasi data sebelum melakukan interaksi dengan database, sehingga memastikan bahwa perubahan yang dilakukan kepada database merupakan perubahan yang valid. 
## Technology Stack
1. Prisma ORM v5.0.0
2. TypeScript v5.1.6
3. Node v20.2.0
4. mysql  Ver 8.0.30 for Win64 on x86_64 (MySQL Community Server - GPL)
5. npm v9.6.6

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
### B03 - Single Service Implementation
Implementasi Single Service dilakukan menggunakan Typescript

### B08 - SOLID 
#### Single Responsibility Principle
admin hanya bertanggung jawab untuk handle kelas definisi singleton adminUser, client hanya bertanggung. Client hanya bertanggung jawab untuk handle kelas definisi singleton prisma client saja. 
#### Dependency Inversion Principle
Kita tidak membuat instance prisma baru pada index atau seed, kita hanya memberikan instance dari client prisma yang berupa singleton sehingga database dan API bisa bergantung kepada suatu abstraksi

