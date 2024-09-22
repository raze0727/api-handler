const { request, response } = require('express');
module.exports = {
  enabled: true,
  method: 'get',
  endpoint: '/example',
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  run: async (req, res) => {
    return res.send('test');
  },
};
