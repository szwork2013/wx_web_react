'use strict'

const qs = require('qs')

const mockjs = require('mockjs')

module.exports = {
  'GET /api/users' (req, res){
    const page = qs.parse(req.query)
    console.log(page)

    const data = mockjs.mock({
      'data|100': [{
        'id|+1': 1,
        name: '@cname',
        'age|11-99': 1,
        address: '@region'
      }],
      page: {
        total: 100,
        current: 1
      }
    })

    setTimeout(function () {
      res.json({
        success: true,
        data
      })
    }, 0);
  }
}
