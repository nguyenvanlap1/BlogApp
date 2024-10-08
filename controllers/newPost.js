module.exports = (req, res) => {
    let title = ''
    let body = ''
    data = req.flash('data')[0]
    if(typeof(data) != 'undefined') {
        title = data.title;
        body = data.body;
    }
    res.render('create',{
        errors: req.flash('validationErrors'),
        title: title,
        body: body,
        createPost: true
    })
}