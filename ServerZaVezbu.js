const express = require('express')
const app = express()
const TokenGenerator = require('token-generator')({
  salt: 'Example express js server to learn basics of REST.',
  timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
})
const PORT = 3000
const hr = '\n-------------------------------------------------------------------------------'

// ENABLE CORS
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// PREDEFINED USERS
let users = [
  { id: 1, username: 'Ivana Ivanovic', email: 'ivana@gmail.com', password: 'ivana123' },
  { id: 2, username: 'Nikola Nikolic', email: 'nikola@gmail.com', password: 'nikola123' },  
  { id: 3, username: 'Pera Peric', email: 'pera@gmail.com', password: 'pera123' }
]

// PREDEFINED POSTS
let posts = [
  {
    id: 1,
    userId: 2,
    title: 'Saznajte kako da smršate uz ovih neverovatnih 5 saveta',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis blanditiis fugit, earum magnam, laboriosam reprehenderit neque, totam beatae fugiat amet ab iure a ipsa dolore eum sequi velit sint perspiciatis ducimus adipisci expedita quos voluptatem. At quod autem quam totam. Dicta hic, aut id delectus obcaecati exercitationem provident aliquid esse repellendus nisi quasi quia dolorem, possimus nobis. Dolore itaque ut est deserunt voluptas sapiente dicta aut, vero, voluptates ducimus unde, quasi praesentium. Autem beatae dolorum quas possimus quo quos aperiam magnam quibusdam error libero dicta maiores veniam, voluptatem ad perferendis soluta. Mollitia repellat at qui architecto minus assumenda facere saepe ratione culpa repellendus illum, dolor dolorem rerum laboriosam dicta sunt suscipit voluptas esse beatae et earum. Quo eveniet, provident itaque earum dolorem error officia molestiae harum magnam! Quisquam facere excepturi tempora atque officiis asperiores nobis laborum reiciendis quas reprehenderit nulla corrupti iure provident assumenda, vero eos modi incidunt ratione nostrum, rerum non saepe veritatis? Distinctio, rem facilis expedita illo dolores eligendi voluptates. Quos, numquam. Aliquid sequi expedita nam deleniti aspernatur commodi tempora ipsum est, consequatur soluta iste veniam minus possimus accusantium, quidem ullam laudantium rem, distinctio quae dicta quis libero optio. Error, nisi laboriosam? Architecto perferendis autem aliquam exercitationem ullam odio, quia aliquid. Excepturi aliquam nostrum fugit itaque eaque ea delectus aliquid explicabo, assumenda nobis minus ab quam porro unde illum repudiandae maiores voluptates! Dolorem, iure. Libero obcaecati sunt enim, ea aut quaerat, iure ullam animi ut est fugiat velit! Iusto, eius earum necessitatibus alias quas dignissimos ut esse facere itaque natus culpa quis placeat nulla aspernatur voluptatum? Natus, quasi aperiam veniam omnis odio itaque similique error temporibus assumenda eum architecto sequi necessitatibus pariatur nulla unde at quas voluptatum maxime animi nostrum velit quis? Fugiat quos tenetur eius aliquam aliquid alias dignissimos. Provident vero hic atque aspernatur eius quibusdam alias rem dolorem voluptates. Reprehenderit, tenetur ad facilis et est nam maiores natus amet perferendis impedit quasi excepturi ipsam voluptatum eaque? Unde numquam quos commodi iste? Consectetur deserunt veniam quod, perferendis amet animi. Dicta minus ullam libero vel mollitia! Laborum ea, nobis praesentium doloribus dolore similique enim dolor quos molestias vel corrupti maiores unde commodi perspiciatis at explicabo animi debitis. Quae doloremque aut similique animi dicta numquam quam sit! Culpa, nobis quae labore dolore laboriosam odit sequi maiores aperiam incidunt dolores dignissimos animi? Qui eos adipisci aut, fugiat ut recusandae ullam aspernatur sit ad nam nisi unde quaerat vero impedit asperiores quasi vel mollitia eaque aperiam magnam similique odit? At autem quae, vel nisi voluptas, sapiente, asperiores porro assumenda veritatis corporis tempore ut nulla. Nesciunt vero maiores delectus numquam, aut nostrum impedit blanditiis, ea id voluptatum iure. Possimus at similique vitae cum non, explicabo iure ratione recusandae autem hic voluptatum eius adipisci cupiditate dolorum, laudantium dolore quisquam illum ullam esse ad. Iusto quaerat itaque aliquid maiores perferendis rem necessitatibus? Dignissimos, cumque veritatis odio vitae perspiciatis suscipit blanditiis? Illo voluptate debitis officiis ratione sequi alias! Mollitia libero saepe odio quidem rem natus neque, reiciendis hic, itaque eaque iste optio distinctio! Pariatur, consequatur? Aspernatur eaque ullam perferendis aut reiciendis maiores error rem. Iste sint quas ipsa quibusdam dolore pariatur accusamus exercitationem, praesentium soluta. Qui voluptatem tempora numquam provident, quae nesciunt. Alias eligendi quaerat quibusdam iure at saepe, necessitatibus suscipit voluptatibus corporis consequuntur maxime ipsum, qui harum temporibus debitis nulla, neque dolores amet omnis porro ullam perferendis eaque. Eum, illum labore? Id, ad iure! Debitis ex laborum aliquam rerum ea enim! Distinctio repudiandae soluta vel veniam at sint hic nesciunt porro quam perferendis deserunt ipsum quo nostrum blanditiis, ut qui adipisci. Alias esse, repudiandae ea, ex accusamus cupiditate omnis similique nemo aut aliquid illo eligendi reiciendis voluptate maiores corrupti vero harum, quos accusantium error eaque delectus fugit dolore blanditiis rem! Eaque sit praesentium error quae animi consequuntur sed doloribus facere expedita voluptatem reprehenderit suscipit veniam exercitationem magni nemo, nihil eligendi distinctio, laboriosam ipsum sunt. Voluptatem, iste quas repellat itaque minus quidem. Consectetur, non voluptate.',
    timestamp: new Date('2018-06-25T16:00:00')
  },
  {
    id: 2,
    userId: 2,
    title: 'Još jedan post sa catchy naslovom',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis blanditiis fugit, earum magnam, laboriosam reprehenderit neque, totam beatae fugiat amet ab iure a ipsa dolore eum sequi velit sint perspiciatis ducimus adipisci expedita quos voluptatem. At quod autem quam totam. Dicta hic, aut id delectus obcaecati exercitationem provident aliquid esse repellendus nisi quasi quia dolorem, possimus nobis. Dolore itaque ut est deserunt voluptas sapiente dicta aut, vero, voluptates ducimus unde, quasi praesentium. Autem beatae dolorum quas possimus quo quos aperiam magnam quibusdam error libero dicta maiores veniam, voluptatem ad perferendis soluta. Mollitia repellat at qui architecto minus assumenda facere saepe ratione culpa repellendus illum, dolor dolorem rerum laboriosam dicta sunt suscipit voluptas esse beatae et earum. Quo eveniet, provident itaque earum dolorem error officia molestiae harum magnam! Quisquam facere excepturi tempora atque officiis asperiores nobis laborum reiciendis quas reprehenderit nulla corrupti iure provident assumenda, vero eos modi incidunt ratione nostrum, rerum non saepe veritatis? Distinctio, rem facilis expedita illo dolores eligendi voluptates. Quos, numquam. Aliquid sequi expedita nam deleniti aspernatur commodi tempora ipsum est, consequatur soluta iste veniam minus possimus accusantium, quidem ullam laudantium rem, distinctio quae dicta quis libero optio. Error, nisi laboriosam? Architecto perferendis autem aliquam exercitationem ullam odio, quia aliquid. Excepturi aliquam nostrum fugit itaque eaque ea delectus aliquid explicabo, assumenda nobis minus ab quam porro unde illum repudiandae maiores voluptates! Dolorem, iure. Libero obcaecati sunt enim, ea aut quaerat, iure ullam animi ut est fugiat velit! Iusto, eius earum necessitatibus alias quas dignissimos ut esse facere itaque natus culpa quis placeat nulla aspernatur voluptatum? Natus, quasi aperiam veniam omnis odio itaque similique error temporibus assumenda eum architecto sequi necessitatibus pariatur nulla unde at quas voluptatum maxime animi nostrum velit quis? Fugiat quos tenetur eius aliquam aliquid alias dignissimos. Provident vero hic atque aspernatur eius quibusdam alias rem dolorem voluptates. Reprehenderit, tenetur ad facilis et est nam maiores natus amet perferendis impedit quasi excepturi ipsam voluptatum eaque? Unde numquam quos commodi iste? Consectetur deserunt veniam quod, perferendis amet animi. Dicta minus ullam libero vel mollitia! Laborum ea, nobis praesentium doloribus dolore similique enim dolor quos molestias vel corrupti maiores unde commodi perspiciatis at explicabo animi debitis. Quae doloremque aut similique animi dicta numquam quam sit! Culpa, nobis quae labore dolore laboriosam odit sequi maiores aperiam incidunt dolores dignissimos animi? Qui eos adipisci aut, fugiat ut recusandae ullam aspernatur sit ad nam nisi unde quaerat vero impedit asperiores quasi vel mollitia eaque aperiam magnam similique odit? At autem quae, vel nisi voluptas, sapiente, asperiores porro assumenda veritatis corporis tempore ut nulla. Nesciunt vero maiores delectus numquam, aut nostrum impedit blanditiis, ea id voluptatum iure. Possimus at similique vitae cum non, explicabo iure ratione recusandae autem hic voluptatum eius adipisci cupiditate dolorum, laudantium dolore quisquam illum ullam esse ad. Iusto quaerat itaque aliquid maiores perferendis rem necessitatibus? Dignissimos, cumque veritatis odio vitae perspiciatis suscipit blanditiis? Illo voluptate debitis officiis ratione sequi alias! Mollitia libero saepe odio quidem rem natus neque, reiciendis hic, itaque eaque iste optio distinctio! Pariatur, consequatur? Aspernatur eaque ullam perferendis aut reiciendis maiores error rem. Iste sint quas ipsa quibusdam dolore pariatur accusamus exercitationem, praesentium soluta. Qui voluptatem tempora numquam provident, quae nesciunt. Alias eligendi quaerat quibusdam iure at saepe, necessitatibus suscipit voluptatibus corporis consequuntur maxime ipsum, qui harum temporibus debitis nulla, neque dolores amet omnis porro ullam perferendis eaque. Eum, illum labore? Id, ad iure! Debitis ex laborum aliquam rerum ea enim! Distinctio repudiandae soluta vel veniam at sint hic nesciunt porro quam perferendis deserunt ipsum quo nostrum blanditiis, ut qui adipisci. Alias esse, repudiandae ea, ex accusamus cupiditate omnis similique nemo aut aliquid illo eligendi reiciendis voluptate maiores corrupti vero harum, quos accusantium error eaque delectus fugit dolore blanditiis rem! Eaque sit praesentium error quae animi consequuntur sed doloribus facere expedita voluptatem reprehenderit suscipit veniam exercitationem magni nemo, nihil eligendi distinctio, laboriosam ipsum sunt. Voluptatem, iste quas repellat itaque minus quidem. Consectetur, non voluptate.',
    timestamp: new Date('2018-06-24T16:00:00')
  },
  {
    id: 3,
    userId: 1,
    title: 'Vrlo nekreativno i nezanimljivo',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis blanditiis fugit, earum magnam, laboriosam reprehenderit neque, totam beatae fugiat amet ab iure a ipsa dolore eum sequi velit sint perspiciatis ducimus adipisci expedita quos voluptatem. At quod autem quam totam. Dicta hic, aut id delectus obcaecati exercitationem provident aliquid esse repellendus nisi quasi quia dolorem, possimus nobis. Dolore itaque ut est deserunt voluptas sapiente dicta aut, vero, voluptates ducimus unde, quasi praesentium. Autem beatae dolorum quas possimus quo quos aperiam magnam quibusdam error libero dicta maiores veniam, voluptatem ad perferendis soluta. Mollitia repellat at qui architecto minus assumenda facere saepe ratione culpa repellendus illum, dolor dolorem rerum laboriosam dicta sunt suscipit voluptas esse beatae et earum. Quo eveniet, provident itaque earum dolorem error officia molestiae harum magnam! Quisquam facere excepturi tempora atque officiis asperiores nobis laborum reiciendis quas reprehenderit nulla corrupti iure provident assumenda, vero eos modi incidunt ratione nostrum, rerum non saepe veritatis? Distinctio, rem facilis expedita illo dolores eligendi voluptates. Quos, numquam. Aliquid sequi expedita nam deleniti aspernatur commodi tempora ipsum est, consequatur soluta iste veniam minus possimus accusantium, quidem ullam laudantium rem, distinctio quae dicta quis libero optio. Error, nisi laboriosam? Architecto perferendis autem aliquam exercitationem ullam odio, quia aliquid. Excepturi aliquam nostrum fugit itaque eaque ea delectus aliquid explicabo, assumenda nobis minus ab quam porro unde illum repudiandae maiores voluptates! Dolorem, iure. Libero obcaecati sunt enim, ea aut quaerat, iure ullam animi ut est fugiat velit! Iusto, eius earum necessitatibus alias quas dignissimos ut esse facere itaque natus culpa quis placeat nulla aspernatur voluptatum? Natus, quasi aperiam veniam omnis odio itaque similique error temporibus assumenda eum architecto sequi necessitatibus pariatur nulla unde at quas voluptatum maxime animi nostrum velit quis? Fugiat quos tenetur eius aliquam aliquid alias dignissimos. Provident vero hic atque aspernatur eius quibusdam alias rem dolorem voluptates. Reprehenderit, tenetur ad facilis et est nam maiores natus amet perferendis impedit quasi excepturi ipsam voluptatum eaque? Unde numquam quos commodi iste? Consectetur deserunt veniam quod, perferendis amet animi. Dicta minus ullam libero vel mollitia! Laborum ea, nobis praesentium doloribus dolore similique enim dolor quos molestias vel corrupti maiores unde commodi perspiciatis at explicabo animi debitis. Quae doloremque aut similique animi dicta numquam quam sit! Culpa, nobis quae labore dolore laboriosam odit sequi maiores aperiam incidunt dolores dignissimos animi? Qui eos adipisci aut, fugiat ut recusandae ullam aspernatur sit ad nam nisi unde quaerat vero impedit asperiores quasi vel mollitia eaque aperiam magnam similique odit? At autem quae, vel nisi voluptas, sapiente, asperiores porro assumenda veritatis corporis tempore ut nulla. Nesciunt vero maiores delectus numquam, aut nostrum impedit blanditiis, ea id voluptatum iure. Possimus at similique vitae cum non, explicabo iure ratione recusandae autem hic voluptatum eius adipisci cupiditate dolorum, laudantium dolore quisquam illum ullam esse ad. Iusto quaerat itaque aliquid maiores perferendis rem necessitatibus? Dignissimos, cumque veritatis odio vitae perspiciatis suscipit blanditiis? Illo voluptate debitis officiis ratione sequi alias! Mollitia libero saepe odio quidem rem natus neque, reiciendis hic, itaque eaque iste optio distinctio! Pariatur, consequatur? Aspernatur eaque ullam perferendis aut reiciendis maiores error rem. Iste sint quas ipsa quibusdam dolore pariatur accusamus exercitationem, praesentium soluta. Qui voluptatem tempora numquam provident, quae nesciunt. Alias eligendi quaerat quibusdam iure at saepe, necessitatibus suscipit voluptatibus corporis consequuntur maxime ipsum, qui harum temporibus debitis nulla, neque dolores amet omnis porro ullam perferendis eaque. Eum, illum labore? Id, ad iure! Debitis ex laborum aliquam rerum ea enim! Distinctio repudiandae soluta vel veniam at sint hic nesciunt porro quam perferendis deserunt ipsum quo nostrum blanditiis, ut qui adipisci. Alias esse, repudiandae ea, ex accusamus cupiditate omnis similique nemo aut aliquid illo eligendi reiciendis voluptate maiores corrupti vero harum, quos accusantium error eaque delectus fugit dolore blanditiis rem! Eaque sit praesentium error quae animi consequuntur sed doloribus facere expedita voluptatem reprehenderit suscipit veniam exercitationem magni nemo, nihil eligendi distinctio, laboriosam ipsum sunt. Voluptatem, iste quas repellat itaque minus quidem. Consectetur, non voluptate.',
    timestamp: new Date('2018-06-22T16:00:00')
  },
  {
    id: 4,
    userId: 3,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, eaque!',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis blanditiis fugit, earum magnam, laboriosam reprehenderit neque, totam beatae fugiat amet ab iure a ipsa dolore eum sequi velit sint perspiciatis ducimus adipisci expedita quos voluptatem. At quod autem quam totam. Dicta hic, aut id delectus obcaecati exercitationem provident aliquid esse repellendus nisi quasi quia dolorem, possimus nobis. Dolore itaque ut est deserunt voluptas sapiente dicta aut, vero, voluptates ducimus unde, quasi praesentium. Autem beatae dolorum quas possimus quo quos aperiam magnam quibusdam error libero dicta maiores veniam, voluptatem ad perferendis soluta. Mollitia repellat at qui architecto minus assumenda facere saepe ratione culpa repellendus illum, dolor dolorem rerum laboriosam dicta sunt suscipit voluptas esse beatae et earum. Quo eveniet, provident itaque earum dolorem error officia molestiae harum magnam! Quisquam facere excepturi tempora atque officiis asperiores nobis laborum reiciendis quas reprehenderit nulla corrupti iure provident assumenda, vero eos modi incidunt ratione nostrum, rerum non saepe veritatis? Distinctio, rem facilis expedita illo dolores eligendi voluptates. Quos, numquam. Aliquid sequi expedita nam deleniti aspernatur commodi tempora ipsum est, consequatur soluta iste veniam minus possimus accusantium, quidem ullam laudantium rem, distinctio quae dicta quis libero optio. Error, nisi laboriosam? Architecto perferendis autem aliquam exercitationem ullam odio, quia aliquid. Excepturi aliquam nostrum fugit itaque eaque ea delectus aliquid explicabo, assumenda nobis minus ab quam porro unde illum repudiandae maiores voluptates! Dolorem, iure. Libero obcaecati sunt enim, ea aut quaerat, iure ullam animi ut est fugiat velit! Iusto, eius earum necessitatibus alias quas dignissimos ut esse facere itaque natus culpa quis placeat nulla aspernatur voluptatum? Natus, quasi aperiam veniam omnis odio itaque similique error temporibus assumenda eum architecto sequi necessitatibus pariatur nulla unde at quas voluptatum maxime animi nostrum velit quis? Fugiat quos tenetur eius aliquam aliquid alias dignissimos. Provident vero hic atque aspernatur eius quibusdam alias rem dolorem voluptates. Reprehenderit, tenetur ad facilis et est nam maiores natus amet perferendis impedit quasi excepturi ipsam voluptatum eaque? Unde numquam quos commodi iste? Consectetur deserunt veniam quod, perferendis amet animi. Dicta minus ullam libero vel mollitia! Laborum ea, nobis praesentium doloribus dolore similique enim dolor quos molestias vel corrupti maiores unde commodi perspiciatis at explicabo animi debitis. Quae doloremque aut similique animi dicta numquam quam sit! Culpa, nobis quae labore dolore laboriosam odit sequi maiores aperiam incidunt dolores dignissimos animi? Qui eos adipisci aut, fugiat ut recusandae ullam aspernatur sit ad nam nisi unde quaerat vero impedit asperiores quasi vel mollitia eaque aperiam magnam similique odit? At autem quae, vel nisi voluptas, sapiente, asperiores porro assumenda veritatis corporis tempore ut nulla. Nesciunt vero maiores delectus numquam, aut nostrum impedit blanditiis, ea id voluptatum iure. Possimus at similique vitae cum non, explicabo iure ratione recusandae autem hic voluptatum eius adipisci cupiditate dolorum, laudantium dolore quisquam illum ullam esse ad. Iusto quaerat itaque aliquid maiores perferendis rem necessitatibus? Dignissimos, cumque veritatis odio vitae perspiciatis suscipit blanditiis? Illo voluptate debitis officiis ratione sequi alias! Mollitia libero saepe odio quidem rem natus neque, reiciendis hic, itaque eaque iste optio distinctio! Pariatur, consequatur? Aspernatur eaque ullam perferendis aut reiciendis maiores error rem. Iste sint quas ipsa quibusdam dolore pariatur accusamus exercitationem, praesentium soluta. Qui voluptatem tempora numquam provident, quae nesciunt. Alias eligendi quaerat quibusdam iure at saepe, necessitatibus suscipit voluptatibus corporis consequuntur maxime ipsum, qui harum temporibus debitis nulla, neque dolores amet omnis porro ullam perferendis eaque. Eum, illum labore? Id, ad iure! Debitis ex laborum aliquam rerum ea enim! Distinctio repudiandae soluta vel veniam at sint hic nesciunt porro quam perferendis deserunt ipsum quo nostrum blanditiis, ut qui adipisci. Alias esse, repudiandae ea, ex accusamus cupiditate omnis similique nemo aut aliquid illo eligendi reiciendis voluptate maiores corrupti vero harum, quos accusantium error eaque delectus fugit dolore blanditiis rem! Eaque sit praesentium error quae animi consequuntur sed doloribus facere expedita voluptatem reprehenderit suscipit veniam exercitationem magni nemo, nihil eligendi distinctio, laboriosam ipsum sunt. Voluptatem, iste quas repellat itaque minus quidem. Consectetur, non voluptate.',
    timestamp: new Date('2018-06-18T16:00:00')
  }
]

// NOTE: Logs are everywhere because of asci love
console.log(`########################## REST API SERVER ZA VEŽBU ###########################`, hr)
/**
 * All info about routes, used for dynamic creation of routes and displaying info in console
 */
const routes = [
  {
    // curl -H "Content-Type: application/json" -X POST -d '{"email": "ivana@gmail.com", "password": "ivana123" }' http://localhost:3000/api/users/login
    path: '/api/users/login',
    method: 'post',
    description: 'Logovanje korisnika. Koristiti request body',
    shouldReceive: 'Request body: { "email": "korisnicki@email.com", "password": "lozinka" }',
    protected: false,
    callback: (req, res, next) => {
      console.log('Na server je stiglo:', req.body)
      if (req.body.email && req.body.password) {
        let user = users.filter(user => user.email === req.body.email && user.password === req.body.password)[0]
        if (user) {
          res.json({token: TokenGenerator.generate(), user: { username: user.username, email: user.email }})
        } else {
          res.json({error: 'Nepostojeći korisnik!'})
        }
      } else {
        res.json({
          error: 'Loš request.',
          solution: 'Proveri da li imaš pravi header "Content-Type: application/json" i dali šalješ odgovarajuće podatke npr. {"email": "ivana@gmail.com", "password": "ivana123" }'
        })
      }
    }
  },
  {
    // curl -G http://localhost:3000/api/users
    path: '/api/users',
    method: 'get',
    description: 'Spisak svih korisnika',
    shouldReceive: 'nista',
    protected: false,
    callback: (req, res, next) => {
      console.log('Request za spisak korisnika.')
      res.json({
        users: users
      })
    }
  },
  {
    // curl -H "Content-Type: application/json" -X POST -d '{"username": "noviKorisnik", "email": "ivana@gmail.com", "password": "ivana123" }' http://localhost:3000/api/users/register
    path: '/api/users/register',
    method: 'post',
    description: 'Registrovanje korisnika. Koristiti request body',
    shouldReceive: 'Request body: { "username": "noviKorisnik", "email": "korisnicki@email.com", "password": "lozinka" }',
    protected: false,
    callback: (req, res, next) => {
      console.log('Na server je stiglo:', req.body)
      if (req.body.email && req.body.password && req.body.username) {
        let newUser = req.body
        newUser.id = (users[(users.length - 1)].id + 1)
        users.push(newUser)
        res.json({
          success: 'Korisnik je uspešno registrovan!',
          user: newUser
        })
      } else {
        res.json({
          error: 'Loš request.',
          solution: 'Proveri da li imaš pravi header "Content-Type: application/json" i dali šalješ odgovarajuće podatke npr. {"email": "ivana@gmail.com", "password": "ivana123" }'
        })
      }
    }
  },
  {
    // curl -G http://localhost:3000/api/posts
    path: '/api/posts',
    method: 'get',
    description: 'Postovi korisnika',
    shouldReceive: 'Ništa',
    protected: false,
    callback: (req, res, next) => {
      console.log('Request za postove prihvaćen.')
      res.json({ posts: posts })
    }
  },
  {
    // curl -H "Content-Type: application/json" -X POST -d '{"userId": 3, "title": "Dodat Post", "body": "evo ne znam", "timestamp": "2018-06-22T16:00:00"}' http://localhost:3000/api/posts/new?token=db81bfcjjeahhh
    path: '/api/posts/new',
    method: 'post',
    description: 'Novi post',
    shouldReceive: '{"userId: 2, "title": "Budi kreativniji od mene", "body": "lorem...", "timestamp": "2018-06-22T16:00:00"} + token',
    protected: true,
    callback: (req, res, next) => {
      console.log('Server je prihvatio token:', req.query.token)
      console.log('Server je prihvatio podatke:', req.body)
      if (req.query.token) {
        if (TokenGenerator.isValid(req.query.token)) {
          if (!req.body.userId) {
            res.json({ error: 'Nema userId!' })
          } else if (!req.body.title) {
            res.json({ eror: 'Kako post bez naslova?' })
          } else if (!req.body.timestamp) {
            res.json({ error: 'Nema timestamp', solution: 'Generisi sa new Date()' })
          } else {
            let newPost = req.body
            newPost.id = (posts[(posts.length - 1)].id + 1)
            posts.push(newPost)
            res.send({success: 'Post je uspešno sačuvan! GGWP!', post: newPost})
          }
        } else {
          res.json({
            error: 'Neispravan token'
          })          
        }
      } else {
        res.json({
          error: 'Nema tokena',
          solution: 'Pošalji token kao query string - /posts/new?token=${TOKEN}'
        })
      }
    }
  },
  {
    // curl -H "Content-Type: application/json" -X PUT -d '{"id": 1, "userId": 3, "title": "Promenjen Post", "body": "evo ne znam", "timestamp": "2018-06-22T16:00:00"}' http://localhost:3000/api/posts/update?token=db81bfcjjeahhh
    path: '/api/posts/update',
    method: 'put',
    description: 'Promeni post',
    shouldReceive: '{"id": 1, "userId": 2, "title": "Novi", "body": "lorem...", "timestamp": "2018-06-22T16:00:00"} + token',
    protected: true,
    callback: (req, res, next) => {
      console.log('Server je prihvatio token:', req.query.token)
      console.log('Server je prihvatio podatke:', req.body)
      if (req.query.token) {
        if (TokenGenerator.isValid(req.query.token)) {
          if (!req.body.userId) {
            res.json({ error: 'Nema userId!' })
          } else if (!req.body.title) {
            res.json({ eror: 'Kako post bez naslova?' })
          } else if (!req.body.timestamp) {
            res.json({ error: 'Nema timestamp', solution: 'Generisi sa new Date()' })
          } else {
            let newPost = req.body
            let oldPost = posts.filter(post => post.id === newPost.id)[0]
            console.log('Ciljani post:', oldPost)
            oldPost.userId = newPost.userId
            oldPost.title = newPost.title
            oldPost.body = newPost.body
            oldPost.timestamp = newPost.timestamp
            res.send({success: 'Post je uspešno promenjen! Šiješ!', post: oldPost})
          }
        } else {
          res.json({
            error: 'Neispravan token'
          })          
        }
      } else {
        res.json({
          error: 'Nema tokena',
          solution: 'Pošalji token kao query string - /posts/new?token=${TOKEN}'
        })
      }
    }
  },
  {
    // curl -X DELETE http://localhost:3000/api/posts/2?token=db81bfcjjeahhh
    path: '/api/posts/:id',
    method: 'delete',
    description: 'Obriši post',
    shouldReceive: 'id posta (kao parametar rute) + token',
    protected: true,
    callback: (req, res, next) => {
      console.log('Server je prihvatio token:', req.query.token)
      console.log('Server je prihvatio id posta:', req.params.id)
      if (req.query.token) {
        if (TokenGenerator.isValid(req.query.token)) {
          if (req.params.id) {
            posts = posts.filter(post => post.id !== parseInt(req.params.id))
            res.json({
              success: `Post sa id: ${req.params.id} je obrisan!`
            })
          } else {
            res.json({
              error: 'Nisi dao id',
              solution: 'Prosledi id kao parametar - /posts/5?token...'
            })            
          }
        } else {
          res.json({
            error: 'Neispravan token'
          })          
        }
      } else {
        res.json({
          error: 'Nema tokena',
          solution: 'Pošalji token kao query string - /posts/new?token=${TOKEN}'
        })
      }
    }
  }
]
// HERE WE CREATE OUR ROUTES
routes.forEach(route => {
  app[route.method](`${route.path}`, route.callback)
})

// PRINT ALL PREDEFINED USERS
console.log(`1) Lista predefinisanih korisnika:`, hr)
console.log(`USERNAME \t EMAIL \t \t \t PASSWORD`, hr)
users.forEach(user => {
  console.log(`${user.username} \t ${user.email} \t ${user.password}`)
})
console.log(hr)
// PRINT ALL ENDPOINTS
console.log(`2) Moguce rute (REST endpoints):`, hr)
console.log(`PATH\t\t\tMETHOD\t\tZAŠTIĆENA`, hr)
routes.forEach((route, i) => {
  if (i === 0 || i === 2 || i === 5) {
    console.log(`${route.path}\t${route.method}\t\t${route.protected}`)
  } else {
    console.log(`${route.path}\t\t${route.method}\t\t${route.protected}`)
  }
})
console.log(hr)

// SOME ADDITIONAL INFO IN app.listen beause of reasons :)
app.listen(PORT, () => {
  console.log(`Server pokrenut na: http://localhost:${PORT}`, hr)
  console.log(`UPUTSTVO`, hr)
  console.log(`Probaj da napravis neki frontend (bilo kojom tehnologijom) koji koristi:\n a) user login\n b) user register \n c) manipulaciju postova`, hr)
  console.log(`UPOZORENJE`, hr)
  console.log(`Podaci se ne čuvaju stvarno (ne postoji nikakva baza),\ntako će se sa svakim restartom servera podaci brisati!`, hr)
  console.log(`Aktivnosti servera:`, hr)
})