# Catatan Week 1

> Tuliskan apapun yang kalian pelajari pada phase 2 week-1 di file ini.
>
> "Pemahaman yang baik berasal dari keinginan untuk terus belajar, dan catatan adalah langkah pertama menuju pengetahuan yang dalam."

## Day 1

### Pagi - REST API // https://www.restapitutorial.com/

#### definition:

- When someone says, “REST service,” “REST API” or “RESTful API” they more-than-likely mean an HTTP or Web-based server that accepts requests over HTTP and responds in human-readable JSON./

#### http method

- get, post (create data), put (banyak yang diupdate), delete (delete data), patch (beberapa doang yg di update)

#### status code //https://www.restapitutorial.com/httpstatuscodes

- 200 (OK), 201 (Created), 204 (No content
- 400 (general error), 401 (gk da izin), 403 (forbidden, ex: level admin ga bole akses level manager), 404 (not found, data ga ada), 500 (general error dari server side)
- pakai rest.status untuk ngirim (https://expressjs.com/en/4x/api.html)

#### pas lempar ke client ⇒ api_doc.md

- https://www.markdownguide.org/

### Siang - Protecting API

#### ada dua cara:

- stateful: pake session ⇒ server yang harus hapal user identity + access right
- stateless: auth process ⇒ tiap req harus ada info untuk verif user identity + access right (client yg megang kunci buat masuk), server cuma verif. ex: JWT (https://medium.com/swlh/all-you-need-to-know-about-json-web-token-jwt-8a5d6131157f, https://jwt.io/introduction)

#### authentication & authorization:

- authentication: verif identitas entity
- authorization: pembatasan hak akses

#### env

An [*environment variable*](https://en.wikipedia.org/wiki/Environment_variable) is a variable whose value is set outside the program, typically through functionality built into the operating system or microservice. An environment variable is made up of a name/value pair, and any number may be created and available for reference at a point in time. ⇒ payload ditaro di sini biar ga diakses orang lain

pakai dotenv biar ga bolak balik export secret key ke env

## Day 2

### Pagi - Middleware

Definisi singkat: penghubung antara client dengan server

Kenapa pake middleware?

- Biar aplikasi lebih efektif + efisien
- Handling error
- modifikasi data masuk & respon keluar
- Code lebih modular