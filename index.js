const express = require('express')

const CHANNEL_KEY = process.env.CHANNEL_KEY

const checkKey = function (req, res, next) {
  const reqChannelKey = req.get('IFTTT-Channel-Key')
  if (reqChannelKey === CHANNEL_KEY) {
    next()
  } else {
    res.status(401).send({
      'errors': [{
        'message': 'Invalid channel key'
      }]
    })
  }
}

module.exports = (robot) => {
  const app = robot.route('/ifttt/v1')

  app.use(express.json())

  app.get('/status', checkKey, (req, res) => {
    res.send('alive')
  })

  app.post('/test/setup', checkKey, (req, res) => {
    const responseObj = {
      'data': {
        'accessToken': '1309u139hsflkj130ejs',
        'samples': {
          'triggers': {
            'new_code_was_pushed': {}
          },
          'actions': {}
        }
      }
    }
    res.send(responseObj)
  })

  app.post('/triggers/new_code_pushed', checkKey, (req, res) => {
    const rows = [
      {
        'head': '9d9s0g5',
        'head_message': 'test commit 9d9s0g5',
        'meta': {
          'id': '1234567',
          'timestamp': 1525816960
        }
      },
      {
        'head': '9d9s0g5',
        'head_message': 'test commit 9d9s0g5',
        'meta': {
          'id': '1234568',
          'timestamp': 1525816963
        }
      },
      {
        'head': '9d9s0g5',
        'head_message': 'test commit 9d9s0g5',
        'meta': {
          'id': '1234569',
          'timestamp': 1525816965
        }
      }
    ]
    let data = {
      'data': []
    }
    let limit = typeof req.body.limit !== 'undefined' ? req.body.limit : rows.length
    console.log(req.body, limit )
    while (limit > 0) {
      data.data = data.data.concat(rows.pop())
      limit--
    }
    res.send(data)
  })

  // robot.on('push', context => {
  //   // const { owner, repo } = context.repo()
  //   const { head, commits } = context.payload
  //   const headString = head.substring(0, 6)
  //   const { message, url} = commits[0]
  // })
}
