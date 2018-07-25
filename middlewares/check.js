module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', '尚未登入')
      res.redirect('login')
    }
    next()
  },
  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登入')
      return res.redirect('back')
    }
    next()
  }
}
