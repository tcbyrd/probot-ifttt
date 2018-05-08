module.exports = (robot) => {
  const app = robot.route('/ifttt')
  app.get('/status', (req, res) => {
    res.send('alive')
  })
}
