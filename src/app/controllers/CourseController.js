const Course = require('../models/Course');

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    // res.send('Course Detail... ' + req.params.slug);
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render('courses/show', { course });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  //[POST] /courses/store
  store(req, res, next) {
    // res.json(req.body)
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect('/'))
      .catch(next);
  }

  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => res.render('courses/edit', { course }))
      .catch(next);
    // res.render('courses/edit');
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  //[DELETE] //courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[DELETE] //courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[PATCH] //courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .lean()
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[PATCH] //courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .lean()
          .then(() => res.redirect('/me/trash/courses'))
          .catch(next);
        break;
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .lean()
          .then(() => res.redirect('/me/stored/courses'))
          .catch(next);
        break;
      default:
        res.json({ error: 'Invalid action' });
    }
  }
}

module.exports = new CourseController();

/*
Việc truy cập dữ liệu gốc từ con đường input được cho là có lỗ hổng bảo mật lớn và đã bị gỡ bỏ , phải thêm 1 bước chuyển đổi dữ liệu để có thể gọi find({}).lean() có thể giải quyết lỗi ko render ra được dữ liệu

".lean() là một phương thức để chuyển đổi kết quả truy vấn từ dạng Mongoose Document sang dạng JavaScript plain object. Việc này giúp tối ưu hóa hiệu suất và giảm bớt tài nguyên."

Cách khắc phục : https://www.npmjs.com/package/@handlebars/allow-prototype-access
Chi tiết về lỗ hổng : https://mahmoudsec.blogspot.com/2019/04/handlebars-template-injection-and-rce.html
*/
